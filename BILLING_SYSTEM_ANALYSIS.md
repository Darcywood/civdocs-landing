# CivDocs Billing System - Complete Analysis

## 1. STRIPE LOGIC

### Stripe Initialization
**Files:**
- `src/app/api/checkout/route.ts` (lines 5-13)
- `src/app/api/webhooks/stripe/route.ts` (lines 8-16)
- `src/app/billing/page.tsx` (line 15)

**Implementation:**
- Lazy initialization pattern using `getStripe()` function
- API version: `2025-09-30.clover`
- Environment variable: `STRIPE_SECRET_KEY`
- Public key: `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` (used in client-side)

### API Routes Calling Stripe

#### `/api/checkout` (POST)
**File:** `src/app/api/checkout/route.ts`

**Functionality:**
- Creates/finds Stripe customer by email
- Creates SetupIntent for payment method collection
- Creates subscription with `payment_behavior: 'default_incomplete'`
- Returns `client_secret` and `subscription_id`
- Maps price IDs to plan tiers (bronze/silver/gold)
- Supports both test and production price IDs

**Price ID Mapping:**
```typescript
Bronze: 
  - Test: price_1SInQcEYzJYgVIMo6QFVXlsm
  - Prod: price_1SHeylEYzJYgVIMo4VLSJprk
Silver:
  - Test: price_1SInR7EYzJYgVIMoKHwDNfvf
  - Prod: price_1SHf6nEYzJYgVIMo7tAJ3zbV
Gold:
  - Test: price_1SInRKEYzJYgVIMoLjCRR76o
  - Prod: price_1SHf82EYzJYgVIMo1Vfitt1b
```

#### `/api/webhooks/stripe` (POST)
**File:** `src/app/api/webhooks/stripe/route.ts`

**Handled Events:**
1. `checkout.session.completed` - Updates organization with customer/subscription IDs
2. `customer.subscription.created` - Updates subscription status and period end
3. `customer.subscription.updated` - Updates subscription status and period end
4. `customer.subscription.deleted` - Sets status to 'canceled', clears subscription_id
5. `invoice.payment_succeeded` - Sends tax invoice email with PDF attachment
6. `invoice.payment_failed` - Handler exists but only logs (incomplete)
7. `invoice_payment.paid` - Fetches full invoice and calls payment succeeded handler

**Webhook Secret:** `STRIPE_WEBHOOK_SECRET`

### Subscription Handling

**Subscription Creation:**
- Uses `stripe.subscriptions.create()` with:
  - `payment_behavior: 'default_incomplete'`
  - `payment_settings: { save_default_payment_method: 'on_subscription' }`
  - Metadata: `orgId`, `planTier`
  - No trial period (post-trial activation flow)

**Subscription Status Updates:**
- Handled via webhooks
- Updates Supabase `organizations` table with:
  - `subscription_status`
  - `current_period_end`
  - `stripe_subscription_id`

### Customer Creation Logic

**File:** `src/app/api/checkout/route.ts` (lines 47-60)

**Logic:**
1. Searches for existing customer by email: `stripe.customers.list({ email, limit: 1 })`
2. If found, uses existing customer
3. If not found, creates new customer: `stripe.customers.create({ email })`
4. **Note:** Customer ID is NOT stored in Supabase during checkout (only via webhook)

### Plan Upgrade/Downgrade Logic

**Status:** ❌ **NOT IMPLEMENTED**

- No API route for plan changes
- No logic to update subscription items
- No proration handling
- Webhook handler `handleSubscriptionUpdated` only updates status, not plan tier

**Partial Implementation:**
- `src/app/billing/page.tsx` allows selecting different plans in UI (lines 265-279)
- Plan selection updates local state but doesn't trigger subscription change
- Frontend updates `plan_tier` in Supabase directly (lines 186-189) - **This is incorrect** (should update via Stripe)

### Billing Interval Logic

**Status:** ❌ **NOT IMPLEMENTED**

- All plans are monthly (hardcoded in UI)
- No yearly/annual option
- No billing interval selection
- Price IDs appear to be monthly only (no yearly variants found)

### Code Touching `stripe_customer_id`

**Files:**
1. `src/app/api/webhooks/stripe/route.ts`:
   - Line 338: Updates `stripe_customer_id` from checkout session
   - Line 365: Queries by `stripe_customer_id` in `handleSubscriptionCreated`

2. **Note:** Checkout route does NOT store `stripe_customer_id` - only webhook does

---

## 2. SUPABASE QUERIES RELATED TO BILLING

