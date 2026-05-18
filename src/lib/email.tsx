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

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const ACQUISITION_LABEL: Record<string, string> = {
  google_ads: "Google Ads",
  meta_ads: "Meta Ads",
  organic: "Organic / direct",
  other: "Other paid / unknown",
};

export async function sendAdminSignupNotification({
  email,
  fullName,
  company,
  companyType,
  phone,
  signupAcquisitionSource,
  signupAttribution,
}: {
  email: string;
  fullName: string;
  company: string;
  companyType: string;
  phone?: string;
  signupAcquisitionSource?: string;
  signupAttribution?: Record<string, string>;
}) {
  const resend = getResend();

  const sourceKey = signupAcquisitionSource || "organic";
  const sourceDisplay = ACQUISITION_LABEL[sourceKey] || escapeHtml(sourceKey);
  const sourceTechnical = escapeHtml(sourceKey);

  const attrRows =
    signupAttribution && Object.keys(signupAttribution).length > 0
      ? Object.entries(signupAttribution)
          .map(
            ([k, v]) =>
              `<p style="margin: 4px 0; font-size: 13px;"><strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}</p>`
          )
          .join("")
      : '<p style="margin: 4px 0; font-size: 13px; color: #666;">No campaign parameters captured (direct or older browser).</p>';
  
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #FF8C32;">🎉 New Trial Signup!</h2>
      <p>Someone just started a free trial on CivDocs.</p>

      <div style="background: linear-gradient(135deg, #fff5eb 0%, #ffe8d6 100%); border: 2px solid #FF8C32; border-radius: 12px; padding: 16px 20px; margin: 20px 0;">
        <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #9a3412;">Signup source</p>
        <p style="margin: 0; font-size: 22px; font-weight: 700; color: #1a1a1a;">${sourceDisplay}</p>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #64748b;">Stored value: <code style="background: #fff; padding: 2px 6px; border-radius: 4px;">${sourceTechnical}</code> — use for CRM / reporting (Meta ads, Google Ads, organic, or other paid).</p>
      </div>
      
      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p style="margin: 5px 0;"><strong>Company Name:</strong> ${escapeHtml(company)}</p>
        <p style="margin: 5px 0;"><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p style="margin: 5px 0;"><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ''}
        <p style="margin: 5px 0;"><strong>Type of Company:</strong> ${companyType === 'civil' ? 'Civil Contractor' : 'Plant Hire Company'}</p>
        <p style="margin: 5px 0;"><strong>Signed up:</strong> ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}</p>
      </div>

      <div style="background: #fff8f0; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #ffe4cc;">
        <p style="margin: 0 0 8px 0; font-weight: 600; color: #1a1a1a;">Attribution snapshot</p>
        ${attrRows}
      </div>
      
      <p style="color: #666; font-size: 12px;">This is an automated notification from your CivDocs landing page.</p>
    </div>
  `;

  const subjectCompany = company.replace(/[\r\n]+/g, " ").trim().slice(0, 80);

  return resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: 'darcy@civdocs.com.au',
    subject: `🚀 New trial: ${subjectCompany} — ${sourceDisplay}`,
    html,
  });
}
