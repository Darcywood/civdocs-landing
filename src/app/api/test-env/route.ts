import { NextResponse } from "next/server";

export async function GET() {
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? "✅ Set" : "❌ Missing",
    RESEND_API_KEY: process.env.RESEND_API_KEY ? "✅ Set" : "❌ Missing",
    FROM_EMAIL: process.env.FROM_EMAIL ? "✅ Set" : "❌ Missing",
    NODE_ENV: process.env.NODE_ENV || "❌ Missing",
  };

  return NextResponse.json({
    message: "Environment Variables Status",
    variables: envVars,
    timestamp: new Date().toISOString(),
  });
}

