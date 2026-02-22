import { Resend } from 'resend';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not set');
  return new Resend(apiKey);
}

const VIDEO_URL = process.env.CAPABILITY_VIDEO_URL || 'https://placeholder.com/video';
const BOOK_URL = process.env.CAPABILITY_BOOK_URL || 'https://calendly.com/placeholder';
const BOOK_CALL_LINK = process.env.BOOK_CALL_LINK || process.env.CAPABILITY_BOOK_URL || 'https://calendly.com/civdocs';

export async function sendCapabilityStatementEmail({
  to,
  firstName,
  businessName,
  pdfUrl,
}: {
  to: string;
  firstName: string;
  businessName: string;
  pdfUrl: string;
}) {
  const resend = getResend();
  const from = process.env.FROM_EMAIL;
  if (!from) throw new Error('FROM_EMAIL is not set');

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #1E1E1E;">Your Capability Statement is ready</h2>
  <p>Hi ${firstName},</p>
  <p>Your professional capability statement for <strong>${businessName}</strong> is ready to download.</p>
  <p><a href="${pdfUrl}" style="display: inline-block; background: linear-gradient(to right, #FF8C32, #F5B041); color: white; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: 600;">Download your PDF</a></p>
  <p style="font-size: 12px; color: #666;">This link expires in 7 days.</p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
  <p style="font-size: 14px;"><strong>Next steps</strong></p>
  <ul>
    <li><a href="${VIDEO_URL}" style="color: #FF8C32;">Watch our 3-min CivDocs overview</a></li>
    <li><a href="${BOOK_URL}" style="color: #FF8C32;">Book a 15-min walkthrough</a></li>
  </ul>
  <p style="font-size: 11px; color: #999;">Generated from the information you provided. Please verify before submitting to clients.</p>
  <p style="font-size: 11px; color: #999;">— CivDocs</p>
</body>
</html>
`;

  return resend.emails.send({
    from,
    to,
    subject: `Your Capability Statement is ready — ${businessName}`,
    html,
  });
}

export async function sendCapabilityFollowUpEmail({
  to,
  firstName,
}: {
  to: string;
  firstName: string;
}) {
  const resend = getResend();
  const from = process.env.FROM_EMAIL;
  if (!from) throw new Error('FROM_EMAIL is not set');

  const scheduledAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1E1E1E; line-height: 1.7;">

  <p>Hey ${firstName},</p>

  <p>I wanted to quickly run you through <strong>how to use the capability statement you generated</strong>, because this part matters more than most people realise.</p>

  <p>When tenders or clients ask for a capability statement, it's usually not being read cover-to-cover.</p>

  <p>It's skimmed.</p>

  <p>Reviewers are typically checking three things:</p>

  <ol style="padding-left: 20px;">
    <li style="margin-bottom: 12px;"><strong>Can you actually deliver this type of work?</strong><br>That's why your core capabilities and project experience are front and centre.</li>
    <li style="margin-bottom: 12px;"><strong>Do you have the capacity and people to support it?</strong><br>Plant, equipment, and key personnel help answer that quickly.</li>
    <li style="margin-bottom: 12px;"><strong>Are you compliant enough to pass the first gate?</strong><br>Licences, insurance, and certifications are usually a yes/no check — miss one, and it doesn't matter how good the rest is.</li>
  </ol>

  <p>The structure of your PDF is designed around exactly that process.</p>

  <p>It's not meant to oversell.<br>
  It's meant to make it <strong>easy for someone on the other end to say "yes" and move on</strong>.</p>

  <p>One thing to keep in mind:<br>
  Capability statements tend to get out of date fast — projects change, plant changes, people change, compliance changes.</p>

  <p>That's actually why we built CivDocs in the first place — to keep this sort of information current without rebuilding documents from scratch every time.</p>

  <p>If you ever want to sanity-check whether CivDocs would make sense for your setup, you're welcome to book a quick, no-pressure chat here:</p>

  <p style="margin: 24px 0;">
    <a href="${BOOK_CALL_LINK}" style="display: inline-block; background: linear-gradient(to right, #FF8C32, #F5B041); color: white; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: 600;">Book a quick chat</a>
  </p>

  <p>If not, no stress at all — hopefully the capability statement helps you put your best foot forward.</p>

  <p>Cheers,<br>Darcy</p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
  <p style="font-size: 11px; color: #999;">You're receiving this because you opted in to tips and updates from CivDocs. — CivDocs, civdocs.com.au</p>
</body>
</html>
`;

  return resend.emails.send({
    from,
    to,
    subject: `How to get the most out of your capability statement`,
    html,
    scheduledAt,
  });
}
