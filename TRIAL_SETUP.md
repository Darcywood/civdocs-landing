# CivDocs 14-Day Free Trial Setup (No Credit Card Required)

## ✅ What's Been Implemented

Your CivDocs pricing page now supports **14-day free trials without requiring a credit card**! Here's what's been built:

### 1. **Installed Dependencies**
- `@supabase/supabase-js` - Supabase client for database operations
- `stripe` - Server-side Stripe SDK (already installed)

### 2. **Created API Route** (`src/app/api/start-trial/route.ts`)
- Creates Stripe customer without payment method
- Creates subscription with 14-day trial
- Stores organization data in Supabase
- Determines plan type (Bronze/Silver/Gold)

### 3. **Updated Pricing Page** (`src/app/pricing/page.tsx`)
- Beautiful email collection modal
- Updated all copy to reflect "14 day" trial
- "No credit card required" messaging
- Loading states and error handling
- Connected to all three plans with their Price IDs

### 4. **Created Trial Success Page** (`/trial-success`)
- Beautiful confirmation page
- Shows next steps for new users
- Auto-redirects to login after 5 seconds
- Email confirmation display

---

## 🔧 Setup Required

### 1. Environment Variables

You need to add Supabase credentials to your `.env.local` file:

```bash
# Existing Stripe Keys
STRIPE_SECRET_KEY=sk_live_XXXXXXXXXXXXXXXX
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_XXXXXXXXXXXXXXXX
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# NEW: Supabase Credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**To get your Supabase credentials:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **Settings** → **API**
4. Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
5. Copy **service_role key** (secret) → `SUPABASE_SERVICE_ROLE_KEY`

---

### 2. Create Supabase Table

Run this SQL in your Supabase SQL Editor to create the `organizations` table:

```sql
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('bronze', 'silver', 'gold')),
  stripe_customer_id TEXT UNIQUE NOT NULL,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_customer_email TEXT NOT NULL,
  trial_end TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster lookups
CREATE INDEX idx_organizations_stripe_customer ON organizations(stripe_customer_id);
CREATE INDEX idx_organizations_email ON organizations(stripe_customer_email);
CREATE INDEX idx_organizations_trial_end ON organizations(trial_end);

-- Enable Row Level Security (recommended)
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role access
CREATE POLICY "Service role can do everything" ON organizations
  FOR ALL USING (auth.role() = 'service_role');
```

---

## 🧪 Testing the Integration

### Step-by-Step Test

1. **Start your dev server**:
   ```bash
   npm run dev
   ```

2. **Visit pricing page**:
   ```
   http://localhost:3000/pricing
   ```

3. **Click "Start Free Trial"** on Bronze, Silver, or Gold plan

4. **Enter an email** in the modal that appears

5. **Click "Start Free Trial"** button

6. **Verify in Stripe Dashboard**:
   - Go to **Customers** → you should see a new customer
   - Go to **Subscriptions** → subscription should show "Trialing" status
   - Trial should end in 14 days

7. **Verify in Supabase**:
   - Go to **Table Editor** → `organizations`
   - Your test organization should appear with the email

8. **Check success page**:
   - You should be redirected to `/trial-success`
   - Email should display correctly
   - Auto-redirect countdown should work

---

## 📋 How It Works

### User Flow:

1. User clicks "Start Free Trial" on pricing page
2. Email modal appears
3. User enters email and clicks "Start Free Trial"
4. Backend creates:
   - Stripe customer (no payment method)
   - Stripe subscription with 14-day trial
   - Organization record in Supabase
5. User redirected to success page
6. Success page auto-redirects to login after 5 seconds

### Key Features:

✅ **No Credit Card Required** - Users can start trial without payment info  
✅ **14-Day Trial** - Full access to all plan features  
✅ **Stripe Integration** - Customer & subscription created automatically  
✅ **Database Storage** - Organization data saved in Supabase  
✅ **Beautiful UX** - Modal for email collection, success page with instructions  

---

## 🔄 What Happens After 14 Days?

With the current setup:

1. **Trial ends** after 14 days
2. Stripe will attempt to charge the customer
3. Since no payment method is attached, the subscription will become **`past_due`**
4. You can set up **Stripe webhooks** to handle this event and:
   - Send email reminders to add payment method
   - Downgrade to free tier
   - Lock account until payment is added

### Recommended: Set Up Stripe Webhooks

To handle trial expiration gracefully, create a webhook handler:

1. Go to Stripe Dashboard → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter your endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events:
   - `customer.subscription.trial_will_end` (3 days before)
   - `customer.subscription.updated` (when status changes)
   - `invoice.payment_failed` (when no payment method)

---

## 🎨 Customization

### Change Trial Period

To change from 14 days to another period:

**In `src/app/api/start-trial/route.ts`**:
```ts
trial_period_days: 30, // Change to 30 days
```

**In `src/app/pricing/page.tsx`**:
- Update all "14 day" text to your preferred period

### Modify Email Modal

The email modal is at the bottom of `src/app/pricing/page.tsx`. You can customize:
- Colors and styling
- Input validation
- Additional fields (company name, phone, etc.)

### Update Success Page

Edit `src/app/trial-success/page.tsx` to change:
- Redirect timing
- Next steps messaging
- Support links

---

## 🛠 Troubleshooting

### "Missing email or priceId" error
- Check that the modal is correctly passing `selectedPriceId`
- Verify email input has a value

### "Database error" in response
- Check Supabase credentials in `.env.local`
- Verify `organizations` table exists
- Check RLS policies allow service role access

### Stripe customer created but not in Supabase
- Check Supabase connection
- Verify service role key has proper permissions
- Look at server logs for detailed error message

### Modal not appearing
- Check browser console for errors
- Verify `showEmailModal` state is being set
- Check z-index conflicts with other elements

---

## 🚀 Deployment Checklist

Before going live:

- [ ] Add all environment variables to production
- [ ] Update `NEXT_PUBLIC_BASE_URL` to production domain
- [ ] Test trial signup in production
- [ ] Set up Stripe webhooks for trial expiration
- [ ] Configure email service to send login credentials
- [ ] Test Supabase database connection
- [ ] Update email templates with branding
- [ ] Add analytics tracking to trial signups
- [ ] Set up monitoring for failed trial creations

---

## 📊 Your Price IDs

Currently configured:
- **Bronze**: `price_1SHeylEYzJYgVIMo4VLSJprk` ($97/month)
- **Silver**: `price_1SHf6nEYzJYgVIMo7tAJ3zbV` ($197/month)
- **Gold**: `price_1SHf82EYzJYgVIMo1Vfitt1b` ($297/month)

---

## 🎉 You're Ready!

Once you add your Supabase credentials to `.env.local` and create the database table, your 14-day free trial system is fully operational!

### Quick Start Commands:

```bash
# Add environment variables
echo "NEXT_PUBLIC_SUPABASE_URL=your-url" >> .env.local
echo "SUPABASE_SERVICE_ROLE_KEY=your-key" >> .env.local

# Create database table (run SQL in Supabase Dashboard)

# Start dev server
npm run dev

# Test at http://localhost:3000/pricing
```

Need help? Check the troubleshooting section or refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Subscriptions Guide](https://stripe.com/docs/billing/subscriptions/trials)


