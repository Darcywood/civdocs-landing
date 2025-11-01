import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-09-30.clover",
});

// Helper function to get plan tier from price ID
function getPlanTierFromPriceId(priceId: string): string {
  switch (priceId) {
    case "price_1SInQcEYzJYgVIMo6QFVXlsm": // Bronze test
    case "price_1SHeylEYzJYgVIMo4VLSJprk": // Bronze prod
      return "bronze";
    case "price_1SInR7EYzJYgVIMoKHwDNfvf": // Silver test
    case "price_1SHf6nEYzJYgVIMo7tAJ3zbV": // Silver prod
      return "silver";
    case "price_1SInRKEYzJYgVIMoLjCRR76o": // Gold test
    case "price_1SHf82EYzJYgVIMo1Vfitt1b": // Gold prod
      return "gold";
    default:
      return "bronze";
  }
}

export async function POST(req: Request) {
  try {
    // Parse request body for priceId, email, and orgId
    const { priceId, email, orgId } = await req.json();

    if (!priceId || !email) {
      return NextResponse.json(
        { error: "Missing required fields: priceId and email" },
        { status: 400 }
      );
    }

    // Find or create Stripe customer based on email
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: email,
      });
    }

    // Create setup intent for subscription with trial
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      payment_method_types: ['card'],
      usage: 'off_session',
    });

    // Create subscription without trial (post-trial activation)
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      metadata: {
        orgId: orgId,
        planTier: getPlanTierFromPriceId(priceId),
      },
    });

    return NextResponse.json({ 
      client_secret: setupIntent.client_secret,
      subscription_id: subscription.id 
    });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}


