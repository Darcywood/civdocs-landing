import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import { randomUUID } from 'crypto';
import { generatePayloadSchema, complianceOptions } from '@/lib/capability-statement/schema';
import { enrichWithAI } from '@/lib/capability-statement/ai';
import {
  downloadAsBase64,
  uploadPdfBuffer,
  createSignedDownloadUrl,
} from '@/lib/capability-statement/storage';
import { sendCapabilityStatementEmail, sendCapabilityFollowUpEmail, sendCapabilityStatementNotification } from '@/lib/capability-statement/email';
import { getClientIp, checkAndIncrementRateLimit } from '@/lib/capability-statement/rateLimit';
import CapabilityStatementPdf from '@/lib/pdf/CapabilityStatementPdf';

export const runtime = 'nodejs';
export const maxDuration = 60;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase env not set');
  return createClient(url, key);
}

const EXPIRY_DAYS = parseInt(process.env.CAPABILITY_PDF_LINK_EXPIRY_DAYS || '7', 10);
const EXPIRY_SECONDS = EXPIRY_DAYS * 24 * 60 * 60;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = generatePayloadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid payload', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { submissionId: providedId, answers, lead, uploadManifest, projectPhotoMap, _gotcha } = parsed.data;

    if (_gotcha) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const supabase = getSupabase();

    // IP rate limit: 3 per hour to protect OpenAI costs from bots
    const clientIp = getClientIp(req) ?? 'unknown';
    if (clientIp !== 'unknown' && clientIp !== '127.0.0.1') {
      const { allowed } = await checkAndIncrementRateLimit(supabase, clientIp);
      if (!allowed) {
        return NextResponse.json(
          { error: 'Rate limit exceeded. Please try again in an hour.' },
          { status: 429 }
        );
      }
    }

    const submissionId = providedId || randomUUID();

    const { data: submission, error: insertError } = await supabase
      .from('capability_statement_submissions')
      .insert({
        id: submissionId,
        first_name: lead.firstName,
        email: lead.email,
        marketing_consent: lead.marketingConsent,
        answers: { step1: answers.step1, step2: answers.step2 },
        upload_manifest: uploadManifest || null,
        status: 'pending',
        source: 'website',
      })
      .select()
      .single();

    if (insertError) {
      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: 'Submission already processed' },
          { status: 409 }
        );
      }
      console.error('[generate] Insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to create submission' },
        { status: 500 }
      );
    }

    const { content: rawContent, aiUsed } = await enrichWithAI(answers.step1, answers.step2);

    // Remap compliance values to human-readable labels in case AI returned raw keys
    const content = {
      ...rawContent,
      compliance: rawContent.compliance.map((c) => {
        const match = complianceOptions.find((o) => o.value === c);
        return match ? match.label : c;
      }),
    };

    let logoDataUrl: string | null = null;
    let coverPhotoDataUrl: string | null = null;
    let finishingPhotoDataUrl: string | null = null;
    // projectImageUrls is indexed by project index — may have null slots
    const projectImageUrls: (string | null)[] = [];
    const plantImageUrls: string[] = [];
    const teamImageUrls: string[] = [];

    const manifest = uploadManifest || [];
    const logoPath = manifest.find((p) => p.includes('/logo.'));
    const coverPath = manifest.find((p) => p.includes('/cover.'));
    const finishingPath = manifest.find((p) => p.includes('/finishing.'));
    const projectPaths = manifest.filter((p) => p.includes('/projects/'));
    const plantPaths = manifest.filter((p) => p.includes('/plant/'));
    const teamPaths = manifest.filter((p) => p.includes('/team/'));

    if (logoPath) {
      logoDataUrl = await downloadAsBase64(logoPath);
    }
    if (coverPath) {
      coverPhotoDataUrl = await downloadAsBase64(coverPath);
    }
    if (finishingPath) {
      finishingPhotoDataUrl = await downloadAsBase64(finishingPath);
    }
    // Build project image array indexed by project position
    for (let i = 0; i < projectPaths.slice(0, 4).length; i++) {
      const dataUrl = await downloadAsBase64(projectPaths[i]);
      const projectIndex = projectPhotoMap ? (projectPhotoMap[i] ?? i) : i;
      // Ensure array is large enough
      while (projectImageUrls.length <= projectIndex) {
        projectImageUrls.push(null);
      }
      projectImageUrls[projectIndex] = dataUrl;
    }
    for (const p of plantPaths.slice(0, 4)) {
      const dataUrl = await downloadAsBase64(p);
      if (dataUrl) plantImageUrls.push(dataUrl);
    }
    for (const p of teamPaths.slice(0, 2)) {
      const dataUrl = await downloadAsBase64(p);
      if (dataUrl) teamImageUrls.push(dataUrl);
    }

    const accentColour = lead.accentColour || '#1B3A5C';

    const pdfElement = React.createElement(CapabilityStatementPdf, {
      businessName: answers.step1.businessName,
      content,
      logoDataUrl,
      coverPhotoDataUrl,
      finishingPhotoDataUrl,
      projectImageUrls,
      plantImageUrls,
      teamImageUrls,
      accentColour,
      contactInfo: {
        phone: answers.step1.phone,
        abn: answers.step1.abn,
        website: answers.step1.website,
        email: answers.step1.contactEmail || lead.email,
        location: answers.step1.locationRegions,
      },
      missionStatement: answers.step1.missionStatement,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfBuffer = await renderToBuffer(pdfElement as any);
    const pdfPath = await uploadPdfBuffer(submissionId, Buffer.from(pdfBuffer));

    const pdfSignedUrl = await createSignedDownloadUrl(pdfPath, EXPIRY_SECONDS);

    await sendCapabilityStatementEmail({
      to: lead.email,
      firstName: lead.firstName,
      businessName: answers.step1.businessName,
      pdfUrl: pdfSignedUrl,
    });

    // Notify admin of new capability statement
    const poi1 = answers.step2.keyPersonnel[0];
    const personOfInterest1 = poi1
      ? `${poi1.name} (${poi1.role}, ${poi1.yearsExperience})`
      : null;
    try {
      await sendCapabilityStatementNotification({
        firstName: lead.firstName,
        businessName: answers.step1.businessName,
        email: lead.email,
        personOfInterest1,
      });
    } catch (notifyErr) {
      console.error('[generate] Admin notification failed:', notifyErr);
    }

    if (lead.marketingConsent) {
      try {
        await sendCapabilityFollowUpEmail({
          to: lead.email,
          firstName: lead.firstName,
        });
      } catch (followUpErr) {
        // Non-critical — log but don't fail the request
        console.error('[generate] Follow-up email scheduling failed:', followUpErr);
      }
    }

    await supabase
      .from('capability_statement_submissions')
      .update({
        status: 'emailed',
        pdf_path: pdfPath,
        pdf_signed_url_last_generated_at: new Date().toISOString(),
        ai_used: aiUsed,
      })
      .eq('id', submissionId);

    return NextResponse.json({
      submissionId,
      success: true,
      pdfUrl: pdfSignedUrl,
      previewData: {
        businessName: answers.step1.businessName,
      },
    });
  } catch (err) {
    console.error('[generate]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Generation failed' },
      { status: 500 }
    );
  }
}
