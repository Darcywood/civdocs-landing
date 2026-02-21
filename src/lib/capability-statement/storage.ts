import { createClient, SupabaseClient } from '@supabase/supabase-js';

const BUCKET = 'capability-statements';

function getSupabase(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Supabase environment variables are not set');
  }
  return createClient(url, key);
}

export type UploadCategory = 'logo' | 'cover' | 'finishing' | 'projects' | 'plant' | 'team';

export interface UploadFileRequest {
  category: UploadCategory;
  filename: string;
  contentType: string;
}

export interface SignedUploadUrl {
  path: string;
  signedUrl: string;
}

const ACCEPTED_MIMES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_LOGO_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_PHOTO_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_COVER_SIZE = 15 * 1024 * 1024; // 15MB for high-quality cover

function getMaxSize(category: UploadCategory): number {
  if (category === 'cover') return MAX_COVER_SIZE;
  return category === 'logo' || category === 'team' ? MAX_LOGO_SIZE : MAX_PHOTO_SIZE;
}

function getExtension(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || 'jpg';
  return ext === 'jpeg' ? 'jpg' : ext;
}

export async function ensureBucketExists(): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.storage.createBucket(BUCKET, { public: false });
  if (error && (error.message?.includes('already exists') || error.message?.includes('Bucket already exists'))) {
    return;
  }
  if (error) {
    console.warn('[Storage] Bucket creation:', error.message);
  }
}

export async function createSignedUploadUrls(
  submissionId: string,
  files: UploadFileRequest[]
): Promise<{ paths: string[]; signedUploadUrls: SignedUploadUrl[] }> {
  const supabase = getSupabase();
  const paths: string[] = [];
  const signedUploadUrls: SignedUploadUrl[] = [];

  const categoryCounts: Record<string, number> = { logo: 0, cover: 0, finishing: 0, projects: 0, plant: 0, team: 0 };

  for (const file of files) {
    if (!ACCEPTED_MIMES.includes(file.contentType)) {
      throw new Error(`Invalid content type: ${file.contentType}`);
    }

    const ext = getExtension(file.filename);
    let path: string;

    if (file.category === 'logo') {
      path = `uploads/${submissionId}/logo.${ext}`;
    } else if (file.category === 'cover') {
      path = `uploads/${submissionId}/cover.${ext}`;
    } else if (file.category === 'finishing') {
      path = `uploads/${submissionId}/finishing.${ext}`;
    } else {
      categoryCounts[file.category] = (categoryCounts[file.category] || 0) + 1;
      path = `uploads/${submissionId}/${file.category}/${categoryCounts[file.category]}.${ext}`;
    }

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .createSignedUploadUrl(path);

    if (error) {
      throw new Error(`Failed to create upload URL: ${error.message}`);
    }

    paths.push(path);
    signedUploadUrls.push({ path, signedUrl: data.signedUrl });
  }

  return { paths, signedUploadUrls };
}

export async function createSignedDownloadUrl(
  path: string,
  expiresIn = 60 * 60 * 24 * 7
): Promise<string> {
  const supabase = getSupabase();
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, expiresIn);

  if (error) {
    throw new Error(`Failed to create download URL: ${error.message}`);
  }

  return data.signedUrl;
}

export async function downloadAsBase64(path: string): Promise<string | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase.storage.from(BUCKET).download(path);
  if (error || !data) return null;
  const buf = Buffer.from(await data.arrayBuffer());
  const base64 = buf.toString('base64');
  const mime = data.type || 'image/png';
  return `data:${mime};base64,${base64}`;
}

export async function uploadPdfBuffer(
  submissionId: string,
  buffer: Buffer
): Promise<string> {
  const supabase = getSupabase();
  const path = `pdf/${submissionId}/capability-statement.pdf`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, buffer, {
    contentType: 'application/pdf',
    upsert: true,
  });
  if (error) throw new Error(`Failed to upload PDF: ${error.message}`);
  return path;
}
