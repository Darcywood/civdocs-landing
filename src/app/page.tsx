'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [logbookCarouselIndex, setLogbookCarouselIndex] = useState(0);
  const logbookSwiperRef = useRef<SwiperType | null>(null);

  // Preload logbook carousel images
  useEffect(() => {
    const images = ['/homepage/logbook-home.png', '/homepage/invoicehome.png'];
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
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
    // Re-enable body scroll
    document.body.classList.remove('overflow-hidden');
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    // Disable body scroll
    document.body.classList.add('overflow-hidden');
  };

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  const toggleResourcesDropdown = () => {
    setIsResourcesDropdownOpen(!isResourcesDropdownOpen);
  };

  // Organization and Brand schemas (homepage only - entity definition)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.civdocs.com.au/#organization",
    "name": "CivDocs",
    "url": "https://www.civdocs.com.au",
    "description": "CivDocs is an Australian construction management software company serving civil construction contractors.",
    "industry": "Construction",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.civdocs.com.au/CivDocs-logo-1000x400.svg",
      "width": 1000,
      "height": 400,
    },
    "sameAs": [],
  };

  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": "https://www.civdocs.com.au/#brand",
    "name": "CivDocs",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.civdocs.com.au/CivDocs-logo-1000x400.svg",
      "width": 1000,
      "height": 400,
    },
    "url": "https://www.civdocs.com.au",
  };

  // SoftwareApplication schema with @id references
  const homepageSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "CivDocs - Civil Construction Management Software",
    "description": "All-in-one civil construction software: digital pre-starts, timesheets, plant hire logbooks, cost tracking, and AI-powered insights. Start free trial.",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": ["Web", "iOS", "Android"],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "AUD",
      "availability": "https://schema.org/InStock",
      "url": "https://www.civdocs.com.au/pricing",
    },
    "publisher": {
      "@id": "https://www.civdocs.com.au/#organization",
    },
    "brand": {
      "@id": "https://www.civdocs.com.au/#brand",
    },
    "url": "https://www.civdocs.com.au",
    "inLanguage": "en-AU",
    "industry": "Construction",
    "applicationSubCategory": "Construction Management Software",
  };

  // Combine all schemas into a single array for efficient rendering
  const allSchemas = [organizationSchema, brandSchema, homepageSchema];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(allSchemas) }}
      />
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
                <a href="/pricing" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-base relative group">
                  Pricing
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
              
              {/* CTA Button */}
              <a 
                href="/pricing" 
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
                  <a
                    href="/pricing"
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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#FFFEFB] pt-32 pb-32 sm:pt-40 sm:pb-40 lg:pt-48 lg:pb-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-8">
              Simplify Civil Construction Pre-Starts, Timesheets & Cost Tracking
              </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-12 font-medium">
              Save hours every week with automated reports, checklists, and timesheets — built for busy civil crews.
              </p>
            <div className="flex flex-col items-center">
                <a 
                href="/pricing" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                Start Free Trial →
                </a>
              <p className="text-base font-bold text-[#FF8C32] mt-4 animate-pulse-glow drop-shadow-sm">No credit card required</p>
            </div>
            
            {/* Dashboard Preview */}
            <div className="mt-16">
              <div className="shadow-2xl rounded-3xl bg-white p-6 h-[320px] w-full max-w-4xl mx-auto border border-gray-100">
                <div className="h-full bg-gradient-to-br from-gray-50 to-white rounded-2xl flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                    <p className="text-sm font-medium">Dashboard Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section - Humblytics Style */}
      <section className="relative overflow-hidden bg-white pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-left">
            {/* Large headline for first sentence */}
            <h2 className="text-3xl sm:text-4xl font-medium text-[#1E1E1E] leading-tight tracking-tight mb-10 max-w-3xl">
              It's the end of the month — and you're left scratching your head.
            </h2>

            {/* Story paragraphs - large, airy, readable */}
            <div className="space-y-5 text-lg font-normal text-neutral-700 leading-relaxed">
              <ul className="space-y-2 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>The job looked busy.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>Crews were flat out.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>Plant ran all week.</span>
                </li>
              </ul>
              <p className="text-xl mb-8">
                But the numbers don't line up.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>Labour's higher than planned.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>Plant hours feel off.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>Attachments didn't get charged.</span>
                </li>
              </ul>
              <p className="text-xl mb-8">
                You're jumping between timesheets, logbooks, and spreadsheets trying to work out what actually happened.
              </p>
              
              {/* Short emphasis lines - grouped with extra spacing */}
              <div className="mt-4 mb-8">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                    <span className="text-lg font-normal text-neutral-700 leading-relaxed">Was it overtime?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                    <span className="text-lg font-normal text-neutral-700 leading-relaxed">Was plant sitting idle?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                    <span className="text-lg font-normal text-neutral-700 leading-relaxed">Or was it just bad data?</span>
                  </li>
                </ul>
              </div>
              
              <p className="text-xl">
                You don't know — and that's the problem.
              </p>
            </div>

            {/* Solution statement */}
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mt-10 mb-8">
              CivDocs changes this.
            </h3>
            
            {/* Solution description */}
            <div className="max-w-2xl space-y-2">
              <p className="text-lg font-normal text-neutral-700 leading-relaxed">
                Construction management software for civil contractors.
              </p>
              <p className="text-lg font-normal text-neutral-700 leading-relaxed">
                Pre-starts, timesheets, plant logbooks, and cost tracking — all connected, approved, and trusted.
              </p>
            </div>

            {/* Dashboard Preview */}
            <div className="mt-12">
              <div className="shadow-2xl rounded-3xl bg-white p-6 h-[400px] w-full max-w-5xl mx-auto border border-gray-100">
                <div className="h-full bg-gradient-to-br from-gray-50 to-white rounded-2xl flex flex-col items-center justify-center relative">
                  <div className="text-gray-400 text-center">
                    <svg className="w-20 h-20 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                    <p className="text-sm font-medium mb-2">Desktop cost tracking dashboard</p>
                    <p className="text-xs text-gray-500">(Labour / Plant / Materials breakdown)</p>
                  </div>
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                    <p className="text-sm font-medium text-gray-600 italic">
                      "Approved site data → trusted project numbers"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Your Numbers Section - Humblytics Style */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-left">
            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-8">
              Then trust your numbers.
            </h2>

            {/* Body paragraphs */}
            <div className="space-y-6 text-lg font-normal text-neutral-700 leading-relaxed mb-10">
              <p>
                CivDocs turns approved site data into real project numbers — while work is still underway.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>See labour, plant, and material costs as they build.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>Spot overruns early.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>Fix issues before they kill your margin.</span>
                </li>
              </ul>
              
              <p>
                No spreadsheets. No chasing paperwork. No waiting until month-end.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-start">
              <a 
                href="/pricing" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Start 14-Day Free Trial →
              </a>
              <p className="text-base font-normal text-neutral-700 mt-4">
                No credit card required. Get visibility across your jobs in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How CivDocs Works Section - Humblytics Style */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-left">
            {/* Eyebrow heading */}
            <p className="text-sm font-semibold text-[#FF8C32] uppercase tracking-wide mb-4">
              How CivDocs Works
            </p>

            {/* Main headline */}
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-8">
              From messy site data to trusted project numbers.
            </h2>

            {/* Body copy */}
            <div className="space-y-6 text-lg font-normal text-neutral-700 leading-relaxed mb-12">
              <p>
                CivDocs turns daily site activity into live project costs — automatically.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>Pre-starts capture the machines used on site and apply the correct daily plant rate to the plant cost code.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>Timesheets feed labour hours directly into labour cost codes as they're approved.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>Materials are added by supervisors and allocated to the correct material cost codes.</span>
                </li>
              </ul>
              
              <p>
                Every entry is approved, timestamped, and locked to the job it was used on.
                Those costs roll up into the project scope in real time — so budget vs actuals are always current.
              </p>
              
              <p>
                No spreadsheets. No backtracking. No waiting until the end of the month to find problems.
              </p>
            </div>

            {/* Diagram image */}
            <div className="mb-6">
              <OptimizedImage
                src="/homepage/scopediagrem.png"
                alt="CivDocs project scope diagram showing approved site data flowing into cost codes and live project scope"
                width={1200}
                height={800}
                className="w-full max-w-4xl mx-auto"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
            </div>

            {/* Caption */}
            <p className="text-sm text-gray-500 text-center italic">
              Approved site data → cost codes → live project scope → trusted reporting
            </p>
          </div>
        </div>
      </section>

      {/* Plant Hire Logbooks → Invoicing Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left">
              {/* Eyebrow heading */}
              <p className="text-sm font-semibold text-[#FF8C32] uppercase tracking-wide mb-4">
                Plant Hire Logbooks
              </p>

              {/* Main headline */}
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-8">
                From logbook to invoice — automatically.
              </h2>

              {/* Body copy */}
              <div className="space-y-6 text-lg font-normal text-neutral-700 leading-relaxed mb-8">
                <p>
                  Operators record machine hours, overtime, and attachments directly on site.
                  Supervisors review and sign off each day — capturing a digital signature per job.
                </p>
                
                <p>
                  Once approved, those entries are ready to invoice.
                  No re-entering data. No missing hours. No disputes over what was used.
                </p>
              </div>

              {/* Bullet points */}
              <ul className="space-y-3 mb-10 text-lg font-normal text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>Machine hours, overtime, and attachments captured per day</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>Supervisor sign-off with timestamp and signature</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>Hours allocated per job automatically</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>Invoices generated directly from approved logbooks</span>
                </li>
              </ul>

              {/* CTA */}
              <div className="flex flex-col items-start">
                <a 
                  href="/pricing" 
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Start Free Trial →
                </a>
                <p className="text-base font-normal text-neutral-700 mt-4">
                  No credit card required. Create invoices from real site data.
                </p>
              </div>
            </div>

            {/* Right Column - Images Carousel */}
            <div className="w-full">
              {/* Mobile Carousel - swipable */}
              <div className="lg:hidden">
                {/* Number Pagination - Above the carousel */}
                <div className="flex justify-center gap-3 mb-6 z-10 relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (logbookSwiperRef.current) {
                        logbookSwiperRef.current.slideTo(0);
                      }
                    }}
                    className={`w-10 h-10 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer relative z-10 ${
                      logbookCarouselIndex === 0
                        ? 'bg-[#FF8C32] text-white scale-110'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                    aria-label="Go to logbook"
                  >
                    1
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (logbookSwiperRef.current) {
                        logbookSwiperRef.current.slideTo(1);
                      }
                    }}
                    className={`w-10 h-10 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer relative z-10 ${
                      logbookCarouselIndex === 1
                        ? 'bg-[#FF8C32] text-white scale-110'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                    aria-label="Go to invoice"
                  >
                    2
                  </button>
                </div>

                {/* Swipe hint label */}
                <div className="flex justify-center mb-4 h-6">
                  {logbookCarouselIndex === 0 && (
                    <p className="text-[#6B7280] text-sm font-medium animate-pulse-glow">
                      Swipe to view invoice →
                    </p>
                  )}
                </div>

                <Swiper
                  spaceBetween={16}
                  slidesPerView={1.1}
                  centeredSlides={false}
                  speed={300}
                  resistance={true}
                  resistanceRatio={0.85}
                  onSwiper={(swiper) => {
                    logbookSwiperRef.current = swiper;
                  }}
                  onSlideChange={(swiper) => setLogbookCarouselIndex(swiper.activeIndex)}
                  className="!pb-8"
                  style={{
                    overflow: 'visible'
                  }}
                >
                  {/* Logbook Slide */}
                  <SwiperSlide style={{ height: 'auto' }}>
                    <div className="max-w-xl mx-auto h-full">
                      <div className="shadow-xl rounded-2xl overflow-hidden bg-white p-2">
                        <OptimizedImage
                          src="/homepage/logbook-home.png"
                          alt="CivDocs daily logbook mobile screen showing machine hours and supervisor sign-off"
                          width={600}
                          height={1200}
                          className="w-full max-w-[400px] mx-auto rounded-xl"
                          sizes="(max-width: 768px) 90vw, 400px"
                          priority
                          quality={95}
                        />
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Invoice Slide */}
                  <SwiperSlide style={{ height: 'auto' }}>
                    <div className="max-w-xl mx-auto h-full">
                      <div className="shadow-xl rounded-2xl overflow-hidden bg-white p-2">
                        <OptimizedImage
                          src="/homepage/invoicehome.png"
                          alt="CivDocs generated invoice mobile screen showing automated invoice from approved logbook entries"
                          width={600}
                          height={1200}
                          className="w-full max-w-[400px] mx-auto rounded-xl"
                          sizes="(max-width: 768px) 90vw, 400px"
                          priority
                          quality={95}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>

              {/* Desktop - Side by side */}
              <div className="hidden lg:flex gap-6 items-center justify-center">
                {/* Logbook Image */}
                <div className="flex-shrink-0">
                  <div className="shadow-xl rounded-2xl overflow-hidden bg-white p-2">
                    <OptimizedImage
                      src="/homepage/logbook-home.png"
                      alt="CivDocs daily logbook mobile screen showing machine hours and supervisor sign-off"
                      width={600}
                      height={1200}
                      className="w-full max-w-[400px] mx-auto rounded-xl"
                      sizes="400px"
                      quality={95}
                    />
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center justify-center text-[#FF8C32]">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>

                {/* Invoice Image */}
                <div className="flex-shrink-0">
                  <div className="shadow-xl rounded-2xl overflow-hidden bg-white p-2">
                    <OptimizedImage
                      src="/homepage/invoicehome.png"
                      alt="CivDocs generated invoice mobile screen showing automated invoice from approved logbook entries"
                      width={600}
                      height={1200}
                      className="w-full max-w-[400px] mx-auto rounded-xl"
                      sizes="400px"
                      quality={95}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight tracking-tight">
              Everything Your Team Needs
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {/* Feature 1 - Pre-Starts */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'prestarts' ? null : 'prestarts')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Pre-Starts
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Complete safety checks in 3 simple steps — ensure your crew is ready.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'prestarts' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'prestarts' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 border-t border-gray-100">
                      <div className="pt-6 space-y-4">
                        <p className="text-gray-700 leading-relaxed font-bold">
                          Pre-Starts done properly — fast, simple, built for the real world.
                        </p>
                        <ol className="space-y-2 text-gray-700 list-decimal list-inside ml-4">
                          <li className="font-semibold">Pick the project & machine</li>
                          <li className="font-semibold">Tick through your checklist</li>
                          <li className="font-semibold">Sign it off and send it</li>
                        </ol>
                        <p className="text-gray-700 leading-relaxed">
                          If something's wrong — like a hose starting to leak — the supervisor gets an instant alert so it's fixed before it turns into downtime.
                        </p>
                        <p className="text-gray-700 leading-relaxed font-semibold">
                          Each Pre-Start automatically:
                        </p>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                            <span>Creates a PDF</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                            <span>Sends it straight to the supervisor</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                            <span>Logs to the project for compliance</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                            <span>Stores photos, faults & signatures</span>
                          </li>
                        </ul>
                        <div className="pt-4">
                          <Link
                            href="/prestarts"
                            className="inline-flex items-center text-[#FF8C32] font-semibold hover:text-[#F5B041] transition-colors"
                          >
                            See more
                            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Feature 2 - Timesheets */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'timesheets' ? null : 'timesheets')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Timesheets
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Log crew hours quickly and accurately with automated calculations.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'timesheets' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'timesheets' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 border-t border-gray-100">
                      <div className="pt-6 space-y-4">
                        <p className="text-gray-700 leading-relaxed font-bold">
                          Timesheets made easy — accurate hours without the headaches.
                        </p>
                        <ol className="space-y-2 text-gray-700 list-decimal list-inside ml-4">
                          <li className="font-semibold">Select your project</li>
                          <li className="font-semibold">Enter start, finish & break times</li>
                          <li className="font-semibold">Add notes if needed and submit your week</li>
                        </ol>
                        <p className="text-gray-700 leading-relaxed">
                          Supervisors review and approve all entries at the end of the week, keeping hours honest and payroll simple.
                        </p>
                        <p className="text-gray-700 leading-relaxed font-semibold">
                          Each Timesheet automatically:
                        </p>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                            <span>Captures accurate employee hours for cost tracking</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                            <span>Generates a weekly PDF stored under the employee</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                            <span>Stays simple and mobile-friendly for non-techy crews</span>
                          </li>
                        </ul>
                        <div className="pt-4">
                          <Link
                            href="/timesheets"
                            className="inline-flex items-center text-[#FF8C32] font-semibold hover:text-[#F5B041] transition-colors"
                          >
                            See more
                            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Feature 3 - Cost tracking */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'cost-tracking' ? null : 'cost-tracking')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Cost tracking
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Track project expenses and costs in real-time with detailed breakdowns.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'cost-tracking' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'cost-tracking' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 border-t border-gray-100">
                      <div className="pt-6 space-y-4">
                        <p className="text-gray-700 leading-relaxed font-bold">
                          Real-time cost tracking — know where every dollar goes.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          CivDocs automatically pulls data from your crew's Timesheets and machine usage so you can see the true cost of every project in real time.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          Track labour, plant and scope progress without digging through spreadsheets or chasing paperwork.
                        </p>
                        <p className="text-gray-700 leading-relaxed font-semibold">
                          Cost Tracking gives you:
                        </p>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                            <span>Accurate <span className="font-semibold">labour & plant costs</span> for every project</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                            <span>Real-time visibility on <span className="font-semibold">budget vs actual</span></span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                            <span>Early warnings when scopes start drifting</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                            <span>Clear breakdowns for supervisors & management</span>
                          </li>
                        </ul>
                        <div className="pt-4">
                          <Link
                            href="/cost-tracking"
                            className="inline-flex items-center text-[#FF8C32] font-semibold hover:text-[#F5B041] transition-colors"
                          >
                            See more
                            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Feature 4 - Crank.ai */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'crank-ai' ? null : 'crank-ai')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <OptimizedImage 
                      src="/Crank.ai/crank.ai.png" 
                      alt="Crank.ai" 
                      width={36} 
                      height={36} 
                      className="w-9 h-9 object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Crank.ai
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      AI-powered assistant to help streamline your workflow and answer questions.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'crank-ai' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'crank-ai' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 border-t border-gray-100">
                      <div className="pt-6 space-y-4">
                        <p className="text-gray-700 leading-relaxed font-bold">
                          Forecast future jobs with confidence — using your own real project data.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          Crank.ai analyzes completed projects to show exactly what similar upcoming work will cost — based on true crew productivity, machine usage, and your historical cost-per-metre.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          No more quoting blind.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          No more losing money from underpricing.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          No more missing tenders from overpricing.
                        </p>
                        <p className="text-gray-700 leading-relaxed font-semibold">
                          Crank.ai helps you:
                        </p>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-start gap-2">
                            <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                            <span>Predict the <span className="font-semibold">total cost</span> of similar upcoming jobs</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                            <span>See your exact <span className="font-semibold">cost per metre</span> from real completed projects</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                            <span>Measure <span className="font-semibold">crew productivity</span> to plan labour and plant accurately</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                            <span>Compare past jobs to new tenders to quote with confidence</span>
                          </li>
                        </ul>
                        <div className="pt-4">
                          <Link
                            href="/crank-ai"
                            className="inline-flex items-center text-[#FF8C32] font-semibold hover:text-[#F5B041] transition-colors"
                          >
                            See more
                            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 lg:py-40 bg-gradient-to-b from-[#FFF5ED] to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-8 tracking-tight">
            Ready to Simplify Your Workflow?
            </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed">
            Join civil teams saving hours every week with CivDocs.
          </p>
          <a 
            href="/pricing" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Free Trial →
          </a>
          <p className="text-sm mt-4">
            <span className="font-bold text-[#FF8C32] animate-pulse-glow">No credit card required</span>
            <span className="text-gray-500"> • Get started in minutes</span>
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
    </>
  );
}
