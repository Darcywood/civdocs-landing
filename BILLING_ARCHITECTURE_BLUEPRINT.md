# CivDocs Billing System - Complete Architecture Blueprint

## 1. BILLING ARCHITECTURE BLUEPRINT

### 1.1 Target Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  /pricing          →  Display plans, route to trial/billing     │
│  /billing          →  Post-trial checkout (authenticated)      │
│  /settings/billing →  Billing management (authenticated)       │
│  /billing/success  →  Checkout success confirmation            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API ROUTE LAYER                            │
├─────────────────────────────────────────────────────────────────┤
│  /api/billing/checkout      →  Create checkout session          │
│  /api/billing/portal        →  Create customer portal session  │
│  /api/billing/plan          →  Update subscription plan         │
│  /api/billing/payment       →  Update payment method            │
│  /api/billing/invoices      →  List/download invoices          │
│  /api/billing/subscription  →  Get subscription status         │
│  /api/webhooks/stripe       →  Stripe webhook handler          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      UTILITY LAYER                              │
├─────────────────────────────────────────────────────────────────┤
│  /lib/billing/stripe.ts     →  Stripe client initialization     │
│  /lib/billing/subscriptions.ts →  Subscription operations      │
│  /lib/billing/customers.ts  →  Customer operations              │
│  /lib/billing/invoices.ts   →  Invoice operations              │
│  /lib/billing/types.ts      →  TypeScript types                 │
│  /lib/billing/constants.ts  →  Price IDs, plan configs          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                            │
├─────────────────────────────────────────────────────────────────┤
│  Stripe API        →  Source of truth for subscriptions         │
│  Supabase          →  Cache/sync layer (updated via webhooks)   │
│  Resend            →  Invoice email delivery                     │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 File/Folder Structure

```
src/
├── app/
│   ├── api/
│   │   ├── billing/
│   │   │   ├── checkout/
│   │   │   │   └── route.ts          # POST: Create checkout session
│   │   │   ├── portal/
│   │   │   │   └── route.ts          # POST: Create portal session
│   │   │   ├── plan/
│   │   │   │   └── route.ts          # PATCH: Update subscription plan
│   │   │   ├── payment/
│   │   │   │   └── route.ts          # PATCH: Update payment method
│   │   │   ├── invoices/
│   │   │   │   ├── route.ts          # GET: List invoices
│   │   │   │   └── [id]/
│   │   │   │       └── route.ts      # GET: Download invoice PDF
│   │   │   └── subscription/
│   │   │       └── route.ts          # GET: Get subscription status
│   │   └── webhooks/
│   │       └── stripe/
│   │           └── route.ts          # POST: Webhook handler (existing)
│   │
│   ├── billing/
│   │   ├── page.tsx                  # Post-trial checkout (refactor)
│   │   ├── success/
│   │   │   └── page.tsx              # Checkout success page
│   │   └── components/
│   │       ├── CheckoutForm.tsx      # Consolidated checkout form
│   │       ├── PlanSelector.tsx      # Reusable plan selector
│   │       └── PaymentMethodForm.tsx # Payment method input
│   │
│   ├── settings/
│   │   └── billing/
│   │       ├── page.tsx              # Billing management dashboard
│   │       └── components/
│   │           ├── SubscriptionCard.tsx
│   │           ├── PlanCard.tsx
│   │           ├── PaymentMethodCard.tsx
│   │           ├── InvoiceList.tsx
│   │           └── BillingPortalButton.tsx
│   │
│   └── pricing/
│       └── page.tsx                  # Keep as-is (display only)
│
└── lib/
    └── billing/
        ├── index.ts                  # Public API exports
        ├── stripe.ts                 # Stripe client initialization
        ├── subscriptions.ts          # Subscription operations
        ├── customers.ts              # Customer operations
        ├── invoices.ts               # Invoice operations
        ├── portal.ts                 # Portal operations
        ├── types.ts                  # TypeScript types
        ├── constants.ts              # Price IDs, plan configs
        └── utils.ts                  # Helper functions
```

### 1.3 API Routes vs Server Actions vs Client

#### API Routes (Server-Side Only)
**Purpose:** Handle sensitive operations, interact with Stripe, update database

**Files:**
- `/api/billing/*` - All billing operations
- `/api/webhooks/stripe` - Webhook handler

**Responsibilities:**
- Stripe API calls
- Supabase updates (via webhooks or after Stripe operations)
- Authentication/authorization checks
- Idempotency handling
- Error handling and logging

#### Server Actions (Future Consideration)
**Not currently used, but could be for:**
- Form submissions that need server-side processing
- Revalidation of cached data
- Currently: All operations use API routes (acceptable)

#### Client Components
**Purpose:** UI only, no direct Stripe/Supabase access

**Responsibilities:**
- Display subscription status (fetched from API)
- Form inputs and validation
- User interactions
- Redirect to Stripe Checkout/Portal URLs
- Display invoices (fetched from API)

**What Client Should NOT Do:**
- ❌ Direct Stripe API calls
- ❌ Direct Supabase updates for billing data
- ❌ Store payment methods client-side
- ❌ Calculate pricing/proration

