import { Resend } from "resend";
import { render } from "@react-email/render";
import crypto from "crypto";
import TrialWelcome from "@/emails/TrialWelcome";

// Lazy initialize Resend to avoid build-time errors
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(apiKey);
}

export function generateTempPassword(length = 14) {
  return crypto.randomBytes(length)
    .toString("base64")
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, length);
}

export async function sendTrialWelcomeEmail({
  to,
  name,
  loginUrl = "https://app.civdocs.com.au/login",
}: {
  to: string;
  name: string;
  loginUrl?: string;
}) {
  console.log("[Email] Rendering email component...");
  
  const html = await render(
    <TrialWelcome
      name={name}
      loginUrl={loginUrl}
    />
  );

  console.log("[Email] HTML rendered, length:", html.length);
  console.log("[Email] HTML type:", typeof html);

  const resend = getResend();
  return resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to,
    subject: "Welcome to CivDocs — Your 14-day trial is ready 🚀",
    html: html as string,
  });
}

export async function sendAdminSignupNotification({
  email,
  fullName,
  company,
  companyType,
}: {
  email: string;
  fullName: string;
  company: string;
  companyType: string;
}) {
  const resend = getResend();
  
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #FF8C32;">🎉 New Trial Signup!</h2>
      <p>Someone just started a free trial on CivDocs.</p>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Name:</strong> ${fullName}</p>
        <p style="margin: 5px 0;"><strong>Company Name:</strong> ${company}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
        <p style="margin: 5px 0;"><strong>Type of Company:</strong> ${companyType === 'civil' ? 'Civil Contractor' : 'Plant Hire Company'}</p>
        <p style="margin: 5px 0;"><strong>Signed up:</strong> ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</p>
      </div>
      
      <p style="color: #666; font-size: 12px;">This is an automated notification from your CivDocs landing page.</p>
    </div>
  `;

  return resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: 'darcy@civdocs.com.au',
    subject: `🚀 New Trial Signup: ${company}`,
    html,
  });
}
