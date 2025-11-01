import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateTempPassword, sendTrialWelcomeEmail } from "@/lib/email";

// Force Node.js runtime for Resend SDK
export const runtime = "nodejs";

// Lazy initialize Supabase to avoid build-time errors
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Supabase environment variables are not set");
  }
  return createClient(url, key);
}

// Valid plan types
const VALID_PLANS = ["bronze", "silver", "gold"] as const;
type PlanType = (typeof VALID_PLANS)[number];

// Request body interface
interface StartTrialRequest {
  full_name: string;
  email: string;
  company: string;
  plan_type: string;
  password: string;
  confirmPassword: string;
}

export async function POST(req: Request) {
  // Track created resources for cleanup on error
  let userId: string | null = null;
  let orgId: string | null = null;
  let profileCreated = false;
  let orgUserCreated = false;

  try {
    // Check if email functions are available
    if (typeof generateTempPassword !== 'function' || typeof sendTrialWelcomeEmail !== 'function') {
      console.error("[Trial Signup] Email functions not available:", {
        generateTempPassword: typeof generateTempPassword,
        sendTrialWelcomeEmail: typeof sendTrialWelcomeEmail
      });
      return NextResponse.json(
        {
          success: false,
          error: "Email service not available. Please try again later.",
        },
        { 
          status: 500,
          headers: getCorsHeaders(),
        }
      );
    }
    // ============================================================
    // ENVIRONMENT VARIABLE VALIDATION
    // ============================================================
    const requiredEnvVars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      FROM_EMAIL: process.env.FROM_EMAIL,
    };

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingVars.length > 0) {
      console.error("[Trial Signup] Missing environment variables:", missingVars);
      return NextResponse.json(
        {
          success: false,
          error: `Missing required environment variables: ${missingVars.join(", ")}`,
        },
        { 
          status: 500,
          headers: getCorsHeaders(),
        }
      );
    }
    // Parse request body
    console.log("[Trial Signup] Parsing request body...");
    const body: StartTrialRequest = await req.json();
    console.log("[Trial Signup] Request body:", body);
    const { full_name, email, company, plan_type, password, confirmPassword } = body;

    // ============================================================
    // VALIDATION
    // ============================================================
    console.log(`[Trial Signup] Starting trial signup for: ${email}`);

    // Validate required fields
    if (!full_name || !email || !company || !plan_type || !password || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: full_name, email, company, plan_type, password, and confirmPassword are required",
        },
        { 
          status: 400,
          headers: getCorsHeaders(),
        }
      );
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "Passwords do not match",
        },
        { 
          status: 400,
          headers: getCorsHeaders(),
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email format",
        },
        { 
          status: 400,
          headers: getCorsHeaders(),
        }
      );
    }

    // Validate plan_type
    if (!VALID_PLANS.includes(plan_type as PlanType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid plan_type. Must be one of: ${VALID_PLANS.join(", ")}`,
        },
        { 
          status: 400,
          headers: getCorsHeaders(),
        }
      );
    }

    // ============================================================
    // STEP 1: CREATE AUTH USER
    // ============================================================
    console.log(`[Trial Signup] Step 1: Creating auth user for: ${email}`);
    const supabase = getSupabase();
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: password,
      email_confirm: true, // Skip email verification for trial
    });

    if (authError || !authUser?.user) {
      console.error("[Trial Signup] Auth user creation error:", authError);
      
      // Handle specific error cases
      if (authError?.code === 'email_exists') {
        return NextResponse.json(
          {
            success: false,
            error: "An account with this email address already exists. Please use a different email or try logging in.",
          },
          { 
            status: 409, // Conflict
            headers: getCorsHeaders(),
          }
        );
      }
      
      return NextResponse.json(
        {
          success: false,
          error: `Failed to create user account: ${authError?.message || "Unknown error"}`,
        },
        { 
          status: 500,
          headers: getCorsHeaders(),
        }
      );
    }

    userId = authUser.user.id;
    console.log(`[Trial Signup] ✓ Auth user created: ${userId}`);

    // ============================================================
    // STEP 2: CREATE ORGANIZATION
    // ============================================================
    console.log(`[Trial Signup] Step 2: Creating organization: ${company}`);

    // Calculate trial expiration date (14 days from now)
    const trialExpiresAt = new Date();
    trialExpiresAt.setDate(trialExpiresAt.getDate() + 14);

    const { data: organization, error: orgError } = await supabase
      .from("organizations")
      .insert({
        name: company,
        email: email,
        plan_type: plan_type as PlanType,
        trial_expires_at: trialExpiresAt.toISOString(),
        created_by: userId, // Set creator immediately
      })
      .select()
      .single();

    if (orgError || !organization) {
      console.error("[Trial Signup] Organization creation error:", orgError);
      await rollbackOnError(userId, null, false, false);
      return NextResponse.json(
        {
          success: false,
          error: `Failed to create organization: ${orgError?.message || "Unknown error"}`,
        },
        { 
          status: 500,
          headers: getCorsHeaders(),
        }
      );
    }

    orgId = organization.id;
    console.log(`[Trial Signup] ✓ Organization created: ${orgId}`);

    // ============================================================
    // STEP 3: CREATE PROFILE
    // ============================================================
    console.log(`[Trial Signup] Step 3: Creating profile for user: ${userId}`);

    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: userId,
        email: email,
        full_name: full_name,
        active_organization_id: orgId,
        role: "admin",
      })
      .select()
      .single();

    if (profileError) {
      console.error("[Trial Signup] Profile creation error:", profileError);
      await rollbackOnError(userId, orgId, false, false);
      return NextResponse.json(
        {
          success: false,
          error: `Failed to create user profile: ${profileError?.message || "Unknown error"}`,
        },
        { 
          status: 500,
          headers: getCorsHeaders(),
        }
      );
    }

    profileCreated = true;
    console.log(`[Trial Signup] ✓ Profile created: ${userId}`);

    // ============================================================
    // STEP 4: CREATE ORGANIZATION USER LINK
    // ============================================================
    console.log(`[Trial Signup] Step 4: Linking user to organization as admin`);

    const { error: orgUserError } = await supabase
      .from("organization_users")
      .insert({
        organization_id: orgId,
        user_id: userId,
        role: "admin",
      });

    if (orgUserError) {
      console.error("[Trial Signup] Organization user link error:", orgUserError);
      await rollbackOnError(userId, orgId, profileCreated, false);
      return NextResponse.json(
        {
          success: false,
          error: `Failed to link user to organization: ${orgUserError?.message || "Unknown error"}`,
        },
        { 
          status: 500,
          headers: getCorsHeaders(),
        }
      );
    }

    orgUserCreated = true;
    console.log(`[Trial Signup] ✓ Organization user link created`);

    // ============================================================
    // STEP 5: SEND WELCOME EMAIL
    // ============================================================
    // Extract first name from full_name
    const firstName = full_name.split(' ')[0];
    
    console.log(`[Trial Signup] Step 5: Sending welcome email to: ${email}`);
    
    try {
      const emailResult = await sendTrialWelcomeEmail({
        to: email,
        name: firstName,
      });
      
      console.log(`[Trial Signup] ✓ Welcome email sent successfully:`, emailResult);
    } catch (emailError) {
      console.error(`[Trial Signup] Failed to send welcome email to ${email}:`, emailError);
      // Don't fail the trial creation if email fails, but log the error
    }

    // ============================================================
    // SUCCESS
    // ============================================================
    console.log(`[Trial Signup] ✅ Trial signup completed successfully for: ${email}`);
    console.log(`[Trial Signup] User ID: ${userId}`);
    console.log(`[Trial Signup] Organization ID: ${orgId}`);
    console.log(`[Trial Signup] Trial expires: ${trialExpiresAt.toISOString()}`);

    return NextResponse.json(
      {
        ok: true,
        message: "Trial created",
      },
      {
        status: 201,
        headers: getCorsHeaders(),
      }
    );

  } catch (err) {
    // Catch any unexpected errors
    console.error("[Trial Signup] Unexpected error:", err);
    console.error("[Trial Signup] Error stack:", err instanceof Error ? err.stack : undefined);
    console.error("[Trial Signup] Error type:", typeof err);
    console.error("[Trial Signup] Error keys:", Object.keys(err || {}));
    
    // Attempt rollback
    await rollbackOnError(userId, orgId, profileCreated, orgUserCreated);
    
    // Better error message handling
    let errorMessage = "An unexpected error occurred";
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === 'string') {
      errorMessage = err;
    } else if (err?.toString) {
      errorMessage = err.toString();
    }
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? {
          type: typeof err,
          message: err instanceof Error ? err.message : undefined,
          stack: err instanceof Error ? err.stack : undefined,
          keys: Object.keys(err || {})
        } : undefined
      },
      { 
        status: 500,
        headers: getCorsHeaders(),
      }
    );
  }
}

// ============================================================
// HELPER: ROLLBACK ON ERROR
// ============================================================
async function rollbackOnError(
  userId: string | null,
  orgId: string | null,
  profileCreated: boolean,
  orgUserCreated: boolean
) {
  console.log("[Rollback] Starting rollback...");
  const supabase = getSupabase();

  // Delete in reverse order of creation
  if (orgUserCreated && userId && orgId) {
    console.log(`[Rollback] Deleting organization_users link (org: ${orgId}, user: ${userId})`);
    const { error } = await supabase
      .from("organization_users")
      .delete()
      .eq("organization_id", orgId)
      .eq("user_id", userId);
    if (error) {
      console.error("[Rollback] Error deleting organization_users:", error);
    } else {
      console.log("[Rollback] ✓ Deleted organization_users link");
    }
  }

  if (profileCreated && userId) {
    console.log(`[Rollback] Deleting profile: ${userId}`);
    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", userId);
    if (error) {
      console.error("[Rollback] Error deleting profile:", error);
    } else {
      console.log("[Rollback] ✓ Deleted profile");
    }
  }

  if (orgId) {
    console.log(`[Rollback] Deleting organization: ${orgId}`);
    const { error } = await supabase
      .from("organizations")
      .delete()
      .eq("id", orgId);
    if (error) {
      console.error("[Rollback] Error deleting organization:", error);
    } else {
      console.log("[Rollback] ✓ Deleted organization");
    }
  }

  if (userId) {
    console.log(`[Rollback] Deleting auth user: ${userId}`);
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) {
      console.error("[Rollback] Error deleting auth user:", error);
    } else {
      console.log("[Rollback] ✓ Deleted auth user");
    }
  }

  console.log("[Rollback] Cleanup complete");
}

// ============================================================
// HELPER: CORS HEADERS
// ============================================================
function getCorsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

// ============================================================
// HANDLE CORS PREFLIGHT REQUESTS
// ============================================================
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: getCorsHeaders(),
    }
  );
}