### 1.4 Stripe ↔ Supabase Interaction Flow

#### Principle: Stripe is Source of Truth

```
┌─────────────────────────────────────────────────────────────┐
│                    STRIPE (Source of Truth)                  │
│  - Customers                                                │
│  - Subscriptions                                            │
│  - Payment Methods                                          │
│  - Invoices                                                │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ Webhooks (Primary Sync Method)
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              /api/webhooks/stripe (route.ts)                 │
│  - Verifies webhook signature                               │
│  - Routes to appropriate handler                             │
│  - Updates Supabase based on Stripe event                   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ Updates
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              SUPABASE (Cache/Sync Layer)                     │
│  organizations table:                                        │
│  - stripe_customer_id (from Stripe)                          │
│  - stripe_subscription_id (from Stripe)                      │
│  - plan_tier (from Stripe subscription metadata)              │
│  - subscription_status (from Stripe status)                 │
│  - current_period_end (from Stripe subscription)            │
│  - billing_email (from Stripe customer)                     │
└─────────────────────────────────────────────────────────────┘
```

#### Webhook Event → Supabase Update Mapping

| Stripe Event | Handler | Supabase Update |
|-------------|---------|----------------|
| `checkout.session.completed` | `handleCheckoutSessionCompleted` | Set customer_id, subscription_id, plan_tier, status='active' |
| `customer.subscription.created` | `handleSubscriptionCreated` | Set subscription_id, status, current_period_end |
| `customer.subscription.updated` | `handleSubscriptionUpdated` | Update status, current_period_end, plan_tier (if changed) |
| `customer.subscription.deleted` | `handleSubscriptionDeleted` | Set status='canceled', clear subscription_id |
| `invoice.payment_succeeded` | `handlePaymentSucceeded` | Send invoice email (no DB update needed) |
| `invoice.payment_failed` | `handlePaymentFailed` | Update status='past_due', send notification |
| `customer.subscription.trial_will_end` | `handleTrialWillEnd` | Send reminder email (no DB update) |

#### When API Routes Can Update Supabase

**Allowed:**
- After successful Stripe operation (with idempotency)
- As fallback if webhook fails (with retry logic)
- Initial customer creation (before webhook fires)

**Not Allowed:**
- Frontend directly updating billing fields
- Updates without corresponding Stripe operation
- Race conditions (always use webhooks as primary)

### 1.5 Flow Separation: Trial → Paid → Management

#### Flow 1: Trial Signup (No Billing)
```
User → /pricing → /start-trial → /api/start-trial
  → Creates Supabase org (trial_expires_at set)
  → NO Stripe customer created
  → User gets 14-day trial
```

**Files:**
- `/app/pricing/page.tsx` (display)
- `/app/start-trial/page.tsx` (signup form)
- `/app/api/start-trial/route.ts` (creates org, no Stripe)

**Key:** This flow does NOT touch billing system.

#### Flow 2: Trial → Paid Conversion
```
Trial expires → User redirected to /billing
  → User selects plan → Enters payment method
  → /api/billing/checkout → Creates Stripe customer + subscription
  → Stripe webhook → Updates Supabase org
  → User redirected to /billing/success
```

**Files:**
- `/app/billing/page.tsx` (checkout form)
- `/app/api/billing/checkout/route.ts` (creates Stripe subscription)
- `/app/api/webhooks/stripe/route.ts` (updates Supabase)
- `/app/billing/success/page.tsx` (confirmation)

**Key:** This is the ONLY place where billing starts. Webhook updates Supabase.

#### Flow 3: Billing Management (Post-Paid)
```
User → /settings/billing
  → View subscription status (from API)
  → Change plan → /api/billing/plan → Updates Stripe
  → Update payment → /api/billing/payment → Updates Stripe
  → Manage billing → /api/billing/portal → Stripe Portal
  → View invoices → /api/billing/invoices → Lists from Stripe
```

**Files:**
- `/app/settings/billing/page.tsx` (dashboard)
- `/app/api/billing/plan/route.ts` (plan changes)
- `/app/api/billing/payment/route.ts` (payment updates)
- `/app/api/billing/portal/route.ts` (portal session)
- `/app/api/billing/invoices/route.ts` (invoice list)
- `/app/api/billing/subscription/route.ts` (status check)

**Key:** All operations go through Stripe. Webhooks sync to Supabase.

### 1.6 Data Flow Principles

1. **Stripe First:** All billing operations must go through Stripe API
2. **Webhook Sync:** Supabase updates happen via webhooks (primary) or API fallback (secondary)
3. **Read from Supabase:** Client reads subscription status from Supabase (cached)
4. **Write to Stripe:** Client writes billing changes to Stripe (via API routes)
5. **Idempotency:** All Stripe operations use idempotency keys
6. **Eventual Consistency:** Accept that Supabase may lag behind Stripe by seconds

---

## 2. GAP ANALYSIS

### 2.1 What's Missing

#### Critical Missing Features
1. **Customer Portal Integration**
   - No `/api/billing/portal` route
   - No way for users to self-manage billing
   - Users can't cancel/update without support

2. **Plan Management API**
   - No `/api/billing/plan` route
   - No upgrade/downgrade functionality
   - No proration handling

