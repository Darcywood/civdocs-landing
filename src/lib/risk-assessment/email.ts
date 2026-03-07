import { Resend } from 'resend';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not set');
  return new Resend(apiKey);
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://civdocs.com.au';
const BOOK_URL = `${BASE_URL}/book`;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'darcy@civdocs.com.au';

export async function sendRiskAssessmentEmail({
  to,
  firstName,
  machineDescription,
  reportNumber,
  pdfUrl,
}: {
  to: string;
  firstName: string;
  machineDescription: string;
  reportNumber: string;
  pdfUrl: string;
}) {
  const resend = getResend();
  const from = process.env.FROM_EMAIL;
  if (!from) throw new Error('FROM_EMAIL is not set');

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1E1E1E;">
  <h2 style="color: #1E1E1E;">Your Risk Assessment Report is ready</h2>
  <p>Hi ${firstName},</p>
  <p>Your Risk Management Report for <strong>${machineDescription}</strong> is ready to download.</p>
  <p style="font-size: 12px; color: #666;">Report Number: ${reportNumber}</p>
  <p>
    <a href="${pdfUrl}" style="display: inline-block; background: linear-gradient(to right, #FF8C32, #F5B041); color: white; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: 600;">Download your Report (PDF)</a>
  </p>
  <p style="font-size: 12px; color: #666;">This link expires in 7 days.</p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
  <p style="font-size: 14px;"><strong>Keep it current</strong></p>
  <p style="font-size: 13px; color: #555;">Risk assessments need to stay up to date as plant condition, operators, and compliance requirements change. CivDocs helps you manage plant registers, pre-starts, and compliance records in one place — so your documents always reflect reality.</p>
  <p style="font-size: 13px; color: #555;">If you'd like to see how it works for your business:</p>
  <p>
    <a href="${BOOK_URL}" style="color: #FF8C32; font-size: 13px;">Book a 15-min walkthrough →</a>
  </p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
  <p style="font-size: 11px; color: #999;">Generated from information provided. Please verify all details before use. — CivDocs, civdocs.com.au</p>
</body>
</html>
`;

  return resend.emails.send({
    from,
    to,
    subject: `Your Risk Assessment Report — ${machineDescription}`,
    html,
  });
}

export async function sendRiskAssessmentNotification({
  firstName,
  companyName,
  email,
  machineDescription,
  reportNumber,
  treatmentsInPlace,
  treatmentsRequired,
}: {
  firstName: string;
  companyName: string;
  email: string;
  machineDescription: string;
  reportNumber: string;
  treatmentsInPlace: number;
  treatmentsRequired: number;
}) {
  const resend = getResend();
  const from = process.env.FROM_EMAIL;
  if (!from) throw new Error('FROM_EMAIL is not set');

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #FF8C32;">New Risk Assessment Generated</h2>
  <p>Someone just created a risk assessment report.</p>
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p style="margin: 5px 0;"><strong>Name:</strong> ${firstName}</p>
    <p style="margin: 5px 0;"><strong>Company:</strong> ${companyName}</p>
    <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
    <p style="margin: 5px 0;"><strong>Machine:</strong> ${machineDescription}</p>
    <p style="margin: 5px 0;"><strong>Report Number:</strong> ${reportNumber}</p>
    <p style="margin: 5px 0;"><strong>Treatments In Place:</strong> ${treatmentsInPlace}</p>
    <p style="margin: 5px 0;"><strong>Treatments Required:</strong> ${treatmentsRequired}</p>
    <p style="margin: 5px 0; margin-top: 12px; color: #666; font-size: 12px;">Generated: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</p>
  </div>
  <p style="color: #666; font-size: 12px;">Automated notification from CivDocs risk assessment generator.</p>
</body>
</html>
`;

  return resend.emails.send({
    from,
    to: NOTIFY_EMAIL,
    subject: `New Risk Assessment: ${machineDescription} — ${companyName}`,
    html,
  });
}

