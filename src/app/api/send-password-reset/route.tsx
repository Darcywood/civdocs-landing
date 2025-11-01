import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import PasswordReset from "@/emails/PasswordReset";
import { createClient } from "@supabase/supabase-js";

// Lazy initialize Resend to avoid build-time errors
function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(apiKey);
}

// Lazy initialize Supabase to avoid build-time errors
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase environment variables are not set");
  }
  return createClient(url, key);
}

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Generate the actual Supabase reset URL
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://civdocs.com.au/reset-password',
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Use the actual reset URL from Supabase
    const resetUrl = `https://civdocs.com.au/reset-password?access_token=${(data as { access_token?: string })?.access_token || ''}&type=recovery`;

    const html = await render(
      <PasswordReset
        name={name || "User"}
        resetUrl={resetUrl}
      />
    );

    const resend = getResend();
    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: "Reset your CivDocs password",
      html: html as string,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