3. **Payment Method Management**
   - No `/api/billing/payment` route
   - No way to update payment methods
   - No way to view saved payment methods

4. **Invoice Management**
   - No `/api/billing/invoices` route
   - No invoice list/download UI
   - Invoices only sent via email

5. **Subscription Status API**
   - No `/api/billing/subscription` route
   - Frontend reads directly from Supabase (should use API)

6. **Billing Settings Page**
   - No `/settings/billing` route
   - No centralized billing management UI

7. **Authentication on Billing Routes**
   - `/billing` is public (should require auth)
   - No user verification
   - No org ownership checks

8. **Yearly Billing Option**
   - Only monthly plans exist
   - No annual pricing
   - No interval selection

### 2.2 What's Wrong

#### Critical Issues
1. **Frontend Directly Updates Supabase**
   - `billing/page.tsx` line 186-189: Updates `plan_tier` directly
   - Should update Stripe subscription, let webhook update Supabase
   - **Risk:** Data inconsistency, race conditions

2. **No Idempotency Handling**
   - Checkout route doesn't use idempotency keys
   - Risk of duplicate subscriptions on retries
   - **Risk:** Double charges, data corruption

3. **Public Billing Route**
   - `/billing` has no authentication
   - Anyone can access checkout page
   - **Risk:** Security vulnerability, unauthorized access

4. **Customer ID Not Stored During Checkout**
   - Checkout creates customer but doesn't store ID
   - Only stored via webhook (race condition possible)
   - **Risk:** Lost customer if webhook fails

5. **Incomplete Payment Failed Handler**
   - `handlePaymentFailed` only logs error
   - No account suspension
   - No email notifications
   - **Risk:** Users continue using service without payment

6. **Hardcoded Price IDs**
   - Price IDs in multiple files
   - Test/prod mixed in same code
   - **Risk:** Wrong environment, hard to maintain

7. **No Error Recovery**
   - If webhook fails, no retry mechanism
   - If API fails, no fallback
   - **Risk:** Data loss, inconsistent state

### 2.3 What's Duplicated

1. **CheckoutForm Component**
   - `billing/CheckoutForm.tsx` exists but unused
   - Duplicates logic in `billing/page.tsx`
   - Different implementations (CardElement vs CardNumberElement)

2. **Plan Data**
   - Plans defined in `billing/page.tsx`
   - Plans defined in `billing/CheckoutForm.tsx`
   - Plans defined in `pricing/page.tsx`
   - Price IDs in `checkout/route.ts`
   - **Should be:** Single source of truth in `/lib/billing/constants.ts`

3. **Stripe Initialization**
   - `getStripe()` in `checkout/route.ts`
   - `getStripe()` in `webhooks/stripe/route.ts`
   - **Should be:** Single function in `/lib/billing/stripe.ts`

4. **Supabase Initialization**
   - `getSupabase()` in multiple files
   - Different keys (anon vs service role)
   - **Should be:** Centralized with proper key selection

5. **Price ID to Plan Mapping**
   - `getPlanTierFromPriceId()` in `checkout/route.ts`
   - Hardcoded in multiple places
   - **Should be:** In `/lib/billing/constants.ts`

### 2.4 What's Built Incorrectly

1. **Checkout Flow Architecture**
   - Uses SetupIntent + Subscription (complex)
   - Should use Checkout Session (simpler, more reliable)
   - Current approach is error-prone

2. **Plan Selection in Checkout**
   - User can change plan during checkout
   - Should lock plan based on trial or current subscription
   - Plan changes should be separate flow

3. **Success Page Logic**
   - `/success` page doesn't verify payment
   - Just redirects after countdown
   - Should verify subscription status

4. **Webhook Handler Structure**
   - All handlers in one file (fine)
   - But no error recovery
   - No idempotency checks
   - No logging/monitoring

5. **Invoice Generation**
   - PDF generated on every payment
   - Should be cached or generated on-demand
   - No way to regenerate if email fails

### 2.5 Security Issues

1. **Public Billing Route**
   - `/billing` accessible without auth
   - Anyone can attempt checkout
   - **Fix:** Add authentication middleware

2. **No Rate Limiting**
   - API routes have no rate limits
   - Vulnerable to abuse
   - **Fix:** Add rate limiting middleware

3. **No Input Validation**
   - Some endpoints don't validate input
   - Price IDs not validated
   - **Fix:** Add Zod schemas

4. **Service Role Key in Client**
   - Not currently happening, but risk exists
   - **Fix:** Ensure only anon key in client

5. **No CSRF Protection**
   - API routes don't verify origin
   - **Fix:** Add CSRF tokens or origin checks

6. **Webhook Signature Verification**
   - ✅ Currently implemented
   - But no retry logic if verification fails
   - **Fix:** Add proper error handling

### 2.6 Design Issues

1. **Mixed Concerns**
   - Trial signup and billing in same codebase
   - Should be clearly separated
   - **Fix:** Clear separation of flows

2. **No Error Boundaries**
   - Client components have no error handling
   - API routes have basic error handling
   - **Fix:** Add error boundaries and better error handling

