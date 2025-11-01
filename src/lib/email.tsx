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
