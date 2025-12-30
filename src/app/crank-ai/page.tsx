'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

export default function CrankAIPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

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
    <div className="min-h-screen bg-[#FFFEFB] overflow-x-hidden">
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
                priority
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
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">Complete machine hour and billing records</p>
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

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-[100] flex items-center justify-center md:p-4"
              onClick={() => setIsVideoModalOpen(false)}
            >
              {/* Modal Content - Full screen on mobile, phone-sized on desktop */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full md:w-[400px] md:h-auto md:max-h-[90vh] bg-black md:rounded-2xl overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-black/80 hover:bg-black rounded-full flex items-center justify-center transition-colors shadow-lg border-2 border-white/20"
                  aria-label="Close video"
                >
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Video Player - Full screen on mobile */}
                <video
                  className="w-full h-full object-contain md:h-auto"
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  muted
                  onEnded={() => setIsVideoModalOpen(false)}
                >
                  <source src="/Crank.ai/Video 24-12-2025, 2 07 38 PM.mov" type="video/quicktime" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 1. Hero Section */}
      <section className="py-20 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] mb-6">
                Stop guessing. Know your numbers.
          </h1>
              <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                Your data already exists in CivDocs.
              </p>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Crank.ai turns it into clear answers — so you know where money is being made, and where it's quietly leaking.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 lg:mb-0">
                <Link
                  href="https://app.civdocs.com/auth/signup"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Start Free Trial
                </Link>
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-300 text-gray-900 font-semibold text-lg rounded-full hover:border-[#FF8C32] hover:text-[#FF8C32] transition-all"
                >
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Column - Hero Video Placeholder */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] cursor-pointer hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF8C32] focus:ring-offset-2 rounded-2xl"
                aria-label="Play Crank.ai demo video"
              >
                <OptimizedImage 
                  src="/Crank.ai/crank.placeholder.png" 
                  alt="Crank.ai Video Preview"
                  width={400}
                  height={800}
                  className="w-full h-auto"
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[#FF8C32] ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
              </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Problem Section */}
      <section className="py-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-8">
              Not knowing your numbers costs you money.
              </h2>

            <p className="text-lg text-gray-700 mb-12">
              Most owners don't lose money because they lack experience or effort.
              </p>
            <p className="text-lg text-gray-700 mb-12">
              They lose money because the answers they need arrive too late — after the job is finished, the invoice is sent, and the margin is already gone.
            </p>

            {/* Sub-section 1 */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-[#1E1E1E] mb-4">
                The damage happens while work is still underway
              </h3>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF8C32] mt-1">•</span>
                  <span className="text-lg text-gray-700">Jobs look busy, but profit disappears.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF8C32] mt-1">•</span>
                  <span className="text-lg text-gray-700">Overtime creeps in unnoticed.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF8C32] mt-1">•</span>
                  <span className="text-lg text-gray-700">Plant runs longer than expected.</span>
                </li>
              </ul>
              <p className="text-lg text-gray-700">
                And by the time you sit down to review it, the damage is already done.
              </p>
            </div>

            {/* Sub-section 2 */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-[#1E1E1E] mb-4">
                The information is there — it's just disconnected
              </h3>
              <p className="text-lg text-gray-700 mb-3">
                The data exists in timesheets, logbooks, costs, and invoices.
              </p>
              <p className="text-lg text-gray-700 mb-3">
                But it lives in different places, updates at different times, and doesn't tell a single story.
              </p>
              <p className="text-lg text-gray-700">
                So getting a clear answer means jumping between screens, exporting data, or waiting for someone else to pull numbers together.
                </p>
              </div>

            {/* Sub-section 3 */}
            <div>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF8C32] mt-1">•</span>
                  <span className="text-lg text-gray-700">You shouldn't need spreadsheets.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF8C32] mt-1">•</span>
                  <span className="text-lg text-gray-700">You shouldn't need reports.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF8C32] mt-1">•</span>
                  <span className="text-lg text-gray-700">You shouldn't need an analyst.</span>
                </li>
              </ul>
              <p className="text-lg text-gray-700">
                Just to understand how your business is performing.
              </p>
              </div>
            </div>
        </div>
      </section>

      {/* Image Placeholder Section */}
      <section className="py-12 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-center">
            <div className="w-full max-w-4xl rounded-2xl bg-gray-100 border-2 border-gray-200 flex items-center justify-center shadow-lg min-h-[300px]">
                <p className="text-gray-400 font-medium text-center px-4">
                [IMAGE PLACEHOLDER — Visual showing disconnected data / problem illustration]
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. What Crank.ai Is Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
              One place. Real answers.
              </h2>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              Crank.ai sits on top of CivDocs and turns day-to-day data into clear answers.
            </p>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Instead of clicking through screens or exporting data, you ask a question — and get a straight answer backed by your real numbers.
              </p>
            <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                <span className="text-[#FF8C32] mt-1">•</span>
                <span className="text-lg text-gray-700">No setup work.</span>
                </li>
                <li className="flex items-start gap-3">
                <span className="text-[#FF8C32] mt-1">•</span>
                <span className="text-lg text-gray-700">No report building.</span>
                </li>
                <li className="flex items-start gap-3">
                <span className="text-[#FF8C32] mt-1">•</span>
                <span className="text-lg text-gray-700">No number-crunching.</span>
                </li>
              </ul>
            <p className="text-lg text-gray-700">
              Crank.ai connects timesheets, logbooks, costs, and invoices — and gives you the answer you actually need.
            </p>
          </div>
        </div>
      </section>

      {/* 4. What Owners Actually Ask Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
              What owners actually ask
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Crank.ai answers the questions owners think about during the week:
            </p>
          </div>

              {/* Example Questions */}
          <div className="space-y-4 max-w-4xl">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-lg text-gray-700">What does AGI actually cost us per metre on current jobs?</p>
              </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-lg text-gray-700">Compare Pakenham to Clyde North — which project is performing better, and why?</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-lg text-gray-700">Simulate a quote to install 4,000 tonnes of Class 3 with a 20% margin.</p>
              </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-lg text-gray-700">What are our current project costs across labour, plant, and materials?</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <p className="text-lg text-gray-700">How many hours have employees worked this week — and how much of that was overtime?</p>
          </div>
        </div>

          <p className="text-lg text-gray-600 mt-8 leading-relaxed max-w-3xl">
            Every answer is pulled directly from your approved CivDocs data — not estimates, not assumptions.
                </p>
              </div>
      </section>

      {/* 5. How Crank.ai Works Section */}
      <section className="py-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
              How Crank.ai works
              </h2>
          </div>

          {/* Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Step 1 */}
            <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-[#111827] mb-3">Ask your question</h3>
              <p className="text-[#6B7280]">
                Type what you want to know in plain English. No setup, no digging through screens.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-[#111827] mb-3">Crank.ai reads your data</h3>
              <p className="text-[#6B7280]">
                It pulls from timesheets, plant logbooks, scopes, materials, and cost codes — all at once.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-[#111827] mb-3">Get your answer</h3>
              <p className="text-[#6B7280]">
                Clear numbers, clear explanation, and something you can act on immediately.
              </p>
            </div>
          </div>

          {/* Example Screenshot Placeholder */}
          <div className="flex items-center justify-center mt-12">
            <div className="w-full max-w-4xl rounded-2xl bg-gray-100 border-2 border-gray-200 flex items-center justify-center shadow-lg min-h-[400px]">
              <p className="text-gray-400 font-medium text-center px-4">
                [Crank.ai Interface Screenshot — Question / Answer Example]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Problems Get Caught Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
              Problems get caught before the job is finished.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Crank.ai surfaces issues while there's still time to do something about them.
              </p>
          </div>
              
          {/* Benefits List */}
          <div className="space-y-4 max-w-3xl mb-8">
            <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
              <span className="text-gray-700 text-lg">Labour overruns become visible early</span>
            </div>
            <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
              <span className="text-gray-700 text-lg">Plant hours exceeding quote don't go unnoticed</span>
            </div>
            <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
              <span className="text-gray-700 text-lg">Overtime creep is exposed before it kills margin</span>
            </div>
            <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
              <span className="text-gray-700 text-lg">Cost vs invoice mismatches are caught before billing</span>
              </div>
            </div>

          <p className="text-lg text-gray-700 font-semibold max-w-3xl">
            You don't find out after the invoice. You find out while the job is still running.
          </p>
        </div>
      </section>

      {/* 7. Quote with Confidence Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
              Quote with confidence — not gut feel.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Underquoting is one of the biggest silent killers in civil construction.
              </p>
            <p className="text-lg text-gray-700 mb-6">
              Crank.ai shows you:
            </p>
            <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                <span className="text-gray-700 text-lg">real cost per metre</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                <span className="text-gray-700 text-lg">real labour cost per day</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                <span className="text-gray-700 text-lg">actual production vs planned</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                <span className="text-gray-700 text-lg">historical performance across similar jobs</span>
                </li>
              </ul>
            <p className="text-lg text-gray-700">
              Future pricing is based on what actually happened — not what you hope will happen next time.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Why Crank.ai is Different Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
              Why Crank.ai is different
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Crank.ai removes the translation layer between data and decisions.
            </p>
            </div>

          {/* Comparison Cards */}
          <div className="space-y-8 max-w-5xl">
            {/* vs Reports */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-[#1E1E1E] mb-4">Compared to building reports</h3>
              <p className="text-lg text-gray-700">
                Reports require setup, filters, and interpretation. Crank.ai gives direct answers.
                </p>
              </div>

            {/* vs Excel/Power BI */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-[#1E1E1E] mb-4">Compared to Excel or Power BI</h3>
              <p className="text-lg text-gray-700">
                Spreadsheets are always behind and easy to break. Crank.ai works off live data inside CivDocs.
              </p>
              </div>

            {/* vs Data Analyst */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-[#1E1E1E] mb-4">Compared to hiring a data analyst</h3>
              <p className="text-lg text-gray-700">
                Analysts cost time and money and still need direction. Crank.ai already understands your data structure and job types.
              </p>
            </div>

            {/* vs Other AI */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-semibold text-[#1E1E1E] mb-4">Compared to other AI tools</h3>
              <p className="text-lg text-gray-700">
                Generic AI guesses. Crank.ai only answers what your data can prove.
            </p>
          </div>
        </div>

          <p className="text-lg text-gray-700 mt-8 max-w-3xl">
            Every answer is grounded in approved timesheets, logbooks, and costs.
          </p>
        </div>
      </section>

      {/* 9. Final CTA Section */}
      <section className="bg-[#FFFEFB] py-20 sm:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-8 tracking-tight">
            Know your numbers — before it costs<br />you.
          </h2>
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            Crank.ai shows you what's actually happening across jobs, labour, and plant — while there's still time to act.
          </p>
          <p className="text-lg text-gray-700 mb-2">
            Without it, problems surface after the job is finished.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            With it, you see them as they're forming.
          </p>
          <p className="text-xl text-gray-900 font-semibold mb-8">
            That difference is margin.
          </p>
          <div className="flex justify-center mb-4">
            <Link
              href="https://app.civdocs.com/auth/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all"
            >
              Start Free Trial →
            </Link>
          </div>
          <p className="text-sm text-gray-500">
            No credit card required. See real answers from your CivDocs data in minutes.
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
