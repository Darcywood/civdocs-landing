import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createSignedDownloadUrl } from '@/lib/risk-assessment/storage';

export const runtime = 'nodejs';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase env not set');
  return createClient(url, key);
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  if (!token || !/^[0-9a-f-]{36}$/.test(token)) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  try {
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('risk_assessment_submissions')
      .select('pdf_path, machine_make, machine_model, machine_type, report_number, first_name, created_at')
      .eq('public_token', token)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    if (!data.pdf_path) {
      return NextResponse.json({ error: 'Report not yet ready' }, { status: 404 });
    }

    // Generate a fresh signed URL valid for 1 hour (enough for a viewing session)
    const signedUrl = await createSignedDownloadUrl(data.pdf_path, 60 * 60);

    return NextResponse.json({
      ok: true,
      signedUrl,
      machineDescription: `${data.machine_make} ${data.machine_model} ${data.machine_type}`,
      reportNumber: data.report_number,
      preparedFor: data.first_name,
      createdAt: data.created_at,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[risk-assessment/report] Error:', message);
    return NextResponse.json({ error: 'Failed to retrieve report' }, { status: 500 });
  }
}
