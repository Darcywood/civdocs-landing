'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import PrestartSteps from '@/components/marketing/PrestartSteps';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function PreStartsPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFEFB] overflow-x-hidden">
      <Header />
      <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] mb-6">
                Digital pre-starts that simply make sense.
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                A fast, guided workflow that keeps your team compliant and your machines checked every morning.
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
                  onClick={() => setIsVideoModalOpen(true)}
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
                aria-label="Play prestart video"
              >
                <OptimizedImage 
                  src="/John Smith/prestart-placeholder.png" 
                  alt="Prestart Video Preview"
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

      {/* How Pre-Starts Work Section */}
      <PrestartSteps />

        {/* Early Fault Detection Section */}
        <section className="pt-20 pb-24 bg-[#FFFEFB]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {/* Text Content */}
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Fix issues before they become downtime.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Operators can report issues like hydraulic leaks, broken teeth or GPS / UTS issues directly in CivDocs. Supervisors are alerted instantly so problems are handled before they cause costly delays.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Instant notifications to supervisors</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Faults stored in machine history</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Issues fixed before they blow out costs</span>
                </li>
              </ul>
            </div>

            {/* Bucket Image - Below Bullets */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                <OptimizedImage
                  src="/John Smith/cost tracking/brokentooth.png"
                  alt="Fault reporting - Bucket"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Automatic PDF Reports Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {/* Text Content - Above PDF */}
            <div className="text-center lg:text-left max-w-3xl mx-auto lg:mx-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Every Pre-Start becomes a clean, compliant PDF.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Created instantly and stored under the project for easy audit and safety compliance.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Timestamped and signed</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Includes photos and fault notes</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Organised by project and operator</span>
                </li>
              </ul>
            </div>

            {/* PDF Display - Below Text */}
            {/* Mobile - Responsive */}
            <div className="w-full md:hidden p-4">
              <div className="w-full rounded-xl border border-gray-200 bg-white overflow-hidden">
                <div className="max-h-[900px] overflow-y-auto">
                  <OptimizedImage
                    src="/prestart-page/prestartpdf1.png"
                    alt="Pre-Start PDF Report Page 1"
                    width={800}
                    height={1000}
                    className="w-full h-auto"
                  />
                  <OptimizedImage
                    src="/prestart-page/prestartpdf2.png"
                    alt="Pre-Start PDF Report Page 2"
                    width={800}
                    height={1000}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
            {/* Desktop - Responsive */}
            <div className="hidden md:flex items-center justify-center p-8">
              <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white overflow-hidden">
                <div className="max-h-[900px] overflow-y-auto">
                  <OptimizedImage
                    src="/prestart-page/prestartpdf1.png"
                    alt="Pre-Start PDF Report Page 1"
                    width={800}
                    height={1000}
                    className="w-full h-auto"
                  />
                  <OptimizedImage
                    src="/prestart-page/prestartpdf2.png"
                    alt="Pre-Start PDF Report Page 2"
                    width={800}
                    height={1000}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pt-12 pb-24 bg-[#FFFEFB]">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">Keep Your Crew Safe & Compliant</h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Streamline your safety protocols with digital pre-start checklists. Ensure every crew member is properly equipped and briefed before starting work.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 text-lg">Complete safety checks in 3 simple steps</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 text-lg">Digital checklists accessible from any device</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700 text-lg">Ensure compliance and safety standards</span>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/start-trial"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all"
              >
                Start Free Trial →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* User Experience Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col items-center">
            {/* User Experience Image - Above Text */}
            <div className="flex items-center justify-center mb-16">
              <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-lg">
                <OptimizedImage
                  src="/John Smith/prestart.jpg"
                  alt="User experience - Pre-Start interface"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Text Content - Below Image */}
            <div className="text-center max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Built for real crews — simple, fast and familiar.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                CivDocs Pre-Starts are designed for non-techy operators. Large buttons, clean screens and a simple flow make it easy for anyone to use on site.
              </p>
              
              {/* Bullets */}
              <ul className="space-y-4">
                <li className="flex items-start gap-3 justify-center">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Works on phones, tablets and desktops</span>
                </li>
                <li className="flex items-start gap-3 justify-center">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Zero learning curve</span>
                </li>
                <li className="flex items-start gap-3 justify-center">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Optimised for on-site use</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#FFF5ED] to-orange-50 rounded-3xl p-12 border border-orange-100 shadow-lg">
            <div className="text-center">
              <svg className="w-12 h-12 text-[#FF8C32] mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <blockquote className="text-2xl sm:text-3xl font-medium text-gray-900 mb-6 leading-relaxed">
                "Pre-start paperwork used to take ages every morning. CivDocs makes it quick and supervisors get reports instantly."
              </blockquote>
              <p className="text-lg text-gray-600 font-medium">
                — John Lynch, JAL Civil Earthworks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#FFFEFB] py-20 sm:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
            Digitise your pre-starts today.
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
            Capture compliant pre-starts, fault reports, and signatures in one simple flow — without slowing your crew down.
          </p>
          <div className="flex flex-col items-center gap-4">
            <a 
              href="/start-trial" 
              className="inline-flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-sm sm:text-base rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <span className="text-center">Start 14-Day Trial - No Credit Card Required</span>
              <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#E67E22] flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
            <p className="text-sm text-gray-500">
              Get started in minutes
            </p>
          </div>
        </div>
      </section>

      <Footer />
      </div>

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
                  <source src="/prestart-page/prestart.mp4.mp4" type="video/mp4" />
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

