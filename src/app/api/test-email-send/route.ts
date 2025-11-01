import { NextResponse } from "next/server";
import { sendTrialWelcomeEmail } from "@/lib/email";

export async function POST() {
  try {
    console.log("[Test Email Send] Starting email test...");
    
    const result = await sendTrialWelcomeEmail({
      to: "darcy.wood.marketing@gmail.com",
      name: "Test User",
      loginUrl: "https://app.civdocs.com.au/login",
    });
    
    console.log("[Test Email Send] Email result:", result);
    
    return NextResponse.json({
      message: "Email test completed",
      result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Test Email Send] Error:", error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      details: {
        name: error instanceof Error ? error.name : undefined,
        code: (error as { code?: string }).code,
        status: (error as { status?: number }).status,
      }
    }, { status: 500 });
  }
}




