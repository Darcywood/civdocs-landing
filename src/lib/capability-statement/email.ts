import { Resend } from 'resend';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not set');
  return new Resend(apiKey);
}

const VIDEO_URL = process.env.CAPABILITY_VIDEO_URL || 'https://placeholder.com/video';
const BOOK_URL = process.env.CAPABILITY_BOOK_URL || 'https://calendly.com/placeholder';

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
