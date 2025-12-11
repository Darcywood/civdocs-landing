# SIGNUP FLOW ANALYSIS

## 1. WHERE DOES USER SIGNUP HAPPEN?

### 1.1 Signup Location

**URL:** `/start-trial` (relative path on the landing website)

**Full URL:** `https://[your-landing-domain]/start-trial`

**File Path:** `src/app/start-trial/page.tsx`

### 1.2 Form Type

- **Standalone Next.js form** (client-side React component)
- Uses Next.js App Router with `'use client'` directive
- Form submission handled via client-side fetch to API route

### 1.3 Authentication Method

- **Uses Supabase Auth API directly** via service role key
- Uses `supabase.auth.admin.createUser()` (admin API, not client-side)
- **NOT** using Supabase client-side auth helpers
- Email verification is **skipped** (`email_confirm: true`)

---

## 2. WHAT HAPPENS AFTER SIGNUP?

### 2.1 API Route

**File:** `src/app/api/start-trial/route.ts`

**Endpoint:** `POST /api/start-trial`

### 2.2 Step-by-Step Process

The signup process creates the following in this exact order:

#### **Step 1: Create Supabase Auth User**
- **Method:** `supabase.auth.admin.createUser()`
- **Creates:**
  - Auth user in Supabase `auth.users` table
  - Email: from form
  - Password: from form (user-provided)
  - Email confirmed: `true` (skips verification)
- **User ID:** Stored in `userId` variable

**Code Location:** Lines 198-234 in `src/app/api/start-trial/route.ts`

```typescript
const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
  email,
  password: password,
  email_confirm: true, // Skip email verification for trial
});
```

#### **Step 2: Create Organization**
- **Table:** `organizations`
- **Creates:**
  - `name`: Company name from form
  - `email`: User's email
  - `plan_type`: Selected plan (bronze/silver/gold)
  - `default_view_mode`: Company type (civil/plant_hire)
  - `trial_expires_at`: **14 days from now** (calculated)
  - `created_by`: User ID from Step 1
- **Organization ID:** Stored in `orgId` variable

**Code Location:** Lines 245-274 in `src/app/api/start-trial/route.ts`

```typescript
const trialExpiresAt = new Date();
trialExpiresAt.setDate(trialExpiresAt.getDate() + 14);

const { data: organization, error: orgError } = await supabase
  .from("organizations")
  .insert({
    name: company,
    email: email,
    plan_type: plan_type as PlanType,
    default_view_mode: company_type as CompanyType,
    trial_expires_at: trialExpiresAt.toISOString(),
    created_by: userId,
  })
```

#### **Step 3: Create User Profile**
- **Table:** `profiles`
- **Creates/Updates:**
  - `id`: User ID (same as auth user ID)
  - `email`: User's email
  - `full_name`: From form
  - `active_organization_id`: Organization ID from Step 2
  - `role`: "admin"

**Code Location:** Lines 279-346 in `src/app/api/start-trial/route.ts`

```typescript
const { error: profileError } = await supabase
  .from("profiles")
  .insert({
    id: userId,
    email: email,
    full_name: full_name,
    active_organization_id: orgId,
    role: "admin",
  })
```

#### **Step 4: Link User to Organization**
- **Table:** `organization_users`
- **Creates:**
  - `organization_id`: Organization ID
  - `user_id`: User ID
  - `role`: "admin"

**Code Location:** Lines 353-377 in `src/app/api/start-trial/route.ts`

```typescript
const { error: orgUserError } = await supabase
  .from("organization_users")
  .insert({
    organization_id: orgId,
    user_id: userId,
    role: "admin",
  });
```

#### **Step 5: Send Welcome Email**
- **Service:** Resend (via `sendTrialWelcomeEmail()`)
- **Email Template:** `src/emails/TrialWelcome.tsx`
- **Content:** Welcome message with login instructions
- **Non-blocking:** If email fails, signup still succeeds

**Code Location:** Lines 385-397 in `src/app/api/start-trial/route.ts`

---

## 3. WHAT IS **NOT** CREATED

### ❌ Stripe Customer
- **NO** Stripe customer is created during signup
- No Stripe API calls in the signup flow
- No `stripe_customer_id` field set

### ❌ Subscription
- **NO** subscription is created
- No Stripe subscription setup
- No subscription status tracking

### ✅ Trial Dates
- **YES** - `trial_expires_at` is set on the organization
- **Value:** 14 days from signup date
- **Format:** ISO string timestamp

---

## 4. FORM DATA COLLECTED

The signup form collects:
- `full_name` (string)
- `email` (string)
- `company` (string) - Company name
- `plan_type` (string) - "bronze" | "silver" | "gold"
- `company_type` (string) - "civil" | "plant_hire"
- `password` (string)
- `confirmPassword` (string)

---

## 5. SUCCESS FLOW

After successful signup:
1. API returns `{ ok: true, message: "Trial created" }`
2. Frontend redirects to: `/trial-success?email={email}`
3. Success page shows confirmation message
4. Welcome email is sent (async, non-blocking)

**Success Page:** `src/app/trial-success/page.tsx`

---

## 6. ERROR HANDLING & ROLLBACK

The API includes comprehensive rollback logic:
- If any step fails, previous steps are rolled back
- Deletes created records in reverse order:
  1. `organization_users` link
  2. `profiles` record
  3. `organizations` record
  4. `auth.users` record

**Rollback Function:** Lines 460-521 in `src/app/api/start-trial/route.ts`

---

## 7. IMPORTANT NOTES

### Separate App Signup
- Many pages link to `https://app.civdocs.com/auth/signup`
- This appears to be a **different application** (the main app)
- The landing site signup (`/start-trial`) is separate from the app signup

### No Billing Integration
- Signup is **trial-only**
- No credit card collection
- No Stripe integration during signup
- Billing happens later (presumably after trial)

### Database Tables Used
1. `auth.users` (Supabase Auth)
2. `organizations`
3. `profiles`
4. `organization_users`

---

## 8. EXACT CODE REFERENCES

### Signup Form
- **File:** `src/app/start-trial/page.tsx`
- **Lines 31-69:** Form submission handler
- **Lines 126-328:** Form JSX

### Signup API
- **File:** `src/app/api/start-trial/route.ts`
- **Lines 37-455:** Main POST handler
- **Lines 198-234:** Auth user creation
- **Lines 245-274:** Organization creation
- **Lines 279-346:** Profile creation
- **Lines 353-377:** Organization user link
- **Lines 385-397:** Email sending

---

## SUMMARY

**Signup URL:** `/start-trial`  
**Form Type:** Next.js client component  
**Auth Method:** Supabase Admin API  
**Creates:**
- ✅ Supabase Auth User
- ✅ Organization row (with trial_expires_at)
- ✅ Profile row
- ✅ Organization-User link
- ❌ **NO** Stripe Customer
- ❌ **NO** Subscription
- ✅ Trial dates (14 days)















