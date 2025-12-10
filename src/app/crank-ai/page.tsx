'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

export default function CrankAIPage() {
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
    <div className="min-h-screen bg-[#FFFEFB]">
      {/* Header */}
      <header className="sticky top-0 z-[80] bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex-shrink-0">
              <OptimizedImage 
                src="/CivDocs no lift.svg" 
                alt="CivDocs"
                width={200}
                height={64}
                className="h-16 w-auto"
              />
            </Link>
            
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-colors font-medium">
                Home
              </Link>
              <Link href="/pricing" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-colors font-medium">
                Pricing
              </Link>
              <a 
                href="https://app.civdocs.com/auth/signup" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold rounded-full hover:shadow-xl transition-all"
              >
                Start Free Trial →
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center justify-center">
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
                          href="/cost-tracking" 
                          onClick={closeMobileMenu}
                          className="block rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                        >
                          <h3 className="text-[16px] font-semibold text-[#111827] leading-[1.25] tracking-[-0.01em]">Cost tracking</h3>
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">Track project expenses and costs in real-time</p>
                        </a>
                        <a
                          href="/logbook" 
                          onClick={closeMobileMenu}
                          className="block rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                        >
                          <h3 className="text-[16px] font-semibold text-[#111827] leading-[1.25] tracking-[-0.01em]">Logbook</h3>
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">Digital logbook for hours, prestarts, machines, and compliance</p>
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

                {/* Action Buttons */}
                <div className="pt-8 space-y-4">
                  <button 
                    onClick={closeMobileMenu}
                    className="w-full rounded-full border border-gray-200 py-4 text-lg font-semibold text-gray-800 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Login
                  </button>
                  
                  <a
                    href="/start-trial"
                    onClick={closeMobileMenu}
                    className="block w-full rounded-full py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#FF8C32] to-[#F5B041] hover:shadow-lg transition-all duration-300 text-center"
                  >
                    Start Free Trial →
                  </a>
                  
                  <p className="text-center text-sm font-semibold text-[#FF8C32] pt-2 animate-pulse-glow">No credit card required</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 1. Hero Section */}
      <section className="py-20 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {/* Text Content */}
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-sm font-semibold text-[#FF8C32] mb-4 uppercase tracking-wide">
                AI for civil construction
              </p>
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mx-auto mb-8">
            <OptimizedImage 
              src="/Crank.ai/crank.ai.png" 
              alt="Crank.ai" 
              width={48} 
              height={48} 
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] mb-6">
                Crank.ai — instant answers from your CivDocs data
          </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Ask plain-English questions about costs, productivity, timesheets and plant. Crank.ai reads your CivDocs data and gives clear answers in seconds — no spreadsheets, no SQL, no BI dashboards to maintain.
              </p>
              
              {/* Bullet Points */}
              <ul className="space-y-4 mb-8 text-left max-w-2xl mx-auto">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">See true cost per metre, m² or unit across projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Spot budget blowouts before they happen</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Understand labour, plant and materials in one place</span>
                </li>
              </ul>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link
                  href="/start-trial"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Start Free Trial
                </Link>
              </div>
              <div className="mb-8">
                <a href="#" className="text-[#FF8C32] hover:underline font-medium">
                  Watch Crank.ai demo
                </a>
              </div>
            </div>

            {/* Hero Video Placeholder */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-4xl h-64 rounded-3xl bg-gray-100 shadow-inner border-2 border-gray-200 flex items-center justify-center">
                <p className="text-gray-400 font-medium text-center px-4">
                  [CRANK.AI HERO VIDEO PLACEHOLDER]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How Crank.ai works with CivDocs */}
      <section className="py-24 bg-white section-fade-peach-to-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                How Crank.ai works with CivDocs
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                Crank.ai sits on top of your CivDocs account and turns your real project data into answers. It reads timesheets, pre-starts, cost codes, project scopes, materials and progress quantities — then uses that to calculate costs, productivity and performance.
              </p>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                You just ask a question in plain English. Crank.ai figures out which data it needs, runs the right tools behind the scenes, and returns a clear answer with the numbers to back it up.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Pulls live data from CivDocs timesheets, pre-starts, scopes and materials</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Runs tool-based analysis — no raw SQL or manual reports</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Returns explanations, not just numbers</span>
                </li>
              </ul>
            </div>

            {/* Right Column - Placeholder */}
            <div className="flex items-center justify-center">
              <div className="w-full min-h-[400px] rounded-2xl bg-gray-100 border-2 border-gray-200 flex items-center justify-center shadow-lg">
                <p className="text-gray-400 font-medium text-center px-4">
                  [DATA FLOW DIAGRAM PLACEHOLDER — CivDocs → Crank.ai → Insights]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Cost & financial intelligence */}
      <section className="pt-20 pb-24 bg-[#FFFEFB] section-fade-white-to-peach relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                See the true cost of your work
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Understand internal cost per metre, m² or unit, and see exactly what's driving budget variance.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Internal cost per unit — calculates true cost per metre, m² or unit from completed quantities and cost transactions</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Project budget status — budget vs actual with variance, hours and cost completion percentages</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Cost variance drivers — highlights work types and cost codes that are blowing the budget or saving money</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Cost code totals — actual vs budget by cost code, with variance percentages</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Project and organisation summaries — high-level financial overviews across all projects</span>
                </li>
              </ul>

              {/* Example Questions */}
              <div className="border border-gray-200 rounded-xl p-6 bg-white">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Example questions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>"On average, what does a metre of AGI cost us?"</li>
                  <li>"What is blowing the budget on this job?"</li>
                  <li>"Show me cost per m² of footpath on Pakenham."</li>
                </ul>
              </div>
            </div>

            {/* Right Column - Placeholder */}
            <div className="flex items-center justify-center">
              <div className="w-full min-h-[400px] rounded-2xl bg-gray-100 border-2 border-gray-200 flex items-center justify-center shadow-lg">
                <p className="text-gray-400 font-medium text-center px-4">
                  [COST REPORT / BUDGET VS ACTUAL SCREENSHOT PLACEHOLDER]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quoting & forecasting */}
      <section className="pt-20 pb-24 bg-white section-fade-peach-to-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Placeholder */}
            <div className="order-2 lg:order-1 flex items-center justify-center">
              <div className="w-full min-h-[400px] rounded-2xl bg-gray-100 border-2 border-gray-200 flex items-center justify-center shadow-lg">
                <p className="text-gray-400 font-medium text-center px-4">
                  [QUOTE SIMULATOR / FORECASTING UI PLACEHOLDER]
                </p>
              </div>
            </div>

            {/* Right Column - Text Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Quote using real numbers, not guesses
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Use your actual historical performance to simulate quotes and forecast remaining costs.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Quote simulation — model internal cost and selling price for upcoming work using your own benchmarks</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Org-wide benchmarks — average, min and max cost per unit by work type</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Scope forecasting — projects remaining work, days and costs based on current progress</span>
                </li>
              </ul>

              {/* Example Questions */}
              <div className="border border-gray-200 rounded-xl p-6 bg-white">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Example questions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>"Simulate a quote for 350m of trenching with 20% margin."</li>
                  <li>"What would 80m² of concrete cost us internally?"</li>
                  <li>"Show me org-wide benchmarks for cost per metre of trenching."</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Productivity & performance */}
      <section className="pt-20 pb-24 bg-[#FFFEFB] section-fade-white-to-peach relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Spot productivity wins and problem work types
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                See which work types, scopes and supervisors are performing — and which ones are dragging the job down.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Work type profitability — ranks work types by profit, consistency and cost per unit</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Scope productivity — progress, output rates and cost per unit at the scope level</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Scope quantity vs hours — compares completed quantities to hours worked to spot efficiency trends</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Supervisor progress & productivity — shows supervisor performance across projects</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Operator utilisation — identifies under-utilised operators</span>
                </li>
              </ul>

              {/* Example Questions */}
              <div className="border border-gray-200 rounded-xl p-6 bg-white">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Example questions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>"What's our most profitable work type?"</li>
                  <li>"Which scopes are underperforming on this project?"</li>
                  <li>"Which operators are under-utilised this month?"</li>
                </ul>
              </div>
            </div>

            {/* Right Column - Placeholder */}
            <div className="flex items-center justify-center">
              <div className="w-full min-h-[400px] rounded-2xl bg-gray-100 border-2 border-gray-200 flex items-center justify-center shadow-lg">
                <p className="text-gray-400 font-medium text-center px-4">
                  [PRODUCTIVITY DASHBOARD PLACEHOLDER]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Timesheets & labour insights */}
      <section className="pt-20 pb-24 bg-white section-fade-peach-to-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Placeholder */}
            <div className="order-2 lg:order-1 flex items-center justify-center">
              <div className="w-full min-h-[400px] rounded-2xl bg-gray-100 border-2 border-gray-200 flex items-center justify-center shadow-lg">
                <p className="text-gray-400 font-medium text-center px-4">
                  [TIMESHEET INSIGHTS / LABOUR COST CARD PLACEHOLDER]
                </p>
              </div>
            </div>

            {/* Right Column - Text Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Turn timesheets into labour insights
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Crank.ai reads every CivDocs timesheet to show you hours, productivity and labour cost impact.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Employee hours & trends — breakdown of hours, productivity and cost impact</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Employee timesheet summary — hours by day, project and scope, including missing days and overtime</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Employees hours range — total hours and days worked in any date range</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Missing or incomplete timesheets — finds missing entries and anomalies for payroll and compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Project timesheet gaps — detects missing scopes, cost codes and invalid hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Supervisor hours & employee cost impact — shows workload and labour cost per employee</span>
                </li>
              </ul>

              {/* Example Questions */}
              <div className="border border-gray-200 rounded-xl p-6 bg-white">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Example questions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>"How many hours did John Smith do last week?"</li>
                  <li>"Who hasn't submitted timesheets this week?"</li>
                  <li>"Show me labour productivity for this project."</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Machines & plant intelligence */}
      <section className="pt-20 pb-24 bg-[#FFFEFB] section-fade-white-to-peach relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Know exactly what your machines are costing
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Crank.ai combines pre-starts, machine rates and bookings to show plant utilisation, cost and revenue.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Machine utilisation — usage, idle time and booking patterns</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Machine cost impact — plant cost per project or scope</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Machine revenue & profitability — revenue vs cost from pre-starts and timesheets</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Machine rates & service info — returns rates and upcoming services</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Machine overdue services — flags machines that need maintenance</span>
                </li>
              </ul>

              {/* Example Questions */}
              <div className="border border-gray-200 rounded-xl p-6 bg-white">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Example questions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>"Which machines are under-utilised?"</li>
                  <li>"How much plant did we use on Pakenham?"</li>
                  <li>"Which machine cost the most this week?"</li>
                </ul>
              </div>
            </div>

            {/* Right Column - Placeholder */}
            <div className="flex items-center justify-center">
              <div className="w-full min-h-[400px] rounded-2xl bg-gray-100 border-2 border-gray-200 flex items-center justify-center shadow-lg">
                <p className="text-gray-400 font-medium text-center px-4">
                  [MACHINE UTILISATION / PLANT COST PLACEHOLDER]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Project & scope intelligence */}
      <section className="pt-20 pb-24 bg-white section-fade-peach-to-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Placeholder */}
            <div className="order-2 lg:order-1 flex items-center justify-center">
              <div className="w-full min-h-[400px] rounded-2xl bg-gray-100 border-2 border-gray-200 flex items-center justify-center shadow-lg">
                <p className="text-gray-400 font-medium text-center px-4">
                  [PROJECT / SCOPE DRILLDOWN SCREENSHOT PLACEHOLDER]
                </p>
              </div>
            </div>

            {/* Right Column - Text Content */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Every project and scope at your fingertips
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Drill into projects, scopes and cost codes without needing a spreadsheet or BI dashboard.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Project search — fuzzy search by project name or code</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Project scopes — all scopes, their budgets, cost codes and descriptions</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Scope progress — completion metrics, daily output rates and completion status</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Project hours — hours by employee, scope, cost code and day</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Scope hours — detailed hours at scope level</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Scope cost breakdown — labour, plant and materials at the scope level</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Cost per unit by cost code — see how each cost code is performing</span>
                </li>
              </ul>

              {/* Example Questions */}
              <div className="border border-gray-200 rounded-xl p-6 bg-white">
                <h3 className="text-sm font-bold text-gray-900 mb-4">Example questions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>"Show me scope productivity for this project."</li>
                  <li>"Which cost codes are causing overruns on this scope?"</li>
                  <li>"What is cost per metre for each cost code on this job?"</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Employee management */}
      <section className="pt-20 pb-24 bg-[#FFFEFB] section-fade-white-to-peach relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Know your team, not just your jobs
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Crank.ai includes simple employee tools so you can quickly find people, understand their workload and see how they contribute to your projects.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Employee directory — list of employees with names, roles and contact details</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Employee search — fuzzy search to quickly find the right person</span>
                </li>
              </ul>
            </div>

            {/* Right Column - Placeholder */}
            <div className="flex items-center justify-center">
              <div className="w-full min-h-[300px] rounded-2xl bg-gray-100 border-2 border-gray-200 flex items-center justify-center shadow-lg">
                <p className="text-gray-400 font-medium text-center px-4">
                  [EMPLOYEE DIRECTORY / SEARCH PLACEHOLDER]
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. The Crank.ai engine (advanced features) */}
      <section className="pt-20 pb-24 bg-white section-fade-peach-to-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-8 text-center">
              An AI engine built for construction data
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Left Column */}
              <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                  <span className="text-gray-700 text-lg">Tool-based architecture — Crank.ai calls safe, pre-built tools instead of writing raw SQL</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                  <span className="text-gray-700 text-lg">Organization-scoped security — all queries respect CivDocs RLS and org boundaries</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                  <span className="text-gray-700 text-lg">Smart tool chaining — automatically combines multiple tools to answer complex questions</span>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Conversation memory — remembers context across questions</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Natural language understanding — handles typos and plain-English phrasing</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Automatic date range detection — understands phrases like "last week" or "this month"</span>
                </div>
              </div>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed text-center">
              Under the hood, Crank.ai is tightly integrated with CivDocs. It uses the same security, the same data and the same permissions — so supervisors see what they should see, and nothing else.
            </p>
          </div>
        </div>
      </section>

      {/* 11. Example questions Crank.ai can answer */}
      <section className="pt-20 pb-24 bg-[#FFFEFB] section-fade-white-to-peach relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-8 text-center">
            Ask questions like…
          </h2>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700 font-medium">"On average, what does a metre of AGI cost us?"</div>
              <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700 font-medium">"Compare Pakenham to Clyde North."</div>
              <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700 font-medium">"Simulate a quote for 350m of trenching with 20% margin."</div>
              <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700 font-medium">"What is blowing the budget on this job?"</div>
              <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700 font-medium">"Show me org-wide benchmarks for cost per unit."</div>
              <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700 font-medium">"Which work type is most profitable?"</div>
              <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700 font-medium">"Show me machine utilisation for this week."</div>
              <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700 font-medium">"How many hours did John Smith do last week?"</div>
              <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700 font-medium">"Who hasn't submitted timesheets this week?"</div>
              <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700 font-medium">"Which machines are under-utilised?"</div>
              <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-700 font-medium">"Show me scope productivity for this project."</div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Final CTA Section */}
      <section className="bg-[#FFFEFB] py-20 sm:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-8 tracking-tight">
            Start using Crank.ai with your CivDocs free trial
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Turn the data you already collect into answers your supervisors and project managers can actually use. No extra spreadsheets — just smarter decisions.
          </p>
          <div className="flex justify-center">
            <Link
              href="/start-trial"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all"
            >
              Start Free Trial →
            </Link>
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
