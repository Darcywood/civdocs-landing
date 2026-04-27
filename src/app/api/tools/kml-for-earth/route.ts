import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const MAX_KML_BYTES = 5_000_000;

function safeFilename(raw: string | null | undefined, fallback = 'points.kml'): string {
  if (!raw) return fallback;
  const cleaned = raw.replace(/[^a-zA-Z0-9._-]+/g, '_');
  return cleaned.length > 0 ? cleaned : fallback;
}

function kmlResponse(kml: string, filename: string): NextResponse {
  return new NextResponse(kml, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.google-earth.kml+xml; charset=utf-8',
      'Content-Disposition': `inline; filename="${filename}"`,
      'Cache-Control': 'no-store, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

/**
 * Accepts a KML payload via form-encoded POST (preferred for browser form submissions)
 * or JSON, and streams the KML back with the Google Earth content type so the browser
 * can hand the file off to Google Earth or "Open in…".
 */
export async function POST(request: NextRequest) {
  const contentType = request.headers.get('content-type') || '';

  let kml = '';
  let filename = 'points.kml';

  try {
    if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      const k = form.get('kml');
      const n = form.get('filename');
      if (typeof k === 'string') kml = k;
      if (typeof n === 'string') filename = n;
    } else {
      const body = (await request.json()) as { kml?: unknown; filename?: unknown };
      if (typeof body.kml === 'string') kml = body.kml;
      if (typeof body.filename === 'string') filename = body.filename;
    }
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  if (!kml) {
    return NextResponse.json({ error: 'kml required' }, { status: 400 });
  }
  if (kml.length > MAX_KML_BYTES) {
    return NextResponse.json({ error: 'KML too large' }, { status: 413 });
  }

  return kmlResponse(kml, safeFilename(filename));
}
