import { NextResponse } from 'next/server';
import { sendMetaConversionEvent, verifyCalendlySignature } from '@/lib/metaCapi';

export const runtime = 'nodejs';

/**
 * Calendly → Meta CAPI
 *
 * Register in Calendly: Integrations → Webhooks
 *   URL: https://www.civdocs.com.au/api/webhooks/calendly
 *   Event: invitee.created
 *   Then set CALENDLY_WEBHOOK_SIGNING_KEY in env.
 *
 * Limitation: Calendly's own pixel fire uses an event_id we do not control.
 * We derive event_id from the invitee UUID so repeats of this webhook dedupe
 * against each other. They will not reliably merge with Calendly's browser pixel.
 */

type CalendlyInviteePayload = {
  email?: string;
  name?: string;
  uri?: string;
  tracking?: { fbc?: string; fbp?: string };
  scheduled_event?: { uri?: string; location?: { join_url?: string } };
};

function inviteeEventId(payload: CalendlyInviteePayload): string | null {
  const uri = payload.uri || payload.scheduled_event?.uri;
  if (!uri) return null;
  const id = uri.split('/').filter(Boolean).pop();
  return id ? `calendly_${id}` : null;
}

export async function POST(req: Request) {
  const raw = await req.text();
  const secret = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;

  if (secret) {
    const signature = req.headers.get('calendly-webhook-signature');
    if (!verifyCalendlySignature(raw, signature, secret)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
  } else {
    console.warn('[calendly webhook] CALENDLY_WEBHOOK_SIGNING_KEY is not set — accepting unsigned payload');
  }

  let body: { event?: string; payload?: CalendlyInviteePayload };
  try {
    body = JSON.parse(raw) as { event?: string; payload?: CalendlyInviteePayload };
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (body.event !== 'invitee.created' || !body.payload) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const payload = body.payload;
  const eventId = inviteeEventId(payload);
  if (!eventId) {
    console.warn('[calendly webhook] No invitee/event URI — cannot build event_id');
    return NextResponse.json({ ok: true, skipped: true });
  }

  const name = payload.name?.trim() ?? '';
  const [firstName, ...rest] = name.split(/\s+/);
  const lastName = rest.join(' ') || undefined;

  try {
    await sendMetaConversionEvent({
      eventName: 'invitee_meeting_scheduled',
      eventId,
      eventSourceUrl: 'https://www.civdocs.com.au/book',
      user: {
        email: payload.email,
        firstName: firstName || undefined,
        lastName,
        fbp: payload.tracking?.fbp,
        fbc: payload.tracking?.fbc,
      },
      customData: {
        content_name: 'Calendly booking',
        content_category: 'book_a_call',
      },
    });
  } catch (err) {
    console.warn('[calendly webhook] Meta CAPI failed:', err);
  }

  return NextResponse.json({ ok: true });
}
