'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

export default function PricingPage() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

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
    setIsResourcesDropdownOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    document.body.classList.add('overflow-hidden');
  };

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  const toggleResourcesDropdown = () => {
    setIsResourcesDropdownOpen(!isResourcesDropdownOpen);
  };

  const handleStartTrial = (plan: string) => {
    router.push(`/start-trial?plan=${plan}`);
  };

  const plans = [
    {
      name: 'Bronze',
      planId: 'bronze',
      emoji: '🥉',
      description: 'Perfect for owner-operators and small civil crews.',
      monthlyPrice: 197,
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
      monthlyPrice: 297,
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
      description: 'Built for expanding civil companies needing tier-one professionalism.',
      monthlyPrice: 397,
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
      {/* Sticky Header */}
      <header className="sticky top-0 z-[80] bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <OptimizedImage src="/CivDocs no lift.svg" alt="CivDocs" width={200} height={64} className="h-16 w-auto" />
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
                <a href="/pricing" className="text-[#FF8C32] transition-all duration-300 font-medium text-base relative group">
                  Pricing
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF8C32]"></span>
                </a>
                <a href="/reporting" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-base relative group">
                  Reporting
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#resources" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-base relative group">
                  Resources
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="/support" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-base relative group">
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
                          <h3 className="text-[16px] font-semibold text-[#111827] leading-[1.25] tracking-[-0.01em]">Cost tracking</h3>
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">Track project expenses and costs in real-time</p>
                        </a>
                        <a
                          href="/crank-ai" 
                          onClick={closeMobileMenu}
                          className="block rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                        >
                          <h3 className="text-[16px] font-semibold text-[#111827] leading-[1.25] tracking-[-0.01em]">Crank.ai</h3>
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">AI-powered assistant to streamline your workflow</p>
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
                    <span className="text-[16px] font-medium text-[#FF8C32]">Pricing</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
                  
                {/* Resources Dropdown */}
                <div>
                  <button 
                    onClick={toggleResourcesDropdown}
                    className="w-full flex items-center justify-between py-5 text-left"
                  >
                    <span className="text-[16px] font-medium text-gray-600">Resources</span>
                    <svg 
                      className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${
                        isResourcesDropdownOpen ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Resources Dropdown */}
                  <AnimatePresence>
                    {isResourcesDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pb-4 pt-2 space-y-3 overflow-hidden"
                      >
                        <a 
                          href="/guides" 
                          onClick={closeMobileMenu}
                          className="block rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                        >
                          <h3 className="text-[16px] font-semibold text-[#111827] leading-[1.25] tracking-[-0.01em]">Guides</h3>
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">Step-by-step guides to help you get started</p>
                        </a>
                        <a
                          href="/video-tutorials" 
                          onClick={closeMobileMenu}
                          className="block rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                        >
                          <h3 className="text-[16px] font-semibold text-[#111827] leading-[1.25] tracking-[-0.01em]">Video Tutorials</h3>
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">Watch video tutorials to master CivDocs</p>
                        </a>
                        <a
                          href="/free-tools" 
                          onClick={closeMobileMenu}
                          className="block rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                        >
                          <h3 className="text-[16px] font-semibold text-[#111827] leading-[1.25] tracking-[-0.01em]">Free Tools</h3>
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">Free tools and calculators for your projects</p>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                  
                {/* Support */}
                <div>
                  <a 
                    href="/support" 
                    onClick={closeMobileMenu}
                    className="w-full flex items-center justify-between py-5"
                  >
                    <span className="text-[16px] font-medium text-gray-600">Support</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
                    <span className="font-semibold">Best Value:</span> Get <span className="font-bold">6 months free</span> with annual billing. Lock in your rate and save hundreds per year.
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
                  plan.popular ? 'border-[#FF8C32] lg:scale-110 lg:-mt-4 lg:mb-4' : 'border-gray-100'
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
                  <div className="bg-orange-100 border-b-2 border-orange-300 rounded-t-3xl px-6 py-3 shadow-sm">
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
                      href="#contact"
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

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-3">
                Do you offer discounts for non-profits or educational institutions?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! We offer special pricing for non-profit organizations and educational institutions. Please contact our sales team to learn more about our discount programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-b from-white to-[#FFF5ED]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-8 tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed">
            Start your free 14 day trial today. No credit card required.
          </p>
          <a 
            href="https://app.civdocs.com/auth/signup" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Free Trial →
          </a>
          <p className="text-sm text-gray-500 mt-4">
            Try all features free for 14 days • Cancel anytime • 24/7 support
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E1E1E] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <OptimizedImage src="/CivDocs no lift.svg" alt="CivDocs" width={150} height={40} className="h-10 mb-6 brightness-0 invert" />
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
                <a href="/support" className="block text-gray-400 hover:text-white transition-colors">
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

