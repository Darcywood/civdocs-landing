import { NextResponse } from "next/server";
import { generateTempPassword, sendTrialWelcomeEmail } from "@/lib/email.tsx";

export async function GET() {
  try {
    console.log("[Test Email] Testing email functions...");
    
    // Test generateTempPassword
    const tempPassword = generateTempPassword();
    console.log("[Test Email] Generated password:", tempPassword);
    
    // Test if functions are available
    const result = {
      generateTempPassword: typeof generateTempPassword,
      sendTrialWelcomeEmail: typeof sendTrialWelcomeEmail,
      passwordGenerated: tempPassword.length > 0,
      passwordLength: tempPassword.length,
    };
    
    return NextResponse.json({
      message: "Email functions test",
      result,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("[Test Email] Error:", error);
    return NextResponse.json({
      error: error.message || "Unknown error",
      stack: error.stack,
    }, { status: 500 });
  }
}

