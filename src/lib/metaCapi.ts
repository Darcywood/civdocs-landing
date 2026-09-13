import { createHash, createHmac, timingSafeEqual } from 'crypto';

export const META_PIXEL_ID = '838965695621381';
const CAPI_URL = `https://graph.facebook.com/v19.0/${META_PIXEL_ID}/events`;

export type MetaCapiEventName = 'Lead' | 'invitee_meeting_scheduled' | (string & {});

export type MetaCapiUserInput = {
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  clientIp?: string | null;
  userAgent?: string | null;
  fbp?: string | null;
  fbc?: string | null;
  fbclid?: string | null;
};

export type SendMetaConversionEventInput = {
  eventName: MetaCapiEventName;
  eventId: string;
  eventSourceUrl: string;
  user?: MetaCapiUserInput;
  customData?: Record<string, string | number | boolean>;
};

function sha256(value: string): string {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

/** Meta CAPI: trim, lowercase, then SHA-256. */
export function hashEmail(email: string): string | null {
  const normalized = email.trim().toLowerCase();
  if (!normalized.includes('@')) return null;
  return sha256(normalized);
}

/**
 * Meta CAPI phone: digits only, with country code.
 * Australian mobiles (04… / 4…) become 61…
 */
export function hashPhone(phone: string): string | null {
  let digits = phone.replace(/\D/g, '');
  if (digits.length < 8) return null;

  if (digits.startsWith('0') && digits.length >= 9) {
    digits = `61${digits.slice(1)}`;
  } else if (digits.startsWith('4') && digits.length === 9) {
    digits = `61${digits}`;
  }

  return sha256(digits);
}

/** Meta CAPI name: lowercase, strip punctuation/numbers. */
export function hashName(name: string): string | null {
  const normalized = name.trim().toLowerCase().replace(/[^a-z]/g, '');
  if (!normalized) return null;
  return sha256(normalized);
}

function readCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(';');
  for (const part of parts) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name && rest.length) {
      try {
        return decodeURIComponent(rest.join('='));
      } catch {
        return rest.join('=');
      }
    }
  }
  return null;
}

export function metaCookiesFromRequest(req: Request): { fbp: string | null; fbc: string | null } {
  const cookie = req.headers.get('cookie');
  return {
    fbp: readCookie(cookie, '_fbp'),
    fbc: readCookie(cookie, '_fbc'),
  };
}

function buildFbc(existing: string | null, fbclid?: string | null): string | null {
  if (existing) return existing;
  const clickId = fbclid?.trim();
  if (!clickId) return null;
  return `fb.1.${Date.now()}.${clickId}`;
}

function buildUserData(user: MetaCapiUserInput = {}): Record<string, string | string[]> {
  const data: Record<string, string | string[]> = {};

  const em = user.email ? hashEmail(user.email) : null;
  const ph = user.phone ? hashPhone(user.phone) : null;
  const fn = user.firstName ? hashName(user.firstName) : null;
  const ln = user.lastName ? hashName(user.lastName) : null;
  const fbc = buildFbc(user.fbc ?? null, user.fbclid);

  if (em) data.em = [em];
  if (ph) data.ph = [ph];
  if (fn) data.fn = [fn];
  if (ln) data.ln = [ln];
  if (user.fbp) data.fbp = user.fbp;
  if (fbc) data.fbc = fbc;
  if (user.clientIp) data.client_ip_address = user.clientIp;
  if (user.userAgent) data.client_user_agent = user.userAgent;

  return data;
}

/**
 * Send a Conversions API event. Never throws — logs a warning on failure
 * so a Meta outage cannot block form submit or webhooks.
 */
export async function sendMetaConversionEvent(input: SendMetaConversionEventInput): Promise<boolean> {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!token) {
    console.warn('[Meta CAPI] META_CAPI_ACCESS_TOKEN is not set — skipping server event');
    return false;
  }

  const eventId = input.eventId.trim();
  if (!eventId) {
    console.warn('[Meta CAPI] Missing event_id — skipping (dedupe would fail)');
    return false;
  }

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: input.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: 'website',
        event_source_url: input.eventSourceUrl,
        user_data: buildUserData(input.user),
        ...(input.customData && Object.keys(input.customData).length
          ? { custom_data: input.customData }
          : {}),
      },
    ],
  };

  const testCode = process.env.META_CAPI_TEST_EVENT_CODE?.trim();
  if (testCode) body.test_event_code = testCode;

  try {
    const res = await fetch(`${CAPI_URL}?access_token=${encodeURIComponent(token)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const json = (await res.json().catch(() => ({}))) as { error?: { message?: string } };
    if (!res.ok) {
      console.warn('[Meta CAPI] Event failed:', res.status, json.error?.message ?? json);
      return false;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Meta CAPI] Sent', input.eventName, eventId);
    }
    return true;
  } catch (err) {
    console.warn('[Meta CAPI] Request error:', err);
    return false;
  }
}

/** Calendly signs `${timestamp}.${rawBody}` with HMAC-SHA256. Header: t=…,v1=… */
export function verifyCalendlySignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  if (!signatureHeader || !secret) return false;

  const parts = Object.fromEntries(
    signatureHeader.split(',').map((part) => {
      const [k, ...rest] = part.trim().split('=');
      return [k, rest.join('=')];
    })
  ) as { t?: string; v1?: string };

  if (!parts.t || !parts.v1) return false;

  const expected = createHmac('sha256', secret).update(`${parts.t}.${rawBody}`).digest('hex');
  try {
    const a = Buffer.from(expected, 'hex');
    const b = Buffer.from(parts.v1, 'hex');
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}
