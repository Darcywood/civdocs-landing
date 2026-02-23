import { Resend } from 'resend';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error('RESEND_API_KEY is not set');
  return new Resend(apiKey);
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://civdocs.com.au';
const BOOK_URL = `${BASE_URL}/book`;

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
  <p style="font-size: 14px;"><strong>Next step</strong></p>
  <ul>
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
    <a href="${BOOK_URL}" style="display: inline-block; background: linear-gradient(to right, #FF8C32, #F5B041); color: white; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: 600;">Book a quick chat</a>
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

export async function sendCapabilitySecondNurtureEmail({
  to,
  firstName,
}: {
  to: string;
  firstName: string;
}) {
  const resend = getResend();
  const from = process.env.FROM_EMAIL;
  if (!from) throw new Error('FROM_EMAIL is not set');

  // 48 hours after the first nurture (24h + 48h = 72h from generation)
  const scheduledAt = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString();

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #1E1E1E; line-height: 1.7;">

  <p>Hey ${firstName},</p>

  <p><strong>THIS is how small civil contractors stop jobs quietly bleeding margin.</strong></p>

  <p>Not by working harder.</p>

  <p>Not by hiring more admin.</p>

  <p>Not by building bigger spreadsheets.</p>

  <p>But by fixing one simple thing:</p>

  <p><strong>How information moves from site to office.</strong></p>

  <p>Look — we don't know your business.</p>

  <p>We don't know your crew.</p>

  <p>We don't know your jobs.</p>

  <p>But we DO know this:</p>

  <p>Labour creeps.<br>
  Plant runs longer than planned.<br>
  Materials add up quietly.<br>
  Payroll mistakes happen.</p>

  <p>And by the time you see it…</p>

  <p>The money's already spent.</p>

  <p>That's the issue.</p>

  <p>Not supervision.</p>

  <p><strong>Timing.</strong></p>

  <p>Most civil teams review numbers weekly.</p>

  <p>But jobs move daily.</p>

  <p>So while some contractors are:</p>

  <p>Chasing paper timesheets every Thursday.<br>
  Trying to remember what happened three weeks ago.<br>
  Rebuilding documents from scratch every tender.<br>
  Hoping margins are "probably fine."</p>

  <p>The ones who've fixed the information gap are:</p>

  <p>Seeing hours as they're logged.<br>
  Approving timesheets without retyping anything.<br>
  Clicking into a cost code and seeing exactly what made up the number.<br>
  Pulling real job data into the next quote instead of relying on memory.</p>

  <p>No paper trail.</p>

  <p>No Excel heroics.</p>

  <p>No end-of-month surprises.</p>

  <p>Just clearer numbers, earlier.</p>

  <p>We've seen it turn:</p>

  <p>Payroll from chaos into a clean workflow.<br>
  Cost reporting from a total number into something you can actually learn from.<br>
  And quoting from guesswork into something far more confident.</p>

  <p>It's not flashy.</p>

  <p>It's not "AI magic."</p>

  <p>It's just site records, timesheets, plant logs and costs connected properly.</p>

  <p>If you want to see how that would look inside your business…</p>

  <p>And whether it actually makes sense for how you run jobs…</p>

  <p>Book a quick, no-pressure chat.</p>

  <p>We'll walk through your setup.</p>

  <p>And if it's not right, that's fine.</p>

  <p style="margin: 24px 0;">
    <a href="${BOOK_URL}" style="display: inline-block; background: linear-gradient(to right, #FF8C32, #F5B041); color: white; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: 600;">See If It's a Fit</a>
  </p>

  <p>Cheers,<br>Darcy</p>

  <p style="font-size: 14px; color: #666; font-style: italic;">P.S. Most jobs don't blow out from one big mistake.<br>They drift.<br>This is about catching drift earlier.</p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
  <p style="font-size: 11px; color: #999;">You're receiving this because you opted in to tips and updates from CivDocs. — CivDocs, civdocs.com.au</p>
</body>
</html>
`;

  return resend.emails.send({
    from,
    to,
    subject: `How small civil contractors stop jobs quietly bleeding margin`,
    html,
    scheduledAt,
  });
}

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'darcy@civdocs.com.au';

export async function sendCapabilityStatementNotification({
  firstName,
  businessName,
  email,
  personOfInterest1,
}: {
  firstName: string;
  businessName: string;
  email: string;
  personOfInterest1: string | null;
}) {
  const resend = getResend();
  const from = process.env.FROM_EMAIL;
  if (!from) throw new Error('FROM_EMAIL is not set');

  const poiLine = personOfInterest1 ? `<p style="margin: 5px 0;"><strong>Person of interest 1:</strong> ${personOfInterest1}</p>` : '';

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #FF8C32;">New Capability Statement Generated</h2>
  <p>Someone just created a capability statement.</p>
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p style="margin: 5px 0;"><strong>Name:</strong> ${firstName}</p>
    <p style="margin: 5px 0;"><strong>Company name:</strong> ${businessName}</p>
    <p style="margin: 5px 0;"><strong>Contact email:</strong> ${email}</p>
    ${poiLine}
    <p style="margin: 5px 0; margin-top: 12px; color: #666; font-size: 12px;">Generated: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</p>
  </div>
  <p style="color: #666; font-size: 12px;">Automated notification from CivDocs capability statement generator.</p>
</body>
</html>
`;

  return resend.emails.send({
    from,
    to: NOTIFY_EMAIL,
    subject: `New Capability Statement: ${businessName}`,
    html,
  });
}
