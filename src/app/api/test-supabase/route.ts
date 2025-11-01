import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    // Test 1: Check if environment variables are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set in .env.local");
    }
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set in .env.local");
    }

    // Test 2: Try to query the organizations table
    const { data, error } = await supabase
      .from("organizations")
      .select("*")
      .limit(1);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "✅ Supabase connection successful!",
      details: {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        tableExists: true,
        sampleRowCount: data?.length || 0,
      },
      sample: data,
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Supabase test error:", errorMessage);
    return NextResponse.json({
      success: false,
      message: "❌ Supabase connection failed",
      error: errorMessage,
      hint: (err instanceof Error && err.message.includes("relation")) 
        ? "The 'organizations' table may not exist. Run the SQL from TRIAL_SETUP.md to create it."
        : "Check your NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local",
    }, { status: 500 });
  }
}





