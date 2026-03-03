import { createClient } from '@supabase/supabase-js';

const BUCKET = 'risk-assessments';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase environment variables are not set');
  return createClient(url, key);
}

export async function ensureBucketExists(): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.storage.createBucket(BUCKET, { public: false });
  if (error && (error.message?.includes('already exists') || error.message?.includes('Bucket already exists'))) return;
  if (error) console.warn('[risk-assessment/storage] Bucket creation:', error.message);
}

export async function uploadRiskAssessmentPdf(submissionId: string, buffer: Buffer): Promise<string> {
  const supabase = getSupabase();
  await ensureBucketExists();
  const path = `pdf/${submissionId}/risk-assessment.pdf`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    contentType: 'application/pdf',
    upsert: true,
  });
  if (error) throw new Error(`Failed to upload PDF: ${error.message}`);
  return path;
}

export async function createSignedDownloadUrl(path: string, expiresIn = 60 * 60 * 24 * 7): Promise<string> {
  const supabase = getSupabase();
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, expiresIn);
  if (error) throw new Error(`Failed to create download URL: ${error.message}`);
  return data.signedUrl;
}
