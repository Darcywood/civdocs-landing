import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import PasswordReset from "@/emails/PasswordReset";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
    const resetUrl = `https://civdocs.com.au/reset-password?access_token=${data?.access_token}&type=recovery`;

    const html = await render(
      <PasswordReset
        name={name || "User"}
        resetUrl={resetUrl}
        baseUrl={process.env.NEXT_PUBLIC_APP_BASE_URL || "https://civdocs.com.au"}
      />
    );

    const result = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: email,
      subject: "Reset your CivDocs password",
      html: html as string,
    });

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    console.error("Error sending password reset email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
