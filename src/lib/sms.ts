/**
 * Immediate admin SMS via Twilio REST API (no SDK).
 * Skips quietly when Twilio env is not configured.
 */

function getTwilioConfig() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER || process.env.TWILIO_PHONE_NUMBER;
  const to = process.env.ADMIN_SMS_TO || process.env.NOTIFY_SMS || process.env.TWILIO_ADMIN_TO;
  if (!accountSid || !authToken || !from || !to) return null;
  return { accountSid, authToken, from, to };
}

export async function sendAdminSms(body: string): Promise<boolean> {
  const config = getTwilioConfig();
  if (!config) {
    console.warn('[SMS] Twilio env not set — skipping admin SMS');
    return false;
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`;
  const params = new URLSearchParams({
    To: config.to,
    From: config.from,
    Body: body.slice(0, 1600),
  });

  const auth = Buffer.from(`${config.accountSid}:${config.authToken}`).toString('base64');
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Twilio SMS failed (${res.status}): ${text.slice(0, 300)}`);
  }

  return true;
}