### Storing `stripe_customer_id`

**File:** `src/app/api/webhooks/stripe/route.ts` (line 338)

**Query:**
```typescript
await supabase
  .from('organizations')
  .update({ stripe_customer_id: session.customer })
  .eq('id', session.metadata.orgId)
```

**When:** Only in `handleCheckoutSessionCompleted` webhook handler

### Storing Subscription Status

**Files:**
- `src/app/api/webhooks/stripe/route.ts`:
  - Line 341: Sets `subscription_status: 'active'` (checkout completed)
  - Line 360: Updates `subscription_status` from Stripe status (subscription created)
  - Line 379: Updates `subscription_status` (subscription updated)
  - Line 398: Sets `subscription_status: 'canceled'` (subscription deleted)

**Fields Updated:**
- `subscription_status` (string)
- `stripe_subscription_id` (string)
- `current_period_end` (timestamp)
- `plan_tier` (string: 'bronze' | 'silver' | 'gold')

### RLS Checks for Billing Pages

**Status:** ❌ **NOT IMPLEMENTED**

- No RLS policies found in codebase
- Billing page uses `NEXT_PUBLIC_SUPABASE_ANON_KEY` (client-side)
- Webhook uses `SUPABASE_SERVICE_ROLE_KEY` (bypasses RLS)
- No authentication checks on `/billing` route

### Tables/Columns with "billing" or "subscription"

**Inferred Schema (from code):**
```sql
organizations (
  id UUID,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan_tier TEXT, -- 'bronze' | 'silver' | 'gold'
  subscription_status TEXT, -- 'active' | 'canceled' | etc.
  current_period_end TIMESTAMPTZ,
  plan_type TEXT, -- Used in start-trial route
  trial_expires_at TIMESTAMPTZ, -- Used in start-trial route
  ...
)
```

**Note:** Actual schema not found in codebase - inferred from usage

---

## 3. BILLING UI

### Billing Page(s)

#### `/billing` (Main Billing Page)
**File:** `src/app/billing/page.tsx`

**Features:**
- Full-page checkout form with Stripe Elements
- Plan selector (Bronze/Silver/Gold) with segmented buttons
- Email input
- Card fields component (`CardFields.tsx`)
- Success state with redirect to app
- Fetches current plan from Supabase using `org_id` query param
- Updates plan in Supabase after successful payment (client-side)
- FAQ section
- Footer with support links

**Dependencies:**
- Uses `@stripe/react-stripe-js` for Stripe Elements
- Uses `CardFields` component for card input
- Requires `org_id` query parameter

#### `/billing/CheckoutForm.tsx` (Standalone Component)
**File:** `src/app/billing/CheckoutForm.tsx`

**Status:** ⚠️ **PARTIALLY USED / DUPLICATE**

- Similar functionality to main billing page
- Uses older `CardElement` (vs `CardNumberElement` in main page)
- Different plan structure (hardcoded array vs object)
- Different success message (mentions 14-day trial)
- **Not imported in main billing page** - appears unused

### Pricing Page

**File:** `src/app/pricing/page.tsx`

**Features:**
- Displays 4 plans: Bronze, Silver, Gold, Enterprise
- "Start Free Trial" buttons (routes to `/start-trial?plan={planId}`)
- Enterprise plan has "Contact Sales" CTA
- FAQ section
- No direct billing integration (routes to trial signup)

### Manage Plan Page

**Status:** ❌ **NOT IMPLEMENTED**

- No `/settings/billing` route
- No `/account/billing` route
- No plan management UI
- No "Manage Billing" buttons found

### Payment Method UI

**File:** `src/app/billing/CardFields.tsx`

**Features:**
- Separate card number field
- Separate expiry field
- Separate CVC field
- Styled with Tailwind
- Used in main billing page

**Alternative:** `CheckoutForm.tsx` uses single `CardElement`

### Invoice UI

**Status:** ❌ **NOT IMPLEMENTED**

- No invoice list page
- No invoice detail page
- No invoice download UI
- Invoices only sent via email (webhook handler)

### Billing Modals or Components

**Status:** ❌ **NOT IMPLEMENTED**

- No modals for plan changes
- No modals for payment method updates
- No modals for cancellation
- No billing portal integration

---

## 4. ROUTES FOR BILLING

### Existing Routes

1. **`/billing`**
   - **File:** `src/app/billing/page.tsx`
   - **Purpose:** Post-trial checkout (add payment method)
   - **Query Params:** `org_id`, `plan` (optional)
   - **Auth:** None (public route)

