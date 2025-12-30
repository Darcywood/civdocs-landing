'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

export default function CostTrackingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [preloadedVideoUrl, setPreloadedVideoUrl] = useState<string | null>(null);

  // Preload the hero video so clicking the phone preview can start instantly.
  // Note: browsers may still buffer briefly depending on device/network, but this removes
  // the "download starts only after click" problem.
  useEffect(() => {
    let objectUrl: string | null = null;
    const controller = new AbortController();

    const preload = async () => {
      try {
        const res = await fetch('/John Smith/costtrackingvideo.mov', { signal: controller.signal });
        if (!res.ok) return;
        const blob = await res.blob();
        objectUrl = URL.createObjectURL(blob);
        setPreloadedVideoUrl(objectUrl);
      } catch {
        // Ignore (offline / aborted / network errors)
      }
    };

    // Start as soon as the page mounts
    preload();

    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] mb-6">
                Cost Tracking
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Track project costs with clarity and confidence.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                CivDocs automatically captures labour, plant, materials and progress data and keeps your budgets updated in real-time.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 lg:mb-0">
                <Link
                  href="/start-trial"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Start Free Trial
                </Link>
                <button
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-300 text-gray-900 font-semibold text-lg rounded-full hover:border-[#FF8C32] hover:text-[#FF8C32] transition-all"
                >
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Column - Phone Placeholder with Video */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] cursor-pointer hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF8C32] focus:ring-offset-2 rounded-2xl"
                aria-label="Play cost tracking video"
              >
                <OptimizedImage 
                  src="/John Smith/costtrackingphone.png" 
                  alt="Cost Tracking Video Preview"
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

      {/* 2. How Cost Tracking Works Section */}
      <section className="py-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {/* Text Content */}
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                How Cost Tracking Works
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Cost tracking in CivDocs is built around <span className="font-semibold">project scopes</span> — measurable work items like <span className="font-semibold">300m of AGI</span> or <span className="font-semibold">2500t of rock install</span>. When you create a scope, you attach the specific <span className="font-semibold">cost codes</span> to it and set the <span className="font-semibold">budget inside those cost codes</span>. From there, CivDocs automatically posts real costs to the right code based on what your team logs each day.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg"><span className="font-semibold">Timesheets</span> post to the scope’s <span className="font-semibold">Labour</span> cost code</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg"><span className="font-semibold">Pre-starts</span> post machine <span className="font-semibold">day rates</span> to the scope’s <span className="font-semibold">Plant</span> cost code</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg"><span className="font-semibold">Materials</span> added by supervisors post to the scope’s <span className="font-semibold">Material</span> cost code</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg"><span className="font-semibold">Daily progress</span> updates the scope quantity so you can see <span className="font-semibold">overall cost per unit</span></span>
                </li>
              </ul>
            </div>

            {/* Cost Reporting Card */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm px-6 py-4 md:px-8 md:py-6 flex flex-col items-center max-w-xl mx-auto">
                <div className="max-w-[460px] mx-auto">
                  <OptimizedImage
                    src="/John Smith/cost tracking/costreporting.png"
                    alt="Cost Reporting Overview"
                    width={320}
                    height={640}
                    sizes="(max-width: 768px) 90vw, 380px"
                    className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mt-4 text-[#111827]">View budget vs actual costs</h3>
                <p className="text-[#6B7280] text-center text-sm mt-1 max-w-[90%]">
                  Compare budgets set in cost codes against actual costs posted from timesheets, pre-starts, and materials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Labour Costing Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {/* Text Content */}
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Labour Costing
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Labour cost is calculated from timesheets. Each employee has an hourly rate, and when they select a <span className="font-semibold">project + scope</span>, CivDocs automatically posts that cost into the scope’s <span className="font-semibold">Labour cost code</span>. Timesheets can’t be split across multiple scopes — each entry goes to one scope.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Employee hourly rates stored in the system</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Project and scope selection in timesheets</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Automatic roll-ups into project budgets</span>
                </li>
              </ul>
            </div>

            {/* Labour Reports Card */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm px-6 py-4 md:px-8 md:py-6 flex flex-col items-center max-w-xl mx-auto">
                <div className="max-w-[460px] mx-auto">
                  <OptimizedImage
                    src="/John Smith/cost tracking/labourreports.png"
                    alt="Labour Costing Reports"
                    width={320}
                    height={640}
                    sizes="(max-width: 768px) 90vw, 380px"
                    className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mt-4 text-[#111827]">Track labour costs by scope</h3>
                <p className="text-[#6B7280] text-center text-sm mt-1 max-w-[90%]">
                  See how employee timesheets automatically post to labour cost codes and roll up into your project budgets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Plant & Equipment Costing Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {/* Text Content */}
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Plant & Equipment Costs
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Pre-starts post machinery <span className="font-semibold">day rates</span> into project scopes. When an operator completes a pre-start and selects the <span className="font-semibold">project + scope</span>, CivDocs posts that day rate into the scope’s <span className="font-semibold">Plant cost code</span>. If multiple machines work the same scope, you’ll see multiple pre-starts — and multiple plant cost entries.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Machine day rates configured per asset</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Operators select project and scope in pre-starts</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Costs automatically allocated to plant cost codes</span>
                </li>
              </ul>
            </div>

            {/* Plant Reports Card */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm px-6 py-4 md:px-8 md:py-6 flex flex-col items-center max-w-xl mx-auto">
                <div className="max-w-[460px] mx-auto">
                  <OptimizedImage
                    src="/John Smith/cost tracking/Plantreports.png"
                    alt="Plant Costing Reports"
                    width={320}
                    height={640}
                    sizes="(max-width: 768px) 90vw, 380px"
                    className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mt-4 text-[#111827]">Track plant costs from pre-starts</h3>
                <p className="text-[#6B7280] text-center text-sm mt-1 max-w-[90%]">
                  See how machine day rates from pre-starts automatically post to plant cost codes in your project scopes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Materials Costing Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {/* Text Content */}
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Materials Costing
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Supervisors add materials used on site through the dashboard. Your materials library stores the unit and rate (and you can create materials on the fly). When materials are added to a <span className="font-semibold">scope</span>, CivDocs posts the cost into that scope’s <span className="font-semibold">Material cost code</span> and updates actuals instantly.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Supervisors add materials to project scopes</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Materials library stores rates and unit types</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Costs instantly update project actuals</span>
                </li>
              </ul>
            </div>

            {/* Materials Reports Card */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm px-6 py-4 md:px-8 md:py-6 flex flex-col items-center max-w-xl mx-auto">
                <div className="max-w-[460px] mx-auto">
                  <OptimizedImage
                    src="/John Smith/cost tracking/materialsreports.png"
                    alt="Materials Costing Reports"
                    width={320}
                    height={640}
                    sizes="(max-width: 768px) 90vw, 380px"
                    className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mt-4 text-[#111827]">Track materials costs by scope</h3>
                <p className="text-[#6B7280] text-center text-sm mt-1 max-w-[90%]">
                  See how materials added by supervisors automatically post to material cost codes and update project budgets.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Project Scopes Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {/* Text Content */}
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Project Scopes
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Each scope has a planned quantity (200m, 4000t, etc.) and the <span className="font-semibold">specific cost codes</span> you assign to it for Labour, Plant and Materials. You also set your <span className="font-semibold">budgets inside those scope cost codes</span>, so budget vs actual is always comparing apples with apples.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Each scope has a planned quantity</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Cost codes for Labour, Plant, and Materials</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Real-time budget vs actual tracking</span>
                </li>
              </ul>
            </div>

            {/* Project Scopes Card */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm px-6 py-4 md:px-8 md:py-6 flex flex-col items-center max-w-xl mx-auto">
                <div className="max-w-[460px] mx-auto">
                  <OptimizedImage
                    src="/John Smith/cost tracking/scopesproper (1).png"
                    alt="Project Scopes"
                    width={320}
                    height={640}
                    sizes="(max-width: 768px) 90vw, 380px"
                    className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mt-4 text-[#111827]">Create scopes with cost codes</h3>
                <p className="text-[#6B7280] text-center text-sm mt-1 max-w-[90%]">
                  Set up project scopes with planned quantities and assign cost codes for labour, plant, and materials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Daily Progress Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {/* Text Content */}
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Daily Progress Updates
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Supervisors enter daily progress updates for each scope. For example: Scope: 4000t planned. Supervisor enters 1500t completed today. CivDocs updates % complete, cost-per-unit, and forecasts remaining work.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Supervisors enter daily progress quantities</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Automatic percentage complete calculation</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
                  <span className="text-gray-700 text-lg">Cost-per-unit and forecast updates</span>
                </li>
              </ul>
            </div>

            {/* Daily Progress Card */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm px-6 py-4 md:px-8 md:py-6 flex flex-col items-center max-w-xl mx-auto">
                <div className="max-w-[460px] mx-auto">
                  <OptimizedImage
                    src="/John Smith/cost tracking/dailyprogress.png"
                    alt="Daily Progress Updates"
                    width={320}
                    height={640}
                    sizes="(max-width: 768px) 90vw, 380px"
                    className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mt-4 text-[#111827]">Update progress daily</h3>
                <p className="text-[#6B7280] text-center text-sm mt-1 max-w-[90%]">
                  Supervisors enter daily progress quantities to track completion percentage and calculate cost per unit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Cost Codes Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {/* Text Content */}
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Cost Codes
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Your organisation has a library of cost codes. CivDocs comes with common defaults (for example: <span className="font-semibold">3100-L</span> Labour, <span className="font-semibold">3100-P</span> Plant, <span className="font-semibold">3100-M</span> Material), and you’re encouraged to create your own to match how your business wants to track costs. When you build a scope, you choose which codes that scope will use — then CivDocs posts costs automatically into them.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Organisation-wide cost code library</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Add, edit, and delete codes as needed</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Scopes use codes to track costs</span>
                </li>
              </ul>
            </div>

            {/* Cost Codes Card */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm px-6 py-4 md:px-8 md:py-6 flex flex-col items-center max-w-xl mx-auto">
                <div className="max-w-[460px] mx-auto">
                  <OptimizedImage
                    src="/John Smith/cost tracking/costcodes.png"
                    alt="Cost Codes"
                    width={320}
                    height={640}
                    sizes="(max-width: 768px) 90vw, 380px"
                    className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mt-4 text-[#111827]">Manage your cost code library</h3>
                <p className="text-[#6B7280] text-center text-sm mt-1 max-w-[90%]">
                  Use default cost codes or create custom ones to match how your business tracks costs across projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. How All Costs Roll Up Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {/* Text Content */}
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                How All Costs Roll Up
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Every transaction lands on a <span className="font-semibold">project + scope + cost code</span>. Labour comes from timesheets, plant comes from pre-starts, and materials come from supervisors — and daily progress updates the completed quantity. That gives you a single real-time view of <span className="font-semibold">actual cost</span>, <span className="font-semibold">budget vs actual</span>, and <span className="font-semibold">overall cost per unit</span> at the scope level.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Labour → from Timesheets</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Plant → from Pre-starts</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Materials → from Supervisors</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Progress → from Daily updates</span>
                </li>
                <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                  <span className="text-gray-700 text-lg">All feed into: Actual cost, Over/under, Remaining budget, Performance summary</span>
                </li>
              </ul>
            </div>

            {/* Cost Rollup Card */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm px-6 py-4 md:px-8 md:py-6 flex flex-col items-center max-w-xl mx-auto">
                <div className="max-w-[460px] mx-auto">
                  <OptimizedImage
                    src="/John Smith/cost tracking/scopes1.png"
                    alt="How All Costs Roll Up"
                    width={320}
                    height={640}
                    sizes="(max-width: 768px) 90vw, 380px"
                    className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mt-4 text-[#111827]">See all costs in one place</h3>
                <p className="text-[#6B7280] text-center text-sm mt-1 max-w-[90%]">
                  View actual costs, budget vs actual, and cost per unit all rolled up at the scope level in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Materials Library Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {/* Text Content */}
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Materials Library
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Store material name, unit type, and unit rate in your materials library. Supervisors pull these materials into progress entries, ensuring consistent pricing and accurate cost tracking.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Store material name, unit type, and unit rate</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Supervisors pull materials into progress entries</span>
                </li>
                <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                  <span className="text-gray-700 text-lg">Consistent pricing across all projects</span>
                </li>
              </ul>
            </div>

            {/* Materials Library Card */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm px-6 py-4 md:px-8 md:py-6 flex flex-col items-center max-w-xl mx-auto">
                <div className="max-w-[460px] mx-auto">
                  <OptimizedImage
                    src="/John Smith/cost tracking/materials.png"
                    alt="Materials Library"
                    width={320}
                    height={640}
                    sizes="(max-width: 768px) 90vw, 380px"
                    className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mt-4 text-[#111827]">Store materials with rates</h3>
                <p className="text-[#6B7280] text-center text-sm mt-1 max-w-[90%]">
                  Build your materials library with unit types and rates for consistent pricing across all projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Cost Reports Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {/* Text Content */}
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Cost Reports
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Generate comprehensive cost reports showing budget vs actual, remaining budget, over/under analysis, and cost breakdown by category. All reports update in real-time as costs are added.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Budget vs actual comparison</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Remaining budget tracking</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Over/under analysis</span>
                </li>
                <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                  <span className="text-gray-700 text-lg">Cost breakdown by category</span>
                </li>
              </ul>
            </div>

            {/* Cost Reports Card */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm px-6 py-4 md:px-8 md:py-6 flex flex-col items-center max-w-xl mx-auto">
                <div className="max-w-[460px] mx-auto">
                  <OptimizedImage
                    src="/John Smith/cost tracking/scopes.png"
                    alt="Cost Reports"
                    width={320}
                    height={640}
                    sizes="(max-width: 768px) 90vw, 380px"
                    className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mt-4 text-[#111827]">Generate comprehensive cost reports</h3>
                <p className="text-[#6B7280] text-center text-sm mt-1 max-w-[90%]">
                  View budget vs actual, remaining budget, over/under analysis, and cost breakdowns by category.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Supervisor Tools Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {/* Text Content */}
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Supervisor Tools
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Supervisors have everything they need in one place: add daily progress, add materials, approve timesheets, and review scope performance — all from their dashboard.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Add daily progress updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Add materials to project scopes</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Approve timesheets and leave requests</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Review scope performance and budgets</span>
                </li>
              </ul>
            </div>

            {/* Supervisor Tools Card */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm px-6 py-4 md:px-8 md:py-6 flex flex-col items-center max-w-xl mx-auto">
                <div className="max-w-[460px] mx-auto">
                  <OptimizedImage
                    src="/John Smith/cost tracking/supervisor.png"
                    alt="Supervisor Tools"
                    width={320}
                    height={640}
                    sizes="(max-width: 768px) 90vw, 380px"
                    className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center mt-4 text-[#111827]">Everything supervisors need</h3>
                <p className="text-[#6B7280] text-center text-sm mt-1 max-w-[90%]">
                  Add daily progress, add materials, approve timesheets, and review scope performance all from one dashboard.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 13. Final CTA Section */}
      <section className="bg-[#FFFEFB] py-20 sm:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-8 tracking-tight">
            Take control of your project costs — without spreadsheets.
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            See where every dollar goes with real-time cost tracking that updates automatically from timesheets, pre-starts, and materials.
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
                  <source src={preloadedVideoUrl ?? "/John Smith/costtrackingvideo.mov"} type="video/quicktime" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
