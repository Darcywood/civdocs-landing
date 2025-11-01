import { NextResponse } from "next/server";
import { sendTrialWelcomeEmail } from "@/lib/email.tsx";

export async function POST() {
  try {
    console.log("[Test Email Send] Starting email test...");
    
    const result = await sendTrialWelcomeEmail({
      to: "darcy.wood.marketing@gmail.com",
      name: "Test User",
      tempPassword: "test123",
      loginUrl: "https://app.civdocs.com.au/login",
      baseUrl: "https://civdocs.com.au",
    });
    
    console.log("[Test Email Send] Email result:", result);
    
    return NextResponse.json({
      message: "Email test completed",
      result,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[Test Email Send] Error:", error);
    return NextResponse.json({
      error: error.message || "Unknown error",
      stack: error.stack,
      details: {
        name: error.name,
        code: error.code,
        status: error.status,
      }
    }, { status: 500 });
  }
}