2. **`/pricing`**
   - **File:** `src/app/pricing/page.tsx`
   - **Purpose:** Display pricing plans
   - **Action:** Routes to `/start-trial`

3. **`/success`**
   - **File:** `src/app/success/page.tsx`
   - **Purpose:** Success page after checkout
   - **Query Params:** `session_id` (not used)
   - **Action:** Auto-redirects to app after 5 seconds

4. **`/start-trial`**
   - **File:** Not found in codebase (likely in main app, not landing)
   - **Purpose:** Trial signup (not billing-related)

5. **`/trial-success`**
   - **File:** Not found in codebase
   - **Purpose:** Trial confirmation (not billing-related)

### API Routes

1. **`/api/checkout`** (POST)
   - Creates Stripe customer, setup intent, and subscription
   - Returns client secret for payment confirmation

2. **`/api/webhooks/stripe`** (POST)
   - Handles Stripe webhook events
   - Updates Supabase with subscription data

3. **`/api/start-trial`** (POST)
   - Creates trial account (not billing-related)
   - Does NOT create Stripe subscription

### Missing Routes

- ❌ `/api/billing/portal` - Customer portal session creation
- ❌ `/api/billing/update-plan` - Plan upgrade/downgrade
- ❌ `/api/billing/payment-method` - Payment method management
- ❌ `/settings/billing` - Billing settings page
- ❌ `/account/billing` - Account billing page

---

## 5. SERVER ACTIONS OR UTILS

### Existing Functions

#### `getPlanTierFromPriceId(priceId: string)`
**File:** `src/app/api/checkout/route.ts` (lines 16-30)

**Purpose:** Maps Stripe price ID to plan tier string
**Returns:** `'bronze' | 'silver' | 'gold' | 'bronze'` (default)

#### `getStripe()`
**Files:** 
- `src/app/api/checkout/route.ts` (lines 5-13)
- `src/app/api/webhooks/stripe/route.ts` (lines 8-16)

**Purpose:** Lazy initialization of Stripe client
**Returns:** Stripe instance

#### `getSupabase()`
**Files:**
- `src/app/billing/page.tsx` (lines 18-25) - Uses anon key
- `src/app/api/webhooks/stripe/route.ts` (lines 19-26) - Uses service role key
- `src/app/api/start-trial/route.ts` (lines 9-16) - Uses service role key

**Purpose:** Lazy initialization of Supabase client
**Returns:** Supabase client instance

### Webhook Handlers

1. **`handleCheckoutSessionCompleted`**
   - Updates organization with customer/subscription IDs
   - Sets plan tier and subscription status

2. **`handleSubscriptionCreated`**
   - Updates subscription status and period end

