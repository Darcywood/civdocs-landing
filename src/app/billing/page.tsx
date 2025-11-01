'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements, CardNumberElement } from '@stripe/react-stripe-js';
import { createClient } from "@supabase/supabase-js";
import CardFields from './CardFields';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


// Checkout Form Component (internal)
function CheckoutFormInternal() {
  const stripe = useStripe();
  const elements = useElements();
  const searchParams = useSearchParams();
  
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Supabase integration state
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const orgId = searchParams.get('org_id') || '';

  // Fetch organization's current plan from Supabase
  useEffect(() => {
    if (!orgId) {
      // Fallback to URL param or default if no org_id
      const fallbackPlan = searchParams.get('plan') || 'bronze';
      setCurrentPlan(fallbackPlan);
      setSelectedPlan(fallbackPlan);
      setLoading(false);
      return;
    }

    const fetchPlan = async () => {
      try {
        const { data, error } = await supabase
          .from("organizations")
          .select("plan_tier")
          .eq("id", orgId)
          .single();
        
        if (error) {
          console.error("Failed to load plan:", error);
          // Fallback to URL param or default
          const fallbackPlan = searchParams.get('plan') || 'bronze';
          setCurrentPlan(fallbackPlan);
          setSelectedPlan(fallbackPlan);
        } else {
          setCurrentPlan(data.plan_tier);
          setSelectedPlan(data.plan_tier);
        }
      } catch (err) {
        console.error("Error fetching plan:", err);
        // Fallback to URL param or default
        const fallbackPlan = searchParams.get('plan') || 'bronze';
        setCurrentPlan(fallbackPlan);
        setSelectedPlan(fallbackPlan);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [orgId, searchParams]);

  // Plan data structure
  const plans = {
    bronze: {
      name: "Bronze",
      price: 97,
      description: "Perfect for small teams getting started.",
      priceId: "price_1SInQcEYzJYgVIMo6QFVXlsm", // NEW TEST PRICE ID
      // OLD: price_1SHeylEYzJYgVIMo4VLSJprk
      features: [
        "Up to 10 users",
        "Up to 20 machines",
        "1 supervisor",
      ],
    },
    silver: {
      name: "Silver",
      price: 197,
      description: "A solid step up for busy teams.",
      priceId: "price_1SInR7EYzJYgVIMoKHwDNfvf", // NEW TEST PRICE ID
      // OLD: price_1SHf6nEYzJYgVIMo7tAJ3zbV
      features: [
        "Up to 15 users",
        "Up to 30 machines",
        "2 supervisors",
      ],
    },
    gold: {
      name: "Gold",
      price: 297,
      description: "The ultimate plan for crews that mean business.",
      priceId: "price_1SInRKEYzJYgVIMoLjCRR76o", // NEW TEST PRICE ID
      // OLD: price_1SHf82EYzJYgVIMo1Vfitt1b
      features: [
        "Up to 75 users",
        "Up to 200 machines",
        "Unlimited supervisors",
      ],
    },
  };


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const cardNumberElement = elements.getElement(CardNumberElement);
    
    if (!cardNumberElement) {
      setError('Card element not found');
      setIsLoading(false);
      return;
    }

    try {
      // Call the checkout API
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: plans[selectedPlan as keyof typeof plans].priceId,
          email: email,
          orgId: orgId,
        }),
      });

      const { client_secret, subscription_id } = await response.json();

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }

      // Confirm the card setup
      const { error: stripeError } = await stripe.confirmCardSetup(client_secret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            email: email,
          },
        },
      });

      if (stripeError) {
        console.error('Stripe error:', stripeError);
        setError(stripeError.message || 'Payment setup failed');
      } else {
        // Update Supabase organization plan if orgId exists
        if (orgId && selectedPlan) {
          try {
            const { error: updateError } = await supabase
              .from("organizations")
              .update({ plan_tier: selectedPlan })
              .eq("id", orgId);
            
            if (updateError) {
              console.error('Failed to update organization plan:', updateError);
              // Don't fail the whole process, just log the error
            } else {
              // Update local state to reflect the change
              setCurrentPlan(selectedPlan);
            }
          } catch (updateErr) {
            console.error('Error updating organization plan:', updateErr);
          }
        }
        
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
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">✅ {plans[selectedPlan as keyof typeof plans].name} subscription activated!</h3>
        <p className="text-gray-600 mb-6">
          You can now log back into CivDocs.
        </p>
        <a 
          href="https://app.civdocs.com.au/login" 
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold rounded-xl shadow-sm hover:opacity-90 transition-all"
        >
          Return to CivDocs →
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-orange-50 py-10">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">Add Your Card to Continue Using CivDocs</h2>
          <p className="text-gray-600">Your free trial has ended. Enter your payment details below to activate your subscription and keep full access to your account.</p>
        </div>

        {/* Plan Selector */}
        <div className="space-y-5">
          {/* Plan Header */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              Your current plan is {currentPlan ? currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1) : "Loading..."}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Select a different plan if you&apos;d like to upgrade or downgrade.
            </p>
          </div>

          {/* Segmented Plan Buttons */}
          {loading ? (
            <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1 rounded-xl shadow-inner">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg py-2 bg-gray-200 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1 rounded-xl shadow-inner">
              {Object.keys(plans).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedPlan(key)}
                  className={`rounded-lg py-2 text-sm font-medium transition ${
                    selectedPlan === key
                      ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow"
                      : "text-gray-700 hover:bg-white"
                  }`}
                >
                  {plans[key as keyof typeof plans].name}
                </button>
              ))}
            </div>
          )}

          {/* Plan Summary Card */}
          {loading ? (
            <div className="flex flex-col bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <div className="animate-pulse space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-24"></div>
                  <div className="h-3 bg-gray-200 rounded w-28"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          ) : selectedPlan ? (
            <div className="flex flex-col bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-800">{plans[selectedPlan as keyof typeof plans].name} Plan</p>
                  <p className="text-sm text-gray-600">{plans[selectedPlan as keyof typeof plans].description}</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  ${plans[selectedPlan as keyof typeof plans].price}
                  <span className="text-base text-gray-500 font-medium">/month</span>
                </p>
              </div>
              
              {/* Features List */}
              <ul className="mt-3 space-y-1 text-sm text-gray-700">
                {plans[selectedPlan as keyof typeof plans].features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 text-orange-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors text-gray-900 font-medium placeholder:text-gray-400"
              placeholder="your@email.com"
            />
          </div>

          {/* Card Fields Block */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 shadow-inner">
            <CardFields />
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
            className="w-full bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold py-3 rounded-xl shadow hover:shadow-lg hover:translate-y-[1px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              'Activate Subscription →'
            )}
          </button>

          {/* Stripe Trust Badge Divider */}
          <div className="border-t border-gray-200 mt-6 pt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0V10.5m11.25 0h-13.5a.75.75 0 00-.75.75v8.25a.75.75 0 00.75.75h13.5a.75.75 0 00.75-.75V11.25a.75.75 0 00-.75-.75z"
              />
            </svg>
            <span>
              Payments secured and powered by{" "}
              <span className="font-semibold text-[#635BFF]">Stripe</span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BillingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsProductDropdownOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    document.body.classList.add('overflow-hidden');
  };

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };


  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Sticky Header */}
      <header className="sticky top-0 z-[80] bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image src="/CivDocs no lift.svg" alt="CivDocs" width={200} height={64} className="h-16 w-auto" />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <nav className="flex items-center space-x-8">
                <div className="relative group">
                  <button className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-base relative">
                  Product
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </div>
                <a href="/pricing" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-base relative group">
                  Pricing
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="/reporting" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-base relative group">
                  Reporting
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#resources" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-base relative group">
                  Resources
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#support" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-base relative group">
                  Support
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </nav>
              
              {/* Login Button */}
              <a 
                href="#login" 
                className="text-[#1E1E1E] hover:text-[#FF8C32] transition-colors duration-300 font-medium text-base px-4 py-2 rounded-full"
              >
                Login
              </a>
              
              {/* CTA Button */}
              <a 
                href="https://app.civdocs.com/auth/signup" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-base rounded-full hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-out"
              >
                Start Free Trial →
              </a>
            </div>
            
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                aria-label="Toggle mobile menu"
              >
                <div className="w-5 h-5 relative flex items-center justify-center">
                  <span className={`absolute w-5 h-[2px] bg-gray-900 rounded-full transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'rotate-45' : '-translate-y-1.5'
                  }`}></span>
                  <span className={`absolute w-5 h-[2px] bg-gray-900 rounded-full transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`absolute w-5 h-[2px] bg-gray-900 rounded-full transition-all duration-300 ease-in-out ${
                    isMobileMenuOpen ? '-rotate-45' : 'translate-y-1.5'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Humlytics Style with Framer Motion */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            {/* Backdrop - below header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.15,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="fixed inset-0 top-[88px] bg-black/20 z-[70] lg:hidden"
              onClick={closeMobileMenu}
            />
        
            {/* Menu Card - drops down from header */}
            <motion.div
              key="mobile-menu"
              initial={{ 
                opacity: 0,
                scale: 0.96,
                y: -8
              }}
              animate={{ 
                opacity: 1,
                scale: 1,
                y: 0
              }}
              exit={{ 
                opacity: 0,
                scale: 0.96,
                y: -8
              }}
              transition={{ 
                duration: 0.18,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="fixed top-[88px] left-4 right-4 z-[75] bg-gray-50 rounded-3xl shadow-2xl overflow-hidden lg:hidden max-h-[calc(100vh-7rem)] overflow-y-auto"
            >

              {/* Menu content */}
              <div className="px-8 py-8 space-y-2">
                {/* Product Dropdown */}
                <div>
                  <button 
                    onClick={toggleProductDropdown}
                    className="w-full flex items-center justify-between py-5 text-left"
                  >
                    <span className="text-[16px] font-medium text-gray-600">Product</span>
                    <svg 
                      className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${
                        isProductDropdownOpen ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Product Dropdown */}
                  <AnimatePresence>
                    {isProductDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pb-4 pt-2 space-y-3 overflow-hidden"
                      >
                        <a 
                          href="/prestarts" 
                          onClick={closeMobileMenu}
                          className="block rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                        >
                          <h3 className="text-[16px] font-semibold text-[#111827] leading-[1.25] tracking-[-0.01em]">Pre-Starts</h3>
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">Complete safety checks in 3 simple steps</p>
                        </a>
                        <a
                          href="/timesheets" 
                          onClick={closeMobileMenu}
                          className="block rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                        >
                          <h3 className="text-[16px] font-semibold text-[#111827] leading-[1.25] tracking-[-0.01em]">Timesheets</h3>
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">Log crew hours quickly and accurately</p>
                        </a>
                        <a
                          href="/reporting" 
                          onClick={closeMobileMenu}
                          className="block rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                        >
                          <h3 className="text-[16px] font-semibold text-[#111827] leading-[1.25] tracking-[-0.01em]">Reporting</h3>
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">Generate comprehensive reports and analytics</p>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                  
                {/* Pricing */}
                <div>
                  <a 
                    href="/pricing" 
                    onClick={closeMobileMenu}
                    className="w-full flex items-center justify-between py-5"
                  >
                    <span className="text-[16px] font-medium text-gray-600">Pricing</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
                  
                {/* Resources */}
                <div>
                  <a 
                    href="#resources" 
                    onClick={closeMobileMenu}
                    className="w-full flex items-center justify-between py-5"
                  >
                    <span className="text-[16px] font-medium text-gray-600">Resources</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
                  
                {/* Support */}
                <div>
                  <a 
                    href="#support" 
                    onClick={closeMobileMenu}
                    className="w-full flex items-center justify-between py-5"
                  >
                    <span className="text-[16px] font-medium text-gray-600">Support</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>

                {/* Action Buttons */}
                <div className="pt-8 space-y-4">
                  <button 
                    onClick={closeMobileMenu}
                    className="w-full rounded-full border border-gray-200 py-4 text-lg font-semibold text-gray-800 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Login
                  </button>
                  
                  <a
                    href="https://app.civdocs.com/auth/signup"
                    onClick={closeMobileMenu}
                    className="block w-full rounded-full py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#FF8C32] to-[#F5B041] hover:shadow-lg transition-all duration-300 text-center"
                  >
                    Start Free Trial →
                  </a>
                  
                  <p className="text-center text-sm text-gray-500 pt-2">No credit card required</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Form */}
      <section className="min-h-screen bg-gradient-to-b from-white to-[#FFF5ED] flex items-center justify-center py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <Elements stripe={stripePromise}>
                <Suspense fallback={<div className="text-center py-8 text-gray-600">Loading...</div>}>
                  <CheckoutFormInternal />
                </Suspense>
              </Elements>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E1E1E] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Have questions? We&apos;ve got answers.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">
                When will I be charged?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your subscription will be activated immediately after adding your payment method. You&apos;ll be charged monthly starting today.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! You can cancel your subscription at any time. Your access will continue until the end of your current billing period.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">
                Can I change plans later?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and we&apos;ll prorate any differences.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                We accept all major credit cards (Visa, MasterCard, American Express) and debit cards through our secure Stripe payment processing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-white to-[#FFF5ED]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-8 tracking-tight">
            Need Help?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed">
            Our support team is here to help you get back to managing your projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@civdocs.com" 
              className="inline-flex items-center px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold text-lg rounded-xl hover:border-orange-500 hover:text-orange-500 transition-all"
            >
              Contact Support
            </a>
            <a 
              href="https://app.civdocs.com.au/login" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold text-lg rounded-xl hover:opacity-90 transition-all"
            >
              Back to CivDocs →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E1E1E] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <Image src="/CivDocs no lift.svg" alt="CivDocs" width={150} height={40} className="h-10 mb-6 brightness-0 invert" />
              <p className="text-gray-400 leading-relaxed">
                Simplifying civil construction management for teams everywhere.
              </p>
            </div>
            <div className="md:text-right">
              <div className="space-y-3">
                <a href="#privacy" className="block text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="#terms" className="block text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="#support" className="block text-gray-400 hover:text-white transition-colors">
                  Support
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 CivDocs. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
