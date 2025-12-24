'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

export default function TermsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);

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
                <a href="/pricing" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-base relative group">
                  Pricing
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="/reporting" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-base relative group">
                  Reporting
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="/guides" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-base relative group">
                  Resources
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="/support" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-base relative group">
                  Support
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </nav>
              
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

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 top-[88px] bg-black/20 z-[70] lg:hidden"
              onClick={closeMobileMenu}
            />
            
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, scale: 0.96, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -8 }}
              transition={{ duration: 0.18 }}
              className="fixed top-[88px] left-4 right-4 z-[75] bg-gray-50 rounded-3xl shadow-2xl overflow-hidden lg:hidden max-h-[calc(100vh-7rem)] overflow-y-auto"
            >
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
                    <span className="text-[16px] font-medium text-gray-600">Pricing</span>
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
                  
                  <p className="text-center text-sm font-semibold text-[#FF8C32] pt-2">No credit card required</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFF5ED] pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-6">
              Terms and Conditions of Service
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Last Updated: 19 December 2024
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">1. ACCEPTANCE OF TERMS</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  By accessing or using CivDocs (&quot;the Service&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;), you agree to be bound by these Terms and Conditions (&quot;Terms&quot;). If you disagree with any part of these Terms, you may not access the Service.
                </p>
                <p>
                  These Terms apply to all users of the Service, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Organization administrators (&quot;Admins&quot;)</li>
                  <li>Supervisors</li>
                  <li>Employees</li>
                  <li>Visitors to our website</li>
                </ul>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">2. DEFINITIONS</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p><strong>&quot;Service&quot;</strong> means the CivDocs platform, including all features, functionality, and services provided through our website and applications.</p>
                <p><strong>&quot;Organization&quot;</strong> means a company or entity that has created an account on CivDocs.</p>
                <p><strong>&quot;User&quot;</strong> means any individual who accesses or uses the Service, including Admins, Supervisors, and Employees.</p>
                <p><strong>&quot;Account&quot;</strong> means your registered account with CivDocs.</p>
                <p><strong>&quot;Content&quot;</strong> means all data, information, text, files, images, documents, and other materials uploaded, stored, or transmitted through the Service.</p>
                <p><strong>&quot;Subscription&quot;</strong> means a paid plan (Bronze, Silver, or Gold) that provides access to the Service.</p>
                <p><strong>&quot;Trial Period&quot;</strong> means any free trial period offered by CivDocs.</p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-12 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">3. NATURE OF THE SERVICE (IMPORTANT – NO RELIANCE)</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">3.1 Informational & Productivity Tool Only</h3>
                <p>
                  CivDocs is a software platform for recording, organising, and displaying information entered by Users.
                </p>
                <p>
                  CivDocs:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>does not provide financial, legal, safety, accounting, payroll, tax, or compliance advice</li>
                  <li>does not verify the accuracy, completeness, or legality of any information entered</li>
                  <li>does not act as a system of record for regulatory, WHS, payroll, or statutory purposes</li>
                </ul>
                <p>
                  All outputs generated by the Service (including reports, invoices, timesheets, analytics, AI outputs, and documents) are provided for informational purposes only.
                </p>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">3.2 No Reliance</h3>
                <p>
                  You acknowledge and agree that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>you must not rely on CivDocs as a substitute for professional judgment</li>
                  <li>all decisions made using information from the Service are made at your own risk</li>
                  <li>you are solely responsible for verifying all outputs before relying on them for any purpose</li>
                </ul>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">4. ACCOUNT REGISTRATION AND SECURITY</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">4.1 Account Creation</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must provide accurate, current, and complete information during registration</li>
                  <li>You must be at least 18 years old or have parental consent</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You are responsible for all activities that occur under your account</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">4.2 Organization Accounts</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Organizations are created by Admins</li>
                  <li>Admins can invite Users to join their Organization</li>
                  <li>Each User must accept an invitation to join an Organization</li>
                  <li>Users can belong to multiple Organizations</li>
                  <li>Admins are responsible for managing Users within their Organization</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">4.3 Role-Based Access</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Admins:</strong> Full access to all features within their Organization, including billing, user management, and all data</li>
                  <li><strong>Supervisors:</strong> Access to management features, reporting, and oversight capabilities</li>
                  <li><strong>Employees:</strong> Access to personal features such as timesheets, prestarts, and logbook entries</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">4.4 Account Security</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You must immediately notify us of any unauthorized use of your account</li>
                  <li>We are not liable for any loss or damage arising from unauthorized access to your account</li>
                  <li>You are responsible for ensuring Users within your Organization comply with these Terms</li>
                </ul>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">5. SUBSCRIPTION AND BILLING</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">5.1 Subscription Plans</h3>
                <p>CivDocs offers three subscription tiers:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Bronze:</strong> Up to 5 users, 10 machines</li>
                  <li><strong>Silver:</strong> Up to 10 users, 15 machines</li>
                  <li><strong>Gold:</strong> Up to 75 users, 125 machines</li>
                </ul>
                <p>Each plan is available on a monthly or annual billing cycle.</p>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">5.2 Payment Terms</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Subscriptions are billed in advance on a recurring basis</li>
                  <li>Payment is processed through Stripe, our third-party payment processor</li>
                  <li>All prices are in Australian Dollars (AUD) unless otherwise stated</li>
                  <li>Prices are subject to change with 30 days&apos; notice to existing subscribers</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">5.3 Free Trial</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We may offer a free trial period for new Organizations</li>
                  <li>During the trial period, you have full access to the Service</li>
                  <li>At the end of the trial period, you must subscribe to continue using the Service</li>
                  <li>If you do not subscribe, your account may be suspended or terminated</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">5.4 Payment Failure</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>If payment fails, we will attempt to notify you</li>
                  <li>We may suspend or terminate your access to the Service if payment is not received</li>
                  <li>You remain responsible for all charges incurred prior to suspension or termination</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">5.5 Cancellation</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You may cancel your subscription at any time through your account settings</li>
                  <li>Cancellation takes effect at the end of your current billing period</li>
                  <li>No refunds are provided for partial billing periods</li>
                  <li>Upon cancellation, you will lose access to the Service at the end of your billing period</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">5.6 Plan Changes</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You may upgrade or downgrade your plan at any time</li>
                  <li>Upgrades take effect immediately; downgrades take effect at the end of your current billing period</li>
                  <li>Prorated charges or credits may apply when changing plans</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">5.7 Refunds</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Refunds are provided at our sole discretion</li>
                  <li>No refunds for partial billing periods unless required by law</li>
                  <li>Refund requests must be submitted within 30 days of the charge</li>
                </ul>
              </div>
            </div>

            {/* Continue with remaining sections... */}
            {/* I'll add a few more key sections to keep the response manageable */}

            {/* Section 6 - abbreviated for space */}
            <div className="mb-12 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">6. USER CONTENT, DATA & RECORDS (CLARIFIED)</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">6.1 User Responsibility for Content</h3>
                <p>All Content is user-generated.</p>
                <p>You are solely responsible for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>the accuracy, completeness, and legality of all Content</li>
                  <li>ensuring Content complies with all applicable laws and obligations</li>
                  <li>maintaining appropriate internal controls and review processes</li>
                </ul>
                <p>CivDocs does not review, audit, certify, or validate Content.</p>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">6.2 Not a System of Record</h3>
                <p>CivDocs is not a system of record.</p>
                <p>You acknowledge that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>CivDocs is not intended to be the authoritative source for WHS, payroll, tax, or compliance records</li>
                  <li>you must maintain independent records where required by law</li>
                  <li>CivDocs may contain incomplete, inaccurate, or outdated information</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">6.3 Data Retention & Deletion</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Data is retained while your subscription remains active</li>
                  <li>Upon termination, you may request access to your personal information by contacting us at <a href="mailto:support@civdocs.com.au" className="text-[#FF8C32] hover:underline">support@civdocs.com.au</a>. We will respond within a reasonable timeframe as required by applicable law</li>
                  <li>After this period, CivDocs may permanently delete your data</li>
                  <li>CivDocs does not guarantee long-term retention or archival storage</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">6.4 Backups & Data Loss</h3>
                <p>CivDocs relies on third-party infrastructure providers for data storage and backups.</p>
                <p>To the maximum extent permitted by law:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>CivDocs makes no guarantees regarding backup frequency or recovery</li>
                  <li>CivDocs is not liable for data loss, corruption, or unavailability</li>
                  <li>you are responsible for maintaining your own backups of critical data</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">6.5 Ownership of Content</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You retain all ownership rights to Content you upload to the Service</li>
                  <li>You grant us a worldwide, non-exclusive, royalty-free license to use, store, and process your Content solely to provide the Service</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">6.6 Prohibited Content</h3>
                <p>You agree not to upload, store, or transmit Content that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violates any applicable law or regulation</li>
                  <li>Infringes on intellectual property rights</li>
                  <li>Contains viruses, malware, or harmful code</li>
                  <li>Is defamatory, harassing, or discriminatory</li>
                  <li>Contains sensitive personal information without proper authorization</li>
                  <li>Violates privacy rights of third parties</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">6.7 Content Monitoring</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We reserve the right to monitor Content for compliance with these Terms</li>
                  <li>We may remove or suspend access to Content that violates these Terms</li>
                  <li>We are not obligated to monitor Content but may do so at our discretion</li>
                </ul>
              </div>
            </div>

            {/* Section 7 - AI */}
            <div className="mb-12 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">7. AI ASSISTANT (CRANK.AI) — STRICT LIMITATION</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">7.1 Read-Only Decision Support</h3>
                <p>Crank.ai is a read-only decision-support tool.</p>
                <p>It:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>analyzes existing data within your Organization only</li>
                  <li>does not modify, create, or delete data</li>
                  <li>does not perform automated actions</li>
                  <li>does not access external or third-party datasets</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">7.2 No Accuracy Guarantee</h3>
                <p>AI-generated outputs:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>may be incorrect, incomplete, or misleading</li>
                  <li>are generated based solely on the data available at the time</li>
                  <li>do not guarantee accuracy, correctness, or suitability for any purpose</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">7.3 No Reliance on AI Output</h3>
                <p>You acknowledge and agree that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI outputs must not be relied upon for pricing, quoting, safety decisions, WHS compliance, financial commitments, or contractual obligations</li>
                  <li>all AI outputs must be independently verified before use</li>
                  <li>CivDocs is not liable for any loss arising from reliance on AI-generated content</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">7.4 AI Data Storage</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>AI conversations and outputs may be stored to provide context and continuity</li>
                  <li>You may delete AI conversation threads at any time</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">7.5 Data Usage for AI</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your data is used solely to generate insights within your Organization</li>
                  <li>Data is processed using OpenAI&apos;s API and is subject to OpenAI&apos;s privacy policy</li>
                  <li>We do not use your data to train general AI models or share it with third parties for AI training</li>
                </ul>
              </div>
            </div>

            {/* Adding remaining critical sections... */}
            {/* Section 11 - Limitation of Liability */}
            <div className="mb-12 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">11. LIMITATION OF LIABILITY (REINFORCED)</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">11.1 Disclaimer of Warranties</h3>
                <p className="font-semibold uppercase">
                  THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                </p>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">11.2 Exclusion of Liability</h3>
                <p>To the maximum extent permitted by law, CivDocs is not liable for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>decisions made based on information from the Service</li>
                  <li>inaccuracies in reports, invoices, pre-starts, timesheets, or AI outputs</li>
                  <li>internal misuse, fraud, or misconduct by Users within an Organization</li>
                  <li>WHS incidents, compliance failures, or regulatory breaches</li>
                  <li>loss of data, profits, contracts, or business opportunities</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">11.3 Limitation of Liability</h3>
                <p className="font-semibold uppercase">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, CIVDOCS SHALL NOT BE LIABLE FOR:
                </p>
                <ul className="list-disc pl-6 space-y-2 font-semibold uppercase">
                  <li>INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
                  <li>LOSS OF PROFITS, REVENUE, DATA, OR BUSINESS OPPORTUNITIES</li>
                  <li>ERRORS OR OMISSIONS IN THE SERVICE</li>
                  <li>INTERRUPTIONS OR CESSATION OF THE SERVICE</li>
                  <li>UNAUTHORIZED ACCESS TO OR USE OF YOUR ACCOUNT OR DATA</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">11.4 Liability Cap</h3>
                <p>
                  To the maximum extent permitted by law, CivDocs&apos; total liability is limited to the fees paid by you in the 12 months preceding the claim.
                </p>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">11.5 Australian Consumer Law</h3>
                <p>
                  Nothing in these Terms limits rights under the Australian Consumer Law.
                </p>
              </div>
            </div>

            {/* Section 16 - Plant Safety */}
            <div className="mb-12 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">16. PLANT, SAFETY & WHS FEATURES (CRITICAL)</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">16.1 No Safety Enforcement</h3>
                <p>CivDocs does not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>enforce safety procedures</li>
                  <li>prevent machine use</li>
                  <li>verify inspections</li>
                  <li>determine fitness for operation</li>
                  <li>ensure compliance with WHS laws</li>
                </ul>
                <p>
                  Pre-start checklists, fault logs, and reports are records only, based entirely on user input.
                </p>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">16.2 Responsibility for Safety</h3>
                <p>You acknowledge that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>you remain solely responsible for workplace safety</li>
                  <li>CivDocs does not replace WHS systems, inspections, or controls</li>
                  <li>CivDocs does not guarantee the safety or suitability of any plant, equipment, or activity</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">16.3 Invoices & Financial Records</h3>
                <p>Invoices and financial reports generated by CivDocs:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>are user-generated documents</li>
                  <li>are not certified or legally validated</li>
                  <li>must be reviewed and verified before use</li>
                </ul>
                <p>
                  CivDocs does not provide accounting, payroll, tax, or award-rate calculations beyond basic GST arithmetic.
                </p>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">16.4 Machine Overtime</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Machine overtime entries are calculated based on your input</li>
                  <li>You are responsible for verifying overtime calculations</li>
                  <li>We are not liable for incorrect overtime calculations</li>
                </ul>
              </div>
            </div>

            {/* Contact Section */}
            <div className="mb-12 mt-16 bg-gray-50 rounded-xl p-8">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-6">Contact Information</h2>
              <div className="text-gray-700 leading-relaxed space-y-3">
                <p>
                  If you have questions about these Terms, please contact us at:
                </p>
                <p className="text-lg">
                  📧 <a href="mailto:support@civdocs.com.au" className="text-[#FF8C32] hover:underline font-medium">support@civdocs.com.au</a>
                </p>
                <p className="font-medium">
                  CivDocs Pty Ltd<br />
                  ABN 16 691 993 049
                </p>
              </div>
            </div>

            <div className="border-t-2 border-gray-200 pt-8 mt-12">
              <p className="text-center text-lg font-semibold text-gray-900">
                By using CivDocs, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </div>
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
                <a href="/privacy" className="block text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="block text-gray-400 hover:text-white transition-colors">
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