3. **`handleSubscriptionUpdated`**
   - Updates subscription status and period end (doesn't handle plan changes)

4. **`handleSubscriptionDeleted`**
   - Sets status to 'canceled', clears subscription_id

5. **`handlePaymentSucceeded`**
   - Generates PDF invoice using Puppeteer
   - Sends email with PDF attachment via Resend

6. **`handlePaymentFailed`**
   - Only logs error (incomplete implementation)

### Missing Functions

- ❌ `getUserSubscriptionStatus(userId)` - Get user's subscription
- ❌ `createCheckoutSession(priceId, customerId)` - Standard checkout
- ❌ `createPortalSession(customerId)` - Customer portal
- ❌ `updatePlan(subscriptionId, newPriceId)` - Plan change
- ❌ `cancelSubscription(subscriptionId)` - Cancel subscription
- ❌ `getInvoices(customerId)` - List invoices
- ❌ `updatePaymentMethod(customerId, paymentMethodId)` - Update payment

### Library Files

**File:** `src/lib/email.tsx`
- Contains email utilities (not billing-specific)
- Used by trial signup, not billing

**No billing-specific utilities found in `/lib`**

---

## 6. ENVIRONMENT VARIABLES

### Required Variables

1. **`STRIPE_SECRET_KEY`**
   - Used in: `checkout/route.ts`, `webhooks/stripe/route.ts`
   - Purpose: Server-side Stripe API key

2. **`NEXT_PUBLIC_STRIPE_PUBLIC_KEY`**
   - Used in: `billing/page.tsx` (line 15)
   - Purpose: Client-side Stripe public key for Elements

3. **`STRIPE_WEBHOOK_SECRET`**
   - Used in: `webhooks/stripe/route.ts` (line 28)
   - Purpose: Verify webhook signatures

4. **`NEXT_PUBLIC_SUPABASE_URL`**
   - Used in: `billing/page.tsx`, `webhooks/stripe/route.ts`, `start-trial/route.ts`
   - Purpose: Supabase project URL

5. **`NEXT_PUBLIC_SUPABASE_ANON_KEY`**
   - Used in: `billing/page.tsx`
   - Purpose: Client-side Supabase access

6. **`SUPABASE_SERVICE_ROLE_KEY`**
   - Used in: `webhooks/stripe/route.ts`, `start-trial/route.ts`
   - Purpose: Server-side Supabase access (bypasses RLS)

7. **`RESEND_API_KEY`**
   - Used in: `webhooks/stripe/route.ts` (line 419)
   - Purpose: Send invoice emails

8. **`FROM_EMAIL`** (inferred from email usage)
   - Used in: Email sending (not directly in billing code)
   - Purpose: Sender email address

### Price IDs (Hardcoded)

**Test Price IDs:**
- Bronze: `price_1SInQcEYzJYgVIMo6QFVXlsm`
- Silver: `price_1SInR7EYzJYgVIMoKHwDNfvf`
- Gold: `price_1SInRKEYzJYgVIMoLjCRR76o`

**Production Price IDs:**
- Bronze: `price_1SHeylEYzJYgVIMo4VLSJprk`
- Silver: `price_1SHf6nEYzJYgVIMo7tAJ3zbV`
- Gold: `price_1SHf82EYzJYgVIMo1Vfitt1b`

**Note:** Price IDs are hardcoded in multiple files - should be environment variables

---

## 7. PARTIALLY BUILT / SCAFFOLDED / COMMENTED OUT

### Partially Implemented

1. **Plan Upgrade/Downgrade**
   - UI exists in `billing/page.tsx` (plan selector)
   - Backend logic missing
   - Frontend updates Supabase directly (incorrect)

2. **Payment Failed Handler**
   - Handler exists: `handlePaymentFailed`
   - Only logs error, no action taken
   - No email notifications
   - No account suspension logic

3. **CheckoutForm Component**
   - Standalone component exists
   - Not used in main billing page
   - Different implementation than main page
   - Appears to be legacy/unused code

4. **Invoice Generation**
   - PDF generation implemented (Puppeteer)
   - Email sending implemented (Resend)
   - No UI to view/download invoices
   - Only sent automatically via webhook

### Commented Out / Incomplete

- No commented code found
- All handlers are implemented but some are incomplete

### Scaffolded but Not Used

- `CheckoutForm.tsx` - Component exists but not imported/used

---

## SUMMARY

### ✅ What's Complete

1. **Basic Checkout Flow**
   - Stripe customer creation
   - Payment method collection (SetupIntent)
   - Subscription creation
   - Webhook handling for subscription events

2. **Invoice Generation & Email**
   - PDF invoice generation
   - Email delivery with PDF attachment
   - Tax invoice formatting (AUD)

3. **Webhook Infrastructure**
   - Signature verification
   - Multiple event handlers
   - Supabase updates

4. **UI Components**
   - Billing page with Stripe Elements
   - Card input fields
   - Plan selection UI
   - Success states

### ❌ What's Incomplete

1. **Plan Management**
   - No upgrade/downgrade API
   - No proration handling
   - Frontend directly updates DB (incorrect)

2. **Customer Portal**
   - No Stripe Customer Portal integration
   - No "Manage Billing" functionality
   - No self-service plan changes

3. **Payment Method Management**
   - No API to update payment methods
   - No UI to view/change payment methods
   - No default payment method selection

4. **Invoice Management**
   - No invoice list page
   - No invoice download UI
   - Invoices only sent via email

5. **Billing Intervals**
   - Only monthly plans
   - No yearly/annual option
   - No interval selection

6. **Authentication & Authorization**
   - Billing page is public (no auth)
   - No RLS policies
   - No user verification

7. **Error Handling**
   - Payment failed handler incomplete
   - No retry logic
   - Limited error recovery

### ⚠️ What Needs Attention

1. **Code Duplication**
   - `CheckoutForm.tsx` duplicates billing page logic
   - Price IDs hardcoded in multiple places
   - Plan data duplicated across files

2. **Architecture Issues**
   - Frontend directly updates Supabase (should go through Stripe)
   - No separation between trial and paid flows
   - Mixed concerns (trial signup vs billing)

3. **Data Consistency**
   - Customer ID not stored during checkout (only via webhook)
   - Race conditions possible between checkout and webhook
   - No idempotency handling

4. **Security**
   - Public billing route
   - No rate limiting
   - No input validation on some endpoints

---

## RECOMMENDATIONS

### 1. Unify Billing Architecture

**Create centralized billing utilities:**
```
src/lib/billing/
  ├── stripe.ts          # Stripe client initialization
  ├── subscriptions.ts  # Subscription management
  ├── customers.ts      # Customer management
  ├── invoices.ts        # Invoice handling
  └── types.ts          # TypeScript types
```

**Create API route structure:**
```
src/app/api/billing/
  ├── checkout/route.ts      # Standard checkout
  ├── portal/route.ts        # Customer portal
  ├── plan/route.ts          # Plan changes
  ├── payment-method/route.ts # Payment method updates
  └── invoices/route.ts      # Invoice listing
```

### 2. Implement Missing Features

**Priority 1:**
- Customer Portal integration (`/api/billing/portal`)
- Plan upgrade/downgrade API
- Authentication on billing routes

**Priority 2:**
- Invoice list/download UI
- Payment method management
- Billing settings page

**Priority 3:**
- Yearly billing option
- Proration handling
- Better error recovery

### 3. Fix Architecture Issues

1. **Remove direct Supabase updates from frontend**
   - All billing changes should go through Stripe
   - Use webhooks to sync to Supabase

2. **Add idempotency**
   - Use Stripe idempotency keys
   - Handle race conditions

3. **Separate trial and billing flows**
   - Clear separation of concerns
   - Different routes for different purposes

### 4. Environment Variable Management

**Move hardcoded values to env:**
```env
STRIPE_PRICE_BRONZE_MONTHLY=price_xxx
STRIPE_PRICE_SILVER_MONTHLY=price_xxx
STRIPE_PRICE_GOLD_MONTHLY=price_xxx
STRIPE_PRICE_BRONZE_YEARLY=price_xxx
# etc.
```

### 5. Code Cleanup

1. **Remove unused `CheckoutForm.tsx`** or integrate it
2. **Consolidate plan data** into single source of truth
3. **Add TypeScript types** for all billing entities
4. **Add error boundaries** for better error handling

### 6. Testing & Monitoring

1. **Add webhook testing** (Stripe CLI)
2. **Add logging** for all billing operations
3. **Add monitoring** for failed payments
4. **Add alerts** for subscription issues

---

## CURRENT BILLING ARCHITECTURE

```
┌─────────────────┐
│  Pricing Page   │
│   (/pricing)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Start Trial    │
│  (/start-trial) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐      ┌──────────────┐
│  Trial Expires  │─────▶│  Billing     │
│                 │      │  (/billing)  │
└─────────────────┘      └──────┬───────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │  /api/checkout  │
                        └────────┬────────┘
                                 │
                    ┌────────────┴────────────┐
                    ▼                          ▼
            ┌──────────────┐          ┌──────────────┐
            │   Stripe     │          │  Supabase    │
            │  (Customer,  │          │ (Organizations)│
            │ Subscription)│          │              │
            └──────┬───────┘          └──────┬───────┘
                   │                         │
                   │ Webhooks                │
                   ▼                         │
            ┌──────────────┐                 │
            │/api/webhooks │─────────────────┘
            │  /stripe     │
            └──────────────┘
```

**Issues:**
- Billing page is public (no auth)
- Frontend updates Supabase directly
- No customer portal
- No plan management API

---

## FILE INVENTORY

### Billing-Related Files

1. `src/app/billing/page.tsx` - Main billing page
2. `src/app/billing/CheckoutForm.tsx` - Unused checkout component
3. `src/app/billing/CardFields.tsx` - Card input component
4. `src/app/pricing/page.tsx` - Pricing display page
5. `src/app/success/page.tsx` - Success page
6. `src/app/api/checkout/route.ts` - Checkout API
7. `src/app/api/webhooks/stripe/route.ts` - Webhook handler
8. `src/app/api/start-trial/route.ts` - Trial signup (not billing)
9. `TRIAL_SETUP.md` - Documentation (outdated)

### Dependencies

- `stripe` - Server-side Stripe SDK
- `@stripe/stripe-js` - Client-side Stripe SDK
- `@stripe/react-stripe-js` - React Stripe components
- `@supabase/supabase-js` - Supabase client
- `resend` - Email service
- `puppeteer` - PDF generation

---

**Analysis Date:** 2025-01-27
**Codebase Version:** Based on current file structure
































