'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

export default function AccountDeletionPage() {
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
      <header className="fixed top-0 left-0 right-0 z-[80]">
        <div className={`transition-all duration-200 ${
          isMobileMenuOpen ? 'shadow-none' : 'shadow-sm'
        }`} style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}>
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
      </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
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
        
            {/* Menu Card */}
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
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)' }}
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
                          <h3 className="text-[16px] font-semibold text-[#111827] leading-[1.25] tracking-[-0.01em]">Plant Hire Logbooks</h3>
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">Track plant hours and usage</p>
                        </a>
                        <a
                          href="/crank-ai" 
                          onClick={closeMobileMenu}
                          className="block rounded-2xl bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ease-in-out"
                        >
                          <h3 className="text-[16px] font-semibold text-[#111827] leading-[1.25] tracking-[-0.01em]">Crank.ai</h3>
                          <p className="mt-[4px] text-[14px] font-normal text-[#6B7280] leading-snug">AI-powered insights for your projects</p>
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <a href="/pricing" onClick={closeMobileMenu} className="block py-5 text-[16px] font-medium text-gray-600">
                  Pricing
                </a>

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

                <a href="/support" onClick={closeMobileMenu} className="block py-5 text-[16px] font-medium text-gray-600">
                  Support
                </a>

                <div className="pt-4">
                  <a 
                    href="/pricing" 
                    onClick={closeMobileMenu}
                    className="block w-full px-6 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-base rounded-full text-center hover:shadow-xl transition-all duration-200"
                  >
                    Start Free Trial →
                  </a>
                  <p className="text-sm text-[#FF8C32] text-center mt-3">No credit card required</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-32 pb-20 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 lg:p-16">
            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
              Account Deletion Request
            </h1>

            {/* Introduction */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We're sorry to see you go. To delete your CivDocs account, please follow the steps below.
            </p>

            {/* Instructions */}
            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  How to Request Account Deletion
                </h2>
                <ol className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF8C32] text-white flex items-center justify-center font-semibold text-sm">1</span>
                    <span>Email <a href="mailto:support@civdocs.com.au" className="text-[#FF8C32] hover:text-[#F5B041] font-semibold underline">support@civdocs.com.au</a> from the email address linked to your CivDocs account.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF8C32] text-white flex items-center justify-center font-semibold text-sm">2</span>
                    <span>Include the following information in your email:
                      <ul className="mt-2 ml-4 space-y-2 list-disc">
                        <li>Your company name</li>
                        <li>Your account email address</li>
                        <li>Confirmation that you want to delete your account</li>
                      </ul>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF8C32] text-white flex items-center justify-center font-semibold text-sm">3</span>
                    <span>We will confirm receipt of your request and process the deletion within <strong className="text-gray-900">7 days</strong> of receiving your email.</span>
                  </li>
                </ol>
              </div>

              {/* Email Template */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Email Template
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700">
                  <p className="mb-2">Subject: Account Deletion Request</p>
                  <p className="mb-2">To: support@civdocs.com.au</p>
                  <p className="mb-2">---</p>
                  <p className="mb-1">Hello,</p>
                  <p className="mb-1">I would like to request deletion of my CivDocs account.</p>
                  <p className="mb-1">Company Name: [Your Company Name]</p>
                  <p className="mb-1">Account Email: [Your Account Email]</p>
                  <p className="mb-1">Please confirm receipt and proceed with account deletion.</p>
                  <p>Thank you.</p>
                </div>
              </div>

              {/* Important Note */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Important Information
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Once your account is deleted, all data associated with your account will be permanently removed and cannot be recovered. This includes all projects, timesheets, pre-starts, plant logbooks, and cost tracking data. Please ensure you have exported any data you wish to keep before requesting deletion.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-gray-600 mb-4">
                If you have any questions or need assistance, please don't hesitate to contact our support team.
              </p>
              <Link 
                href="/support"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-base rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Contact Support
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Footer Card */}
          <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 lg:p-16 border border-gray-200">
            {/* Footer Links - Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Left Column */}
              <div className="grid grid-cols-2 gap-8">
                {/* Product */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Product</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="/prestarts" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                        Pre-Starts
                      </a>
                    </li>
                    <li>
                      <a href="/timesheets" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                        Timesheets
                      </a>
                    </li>
                    <li>
                      <a href="/cost-tracking" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                        Cost Tracking
                      </a>
                    </li>
                    <li>
                      <a href="/logbook" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                        Plant Hire Logbooks
                      </a>
                    </li>
                    <li>
                      <a href="/crank-ai" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                        Crank.ai
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Resources</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="/guides" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                        Guides
                      </a>
                    </li>
                    <li>
                      <a href="/video-tutorials" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                        Video Tutorials
                      </a>
                    </li>
                    <li>
                      <a href="/free-tools" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                        Crank.ai Cheat Sheet
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              <div className="grid grid-cols-2 gap-8">
                {/* Policies */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Policies</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="/terms" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a href="/privacy" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>

                {/* Support */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Support</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="/support" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                        Support & Feedback
                      </a>
                    </li>
                  </ul>
                  
                  {/* Pricing - Bottom Right */}
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Pricing</h3>
                    <ul className="space-y-3">
                      <li>
                        <a href="/pricing" className="text-gray-600 hover:text-[#FF8C32] transition-colors text-sm">
                          Pricing
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-200 pt-8">
              <p className="text-gray-500 text-sm text-center">
                © 2026 CivDocs. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