3. **No Loading States**
   - Some operations don't show loading
   - User doesn't know if operation succeeded
   - **Fix:** Add proper loading/error states

4. **No Optimistic Updates**
   - UI doesn't update optimistically
   - User sees stale data
   - **Fix:** Add optimistic updates with rollback

5. **Hardcoded URLs**
   - Redirect URLs hardcoded
   - Should be environment variables
   - **Fix:** Use env vars for all URLs

### 2.7 Data Consistency Issues

1. **Race Condition: Checkout → Webhook**
   - Checkout creates subscription
   - Webhook updates Supabase
   - If webhook delayed, user sees wrong status
   - **Fix:** API route updates Supabase immediately, webhook is backup

2. **No Transaction Handling**
   - Multiple Supabase updates not atomic
   - If one fails, partial update
   - **Fix:** Use transactions or idempotency

3. **Stale Data in Supabase**
   - Supabase may lag behind Stripe
   - Client reads from Supabase (stale)
   - **Fix:** Add TTL, refresh mechanism, or read from Stripe API

4. **No Conflict Resolution**
   - If webhook and API both update, conflict possible
   - **Fix:** Use Stripe as source of truth, webhook wins

5. **Missing Fields**
   - Some Stripe data not synced to Supabase
   - Payment method info missing
   - Invoice history not stored
   - **Fix:** Sync all relevant fields via webhooks

### 2.8 "Must Fix Immediately" Red Flags

#### 🔴 Critical (Fix Before Production)
1. **Public Billing Route** - Security vulnerability
2. **Frontend Direct Supabase Updates** - Data inconsistency
3. **No Idempotency** - Risk of duplicate charges
4. **Incomplete Payment Failed Handler** - Users not notified

#### 🟡 High Priority (Fix Soon)
5. **Hardcoded Price IDs** - Environment management
6. **No Customer Portal** - Users can't self-manage
7. **No Plan Management API** - Can't upgrade/downgrade
8. **Race Condition Handling** - Data consistency

#### 🟢 Medium Priority (Fix When Possible)
9. **Code Duplication** - Maintenance burden
10. **No Invoice UI** - User experience
11. **No Yearly Billing** - Feature gap
12. **Error Recovery** - Reliability

---

## 3. STEP-BY-STEP MIGRATION PLAN

### Phase 1: Foundation (Week 1)
**Goal:** Set up proper structure, no breaking changes

#### Step 1.1: Create Utility Layer
- [ ] Create `/lib/billing/` directory structure
- [ ] Move `getStripe()` to `/lib/billing/stripe.ts`
- [ ] Create `/lib/billing/constants.ts` with price IDs
- [ ] Create `/lib/billing/types.ts` with TypeScript types
- [ ] Update existing files to use new utilities
- **Risk:** Low (internal refactor)

#### Step 1.2: Add Environment Variables
- [ ] Move price IDs to environment variables
- [ ] Add `STRIPE_PRICE_BRONZE_MONTHLY` (test/prod)
- [ ] Add `STRIPE_PRICE_SILVER_MONTHLY` (test/prod)
- [ ] Add `STRIPE_PRICE_GOLD_MONTHLY` (test/prod)
- [ ] Update constants to read from env
- **Risk:** Low (configuration change)

#### Step 1.3: Add Authentication to Billing Route
- [ ] Create auth middleware utility
- [ ] Add auth check to `/billing` page
- [ ] Redirect to login if not authenticated
- [ ] Verify user owns organization
- **Risk:** Medium (may break existing flow)

### Phase 2: API Routes (Week 2)
**Goal:** Create missing API endpoints, keep existing working

