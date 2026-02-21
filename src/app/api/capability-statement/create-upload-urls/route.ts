import { NextResponse } from 'next/server';
import { createSignedUploadUrls, ensureBucketExists, type UploadCategory } from '@/lib/capability-statement/storage';
import { randomUUID } from 'crypto';

const ACCEPTED_MIMES = ['image/jpeg', 'image/jpg', 'image/png'];

interface FileRequest {
  category: UploadCategory;
  filename: string;
  contentType: string;
}

const MAX_FILES = {
  logo: 1,
  cover: 1,
  finishing: 1,
  projects: 4,
  plant: 4,
  team: 2,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { submissionDraftId, files } = body as {
      submissionDraftId?: string;
      files: FileRequest[];
    };

    if (!Array.isArray(files) || files.length === 0) {
      return NextResponse.json(
        { error: 'files array is required and must not be empty' },
        { status: 400 }
      );
    }

    const submissionId = submissionDraftId || randomUUID();

    const categoryCounts: Record<string, number> = {};
    for (const f of files) {
      if (!['logo', 'cover', 'finishing', 'projects', 'plant', 'team'].includes(f.category)) {
        return NextResponse.json({ error: `Invalid category: ${f.category}` }, { status: 400 });
      }
      if (!ACCEPTED_MIMES.includes(f.contentType)) {
        return NextResponse.json({ error: `Invalid content type: ${f.contentType}` }, { status: 400 });
      }
      categoryCounts[f.category] = (categoryCounts[f.category] || 0) + 1;
      if (categoryCounts[f.category] > MAX_FILES[f.category as UploadCategory]) {
        return NextResponse.json(
          { error: `Too many files for ${f.category} (max ${MAX_FILES[f.category as UploadCategory]})` },
          { status: 400 }
        );
      }
    }

    await ensureBucketExists();

    const { paths, signedUploadUrls } = await createSignedUploadUrls(submissionId, files);

    return NextResponse.json({
      submissionId,
      paths,
      signedUploadUrls,
    });
  } catch (err) {
    console.error('[create-upload-urls]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to create upload URLs' },
      { status: 500 }
    );
  }
}
