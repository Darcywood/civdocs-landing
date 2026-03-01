import { NextResponse } from 'next/server';
import Firecrawl from '@mendable/firecrawl-js';

const DEFAULT_URL = 'https://firecrawl.dev';

async function handleScrape(url: string) {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: 'FIRECRAWL_API_KEY is not set in .env.local' },
      { status: 500 }
    );
  }

  const targetUrl = url || DEFAULT_URL;

  try {
    const firecrawl = new Firecrawl({ apiKey });
    const result = await firecrawl.scrape(targetUrl, {
      formats: ['markdown'],
    });

    if (!result.success) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Firecrawl scrape failed',
          details: result,
        },
        { status: 500 }
      );
    }

    const markdown = result.markdown ?? (result as { data?: { markdown?: string } })?.data?.markdown ?? '';
    return NextResponse.json({
      ok: true,
      message: 'Firecrawl is working',
      url: targetUrl,
      scrapedLength: markdown?.length ?? 0,
      preview: markdown?.slice(0, 500) ?? '(no content)',
      markdown: targetUrl !== DEFAULT_URL ? markdown : undefined,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        ok: false,
        error: 'Firecrawl test failed',
        details: message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url') || DEFAULT_URL;
  return handleScrape(url);
}

export async function POST(req: Request) {
  let body: { url?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }
  const url = body.url || DEFAULT_URL;
  return handleScrape(url);
}
