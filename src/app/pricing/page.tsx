'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function PricingPage() {
  const router = useRouter();
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');


  const handleStartTrial = (plan: string) => {
    router.push(`/start-trial?plan=${plan}`);
  };

  const plans = [
    {
      name: 'Bronze',
      planId: 'bronze',
      emoji: '🥉',
      description: 'Perfect for owner-operators and small civil crews.',
      monthlyPrice: 297,
      features: [
        '5 users included',
        '10 machines',
        '1 admin + 1 supervisor',
        'Prestarts, Timesheets & Safety Reports',
        'Standard email support',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Silver',
      planId: 'silver',
      emoji: '🥈',
      description: 'Great for civil crews growing into medium projects.',
      monthlyPrice: 997,
      features: [
        '10 users included',
        '15 machines',
        '1 admin + 2 supervisors',
        'Everything in Bronze',
        'Priority support',
        'Crank.ai assistant',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Gold',
      planId: 'gold',
      emoji: '🥇',
      description: 'Built for civil companies looking to dominate their industry',
      monthlyPrice: 2497,
      features: [
        'Up to 75 users',
        'Up to 125 machines',
        'Unlimited admins',
        'Unlimited supervisors',
        'All Silver features',
        'Early access to new features',
        'Dedicated account manager',
        'Crank.ai assistant',
      ],
      cta: 'Start Free Trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      planId: null,
      emoji: '🏢',
      description: 'For large companies with multiple divisions',
      monthlyPrice: null,
      features: [
        'Unlimited users & machines',
        'Unlimited supervisors',
        'All Gold features',
        'Onboarding + dedicated support',
        'Tailored integrations',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFF5ED] pt-32 pb-20 sm:pt-40 sm:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-medium">
              Choose the plan that fits your team. All plans include a 14 day free trial — no credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-gradient-to-b from-[#FFF5ED] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Billing Period Toggle */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-full p-2 shadow-inner">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-10 py-3.5 rounded-full font-semibold text-base transition-all duration-200 ${
                  billingPeriod === 'monthly'
                    ? 'bg-white text-gray-900 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingPeriod('yearly')}
                className={`px-10 py-3.5 rounded-full font-semibold text-base transition-all duration-200 ${
                  billingPeriod === 'yearly'
                    ? 'bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly (Save 50%)
              </button>
            </div>
          </div>

          {/* Best Value Banner */}
          {billingPeriod === 'yearly' && (
            <div className="max-w-4xl mx-auto mb-8">
              <div className="bg-white border-2 border-orange-200 rounded-2xl p-6 shadow-lg flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-7 h-7 text-[#FF8C32]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 font-medium leading-relaxed text-base">
                    <span className="font-semibold">Best Value:</span> Get <span className="font-bold">6 months free</span> with annual billing. Lock in your rate and save thousands per year.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-3xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  plan.popular ? 'border-[#FF8C32] lg:scale-110 lg:mb-4' : 'border-gray-100'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="inline-flex items-center px-4 py-1 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white text-sm font-semibold rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* 6 months free banner for yearly */}
                {billingPeriod === 'yearly' && plan.monthlyPrice !== null && (
                  <div className="bg-white border-b-2 border-gray-200 rounded-t-3xl px-6 py-3">
                    <p className="text-sm font-semibold text-[#FF8C32] text-center">6 months free with annual billing</p>
                  </div>
                )}

                <div className={plan.popular ? 'p-10' : 'p-8'}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={plan.popular ? 'text-4xl' : 'text-3xl'}>{plan.emoji}</span>
                    <h3 className={plan.popular ? 'text-3xl font-semibold text-[#1E1E1E]' : 'text-2xl font-semibold text-[#1E1E1E]'}>
                      {plan.name}
                    </h3>
                  </div>
                  <p className={`text-gray-600 ${plan.popular ? 'mb-8 text-lg' : 'mb-6'}`}>{plan.description}</p>

                  <div className={plan.popular ? 'mb-10' : 'mb-8'}>
                    {plan.monthlyPrice === null ? (
                      <div className="text-4xl font-bold text-[#1E1E1E]">Custom</div>
                    ) : billingPeriod === 'yearly' ? (
                      <div className="space-y-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg text-gray-400 line-through">
                            ${(plan.monthlyPrice * 12).toLocaleString()}/year
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <span className={plan.popular ? 'text-6xl font-bold text-[#1E1E1E]' : 'text-5xl font-bold text-[#1E1E1E]'}>
                            ${(plan.monthlyPrice * 6).toLocaleString()}
                          </span>
                          <span className={`text-gray-600 font-medium ${plan.popular ? 'text-xl' : 'text-lg'}`}>/year</span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Equivalent to ${((plan.monthlyPrice * 6) / 12).toFixed(2)}/month (billed annually)
                        </p>
                        <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Save ${(plan.monthlyPrice * 6).toLocaleString()}/year
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className={plan.popular ? 'text-6xl font-bold text-[#1E1E1E]' : 'text-5xl font-bold text-[#1E1E1E]'}>
                          ${plan.monthlyPrice}
                        </span>
                        <span className={`text-gray-600 font-medium ${plan.popular ? 'text-xl' : 'text-lg'}`}>/month</span>
                      </div>
                    )}
                  </div>

                  {plan.planId ? (
                    <button
                      onClick={() => handleStartTrial(plan.planId!)}
                      className={`block w-full text-center rounded-full font-semibold transition-all duration-200 mb-8 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white hover:shadow-xl hover:scale-[1.02] py-4 px-6 text-lg'
                          : 'bg-white border-2 border-gray-200 text-[#1E1E1E] hover:border-[#FF8C32] hover:text-[#FF8C32] py-3 px-6'
                      }`}
                    >
                      {billingPeriod === 'yearly' ? `${plan.cta} Yearly` : plan.cta}
                    </button>
                  ) : (
                    <a
                      href="/support?inquiry=enterprise"
                      className="block w-full text-center py-3 px-6 rounded-full font-semibold transition-all duration-200 mb-8 bg-white border-2 border-gray-200 text-[#1E1E1E] hover:border-[#FF8C32] hover:text-[#FF8C32]"
                    >
                      {plan.cta}
                    </a>
                  )}

                  <div className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 text-[#FF8C32] flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
                Do I need a credit card for the free trial?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                No! You can start your 14 day free trial without entering any payment information. We&apos;ll only ask for payment details if you decide to continue after the trial.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">
                Can I switch plans later?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle, and we&apos;ll prorate any differences.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">
                What happens if I go over my user limit?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                If you exceed your plan&apos;s user limit, we&apos;ll notify you and help you upgrade to a plan that better fits your needs. You won&apos;t be charged extra without your approval.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">
                Is there a long-term contract?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                No contracts required! You can cancel your subscription at any time. Monthly plans can be cancelled before the next billing cycle, and annual plans can be cancelled for a prorated refund.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-white via-[#FFF5ED] to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-8 tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed">
            Start your free 14 day trial today. No credit card required.
          </p>
          <div className="flex flex-col items-center gap-4">
            <a 
              href="/start-trial#signup-form" 
              className="inline-flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-sm sm:text-base rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <span className="text-center">Start 14-Day Trial - No Credit Card Required</span>
              <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#E67E22] flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
            <p className="text-sm text-gray-500">
              Get started in minutes
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      </div>
    </div>
  );
}

