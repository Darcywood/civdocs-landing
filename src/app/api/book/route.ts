import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const APP_BOOK = 'https://app.civdocs.com.au/api/book';

export async function POST(req: Request) {
  let input: Record<string, unknown> = {};
  try {
    const body = await req.json();
    if (body && typeof body === 'object') input = body as Record<string, unknown>;
  } catch {
    input = {};
  }

  try {
    const upstream = await fetch(APP_BOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        phone: input.phone,
        state: input.state,
        startTime: input.startTime,
        companyName: input.companyName,
        teamSize: input.teamSize,
        currentTool: input.currentTool,
        callType: input.callType,
      }),
    });
    const json = await upstream.json().catch(() => ({ error: 'Could not book that time. Try again.' }));
    return NextResponse.json(json, { status: upstream.status });
  } catch {
    return NextResponse.json({ error: 'Could not book that time. Try again.' }, { status: 502 });
  }
}
