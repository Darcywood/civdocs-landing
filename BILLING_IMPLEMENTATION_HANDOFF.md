# CivDocs Billing System - Implementation Handoff

## 🎯 Context Summary

You're building a complete SaaS billing system for CivDocs using a **hybrid approach**:
- **Stripe Elements** for checkout (minimal Stripe branding)
- **Stripe Customer Portal** for advanced management (when needed)
- **Stripe is source of truth**, Supabase syncs via webhooks

## 📁 Project Structure

### Current Location
- **Landing Page:** `civdocs-landing` folder (marketing site)
- **Main App:** `app.civdocs.com.au` folder (where we're building billing)

### Architecture Decision
**Everything billing-related goes in the MAIN APP**, not landing page:
- Landing page only has: `/pricing`, `/start-trial`, `/login`
- Main app has: All billing pages, APIs, and management

---

## 🏗️ What Needs to Be Built

### Phase 1: Foundation (Week 1)

#### 1.1 Create Utility Layer
**Location:** `src/lib/billing/`

**Files to create:**
1. `src/lib/billing/index.ts` - Public API exports
2. `src/lib/billing/stripe.ts` - Stripe client initialization
3. `src/lib/billing/constants.ts` - Price IDs, plan configs (from env vars)
4. `src/lib/billing/types.ts` - TypeScript types
5. `src/lib/billing/subscriptions.ts` - Subscription operations
6. `src/lib/billing/customers.ts` - Customer operations
7. `src/lib/billing/invoices.ts` - Invoice operations
8. `src/lib/billing/portal.ts` - Portal operations
9. `src/lib/billing/utils.ts` - Helper functions (idempotency, etc.)

**Key Points:**
- Use environment variables for price IDs (no hardcoding)
- Support both test and production price IDs
- All Stripe operations use idempotency keys

#### 1.2 Environment Variables Needed
Add to `.env.local`:
```env
# Stripe
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Price IDs (Monthly)
STRIPE_PRICE_BRONZE_MONTHLY_TEST=price_1SInQcEYzJYgVIMo6QFVXlsm
STRIPE_PRICE_BRONZE_MONTHLY_PROD=price_1SHeylEYzJYgVIMo4VLSJprk
STRIPE_PRICE_SILVER_MONTHLY_TEST=price_1SInR7EYzJYgVIMoKHwDNfvf
STRIPE_PRICE_SILVER_MONTHLY_PROD=price_1SHf6nEYzJYgVIMo7tAJ3zbV
STRIPE_PRICE_GOLD_MONTHLY_TEST=price_1SInRKEYzJYgVIMoLjCRR76o
STRIPE_PRICE_GOLD_MONTHLY_PROD=price_1SHf82EYzJYgVIMo1Vfitt1b

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# Resend (for invoices)
RESEND_API_KEY=...
FROM_EMAIL=darcy@civdocs.com.au
```

---

### Phase 2: API Routes (Week 2)

#### 2.1 Checkout API
**File:** `src/app/api/billing/checkout/route.ts`

**Purpose:** Create Stripe checkout session when trial expires

**Functionality:**
- Find or create Stripe customer
- Create subscription with SetupIntent
- Store customer_id in Supabase immediately
- Use idempotency keys
- Return client_secret and subscription_id

**Key Requirements:**
- ✅ Use idempotency keys
- ✅ Store customer_id immediately (don't wait for webhook)
- ✅ Handle errors gracefully
- ✅ Verify user authentication
- ✅ Verify user owns organization

#### 2.2 Subscription Status API
**File:** `src/app/api/billing/subscription/route.ts`

**Purpose:** Get current subscription status

**Functionality:**
- Read from Supabase (cached)
- Fall back to Stripe if Supabase stale
- Return subscription details

**Response:**
```typescript
{
  status: 'active' | 'trialing' | 'past_due' | 'canceled',
  plan_tier: 'bronze' | 'silver' | 'gold',
  current_period_end: string,
  cancel_at_period_end: boolean,
  // ... other fields
}
```

#### 2.3 Customer Portal API
**File:** `src/app/api/billing/portal/route.ts`

**Purpose:** Create Stripe Customer Portal session

**Functionality:**
- Create portal session
- Return portal URL
- User redirected to Stripe-hosted portal

**Key Requirements:**
- ✅ Verify authentication
- ✅ Verify user owns organization
- ✅ Set return URL to `/settings/billing`

#### 2.4 Plan Update API
**File:** `src/app/api/billing/plan/route.ts`

**Purpose:** Upgrade/downgrade subscription plan

**Functionality:**
- Update Stripe subscription
- Handle proration automatically
- Use idempotency keys
- Update Supabase immediately (webhook backup)

**Key Requirements:**
- ✅ Verify authentication
- ✅ Verify user owns organization
- ✅ Validate new plan tier
- ✅ Use idempotency keys
- ✅ Handle proration

#### 2.5 Payment Method API
**File:** `src/app/api/billing/payment/route.ts`

**Purpose:** Update payment method

**Functionality:**
- Create SetupIntent
- Return client_secret
- Frontend confirms with Stripe
- Set as default payment method

#### 2.6 Invoices API
**File:** `src/app/api/billing/invoices/route.ts`

**Purpose:** List invoices for customer

**Functionality:**
- Fetch invoices from Stripe
- Return list with download links
- Cache in Supabase (optional)

**File:** `src/app/api/billing/invoices/[id]/route.ts`

**Purpose:** Download invoice PDF

**Functionality:**
- Fetch invoice from Stripe
- Generate PDF (or use Stripe's)
- Return PDF file

#### 2.7 Webhook Handler
**File:** `src/app/api/webhooks/stripe/route.ts`

**Purpose:** Handle Stripe webhook events

**Key Events:**
- `checkout.session.completed` - Update org with customer/subscription IDs
- `customer.subscription.created` - Set subscription status
- `customer.subscription.updated` - Update status, plan, period
- `customer.subscription.deleted` - Set status to canceled
- `invoice.payment_succeeded` - Send invoice email
- `invoice.payment_failed` - Update status, send notification
- `customer.subscription.trial_will_end` - Send reminder (optional)

**Key Requirements:**
- ✅ Verify webhook signature
- ✅ Add idempotency checks
- ✅ Retry logic for failed updates
- ✅ Better error logging

---

### Phase 3: UI Pages (Week 3-4)

#### 3.1 Checkout Page (Post-Trial)
**File:** `src/app/billing/page.tsx`

**Purpose:** User enters payment method when trial expires

**Features:**
- ✅ Requires authentication
- ✅ Shows current plan (locked, can't change during checkout)
- ✅ Email pre-filled
- ✅ Stripe Elements for card input
- ✅ Minimal Stripe branding ("Secured by Stripe" small text)
- ✅ Your branding/design
- ✅ Loading states
- ✅ Error handling
- ✅ Success redirect

**Key Requirements:**
- ❌ NO direct Supabase updates from frontend
- ✅ All updates go through API routes
- ✅ Use Stripe Elements (embedded, not hosted checkout)

#### 3.2 Checkout Success Page
**File:** `src/app/billing/success/page.tsx`

**Purpose:** Confirm subscription activation

**Features:**
- Verify subscription status
- Show confirmation
- Redirect to app dashboard

#### 3.3 Billing Management Dashboard
**File:** `src/app/settings/billing/page.tsx`

**Purpose:** User manages billing (main dashboard)

**Features:**
- Current subscription card (status, plan, price, renewal date)
- Plan selection card (upgrade/downgrade buttons)
- Payment method card (last 4 digits, update button)
- Invoice list (recent invoices with download)
- "Manage Billing" button (opens Stripe Portal)

**Components to create:**
- `src/app/settings/billing/components/SubscriptionCard.tsx`
- `src/app/settings/billing/components/PlanCard.tsx`
- `src/app/settings/billing/components/PaymentMethodCard.tsx`
- `src/app/settings/billing/components/InvoiceList.tsx`
- `src/app/settings/billing/components/BillingPortalButton.tsx`

---

## 🔑 Key Principles

### 1. Stripe is Source of Truth
- All billing operations go through Stripe API
- Supabase is cache/sync layer
- Webhooks keep Supabase in sync

### 2. No Direct Database Updates from Frontend
- ❌ Frontend never updates Supabase directly
- ✅ Frontend calls API routes
- ✅ API routes update Stripe
- ✅ Webhooks update Supabase

### 3. Idempotency Everywhere
- All Stripe operations use idempotency keys
- Prevents duplicate subscriptions on retries
- Critical for reliability

### 4. Authentication Required
- All billing routes require authentication
- Verify user owns organization
- No public billing pages

### 5. Minimal Stripe Branding
- Checkout uses Stripe Elements (embedded)
- Small "Secured by Stripe" text (required)
- Your branding throughout
- Stripe Portal only for advanced actions

---

## 🚫 What NOT to Do

### ❌ Don't Do This:
1. **Frontend directly updating Supabase**
   ```typescript
   // BAD
   await supabase.from('organizations').update({ plan_tier: 'gold' })
   ```

2. **Hardcoding price IDs**
   ```typescript
   // BAD
   const priceId = 'price_1SHeylEYzJYgVIMo4VLSJprk'
   ```

3. **No idempotency keys**
   ```typescript
   // BAD
   await stripe.subscriptions.create({ ... })
   ```

4. **Public billing routes**
   ```typescript
   // BAD - no auth check
   export default function BillingPage() { ... }
   ```

5. **Waiting for webhook to store customer_id**
   ```typescript
   // BAD - race condition
   // Only store customer_id in webhook
   ```

### ✅ Do This Instead:
1. **API routes update Stripe, webhooks update Supabase**
2. **Use environment variables for price IDs**
3. **Always use idempotency keys**
4. **Require authentication on all billing routes**
5. **Store customer_id immediately after creation**

---

## 📋 Implementation Checklist

### Foundation
- [ ] Create `/lib/billing/` directory structure
- [ ] Create `stripe.ts` with client initialization
- [ ] Create `constants.ts` with price IDs from env vars
- [ ] Create `types.ts` with TypeScript types
- [ ] Create `subscriptions.ts` with subscription operations
- [ ] Create `customers.ts` with customer operations
- [ ] Create `invoices.ts` with invoice operations
- [ ] Create `portal.ts` with portal operations
- [ ] Create `utils.ts` with helper functions
- [ ] Add all environment variables

### API Routes
- [ ] Create `/api/billing/checkout/route.ts`
- [ ] Create `/api/billing/subscription/route.ts`
- [ ] Create `/api/billing/portal/route.ts`
- [ ] Create `/api/billing/plan/route.ts`
- [ ] Create `/api/billing/payment/route.ts`
- [ ] Create `/api/billing/invoices/route.ts`
- [ ] Create `/api/billing/invoices/[id]/route.ts`
- [ ] Create/improve `/api/webhooks/stripe/route.ts`

### UI Pages
- [ ] Create `/billing/page.tsx` (checkout)
- [ ] Create `/billing/success/page.tsx`
- [ ] Create `/settings/billing/page.tsx` (dashboard)
- [ ] Create billing components

### Authentication
- [ ] Add auth middleware
- [ ] Verify user owns organization
- [ ] Protect all billing routes

### Testing
- [ ] Test trial → paid conversion
- [ ] Test plan upgrade/downgrade
- [ ] Test payment method update
- [ ] Test invoice download
- [ ] Test customer portal
- [ ] Test webhook handling

---

## 🔄 User Flow Summary

### Trial → Paid Conversion
```
1. User's trial expires
2. Redirected to: /billing (in app)
3. User sees checkout form (your branding)
4. User enters card (Stripe Elements)
5. POST /api/billing/checkout
6. Subscription created in Stripe
7. Customer ID stored in Supabase immediately
8. Webhook updates Supabase (verification)
9. User redirected to /billing/success
10. User continues using app
```

### Billing Management
```
1. User visits /settings/billing
2. Sees subscription status, plan, invoices
3. User clicks "Upgrade Plan"
4. PATCH /api/billing/plan
5. Stripe subscription updated
6. Webhook updates Supabase
7. User sees updated plan
```

### Payment Method Update
```
1. User clicks "Update Payment Method"
2. POST /api/billing/payment
3. Returns SetupIntent client_secret
4. Frontend confirms with Stripe
5. Payment method updated
6. User sees updated card
```

### Advanced Management
```
1. User clicks "Manage Billing"
2. POST /api/billing/portal
3. Returns Stripe Portal URL
4. User redirected to Stripe Portal
5. User cancels/updates in Stripe
6. Webhook updates Supabase
7. User returns to app
```

---

## 📚 Reference Files from Landing Page

If you need to reference existing code:

**From `civdocs-landing` folder:**
- `src/app/billing/page.tsx` - Current checkout page (needs refactor)
- `src/app/api/checkout/route.ts` - Current checkout API (needs improvement)
- `src/app/api/webhooks/stripe/route.ts` - Current webhook handler (needs improvement)
- `src/app/billing/CardFields.tsx` - Card input component (can reuse)

**Key things to fix:**
- Remove direct Supabase updates from frontend
- Add idempotency keys
- Add authentication
- Improve error handling
- Store customer_id immediately

---

## 🎯 Next Steps

1. **Switch to main app folder**
2. **Create folder structure** (`/lib/billing/`, `/api/billing/`, etc.)
3. **Start with Phase 1** (utility layer)
4. **Then Phase 2** (API routes)
5. **Then Phase 3** (UI pages)

---

## 💡 Quick Start Commands

```bash
# Create directory structure
mkdir -p src/lib/billing
mkdir -p src/app/api/billing/{checkout,portal,plan,payment,invoices,subscription}
mkdir -p src/app/api/billing/invoices/[id]
mkdir -p src/app/billing/success
mkdir -p src/app/settings/billing/components

# Install dependencies (if not already)
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

---

## 📝 Notes

- **Hybrid Approach:** Stripe Elements for checkout, Stripe Portal for management
- **Minimal Branding:** Small "Secured by Stripe" text only
- **Security First:** All routes require authentication
- **Reliability:** Idempotency keys everywhere
- **Consistency:** Stripe is source of truth, webhooks sync Supabase

---

**Ready to build! Start with Phase 1 (utility layer) and work through each phase systematically.**












