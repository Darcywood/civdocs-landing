import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { generateTempPassword, sendTrialWelcomeEmail, sendAdminSignupNotification } from "@/lib/email";
import {
  SIGNUP_ATTRIBUTION_COOKIE_NAME,
  META_PIXEL_CLICK_COOKIE,
  META_PIXEL_BROWSER_COOKIE,
  GOOGLE_ADS_COOKIE,
  sanitizeAttributionBody,
  classifySignupAcquisitionSource,
  parseAttributionCookie,
  extractHostFromUrl,
} from "@/lib/marketingAttribution";

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

// Valid company types
const VALID_COMPANY_TYPES = ["civil", "plant_hire"] as const;
type CompanyType = (typeof VALID_COMPANY_TYPES)[number];

// Request body interface
interface StartTrialRequest {
  full_name: string;
  email: string;
  company: string;
  plan_type?: string; // Optional - not required during trial signup, only set when subscribing
  company_type: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  terms_and_privacy_accepted: boolean;
  org_acknowledgement_accepted: boolean;
  /** Client localStorage snapshot: gclid, fbclid, utm_*, first landing path, etc. */
  signup_attribution?: unknown;
}

// Document versions (matching web app)
const TERMS_VERSION = '2.0';
const PRIVACY_VERSION = '1.0';

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
    const {
      full_name,
      email,
      company,
      company_type,
      password,
      confirmPassword,
      phone,
      terms_and_privacy_accepted,
      org_acknowledgement_accepted,
      signup_attribution: signupAttributionRaw,
    } = body;

    const cookieStore = await cookies();
    const headerStore = await headers();
    const fromCookie = parseAttributionCookie(cookieStore.get(SIGNUP_ATTRIBUTION_COOKIE_NAME)?.value);
    const fromBody = sanitizeAttributionBody(signupAttributionRaw);

    // Pull Pixel/gtag cookies (set by Meta Pixel and Google gtag on first ad click)
    const fbcCookie = cookieStore.get(META_PIXEL_CLICK_COOKIE)?.value || "";
    const fbpCookie = cookieStore.get(META_PIXEL_BROWSER_COOKIE)?.value || "";
    const gclAwCookie = cookieStore.get(GOOGLE_ADS_COOKIE)?.value || "";

    // Referer of the actual /api/start-trial POST (current page, e.g. /start-trial).
    // If first-touch referrer wasn't stored anywhere, this is the only signal we have.
    const apiReferer = headerStore.get("referer") || "";

    const pixelSignals: Record<string, string> = {};
    if (fbcCookie) pixelSignals._fbc = fbcCookie;
    if (fbpCookie) pixelSignals._fbp = fbpCookie;
    if (gclAwCookie) pixelSignals._gcl_aw = gclAwCookie;

    // Merge precedence: body (live client snapshot) > cookie (server first-touch) > Pixel/gtag cookies
    const merged: Record<string, string> = {
      ...pixelSignals,
      ...fromCookie,
      ...fromBody,
    };

    // Add a fallback referrer_first_host if neither client nor cookie captured one
    if (!merged.referrer_first_host && apiReferer) {
      const host = extractHostFromUrl(apiReferer);
      // Skip self-referrer (the /start-trial page)
      if (host && !host.includes("civdocs.com.au") && !host.includes("localhost")) {
        merged.referrer_first_host = host;
      }
    }

    const attributionSnapshot = sanitizeAttributionBody(merged);
    const signup_acquisition_source = classifySignupAcquisitionSource(attributionSnapshot);

    console.log(`[Trial Signup] ===== ATTRIBUTION DEBUG =====`);
    console.log(`[Trial Signup] Acquisition source: ${signup_acquisition_source}`);
    console.log(`[Trial Signup] From body:`, fromBody);
    console.log(`[Trial Signup] From first-touch cookie:`, fromCookie);
    console.log(`[Trial Signup] Pixel/gtag cookies: _fbc=${fbcCookie ? "yes" : "no"}, _fbp=${fbpCookie ? "yes" : "no"}, _gcl_aw=${gclAwCookie ? "yes" : "no"}`);
    console.log(`[Trial Signup] API referer header: ${apiReferer || "(none)"}`);
    console.log(`[Trial Signup] Final snapshot:`, attributionSnapshot);
    console.log(`[Trial Signup] ===== END ATTRIBUTION DEBUG =====`);

    // ============================================================
    // VALIDATION
    // ============================================================
    console.log(`[Trial Signup] ===== BACKEND DEBUG =====`);
    console.log(`[Trial Signup] Starting trial signup for: ${email}`);
    console.log(`[Trial Signup] Company type received: "${company_type}" (type: ${typeof company_type})`);
    console.log(`[Trial Signup] Valid company types:`, VALID_COMPANY_TYPES);

    // Validate required fields
    if (!full_name || !email || !company || !company_type || !password || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: full_name, email, company, company_type, password, and confirmPassword are required",
        },
        { 
          status: 400,
          headers: getCorsHeaders(),
        }
      );
    }

    // Validate legal acceptances
    if (!terms_and_privacy_accepted || !org_acknowledgement_accepted) {
      return NextResponse.json(
        {
          success: false,
          error: "You must accept all terms and agreements to continue",
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

    // Validate company_type
    if (!VALID_COMPANY_TYPES.includes(company_type as CompanyType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid company_type. Must be one of: ${VALID_COMPANY_TYPES.join(", ")}`,
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
    console.log(`[Trial Signup] Company type being saved to database: "${company_type}"`);
    console.log(`[Trial Signup] Company type as CompanyType: ${company_type as CompanyType}`);

    // Calculate trial expiration date (14 days from now)
    const trialExpiresAt = new Date();
    trialExpiresAt.setDate(trialExpiresAt.getDate() + 14);

    // Convert company_type for database: 'civil' → 'civil_contractor'
    // Database constraint expects 'civil_contractor', not 'civil'
    const dbCompanyType = company_type === 'civil' ? 'civil_contractor' : company_type;

    const orgData = {
      name: company,
      email: email,
      company_type: dbCompanyType, // Use converted value for database constraint
      // plan_type is intentionally NULL during trial - only set when subscribing
      default_view_mode: company_type as CompanyType, // Keep original for view mode
      trial_expires_at: trialExpiresAt.toISOString(),
      created_by: userId, // Set creator immediately
      signup_acquisition_source,
      signup_attribution: attributionSnapshot,
    };
    
    console.log(`[Trial Signup] Organization data being inserted:`, JSON.stringify(orgData, null, 2));
    console.log(`[Trial Signup] Original company_type: "${company_type}"`);
    console.log(`[Trial Signup] Database company_type (converted): "${orgData.company_type}"`);
    console.log(`[Trial Signup] default_view_mode value: "${orgData.default_view_mode}"`);

    const { data: organization, error: orgError } = await supabase
      .from("organizations")
      .insert(orgData)
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
    console.log(`[Trial Signup] Organization company_type saved as: "${organization.company_type}"`);
    console.log(`[Trial Signup] Organization default_view_mode saved as: "${organization.default_view_mode}"`);
    console.log(`[Trial Signup] ===== END BACKEND DEBUG =====`);

    // ============================================================
    // STEP 3: CREATE OR UPDATE PROFILE
    // ============================================================
    console.log(`[Trial Signup] Step 3: Creating/updating profile for user: ${userId}`);

    // Use upsert to handle case where profile already exists (from previous failed signup)
    const { error: profileError } = await supabase
      .from("profiles")
      .upsert({
        id: userId,
        email: email,
        full_name: full_name,
        active_organization_id: orgId,
        role: "admin",
        ...(phone ? { phone } : {}),
      }, {
        onConflict: 'id' // Update if profile with this ID already exists
      })
      .select()
      .single();

    if (profileError) {
      console.error("[Trial Signup] Profile creation/update error:", profileError);
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
    console.log(`[Trial Signup] ✓ Profile created/updated: ${userId}`);

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
    // STEP 5: RECORD LEGAL ACCEPTANCES
    // ============================================================
    console.log(`[Trial Signup] Step 5: Recording legal acceptances`);

    // Record user-level acceptances (Terms & Privacy)
    const userAcceptances = [
      {
        user_id: userId,
        organization_id: null, // NULL for user-level
        document_type: 'terms',
        document_version: TERMS_VERSION,
      },
      {
        user_id: userId,
        organization_id: null, // NULL for user-level
        document_type: 'privacy',
        document_version: PRIVACY_VERSION,
      },
    ];

    const { error: userAcceptancesError } = await supabase
      .from('legal_acceptances')
      .insert(userAcceptances);

    if (userAcceptancesError) {
      console.error("[Trial Signup] User legal acceptances error:", userAcceptancesError);
      // Don't fail signup if legal acceptance recording fails, but log it
      console.warn("[Trial Signup] ⚠️ Failed to record user legal acceptances, but continuing signup");
    } else {
      console.log(`[Trial Signup] ✓ User legal acceptances recorded`);
    }

    // Record organization-level acceptance (Org Acknowledgement)
    const orgAcceptance = {
      user_id: userId,
      organization_id: orgId, // UUID for org-level
      document_type: 'org_ack',
      document_version: TERMS_VERSION, // Uses TERMS_VERSION per web app convention
    };

    const { error: orgAcceptanceError } = await supabase
      .from('legal_acceptances')
      .insert(orgAcceptance);

    if (orgAcceptanceError) {
      console.error("[Trial Signup] Organization acknowledgement error:", orgAcceptanceError);
      // Don't fail signup if legal acceptance recording fails, but log it
      console.warn("[Trial Signup] ⚠️ Failed to record organization acknowledgement, but continuing signup");
    } else {
      console.log(`[Trial Signup] ✓ Organization acknowledgement recorded`);
    }

    // ============================================================
    // STEP 6: SEND WELCOME EMAIL
    // ============================================================
    // Extract first name from full_name
    const firstName = full_name.split(' ')[0];
    
    console.log(`[Trial Signup] Step 6: Sending welcome email to: ${email}`);
    
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
    // STEP 7: NOTIFY ADMIN OF NEW SIGNUP
    // ============================================================
    console.log(`[Trial Signup] Step 7: Sending admin notification`);
    
    try {
      await sendAdminSignupNotification({
        email,
        fullName: full_name,
        company,
        companyType: company_type,
        phone: phone || undefined,
        signupAcquisitionSource: signup_acquisition_source,
        signupAttribution: attributionSnapshot,
      });
      console.log(`[Trial Signup] ✓ Admin notification sent`);
    } catch (emailError) {
      console.error(`[Trial Signup] Failed to send admin notification:`, emailError);
      // Don't fail the trial creation if admin notification fails
    }

    // ============================================================
    // STEP 8: GENERATE MAGIC LINK FOR AUTO-LOGIN
    // ============================================================
    console.log(`[Trial Signup] Step 8: Generating magic link for auto-login`);
    
    // Get web app URL from environment or use default
    const webAppUrl = process.env.NEXT_PUBLIC_WEB_APP_URL || 'https://app.civdocs.com.au';
    const redirectTo = `${webAppUrl}/auth/callback`;
    
    const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
      options: {
        redirectTo: redirectTo,
      },
    });

    let magicLink: string | null = null;
    
    if (linkError || !linkData) {
      console.error("[Trial Signup] Magic link generation error:", linkError);
      console.warn("[Trial Signup] ⚠️ Failed to generate magic link, user will need to log in manually");
      // Don't fail signup if magic link generation fails
    } else {
      magicLink = linkData.properties?.action_link || null;
      if (magicLink) {
        console.log(`[Trial Signup] ✓ Magic link generated successfully`);
      } else {
        console.warn("[Trial Signup] ⚠️ Magic link generated but action_link not found");
      }
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
        success: true,
        message: "Trial created",
        magicLink: magicLink, // Return magic link for auto-login
        organizationId: orgId, // Return organization ID for Meta Pixel tracking
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