export async function sendRiskAssessmentFollowUpEmail({
  to,
  firstName,
  machineType,
}: {
  to: string;
  firstName: string;
  machineType: string;
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

  <p>Hi ${firstName},</p>

  <p>I saw you generated a machine risk assessment for your <strong>${machineType}</strong> yesterday.</p>

  <p>Hope it was useful.</p>

  <p>I built that tool after years working in civil construction operating plant and seeing how frustrating the whole risk assessment process could be on site.</p>

  <p>One thing some companies end up asking about afterwards is how to <strong>keep track of machines, compliance and paperwork across multiple jobs</strong> without everything turning into spreadsheets and folders.</p>

  <p>That's actually what the full CivDocs platform was built for.</p>

  <p>If you're interested, I'd love to jump on a quick 15-minute call and show you how some civil companies are using it to:</p>

  <ul style="padding-left: 20px;">
    <li style="margin-bottom: 8px;">keep risk assessments organised</li>
    <li style="margin-bottom: 8px;">track machine hours across jobs</li>
    <li style="margin-bottom: 8px;">manage machine compliance in one place</li>
  </ul>

  <p>No pressure — just thought I'd offer since you already generated a report.</p>

  <p>You can book a time here if you'd like:</p>

  <p style="margin: 24px 0;">
    <a href="${BOOK_URL}" style="display: inline-block; background: linear-gradient(to right, #FF8C32, #F5B041); color: white; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: 600;">Book a quick chat</a>
  </p>

  <p>Cheers,<br>Darcy<br>Founder – CivDocs</p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
  <p style="font-size: 11px; color: #999;">You're receiving this because you opted in to tips and updates from CivDocs. — CivDocs, civdocs.com.au</p>
</body>
</html>
`;

  return resend.emails.send({
    from,
    to,
    subject: `Quick follow-up — your ${machineType} risk assessment`,
    html,
    scheduledAt,
  });
}

export async function sendRiskAssessmentSecondNurtureEmail({
  to,
  firstName,
}: {
  to: string;
  firstName: string;
}) {
  const resend = getResend();
  const from = process.env.FROM_EMAIL;
  if (!from) throw new Error('FROM_EMAIL is not set');

  const scheduledAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1E1E1E; line-height: 1.7;">

  <p>Hi ${firstName},</p>

  <p>Just wanted to quickly follow up after you generated the risk assessment the other day.</p>

  <p>A lot of civil companies end up using that tool first, and then realise the bigger headache isn't really the risk assessments.</p>

  <p>It's <strong>keeping track of machines across jobs</strong>.</p>

  <p>Things like:</p>

  <ul style="padding-left: 20px;">
    <li style="margin-bottom: 8px;">machine hours getting written down in notebooks</li>
    <li style="margin-bottom: 8px;">trying to work out which job the machine was actually on</li>
    <li style="margin-bottom: 8px;">chasing timesheets at the end of the week</li>
    <li style="margin-bottom: 8px;">manually turning machine hours into invoices</li>
  </ul>

  <p>That's actually why I built the full CivDocs platform.</p>

  <p>It lets companies track <strong>machine hours, jobs and compliance in one place</strong>, and automatically generate invoices from machine hours that can sync straight into Xero.</p>

  <p>If you're running a few machines across different jobs it can save a lot of admin and make job costing a lot clearer.</p>

  <p>If you want, I'm happy to show you how it works on a quick <strong>15-minute call</strong>.</p>

  <p>You can grab a time here if it's helpful:</p>

  <p style="margin: 24px 0;">
    <a href="${BOOK_URL}" style="display: inline-block; background: linear-gradient(to right, #FF8C32, #F5B041); color: white; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: 600;">Book a quick chat</a>
  </p>

  <p>Cheers,<br>Darcy</p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
  <p style="font-size: 11px; color: #999;">You're receiving this because you opted in to tips and updates from CivDocs. — CivDocs, civdocs.com.au</p>
</body>
</html>
`;

  return resend.emails.send({
    from,
    to,
    subject: `Keeping track of machines across jobs`,
    html,
    scheduledAt,
  });
}
