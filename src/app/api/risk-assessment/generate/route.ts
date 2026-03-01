import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { renderToBuffer } from '@react-pdf/renderer';
import React from 'react';
import { randomUUID } from 'crypto';
import type { RiskAssessmentPayload } from '@/lib/risk-assessment/types';
import { GRADER_QUESTIONS } from '@/lib/risk-assessment/graderQuestions';
import { uploadRiskAssessmentPdf, createSignedDownloadUrl } from '@/lib/risk-assessment/storage';
import { sendRiskAssessmentEmail, sendRiskAssessmentNotification } from '@/lib/risk-assessment/email';
import RiskAssessmentPdf from '@/lib/pdf/RiskAssessmentPdf';

export const runtime = 'nodejs';
export const maxDuration = 60;

const EXPIRY_SECONDS = 7 * 24 * 60 * 60;

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase env not set');
  return createClient(url, key);
}

function generateReportNumber(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const time = now.toTimeString().slice(0, 5).replace(':', '');
  const rand = Math.floor(Math.random() * 90000 + 10000);
  return `${rand} ${date}-${time}`;
}

export async function POST(req: Request) {
  try {
    const body: RiskAssessmentPayload = await req.json();

    if (body._gotcha) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Basic validation
    if (!body.basics?.make || !body.basics?.model || !body.basics?.machineType) {
      return NextResponse.json({ error: 'Missing machine basics' }, { status: 400 });
    }
    if (!body.lead?.firstName || !body.lead?.email) {
      return NextResponse.json({ error: 'Missing lead information' }, { status: 400 });
    }

    const submissionId = body.submissionId || randomUUID();
    const reportNumber = body.basics.reportNumber || generateReportNumber();
    const basics = { ...body.basics, reportNumber };

    const supabase = getSupabase();

    // Store submission
    try {
      await supabase.from('risk_assessment_submissions').insert({
        id: submissionId,
        first_name: body.lead.firstName,
        email: body.lead.email,
        company_name: body.lead.companyName,
        phone: body.lead.phone || null,
        marketing_consent: body.lead.marketingConsent,
        machine_make: basics.make,
        machine_model: basics.model,
        machine_type: basics.machineType,
        asset_number: basics.assetNumber,
        report_number: reportNumber,
        answers: body.answers,
        specs: body.specs,
        status: 'pending',
        source: 'website',
      });
    } catch (dbErr) {
      console.error('[risk-assessment/generate] DB insert error:', dbErr);
      // Non-fatal — continue with PDF generation
    }

    // Count treatments
    let treatmentsInPlace = 0;
    let treatmentsRequired = 0;
    GRADER_QUESTIONS.forEach((q) => {
      const answer = body.answers[q.id];
      if (answer === 'yes') treatmentsInPlace++;
      if (answer === 'no') treatmentsRequired++;
    });

    // Generate PDF
    const pdfBuffer = await renderToBuffer(
      React.createElement(RiskAssessmentPdf, {
        basics,
        specs: body.specs,
        answers: body.answers,
      })
    );

    // Upload PDF
    const pdfPath = await uploadRiskAssessmentPdf(submissionId, Buffer.from(pdfBuffer));
    const pdfUrl = await createSignedDownloadUrl(pdfPath, EXPIRY_SECONDS);

    // Update submission with PDF path
    try {
      await supabase
        .from('risk_assessment_submissions')
        .update({ status: 'emailed', pdf_path: pdfPath })
        .eq('id', submissionId);
    } catch (dbErr) {
      console.error('[risk-assessment/generate] DB update error:', dbErr);
    }

    const machineDescription = `${basics.make} ${basics.model} ${basics.machineType}${basics.assetNumber ? ` (${basics.assetNumber})` : ''}`;

    // Send PDF email
    await sendRiskAssessmentEmail({
      to: body.lead.email,
      firstName: body.lead.firstName,
      machineDescription,
      reportNumber,
      pdfUrl,
    });

    // Admin notification (with small delay to respect Resend rate limit)
    await delay(600);
    try {
      await sendRiskAssessmentNotification({
        firstName: body.lead.firstName,
        companyName: body.lead.companyName,
        email: body.lead.email,
        machineDescription,
        reportNumber,
        treatmentsInPlace,
        treatmentsRequired,
      });
    } catch (notifyErr) {
      console.error('[risk-assessment/generate] Admin notification failed:', notifyErr);
    }

    return NextResponse.json({
      ok: true,
      submissionId,
      reportNumber,
      pdfUrl,
      treatmentsInPlace,
      treatmentsRequired,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[risk-assessment/generate] Error:', message);
    return NextResponse.json({ error: 'Generation failed', details: message }, { status: 500 });
  }
}
