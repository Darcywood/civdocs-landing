'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isFreeToolsDropdownOpen, setIsFreeToolsDropdownOpen] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const [isSupportDropdownOpen, setIsSupportDropdownOpen] = useState(false);

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
    setIsFreeToolsDropdownOpen(false);
    setIsResourcesDropdownOpen(false);
    setIsSupportDropdownOpen(false);
    document.body.classList.remove('overflow-hidden');
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    document.body.classList.add('overflow-hidden');
  };

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  const toggleFreeToolsDropdown = () => {
    setIsFreeToolsDropdownOpen(!isFreeToolsDropdownOpen);
  };

  const toggleResourcesDropdown = () => {
    setIsResourcesDropdownOpen(!isResourcesDropdownOpen);
  };

  const toggleSupportDropdown = () => {
    setIsSupportDropdownOpen(!isSupportDropdownOpen);
  };

  return (
    <>
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-[80]">
        <div className={`transition-all duration-200 ${
          isMobileMenuOpen ? 'shadow-none' : 'shadow-sm'
        }`} style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/">
                  <OptimizedImage src="/homepage/pngcivdocs1000x400.png" alt="CivDocs" width={200} height={64} className="h-16 w-auto" />
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
                    {/* Product Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 space-y-2">
                        <a href="/prestarts" className="block rounded-xl bg-white border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                          <h3 className="text-base font-semibold text-[#111827]">Pre-Starts</h3>
                          <p className="mt-1 text-sm font-normal text-[#6B7280]">Complete safety checks in 3 simple steps</p>
                        </a>
                        <a href="/timesheets" className="block rounded-xl bg-white border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                          <h3 className="text-base font-semibold text-[#111827]">Timesheets</h3>
                          <p className="mt-1 text-sm font-normal text-[#6B7280]">Log crew hours quickly and accurately</p>
                        </a>
                        <a href="/cost-tracking" className="block rounded-xl bg-white border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                          <h3 className="text-base font-semibold text-[#111827]">Cost Tracking</h3>
                          <p className="mt-1 text-sm font-normal text-[#6B7280]">Track project expenses and costs in real-time</p>
                        </a>
                        <a href="/logbook" className="block rounded-xl bg-white border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                          <h3 className="text-base font-semibold text-[#111827]">Logbook</h3>
                          <p className="mt-1 text-sm font-normal text-[#6B7280]">Digital logbook for hours, prestarts, machines, and compliance</p>
                        </a>
                        <a href="/crank-ai" className="block rounded-xl bg-white border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                          <h3 className="text-base font-semibold text-[#111827]">Crank.ai</h3>
                          <p className="mt-1 text-sm font-normal text-[#6B7280]">AI-powered assistant to streamline your workflow</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <a href="/pricing" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-base relative group">
                    Pricing
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                  </a>
                  <div className="relative group">
                    <button className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-base relative">
                      Free Tools
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    {/* Free Tools Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 space-y-2">
                        <a href="/capability-statement" className="block rounded-xl bg-white border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                          <h3 className="text-base font-semibold text-[#111827]">Capability Statement Generator</h3>
                          <p className="mt-1 text-sm font-normal text-[#6B7280]">Create a professional capability statement in minutes</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <button className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-base relative">
                      Resources
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    {/* Resources Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 space-y-2">
                        <a href="/guides" className="block rounded-xl bg-white border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                          <h3 className="text-base font-semibold text-[#111827]">Guides</h3>
                          <p className="mt-1 text-sm font-normal text-[#6B7280]">Step-by-step guides to help you get started</p>
                        </a>
                        <a href="/video-tutorials" className="block rounded-xl bg-white border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                          <h3 className="text-base font-semibold text-[#111827]">Video Tutorials</h3>
                          <p className="mt-1 text-sm font-normal text-[#6B7280]">Watch video tutorials to master CivDocs</p>
                        </a>
                        <a href="/affiliate-partners" className="block rounded-xl bg-white border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                          <h3 className="text-base font-semibold text-[#111827]">Affiliate Partners</h3>
                          <p className="mt-1 text-sm font-normal text-[#6B7280]">Earn 30% of recurring revenue by partnering with CivDocs</p>
                        </a>
                        <a href="/crank-ai-cheat-sheet" className="block rounded-xl bg-white border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                          <h3 className="text-base font-semibold text-[#111827]">Crank.ai Cheat Sheet</h3>
                          <p className="mt-1 text-sm font-normal text-[#6B7280]">Quick reference guide for Crank.ai commands and queries</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="relative group">
                    <button className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-base relative">
                      Support
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    {/* Support Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-4 space-y-2">
                        <a href="/support" className="block rounded-xl bg-white border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                          <h3 className="text-base font-semibold text-[#111827]">FAQs and Support</h3>
                          <p className="mt-1 text-sm font-normal text-[#6B7280]">Reach out if you have any questions or require help</p>
                        </a>
                        <a href="/support?inquiry=enterprise" className="block rounded-xl bg-white border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                          <h3 className="text-base font-semibold text-[#111827]">Enterprise enquiries</h3>
                          <p className="mt-1 text-sm font-normal text-[#6B7280]">For large companies with multiple divisions</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </nav>
                
                {/* CTA Button */}
                <a 
                  href="/start-trial" 
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
              className="fixed inset-0 top-[80px] bg-black/20 z-[70] lg:hidden"
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
              className="fixed top-[80px] left-0 right-0 z-[75] rounded-b-2xl shadow-lg overflow-hidden lg:hidden max-h-[calc(100vh-5rem)] overflow-y-auto"
              style={{ backgroundColor: 'rgb(255, 255, 255)' }}
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

                {/* Free Tools Dropdown */}
                <div>
                  <button 
                    onClick={toggleFreeToolsDropdown}
                    className="w-full flex items-center justify-between py-5 text-left"
                  >
                    <span className="text-[16px] font-medium text-gray-600">Free Tools</span>
                    <svg 
                      className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${
                        isFreeToolsDropdownOpen ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {isFreeToolsDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pb-4 pt-2 space-y-3 overflow-hidden"
                      >
                        <a 
                          href="/capability-statement" 
                          onClick={closeMobileMenu}
                          className="block rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                        >
                          <h3 className="text-[16px] font-semibold text-[#111827] leading-[1.25] tracking-[-0.01em]">Capability Statement Generator</h3>
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">Create a professional capability statement in minutes</p>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                          href="/affiliate-partners" 
                          onClick={closeMobileMenu}
                          className="block rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                        >
                          <h3 className="text-[16px] font-semibold text-[#111827] leading-[1.25] tracking-[-0.01em]">Affiliate Partners</h3>
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">Earn 30% of recurring revenue by partnering with CivDocs</p>
                        </a>
                        <a
                          href="/crank-ai-cheat-sheet" 
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
                  
                {/* Support Dropdown */}
                <div>
                  <button 
                    onClick={toggleSupportDropdown}
                    className="w-full flex items-center justify-between py-5 text-left"
                  >
                    <span className="text-[16px] font-medium text-gray-600">Support</span>
                    <svg 
                      className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${
                        isSupportDropdownOpen ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Support Dropdown */}
                  <AnimatePresence>
                    {isSupportDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pb-4 pt-2 space-y-3 overflow-hidden"
                      >
                        <a 
                          href="/support" 
                          onClick={closeMobileMenu}
                          className="block rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                        >
                          <h3 className="text-[16px] font-semibold text-[#111827] leading-[1.25] tracking-[-0.01em]">FAQs and Support</h3>
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">Reach out if you have any questions or require help</p>
                        </a>
                        <a
                          href="/support?inquiry=enterprise" 
                          onClick={closeMobileMenu}
                          className="block rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                        >
                          <h3 className="text-[16px] font-semibold text-[#111827] leading-[1.25] tracking-[-0.01em]">Enterprise enquiries</h3>
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">For large companies with multiple divisions</p>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Action Buttons */}
                <div className="pt-8 space-y-4">
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
    </>
  );
}







