'use client';

import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { CardElement as StripeCardElement } from '@stripe/stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1E1E1E',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      '::placeholder': {
        color: '#9CA3AF',
      },
    },
    invalid: {
      color: '#EF4444',
    },
  },
  hidePostalCode: true,
};

const plans = [
  {
    name: 'Bronze',
    priceId: 'price_1SHeylEYzJYgVIMo4VLSJprk',
    emoji: '🥉',
    description: 'Perfect for small teams getting started',
    monthlyPrice: 97,
  },
  {
    name: 'Silver',
    priceId: 'price_1SHf6nEYzJYgVIMo7tAJ3zbV',
    emoji: '🥈',
    description: 'For growing teams that need more',
    monthlyPrice: 197,
  },
  {
    name: 'Gold',
    priceId: 'price_1SHf82EYzJYgVIMo1Vfitt1b',
    emoji: '🥇',
    description: 'Advanced features for larger teams',
    monthlyPrice: 297,
  },
];

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  
  const [email, setEmail] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setError('Card element not found');
      setIsLoading(false);
      return;
    }

    try {
      // First, create the checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: selectedPlan.priceId,
          email: email,
        }),
      });

      const { client_secret, subscription_id } = await response.json();

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }

      // Confirm the card setup
      const { error: stripeError } = await stripe.confirmCardSetup(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: email,
          },
        },
      });

      if (stripeError) {
        console.error('Stripe error:', stripeError);
        setError(stripeError.message || 'Payment setup failed');
      } else {
        setSuccess(true);
        console.log('Payment setup successful! Subscription ID:', subscription_id);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Welcome to {selectedPlan.name}!</h3>
        <p className="text-gray-600 mb-6">
          Your 14-day free trial has started. You won't be charged until {new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}.
        </p>
        <a 
          href="https://app.civdocs.com" 
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold rounded-xl shadow-sm hover:opacity-90 transition-all"
        >
          Go to Dashboard →
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Upgrade Your Plan</h2>
        <p className="text-gray-600">Add your card to continue using CivDocs after your 14-day trial.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Plan Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Choose Your Plan</label>
          <div className="space-y-3">
            {plans.map((plan) => (
              <div
                key={plan.priceId}
                className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedPlan.priceId === plan.priceId
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{plan.emoji}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{plan.name}</h3>
                      <p className="text-sm text-gray-600">{plan.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">${plan.monthlyPrice}</div>
                    <div className="text-sm text-gray-500">/month</div>
                  </div>
                </div>
                {selectedPlan.priceId === plan.priceId && (
                  <div className="absolute top-2 right-2">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            placeholder="your@email.com"
          />
        </div>

        {/* Card Element */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Information
          </label>
          <div className="p-4 border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition-colors">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!stripe || isLoading}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold rounded-xl px-6 py-3 shadow-sm hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : (
            'Start 14-Day Free Trial →'
          )}
        </button>

        {/* Trial Info */}
        <p className="text-center text-sm text-gray-500">
          Your trial is free for 14 days. You won't be charged until it ends.
        </p>
      </form>
    </div>
  );
}
