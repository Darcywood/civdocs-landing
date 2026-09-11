import { after, NextResponse } from 'next/server';
import { createHash, randomUUID } from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { sendCallbackLeadNotification } from '@/lib/email';
import { sendAdminSms } from '@/lib/sms';
import { sanitizeAttributionBody } from '@/lib/marketingAttribution';

export const runtime = 'nodejs';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase environment variables are not set');
  return createClient(url, key);
}

function trimField(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/\s+/g, ' ').trim().slice(0, max);
}

const RATE_WINDOW_MS = 60 * 60 * 1000;
const RATE_MAX = 8;
const recentSubmits = new Map<string, number[]>();

function allowCallbackSubmit(ip: string | null): boolean {
  const key = ip || 'unknown';
  const now = Date.now();
  const times = (recentSubmits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (times.length >= RATE_MAX) {
    recentSubmits.set(key, times);
    return false;
  }
  times.push(now);
  recentSubmits.set(key, times);
  return true;
}

function getClientIp(req: Request): string | null {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? null;
  return req.headers.get('x-real-ip');
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') ?? '';
    if (!contentType.toLowerCase().includes('application/json')) {
      return NextResponse.json({ error: 'Invalid request.' }, { status: 415 });
    }

    const contentLength = Number(req.headers.get('content-length') ?? 0);
    if (contentLength > 20_000) {
      return NextResponse.json({ error: 'Request too large.' }, { status: 413 });
    }

    const ip = getClientIp(req);
    if (!allowCallbackSubmit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    if (body?._gotcha) {
      return NextResponse.json({ ok: true });
    }

    const firstName = trimField(body.firstName, 80);
    const lastName = trimField(body.lastName, 80);
    const mobile = trimField(body.mobile, 40);
    const companyName = trimField(body.companyName, 120);
    const timeSink = trimField(body.timeSink, 500) || null;

    if (!firstName || !lastName || !mobile || !companyName) {
      return NextResponse.json(
        { error: 'First name, last name, mobile, and company are required.' },
        { status: 400 }
      );
    }

    if (mobile.replace(/\D/g, '').length < 8) {
      return NextResponse.json(
        { error: 'Enter a valid mobile number so we can call you.' },
        { status: 400 }
      );
    }

    const attribution = sanitizeAttributionBody(body.attribution);
    const ipHash = ip ? createHash('sha256').update(ip).digest('hex').slice(0, 32) : null;
    const contactName = `${firstName} ${lastName}`.trim();
    const leadId = randomUUID();

    let saved = false;
    try {
      const supabase = getSupabase();
      const [leadResult, crmResult] = await Promise.all([
        supabase.from('leads').insert({
          id: leadId,
          first_name: firstName,
          last_name: lastName,
          mobile,
          company_name: companyName,
          time_sink: timeSink,
          source: 'get-a-callback',
          status: 'new',
          attribution: Object.keys(attribution).length ? attribution : null,
          user_agent: req.headers.get('user-agent')?.slice(0, 400) ?? null,
          ip_hash: ipHash,
        }),
        supabase.from('admin_crm_prospects').insert({
          company_name: companyName,
          contact_name: contactName,
          email: null,
          phone: mobile,
          phone_type: 'mobile',
          source: 'get-a-callback',
          status: 'lead',
          added_via: 'manual',
          organization_id: null,
          do_not_call: false,
          source_url: crmSourceUrl(attribution),
          notes: buildCrmNotes(timeSink, attribution),
          csv_data: buildCrmCsvData(timeSink, attribution, leadId),
        }),
      ]);

      if (leadResult.error) console.error('[get-a-callback] Lead insert failed:', leadResult.error);
      if (crmResult.error) console.error('[get-a-callback] CRM prospect insert failed:', crmResult.error);
      saved = !leadResult.error || !crmResult.error;
    } catch (dbErr) {
      console.error('[get-a-callback] Database unavailable:', dbErr);
    }

    const notify = () => notifyAdmins({ firstName, lastName, mobile, companyName, timeSink });

    if (saved) {
      after(notify);
      return NextResponse.json({ ok: true, id: leadId });
    }

    const emailOk = await notify();
    if (!emailOk) {
      return NextResponse.json(
        { error: 'Could not send your request. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, id: null });
  } catch (error) {
    console.error('[get-a-callback] Error:', error);
    return NextResponse.json(
      { error: 'Could not send your request. Please try again.' },
      { status: 500 }
    );
  }
}

async function notifyAdmins({
  firstName,
  lastName,
  mobile,
  companyName,
  timeSink,
}: {
  firstName: string;
  lastName: string;
  mobile: string;
  companyName: string;
  timeSink: string | null;
}): Promise<boolean> {
  const sinkNote = timeSink ? ` — ${timeSink.slice(0, 80)}` : '';
  const results = await Promise.allSettled([
    sendCallbackLeadNotification({
      firstName,
      lastName,
      mobile,
      companyName,
      timeSink: timeSink ?? undefined,
    }),
    sendAdminSms(`CivDocs callback: ${firstName} ${lastName} @ ${companyName} — ${mobile}${sinkNote}`),
  ]);

  results.forEach((result, i) => {
    if (result.status === 'rejected') {
      console.error(`[get-a-callback] ${i === 0 ? 'Email' : 'SMS'} notify failed:`, result.reason);
    }
  });

  return results[0].status === 'fulfilled';
}

const SITE = 'https://www.civdocs.com.au';
const NOTE_ATTR_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'gclid',
  'fbclid',
  'gbraid',
  'wbraid',
  'msclkid',
  'ttclid',
] as const;

function crmSourceUrl(attribution: Record<string, string>): string {
  const path = attribution.landing_path_first?.trim();
  if (path?.startsWith('http')) return path.slice(0, 1000);
  if (path?.startsWith('/')) return `${SITE}${path}`;
  return `${SITE}/get-a-callback`;
}

function buildCrmNotes(timeSink: string | null, attribution: Record<string, string>): string {
  const lines = ['Form: get-a-callback'];
  if (timeSink) lines.unshift(`Time sink: ${timeSink}`);

  const utm = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    .filter((key) => attribution[key])
    .map((key) => `${key}=${attribution[key]}`);
  if (utm.length) lines.push(utm.join('&'));

  for (const key of ['gclid', 'fbclid', 'gbraid', 'wbraid', 'msclkid', 'ttclid'] as const) {
    if (attribution[key]) lines.push(`${key}=${attribution[key]}`);
  }

  return lines.join('\n').slice(0, 2000);
}

function buildCrmCsvData(
  timeSink: string | null,
  attribution: Record<string, string>,
  leadId?: string
): Record<string, string> {
  const data: Record<string, string> = { landing_source: 'get-a-callback' };
  if (timeSink) data.time_sink = timeSink;
  if (leadId) data.leads_id = leadId;
  if (attribution.landing_path_first) data.landing_path = attribution.landing_path_first;
  if (attribution.referrer_first) data.referrer = attribution.referrer_first;
  for (const key of NOTE_ATTR_KEYS) {
    if (attribution[key]) data[key] = attribution[key];
  }
  return data;
}
