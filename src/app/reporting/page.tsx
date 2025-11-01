'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function ReportingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    // Re-enable body scroll
    document.body.classList.remove('overflow-hidden');
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    // Disable body scroll
    document.body.classList.add('overflow-hidden');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-[80] bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image 
                src="/CivDocs no lift.svg" 
                alt="CivDocs"
                width={200}
                height={64}
                className="h-16 w-auto"
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-12">
              <nav className="flex items-center space-x-12">
                <Link href="/" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-lg relative group">
                  Home
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <a href="/pricing" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-lg relative group">
                  Pricing
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="#support" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-all duration-300 font-medium text-lg relative group">
                  Support
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF8C32] transition-all duration-300 group-hover:w-full"></span>
                </a>
              </nav>
              
              {/* Login Button */}
              <a 
                href="#login" 
                className="text-[#1E1E1E] hover:text-[#FF8C32] transition-colors duration-300 font-medium text-lg px-6 py-3 rounded-full"
              >
                Login
              </a>
              
              {/* CTA Button */}
              <a 
                href="#get-started" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-out"
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
              className="fixed inset-0 top-20 bg-black/20 z-[70] lg:hidden"
              onClick={closeMobileMenu}
            />
            
            {/* Menu Card - drops down from header */}
            <motion.div
              key="mobile-menu"
              initial={{ 
                opacity: 0,
                y: -20
              }}
              animate={{ 
                opacity: 1,
                y: 0
              }}
              exit={{ 
                opacity: 0,
                y: -20
              }}
              transition={{ 
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="fixed top-[88px] left-4 right-4 z-[75] bg-white rounded-3xl shadow-2xl overflow-hidden lg:hidden max-h-[calc(100vh-7rem)] overflow-y-auto"
            >

              {/* Menu content */}
              <div className="px-8 py-8 space-y-2">
                {/* Home */}
                <div>
                  <Link 
                    href="/" 
                    onClick={closeMobileMenu}
                    className="w-full flex items-center justify-between py-5"
                  >
                    <span className="text-2xl font-normal text-gray-700">Home</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Pricing */}
                <div>
                  <a 
                    href="/pricing" 
                    onClick={closeMobileMenu}
                    className="w-full flex items-center justify-between py-5"
                  >
                    <span className="text-2xl font-normal text-gray-700">Pricing</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
                
                {/* Reporting */}
                <div>
                  <a 
                    href="/reporting" 
                    onClick={closeMobileMenu}
                    className="w-full flex items-center justify-between py-5"
                  >
                    <span className="text-2xl font-normal text-[#FF8C32]">Reporting</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
                
                {/* Resources */}
                <div>
                  <a 
                    href="#resources" 
                    onClick={closeMobileMenu}
                    className="w-full flex items-center justify-between py-5"
                  >
                    <span className="text-2xl font-normal text-gray-700">Resources</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
                
                {/* Support */}
                <div>
                  <a 
                    href="#support" 
                    onClick={closeMobileMenu}
                    className="w-full flex items-center justify-between py-5"
                  >
                    <span className="text-2xl font-normal text-gray-700">Support</span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

                  <button 
                    onClick={closeMobileMenu}
                    className="w-full rounded-full py-4 text-lg font-semibold text-white bg-gradient-to-r from-[#FF8C32] to-[#F5B041] hover:scale-[1.02] transition-transform duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Start Free Trial</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <p className="text-center text-sm text-gray-500">No credit card required</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#FFFAF7] to-[#FFF5ED] pt-32 pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#1E1E1E] leading-[1.1] tracking-tight mb-8">
              Advanced Reporting & Analytics
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed font-medium max-w-4xl mx-auto mb-12">
              Transform your construction data into actionable insights with comprehensive reporting, real-time analytics, and automated dashboards.
            </p>
            
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-out mb-4">
              Start Free 7-Day Trial
            </div>
            <p className="text-sm text-gray-500 font-medium">
              No credit card required. Start tracking and analyzing in minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Product Features Section */}
      <section className="py-20 bg-gradient-to-b from-[#FFF5ED] to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-[#1E1E1E] mb-4">
              Product
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Everything you need to track, analyze, and optimize your construction operations
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">
            {/* Pre-Starts Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">
                Complete Safety Checks with Pre-Starts
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Streamline your safety protocols with digital pre-start checklists. Ensure every crew member is properly equipped and briefed before starting work.
              </p>
            </div>

            {/* Timesheets Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">
                Log Crew Hours with Digital Timesheets
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Replace paper timesheets with our intuitive digital system. Crew members can log hours quickly and accurately from any device.
              </p>
            </div>

            {/* Reporting Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2">
                Generate Comprehensive Reports & Analytics
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Transform your construction data into actionable insights. Get real-time dashboards, automated PDF reports, and detailed analytics on productivity and safety compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold text-[#1E1E1E] mb-4">
              Powerful Reporting Features
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              Everything you need to track, analyze, and optimize your construction operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 group border border-gray-100">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">
                Real-Time Dashboards
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Monitor project progress, safety compliance, and crew productivity with live-updating dashboards that give you instant visibility into your operations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 group border border-gray-100">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">
                Automated PDF Reports
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Generate professional PDF reports automatically. Schedule weekly, monthly, or custom reports that include safety compliance, timesheet summaries, and project analytics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 group border border-gray-100">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">
                Data Export & Integration
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Export your data in CSV, Excel, or PDF formats. Integrate with your existing accounting software, ERP systems, and project management tools for seamless workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-[#F9FAFB] via-[#FFFAF7] to-[#FFF5ED]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-semibold text-[#1E1E1E] mb-6">
            Ready to transform your construction reporting?
          </h2>
          <p className="text-xl text-gray-600 font-medium mb-12">
            Join hundreds of civil contractors who&apos;ve already streamlined their reporting and analytics with CivDocs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#get-started" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-out"
            >
              Start Free 7-Day Trial →
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center px-8 py-4 bg-white border border-gray-200 text-[#1E1E1E] font-semibold text-lg rounded-full hover:border-gray-300 transition-all duration-200"
            >
              Contact Sales
            </a>
          </div>
          <p className="text-sm text-gray-500 font-medium mt-6">
            No credit card required • Cancel anytime • 24/7 support
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E1E1E] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left Side - Logo and Company Info */}
            <div>
              <div className="mb-6">
                <Image 
                  src="/CivDocs no lift.svg" 
                  alt="CivDocs"
                  width={200}
                  height={48}
                  className="h-12 w-auto brightness-0 invert"
                />
              </div>
              <div className="space-y-2 text-gray-300">
                <p>Simplifying civil construction management</p>
                <p>123 Construction Ave, Suite 100</p>
                <p>Industrial City, IC 12345</p>
                <p>contact@civdocs.com</p>
              </div>
            </div>

            {/* Right Side - Links */}
            <div className="md:text-right">
              <div className="space-y-4">
                <a href="#privacy" className="block text-gray-300 hover:text-[#FF8C32] transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#terms" className="block text-gray-300 hover:text-[#FF8C32] transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="#support" className="block text-gray-300 hover:text-[#FF8C32] transition-colors duration-200">
                  Support
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © CivDocs 2025. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
