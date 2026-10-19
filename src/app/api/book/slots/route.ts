import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const STATES = ['QLD', 'NSW', 'VIC', 'ACT', 'TAS', 'SA', 'NT', 'WA'] as const;
const APP_SLOTS = 'https://app.civdocs.com.au/api/book/slots';

export async function GET(req: Request) {
  const state = new URL(req.url).searchParams.get('state') ?? '';
  if (!STATES.includes(state as (typeof STATES)[number])) {
    return NextResponse.json({ error: 'Pick a state.' }, { status: 400 });
  }

  try {
    const upstream = await fetch(`${APP_SLOTS}?state=${state}`, { cache: 'no-store' });
    const json = await upstream.json().catch(() => ({ error: 'Could not load times.' }));
    return NextResponse.json(json, { status: upstream.status });
  } catch {
    return NextResponse.json({ error: 'Could not load times.' }, { status: 502 });
  }
}
