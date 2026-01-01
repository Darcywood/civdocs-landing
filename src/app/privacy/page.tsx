'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
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
                          <h3 className="text-[16px] font-semibold text-[#111827] leading-[1.25] tracking-[-0.01em]">Crank.ai Cheat Sheet</h3>
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">Quick reference guide for Crank.ai commands and queries</p>
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
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Effective Date: 19 December 2024
            </p>
            <p className="text-base text-gray-500">
              Last Updated: 19 December 2024
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {/* Section 1 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">1. INTRODUCTION</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  CivDocs Pty Ltd (ABN 16 691 993 049) (&quot;CivDocs,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and disclose personal information when you use the CivDocs platform (the &quot;Service&quot;).
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">2. SCOPE & JURISDICTION</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  This Privacy Policy is governed by the <strong>Privacy Act 1988 (Cth)</strong> and the <strong>Australian Privacy Principles (APPs)</strong>.
                </p>
                <p>
                  CivDocs is designed for Australian businesses, users located outside Australia may access the Service. By using CivDocs, you consent to the handling of your personal information in accordance with this Privacy Policy and Australian law.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">3. PERSONAL INFORMATION WE COLLECT</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  We collect personal information that is reasonably necessary to operate the CivDocs platform.
                </p>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-8 mb-3">3.1 Account & Identity Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Password (hashed; never stored in plain text)</li>
                  <li>Phone number (optional)</li>
                  <li>Profile photo/avatar (optional)</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-8 mb-3">3.2 Employment & Work-Related Information</h3>
                <p>Depending on your role within an organisation, this may include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Organisation membership and role (admin, supervisor, employee)</li>
                  <li>Hourly pay rates (where entered by an organisation)</li>
                  <li>Timesheet data (dates, hours worked, breaks, comments)</li>
                  <li>Leave requests and approval metadata</li>
                  <li>Project, cost code, and scope assignments</li>
                  <li>Productivity and work output metrics</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-8 mb-3">3.3 Licences & Qualifications</h3>
                <p>Where uploaded by users or organisations:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Licence or ticket names</li>
                  <li>Licence/card numbers</li>
                  <li>Expiry dates</li>
                  <li>Uploaded documents or images of licences</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-8 mb-3">3.4 Plant, Safety & Operational Records</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Pre-start inspection records</li>
                  <li>Fault reports and notes</li>
                  <li>Machine overtime entries</li>
                  <li>Attachments such as photos, PDFs, and documents</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-8 mb-3">3.5 AI Conversation Data</h3>
                <p>When using Crank.ai:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>User questions and prompts</li>
                  <li>AI-generated responses</li>
                  <li>Conversation history (stored per user and organisation)</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-8 mb-3">3.6 Invoice Payment Instructions</h3>
                <p>For organizations using the invoice creation feature, we may store:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Bank BSB (Bank State Branch) number</li>
                  <li>Bank account number</li>
                  <li>Bank account name</li>
                </ul>
                <p>
                  This information is stored securely and used solely to display payment instructions on invoices generated by your organization. These details are not used for payment processing by CivDocs. Only organization administrators can add or modify this information.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">4. SENSITIVE INFORMATION</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  CivDocs is not designed to collect sensitive information such as:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>medical or health information</li>
                  <li>injury or incident reports</li>
                  <li>biometric data</li>
                </ul>
                <p>
                  However, due to free-text fields and file uploads, users may choose to upload such information.
                </p>
                <p>
                  By uploading sensitive information, you:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>acknowledge that CivDocs does not require or request this data</li>
                  <li>consent to CivDocs storing and processing it as part of the Service</li>
                  <li>accept responsibility for ensuring you have lawful authority to upload it</li>
                </ul>
                <p>
                  CivDocs does not review, validate, or classify uploaded content for sensitive information.
                </p>
              </div>
            </div>

            {/* Section 5 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">5. HOW WE USE PERSONAL INFORMATION</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  We use personal information to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>provide, operate, and maintain the CivDocs platform</li>
                  <li>authenticate users and manage accounts</li>
                  <li>enable organisational workflows (timesheets, pre-starts, approvals)</li>
                  <li>generate reports, documents, and analytics</li>
                  <li>provide AI-powered insights (Crank.ai)</li>
                  <li>process subscription billing</li>
                  <li>send service-related communications</li>
                  <li>improve and develop our products and services</li>
                  <li>comply with legal obligations</li>
                </ul>
              </div>
            </div>

            {/* Section 6 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">6. AI & AUTOMATED PROCESSING</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">6.1 AI Data Use</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Crank.ai only accesses data within your organisation</li>
                  <li>AI is read-only and does not modify your data</li>
                  <li>AI outputs are generated based solely on your organisation&apos;s data</li>
                  <li>AI outputs are stored to maintain conversation context</li>
                </ul>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">6.2 AI Training</h3>
                <p>
                  CivDocs does not use your data to train AI models.
                </p>
                <p>
                  AI processing is performed using OpenAI&apos;s API. When you use Crank.ai, the following data is sent to OpenAI:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your questions and prompts</li>
                  <li>Relevant organization data (project names, scope descriptions, cost data, timesheet summaries, machine information) necessary to answer your query</li>
                  <li>Conversation history for context</li>
                </ul>
                <p>
                  OpenAI processes this data according to their API privacy policy. According to OpenAI&apos;s current policy, data sent via their API is not used to train their models unless explicitly opted in. However, OpenAI&apos;s policies are subject to change, and CivDocs cannot control third-party provider practices.
                </p>
              </div>
            </div>

            {/* Section 7 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">7. DISCLOSURE OF PERSONAL INFORMATION</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  We do not sell, rent, or trade personal information.
                </p>
                <p>
                  We may disclose personal information to the following third-party service providers for the purpose of operating CivDocs:
                </p>

                <div className="bg-gray-50 rounded-xl p-6 my-4">
                  <h3 className="text-lg font-semibold text-[#1E1E1E] mb-2">Supabase</h3>
                  <p><strong>Purpose:</strong> Database, authentication, file storage</p>
                  <p><strong>Data disclosed:</strong> All personal information collected by CivDocs is stored in Supabase&apos;s database and file storage systems.</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 my-4">
                  <h3 className="text-lg font-semibold text-[#1E1E1E] mb-2">Stripe</h3>
                  <p><strong>Purpose:</strong> Subscription billing and payments</p>
                  <p><strong>Data disclosed:</strong> Organization name and email, billing name, billing email, billing address (street, city, state, postal code, country), payment card information (processed securely by Stripe, not stored by CivDocs), and subscription plan and billing interval metadata.</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 my-4">
                  <h3 className="text-lg font-semibold text-[#1E1E1E] mb-2">OpenAI</h3>
                  <p><strong>Purpose:</strong> AI analysis and response generation</p>
                  <p><strong>Data disclosed:</strong> User questions and prompts, relevant organization data (project names, scope descriptions, cost data, timesheet summaries, machine information) necessary to answer queries, and conversation history for context. See Section 6.2 for more details.</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 my-4">
                  <h3 className="text-lg font-semibold text-[#1E1E1E] mb-2">Resend</h3>
                  <p><strong>Purpose:</strong> Email delivery</p>
                  <p><strong>Data disclosed:</strong> Recipient email addresses, organization names, inviter names, invite roles, and password reset tokens (for password reset emails only).</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 my-4">
                  <h3 className="text-lg font-semibold text-[#1E1E1E] mb-2">Vercel</h3>
                  <p><strong>Purpose:</strong> Hosting and infrastructure</p>
                  <p><strong>Data disclosed:</strong> Vercel hosts the CivDocs application and may log IP addresses and request metadata for operational and security purposes.</p>
                </div>

                <p>
                  These providers may process data outside Australia. We take reasonable steps to ensure they handle personal information in accordance with applicable privacy laws.
                </p>
              </div>
            </div>

            {/* Section 8 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">8. COOKIES & LOCAL STORAGE</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">8.1 Cookies</h3>
                <p>
                  CivDocs uses cookies strictly necessary for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>authentication (Supabase auth tokens)</li>
                  <li>session management</li>
                </ul>
                <p>
                  We do not use advertising cookies or third-party tracking cookies.
                </p>

                <h3 className="text-xl font-semibold text-[#1E1E1E] mt-6 mb-3">8.2 Local Storage</h3>
                <p>
                  Local storage may be used for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Application caching (timesheet data, project information, organization data)</li>
                  <li>Temporary form state</li>
                  <li>User preferences (view mode settings)</li>
                  <li>AI conversation thread identifiers</li>
                  <li>Performance optimisation</li>
                </ul>
                <p>
                  Local storage is not used for tracking or advertising.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">9. ACTIVITY LOGGING</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  CivDocs logs limited application activity for operational and security purposes, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>user actions within the platform</li>
                  <li>timestamps</li>
                  <li>system events and errors</li>
                </ul>
                <p>
                  We do not:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>track IP addresses for user behavior analysis or advertising purposes</li>
                  <li>collect device or browser fingerprints</li>
                  <li>monitor user behavior for advertising purposes</li>
                </ul>
                <p className="text-sm text-gray-600 italic">
                  (Note: Third-party infrastructure providers may log IP addresses for security and operational purposes.)
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">10. DATA SECURITY</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  We take reasonable technical and organisational measures to protect personal information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>access controls and role-based permissions</li>
                  <li>encryption in transit</li>
                  <li>secure third-party infrastructure</li>
                </ul>
                <p>
                  However, no system is completely secure. CivDocs does not guarantee absolute security and is not liable for unauthorised access beyond what is required by law.
                </p>
              </div>
            </div>

            {/* Section 11 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">11. DATA RETENTION</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Personal information is retained while an account or subscription remains active</li>
                  <li>Upon account termination, data may be retained for a limited period to allow you to request access to your personal information</li>
                  <li>After this period, data may be permanently deleted</li>
                  <li>CivDocs does not guarantee long-term archival storage</li>
                  <li>Some anonymised data (such as system logs with user identifiers removed, or AI conversations with user_id set to null) may be retained for operational or legal purposes</li>
                </ul>
              </div>
            </div>

            {/* Section 12 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">12. ACCESS & CORRECTION</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  You may:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>access your personal information through your account</li>
                  <li>update certain profile information (such as name or phone number)</li>
                  <li>delete individual timesheet entries you have created</li>
                </ul>
                <p>
                  Some information (such as roles, rates, or employment data) may only be managed by an organisation administrator.
                </p>
                <p>
                  <strong>Account Deletion:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Employees cannot delete their own account or employment data; this must be done by an organisation administrator</li>
                  <li>You may request access to your personal information by contacting us at <a href="mailto:support@civdocs.com.au" className="text-[#FF8C32] hover:underline">support@civdocs.com.au</a>. We will respond within a reasonable timeframe as required by applicable law</li>
                </ul>
                <p>
                  At this time, CivDocs does not provide self-service account deletion. Requests may be made via support.
                </p>
              </div>
            </div>

            {/* Section 13 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">13. AGGREGATED & ANONYMISED DATA</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  CivDocs may use aggregated and anonymised data (with all personal and organisational identifiers removed) for:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>product improvement</li>
                  <li>analytics</li>
                  <li>benchmarking</li>
                  <li>research and development</li>
                </ul>
                <p>
                  Such data cannot be used to identify individuals or organisations.
                </p>
              </div>
            </div>

            {/* Section 14 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">14. DATA BREACHES</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  In the event of a data breach involving personal information, CivDocs will comply with its obligations under the Notifiable Data Breaches scheme and notify affected individuals where required by law.
                </p>
              </div>
            </div>

            {/* Section 15 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">15. CHANGES TO THIS POLICY</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  We may update this Privacy Policy from time to time. Material changes will be notified via the Service or email.
                </p>
                <p>
                  Continued use of CivDocs after changes take effect constitutes acceptance of the updated Policy.
                </p>
              </div>
            </div>

            {/* Section 16 */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">16. CONTACT US</h2>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  For privacy-related questions or requests, contact:
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}