#### Step 2.1: Create Subscription Status API
- [ ] Create `/api/billing/subscription/route.ts`
- [ ] Reads from Supabase (cached)
- [ ] Falls back to Stripe if Supabase stale
- [ ] Add to client components
- **Risk:** Low (new endpoint, doesn't break existing)

#### Step 2.2: Create Customer Portal API
- [ ] Create `/api/billing/portal/route.ts`
- [ ] Creates Stripe portal session
- [ ] Returns portal URL
- [ ] Add button to billing settings (when created)
- **Risk:** Low (new feature)

#### Step 2.3: Create Plan Update API
- [ ] Create `/api/billing/plan/route.ts`
- [ ] Updates Stripe subscription
- [ ] Handles proration
- [ ] Uses idempotency keys
- [ ] Updates Supabase immediately (webhook backup)
- **Risk:** Medium (new functionality)

#### Step 2.4: Create Payment Method API
- [ ] Create `/api/billing/payment/route.ts`
- [ ] Creates SetupIntent for new payment method
- [ ] Updates default payment method
- [ ] Lists payment methods
- **Risk:** Medium (new functionality)

#### Step 2.5: Create Invoice API
- [ ] Create `/api/billing/invoices/route.ts`
- [ ] Lists invoices from Stripe
- [ ] Creates `/api/billing/invoices/[id]/route.ts` for PDF download
- [ ] Caches invoice list in Supabase (optional)
- **Risk:** Low (new feature)

### Phase 3: Fix Existing Issues (Week 3)
**Goal:** Fix critical bugs, maintain backward compatibility

#### Step 3.1: Fix Checkout Flow
- [ ] Remove direct Supabase update from `billing/page.tsx`
- [ ] Update checkout to use Checkout Session (optional improvement)
- [ ] Add idempotency keys to checkout
- [ ] Store customer ID immediately after creation
- [ ] Add error recovery
- **Risk:** High (touches critical flow)

#### Step 3.2: Improve Webhook Handler
- [ ] Add idempotency checks to webhook handlers
- [ ] Add retry logic for failed updates
- [ ] Add better error logging
- [ ] Complete `handlePaymentFailed` implementation
- [ ] Add `handleTrialWillEnd` handler
- **Risk:** Medium (webhook changes)

#### Step 3.3: Remove Duplicate Code
- [ ] Delete `billing/CheckoutForm.tsx` (unused)
- [ ] Consolidate plan data to constants
- [ ] Update all files to use constants
- **Risk:** Low (cleanup)

### Phase 4: New UI (Week 4)
**Goal:** Build billing management interface

#### Step 4.1: Create Billing Settings Page
- [ ] Create `/settings/billing/page.tsx`
- [ ] Add subscription status card
- [ ] Add plan selection card
- [ ] Add payment method card
- [ ] Add invoice list
- [ ] Add "Manage Billing" button (portal)
- **Risk:** Low (new page)

#### Step 4.2: Refactor Billing Checkout Page
- [ ] Simplify `billing/page.tsx`
- [ ] Remove plan selector (lock to current/trial plan)
- [ ] Use new subscription status API
- [ ] Improve error handling
- [ ] Add loading states
- **Risk:** Medium (UI changes)

#### Step 4.3: Create Success Page
- [ ] Create `/billing/success/page.tsx`
- [ ] Verify subscription status
- [ ] Show confirmation
- [ ] Redirect to app
- **Risk:** Low (new page)

### Phase 5: Testing & Cleanup (Week 5)
**Goal:** Test everything, remove old code

#### Step 5.1: End-to-End Testing
- [ ] Test trial → paid conversion
- [ ] Test plan upgrade/downgrade
- [ ] Test payment method update
- [ ] Test invoice download
- [ ] Test customer portal
- [ ] Test webhook handling
- **Risk:** Low (testing)

#### Step 5.2: Remove Old Code
- [ ] Remove unused `CheckoutForm.tsx`
- [ ] Remove hardcoded price IDs
- [ ] Remove duplicate plan definitions
- [ ] Clean up old `/success` page if not needed
- **Risk:** Low (cleanup)

#### Step 5.3: Documentation
- [ ] Update API documentation
- [ ] Document webhook events
- [ ] Document environment variables
- [ ] Create runbook for common issues
- **Risk:** None

### Migration Safety Principles

1. **Backward Compatibility**
   - Keep existing routes working during migration
   - Add new routes alongside old ones
   - Switch over gradually

2. **Feature Flags**
   - Use feature flags for new features
   - Can roll back if issues
   - Test in production gradually

3. **Monitoring**
   - Add logging to all new endpoints
   - Monitor webhook success rate
   - Alert on errors

4. **Gradual Rollout**
   - Deploy to staging first
   - Test with small user group
   - Roll out to all users

5. **Rollback Plan**
   - Keep old code until new code proven
   - Can revert if critical issues
   - Database migrations reversible

---

## 4. FILE GENERATION PLAN

### 4.1 Utility Layer Files

#### `/src/lib/billing/index.ts`
**Purpose:** Public API exports for billing utilities
**Should Generate:** ✅ Yes
**Priority:** High

#### `/src/lib/billing/stripe.ts`
**Purpose:** Stripe client initialization (consolidate `getStripe()`)
**Should Generate:** ✅ Yes
**Priority:** High

#### `/src/lib/billing/constants.ts`
**Purpose:** Price IDs, plan configurations, single source of truth
**Should Generate:** ✅ Yes
**Priority:** High

#### `/src/lib/billing/types.ts`
**Purpose:** TypeScript types for billing entities
**Should Generate:** ✅ Yes
**Priority:** High

#### `/src/lib/billing/subscriptions.ts`
**Purpose:** Subscription operations (create, update, cancel, get status)
**Should Generate:** ✅ Yes
**Priority:** High

#### `/src/lib/billing/customers.ts`
**Purpose:** Customer operations (create, get, update)
**Should Generate:** ✅ Yes
**Priority:** Medium

#### `/src/lib/billing/invoices.ts`
**Purpose:** Invoice operations (list, get, download PDF)
**Should Generate:** ✅ Yes
**Priority:** Medium

#### `/src/lib/billing/portal.ts`
**Purpose:** Customer portal session creation
**Should Generate:** ✅ Yes
**Priority:** High

#### `/src/lib/billing/utils.ts`
**Purpose:** Helper functions (idempotency, error handling, etc.)
**Should Generate:** ✅ Yes
**Priority:** Medium

### 4.2 API Route Files

#### `/src/app/api/billing/checkout/route.ts`
**Purpose:** Create Stripe checkout session (refactor existing)
**Should Generate:** ⚠️ Refactor existing `/api/checkout/route.ts`
**Priority:** High

#### `/src/app/api/billing/portal/route.ts`
**Purpose:** Create Stripe customer portal session
**Should Generate:** ✅ Yes (new)
**Priority:** High

#### `/src/app/api/billing/plan/route.ts`
**Purpose:** Update subscription plan (upgrade/downgrade)
**Should Generate:** ✅ Yes (new)
**Priority:** High

#### `/src/app/api/billing/payment/route.ts`
**Purpose:** Update payment method (create SetupIntent, set default)
**Should Generate:** ✅ Yes (new)
**Priority:** Medium

#### `/src/app/api/billing/invoices/route.ts`
**Purpose:** List invoices for customer
**Should Generate:** ✅ Yes (new)
**Priority:** Medium

#### `/src/app/api/billing/invoices/[id]/route.ts`
**Purpose:** Download invoice PDF
**Should Generate:** ✅ Yes (new)
**Priority:** Low

#### `/src/app/api/billing/subscription/route.ts`
**Purpose:** Get subscription status (reads from Supabase/Stripe)
**Should Generate:** ✅ Yes (new)
**Priority:** High

### 4.3 UI Component Files

#### `/src/app/settings/billing/page.tsx`
**Purpose:** Billing management dashboard
**Should Generate:** ✅ Yes (new)
**Priority:** High

#### `/src/app/settings/billing/components/SubscriptionCard.tsx`
**Purpose:** Display current subscription status
**Should Generate:** ✅ Yes (new)
**Priority:** High

#### `/src/app/settings/billing/components/PlanCard.tsx`
**Purpose:** Display and change plan
**Should Generate:** ✅ Yes (new)
**Priority:** High

#### `/src/app/settings/billing/components/PaymentMethodCard.tsx`
**Purpose:** Display and update payment method
**Should Generate:** ✅ Yes (new)
**Priority:** Medium

#### `/src/app/settings/billing/components/InvoiceList.tsx`
**Purpose:** List and download invoices
**Should Generate:** ✅ Yes (new)
**Priority:** Medium

#### `/src/app/settings/billing/components/BillingPortalButton.tsx`
**Purpose:** Button to open Stripe customer portal
**Should Generate:** ✅ Yes (new)
**Priority:** High

#### `/src/app/billing/success/page.tsx`
**Purpose:** Checkout success confirmation page
**Should Generate:** ✅ Yes (new)
**Priority:** Medium

#### `/src/app/billing/components/CheckoutForm.tsx`
**Purpose:** Consolidated checkout form (refactor existing)
**Should Generate:** ⚠️ Refactor existing
**Priority:** High

#### `/src/app/billing/components/PlanSelector.tsx`
**Purpose:** Reusable plan selector component
**Should Generate:** ✅ Yes (new)
**Priority:** Medium

#### `/src/app/billing/components/PaymentMethodForm.tsx`
**Purpose:** Payment method input form
**Should Generate:** ✅ Yes (new)
**Priority:** Medium

### 4.4 Middleware Files

#### `/src/lib/auth/middleware.ts`
**Purpose:** Authentication middleware for protected routes
**Should Generate:** ✅ Yes (new)
**Priority:** High

#### `/src/lib/auth/org-ownership.ts`
**Purpose:** Verify user owns organization
**Should Generate:** ✅ Yes (new)
**Priority:** High

### 4.5 Files to Delete

#### `/src/app/billing/CheckoutForm.tsx`
**Purpose:** DELETE - Unused duplicate component
**Should Delete:** ✅ Yes
**Priority:** Low (after migration)

### 4.6 Files to Refactor

#### `/src/app/billing/page.tsx`
**Purpose:** Remove direct Supabase updates, use API routes
**Should Refactor:** ✅ Yes
**Priority:** High

#### `/src/app/api/checkout/route.ts`
**Purpose:** Add idempotency, improve error handling, store customer ID
**Should Refactor:** ✅ Yes
**Priority:** High

#### `/src/app/api/webhooks/stripe/route.ts`
**Purpose:** Add idempotency checks, improve error handling, complete handlers
**Should Refactor:** ✅ Yes
**Priority:** High

---

## 5. "STOP DOING THIS" SECTION

### 5.1 Direct Supabase Updates from Frontend

**❌ Current Behavior:**
```typescript
// billing/page.tsx line 186-189
const supabase = getSupabase();
await supabase
  .from("organizations")
  .update({ plan_tier: selectedPlan })
  .eq("id", orgId);
```

**✅ Correct Approach:**
- Frontend calls `/api/billing/plan` API route
- API route updates Stripe subscription
- Webhook updates Supabase
- Frontend reads updated status from API

**Why:** Stripe is source of truth. Frontend updates cause data inconsistency.

### 5.2 Using Unused/Legacy Components

**❌ Current Behavior:**
- `billing/CheckoutForm.tsx` exists but not imported
- Duplicates logic from `billing/page.tsx`
- Different implementation (CardElement vs CardNumberElement)

**✅ Correct Approach:**
- Delete `CheckoutForm.tsx`
- Consolidate into single checkout component
- Use consistent Stripe Elements

**Why:** Code duplication causes maintenance burden and confusion.

### 5.3 Hardcoding Price IDs

**❌ Current Behavior:**
```typescript
// checkout/route.ts
case "price_1SHeylEYzJYgVIMo4VLSJprk": return "bronze";
// billing/page.tsx
priceId: "price_1SInQcEYzJYgVIMo6QFVXlsm"
// CheckoutForm.tsx
priceId: 'price_1SHeylEYzJYgVIMo4VLSJprk'
```

**✅ Correct Approach:**
```typescript
// lib/billing/constants.ts
export const PRICE_IDS = {
  bronze: {
    monthly: process.env.STRIPE_PRICE_BRONZE_MONTHLY,
    yearly: process.env.STRIPE_PRICE_BRONZE_YEARLY,
  },
  // ...
}
```

**Why:** Hardcoded values are error-prone, hard to maintain, and can't vary by environment.

### 5.4 Public Billing Routes Without Auth

**❌ Current Behavior:**
- `/billing` page has no authentication
- Anyone can access checkout
- No user verification

**✅ Correct Approach:**
```typescript
// billing/page.tsx
export default async function BillingPage() {
  const user = await getServerSession();
  if (!user) redirect('/login');
  
  const org = await getOrganization(user.id);
  if (!org) redirect('/');
  
  // ... rest of page
}
```

**Why:** Security vulnerability. Unauthorized users can attempt checkout.

### 5.5 Creating Subscriptions Without Idempotency

**❌ Current Behavior:**
```typescript
// checkout/route.ts
const subscription = await stripe.subscriptions.create({
  customer: customer.id,
  items: [{ price: priceId }],
});
```

**✅ Correct Approach:**
```typescript
const idempotencyKey = generateIdempotencyKey(req);
const subscription = await stripe.subscriptions.create({
  customer: customer.id,
  items: [{ price: priceId }],
}, {
  idempotencyKey,
});
```

**Why:** Retries can create duplicate subscriptions. Idempotency prevents this.

### 5.6 Not Storing Customer ID Immediately

**❌ Current Behavior:**
- Checkout creates customer but doesn't store ID
- Only stored via webhook
- If webhook fails, customer ID lost

**✅ Correct Approach:**
```typescript
// After creating customer
await supabase
  .from('organizations')
  .update({ stripe_customer_id: customer.id })
  .eq('id', orgId);

// Webhook is backup/verification
```

**Why:** Race condition if webhook delayed. Customer ID needed immediately.

### 5.7 Incomplete Error Handlers

**❌ Current Behavior:**
```typescript
// webhooks/stripe/route.ts
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Payment failed for invoice:', invoice.id);
  // Handle failed payments
  // e.g., send dunning emails, suspend service, etc.
}
```

**✅ Correct Approach:**
```typescript
async function handlePaymentFailed(invoice: Stripe.Invoice) {
  // Update subscription status
  await updateSubscriptionStatus(invoice.subscription, 'past_due');
  
  // Send notification email
  await sendPaymentFailedEmail(invoice.customer_email);
  
  // Suspend service if multiple failures
  if (failureCount > 3) {
    await suspendOrganization(invoice.subscription);
  }
}
```

**Why:** Users not notified, service continues without payment.

### 5.8 Mixing Test and Production Price IDs

**❌ Current Behavior:**
```typescript
// checkout/route.ts
case "price_1SInQcEYzJYgVIMo6QFVXlsm": // Bronze test
case "price_1SHeylEYzJYgVIMo4VLSJprk": // Bronze prod
```

**✅ Correct Approach:**
- Use environment variables
- Different env vars for test/prod
- No hardcoded price IDs in code

**Why:** Can accidentally use test prices in production.

### 5.9 Reading Subscription Status Directly from Supabase

**❌ Current Behavior:**
```typescript
// billing/page.tsx
const { data } = await supabase
  .from("organizations")
  .select("plan_tier")
  .eq("id", orgId);
```

**✅ Correct Approach:**
```typescript
// Use API route
const response = await fetch('/api/billing/subscription');
const subscription = await response.json();
```

**Why:** API route can verify auth, handle errors, fall back to Stripe if Supabase stale.

### 5.10 No Retry Logic for Failed Webhooks

**❌ Current Behavior:**
- Webhook handler fails silently
- No retry mechanism
- Data inconsistency if webhook fails

**✅ Correct Approach:**
```typescript
// Add retry logic
async function updateWithRetry(updateFn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await updateFn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await delay(1000 * (i + 1)); // Exponential backoff
    }
  }
}
```

**Why:** Temporary failures cause permanent data inconsistency.

---

## 6. CLEAN, CONSOLIDATED PLAN

### 6.1 End-to-End Billing Flow

#### Flow 1: New User Trial Signup
```
1. User visits /pricing
2. Clicks "Start Free Trial"
3. Fills signup form on /start-trial
4. POST /api/start-trial creates:
   - Supabase auth user
   - Supabase organization (trial_expires_at = now + 14 days)
   - NO Stripe customer (yet)
5. User redirected to app with 14-day trial
```

**Key:** No billing involved. Pure Supabase operation.

#### Flow 2: Trial Expires → Paid Conversion
```
1. Trial expires, user redirected to /billing?org_id=xxx
2. Page loads:
   - Verifies user authentication
   - Verifies user owns organization
   - Fetches current plan from /api/billing/subscription
   - Shows checkout form (plan locked to current/trial plan)
3. User enters payment method
4. User submits form
5. POST /api/billing/checkout:
   - Creates/finds Stripe customer
   - Creates Stripe subscription (with idempotency key)
   - Stores customer_id in Supabase immediately
   - Returns subscription_id
6. Frontend confirms payment with Stripe
7. Webhook fires: checkout.session.completed
8. Webhook updates Supabase:
   - stripe_customer_id
   - stripe_subscription_id
   - plan_tier
   - subscription_status = 'active'
9. User redirected to /billing/success
10. Success page verifies subscription, redirects to app
```

**Key:** Stripe creates subscription, webhook syncs to Supabase.

#### Flow 3: User Manages Billing
```
1. User visits /settings/billing
2. Page loads:
   - Verifies authentication
   - Fetches subscription from /api/billing/subscription
   - Fetches invoices from /api/billing/invoices
   - Displays current plan, payment method, invoices
3. User wants to change plan:
   - Clicks "Upgrade" or "Downgrade"
   - Selects new plan
   - PATCH /api/billing/plan:
     - Updates Stripe subscription (with proration)
     - Uses idempotency key
     - Updates Supabase immediately (webhook backup)
   - Webhook fires: customer.subscription.updated
   - Webhook updates Supabase (verification)
4. User wants to update payment method:
   - Clicks "Update Payment Method"
   - PATCH /api/billing/payment:
     - Creates SetupIntent
     - Returns client_secret
   - Frontend confirms with Stripe
   - Sets as default payment method
5. User wants to manage billing (cancel, update address, etc.):
   - Clicks "Manage Billing"
   - POST /api/billing/portal:
     - Creates Stripe portal session
     - Returns portal URL
   - User redirected to Stripe portal
   - User makes changes in Stripe
   - Webhook fires: customer.subscription.updated
   - Webhook updates Supabase
```

**Key:** All operations go through Stripe. Webhooks sync to Supabase.

#### Flow 4: Monthly Billing Cycle
```
1. Stripe charges customer (monthly)
2. Webhook fires: invoice.payment_succeeded
3. Handler:
   - Generates PDF invoice
   - Sends email with PDF attachment
   - No Supabase update needed (status already 'active')
4. If payment fails:
   - Webhook fires: invoice.payment_failed
   - Handler:
     - Updates Supabase: subscription_status = 'past_due'
     - Sends payment failed email
     - After 3 failures, suspends organization
```

**Key:** Webhooks handle all subscription lifecycle events.

### 6.2 Data Flow Principles

1. **Stripe is Source of Truth**
   - All billing data originates in Stripe
   - Supabase is cache/sync layer
   - Webhooks keep Supabase in sync

2. **API Routes Handle All Writes**
   - Frontend never writes to Supabase directly
   - All writes go through API routes
   - API routes update Stripe, webhooks update Supabase

3. **Webhooks are Primary Sync Method**
   - Webhooks update Supabase for all Stripe events
   - API routes can update Supabase immediately (optimistic)
   - Webhook is verification/backup

4. **Client Reads from API**
   - Client never reads directly from Supabase
   - API routes can read from Supabase (cached) or Stripe (fresh)
   - API routes handle auth/authorization

5. **Idempotency Everywhere**
   - All Stripe operations use idempotency keys
   - Prevents duplicate operations on retries
   - Critical for reliability

### 6.3 Architecture Summary

**Client Layer:**
- Display only, no direct Stripe/Supabase access
- Calls API routes for all operations
- Handles UI/UX, form validation, redirects

**API Route Layer:**
- Handles all billing operations
- Updates Stripe (source of truth)
- Can update Supabase optimistically
- Handles auth/authorization
- Uses idempotency keys

**Utility Layer:**
- Shared Stripe/Supabase clients
- Common operations (subscriptions, customers, invoices)
- Constants and types
- Reusable across API routes

**Webhook Layer:**
- Primary sync mechanism
- Updates Supabase based on Stripe events
- Handles all subscription lifecycle events
- Idempotent and retryable

**Database Layer:**
- Supabase stores cached billing data
- Updated via webhooks (primary) or API (optimistic)
- Used for fast reads (via API routes)
- Stripe is authoritative source

### 6.4 Key Principles

1. **Security First**
   - All billing routes require authentication
   - Verify user owns organization
   - Rate limit API routes
   - Validate all inputs

2. **Reliability**
   - Idempotency keys on all Stripe operations
   - Retry logic for failed webhooks
   - Error handling and logging
   - Monitoring and alerts

3. **Consistency**
   - Stripe is source of truth
   - Webhooks sync to Supabase
   - Accept eventual consistency (seconds)
   - API can read from Stripe if Supabase stale

4. **User Experience**
   - Clear error messages
   - Loading states
   - Optimistic updates
   - Self-service via customer portal

5. **Maintainability**
   - Single source of truth for constants
   - Reusable utilities
   - Clear separation of concerns
   - Comprehensive documentation

---

**This is the complete architecture blueprint for CivDocs billing system.**
**Next step: Generate code based on this blueprint.**




