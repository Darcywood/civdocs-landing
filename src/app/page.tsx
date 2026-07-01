'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroTestimonialList from '@/components/marketing/HeroTestimonialList';
import HeroProofSection from '@/components/marketing/HeroProofSection';
import HeroStackedTestimonials from '@/components/marketing/HeroStackedTestimonials';
import HeroViewModeCards from '@/components/marketing/HeroViewModeCards';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';

export default function Home() {
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
  const allSchemas = [
    organizationSchema,
    brandSchema,
    homepageSchema,
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://www.civdocs.com.au/#website",
      "url": "https://www.civdocs.com.au",
      "name": "CivDocs",
      "description": "Australian construction management software for civil contractors and plant hire companies.",
      "publisher": { "@id": "https://www.civdocs.com.au/#organization" },
      "inLanguage": "en-AU",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(allSchemas) }}
      />
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#FFFEFB] pb-12 sm:pb-40 lg:pb-48">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="sm:pt-40 lg:pt-48">
            {/* Mobile Hyros-style: left text, full-width buttons */}
            <div className="pt-[84px] sm:pt-0">
              <div className="text-left w-full lg:ml-0">
                <h1>
                  <span className="block font-serif text-[3rem] lg:text-[2.75rem] xl:text-[3rem] font-normal text-[#1E1E1E] tracking-tight">
                    Meet
                  </span>
                  <span className="block font-serif text-[17vw] sm:text-[7.25rem] lg:text-[6.5rem] xl:text-[7.75rem] 2xl:text-[8.5rem] font-normal text-[#1E1E1E] leading-[0.86] lg:leading-[0.9] tracking-tight mt-1 lg:mt-0 lg:mb-10">
                    CivDocs.
                  </span>
                </h1>
                <h2 className="mt-5 lg:mt-0 lg:mb-[60px] text-[1.75rem] lg:text-xl xl:text-2xl text-gray-600 leading-snug lg:leading-relaxed font-normal font-sans max-w-[21rem] lg:max-w-xl">
                  The end of paper dockets for plant hire.
                </h2>
              </div>

              <div className="mt-10 lg:mt-0 lg:mb-[100px] flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 w-full lg:w-auto">
                <a 
                href="/start-trial#signup-form" 
                className="inline-flex items-center justify-center w-full lg:w-auto px-8 lg:px-10 py-[1.125rem] lg:py-3.5 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg lg:text-base xl:text-lg rounded-full hover:shadow-2xl hover:scale-[1.02] lg:hover:scale-105 transition-all duration-300"
                >
                Start free trial
                </a>
                <a 
                href="/book" 
                className="inline-flex items-center justify-center w-full lg:w-auto px-8 lg:px-10 py-[1.125rem] lg:py-3.5 bg-transparent border-2 border-[#1E1E1E]/25 text-[#1E1E1E] font-semibold text-lg lg:text-base xl:text-lg rounded-full hover:border-[#FF8C32] hover:text-[#FF8C32] transition-all duration-300"
                >
                Book a call
                </a>
              </div>

              <HeroTestimonialList />
              <HeroProofSection />
            </div>
            
            <HeroStackedTestimonials />

            {/* Dashboard Preview */}
            <div className="mt-12 sm:mt-16 flex items-center justify-center">
              <div className="w-full max-w-[230px] sm:max-w-[270px] md:max-w-[310px]">
                <OptimizedImage 
                  src="/homepage/dashboard1.png" 
                  alt="CivDocs Dashboard Preview" 
                  width={400}
                  height={800}
                  className="w-full h-auto drop-shadow-lg md:drop-shadow-2xl"
                  style={{ 
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform'
                  }}
                />
              </div>
            </div>

            <HeroViewModeCards />
          </div>
        </div>
      </section>

      {/* REMOVED: Plant Hire Logbooks → Invoicing Section */}
      {false && <section className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left">
              {/* Eyebrow heading */}
              <p className="text-sm font-semibold text-[#FF8C32] uppercase tracking-wide mb-4 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
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
                  href="/book" 
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  Book a call →
                </a>
                <p className="text-base font-normal text-neutral-700 mt-4">
                  Free 15-minute fit check. No pressure.
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
                      From daily logbooks
                    </p>
                  )}
                  {logbookCarouselIndex === 1 && (
                    <p className="text-[#6B7280] text-sm font-medium animate-pulse-glow">
                      to ready-to-send invoices — at the push of a button
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
                      <div 
                        className="shadow-lg md:shadow-xl rounded-2xl overflow-hidden bg-white p-2"
                        style={{ 
                          transform: 'translateZ(0)',
                          backfaceVisibility: 'hidden',
                          willChange: 'transform'
                        }}
                      >
                        <OptimizedImage
                          src="/homepage/logbook-home.png"
                          alt="CivDocs daily logbook mobile screen showing machine hours and supervisor sign-off"
                          width={600}
                          height={1200}
                          className="w-full max-w-[480px] mx-auto rounded-xl"
                          sizes="(max-width: 768px) 90vw, 480px"
                          priority
                          quality={95}
                        />
                      </div>
                    </div>
                  </SwiperSlide>

                  {/* Invoice Slide */}
                  <SwiperSlide style={{ height: 'auto' }}>
                    <div className="max-w-xl mx-auto h-full">
                      <div 
                        className="shadow-lg md:shadow-xl rounded-2xl overflow-hidden bg-white p-2"
                        style={{ 
                          transform: 'translateZ(0)',
                          backfaceVisibility: 'hidden',
                          willChange: 'transform'
                        }}
                      >
                        <OptimizedImage
                          src="/homepage/invoicehome.png"
                          alt="CivDocs generated invoice mobile screen showing automated invoice from approved logbook entries"
                          width={600}
                          height={1200}
                          className="w-full max-w-[480px] mx-auto rounded-xl"
                          sizes="(max-width: 768px) 90vw, 480px"
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
                  <div 
                    className="shadow-xl rounded-2xl overflow-hidden bg-white p-2"
                    style={{ 
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      willChange: 'transform'
                    }}
                  >
                    <OptimizedImage
                      src="/homepage/logbook-home.png"
                      alt="CivDocs daily logbook mobile screen showing machine hours and supervisor sign-off"
                      width={600}
                      height={1200}
                      className="w-full max-w-[480px] mx-auto rounded-xl"
                      sizes="480px"
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
                  <div 
                    className="shadow-xl rounded-2xl overflow-hidden bg-white p-2"
                    style={{ 
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      willChange: 'transform'
                    }}
                  >
                    <OptimizedImage
                      src="/homepage/invoicehome.png"
                      alt="CivDocs generated invoice mobile screen showing automated invoice from approved logbook entries"
                      width={600}
                      height={1200}
                      className="w-full max-w-[480px] mx-auto rounded-xl"
                      sizes="480px"
                      quality={95}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>}

      {/* Crank.ai Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50/30 pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left">
              {/* Eyebrow heading */}
              <p className="text-sm font-semibold text-[#FF8C32] uppercase tracking-wide mb-4 flex items-center gap-2">
                <OptimizedImage 
                  src="/homepage/crankeyebrowhomepage.png" 
                  alt="Crank AI" 
                  width={16} 
                  height={16} 
                  className="w-4 h-4 object-contain"
                />
                CRANK.AI
              </p>

              {/* Main headline */}
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-12">
                Stop guessing how your jobs are performing.
                <br />
                Get clear answers in seconds.
              </h2>

              {/* Body text */}
              <div className="space-y-8 text-lg font-normal text-neutral-700 leading-relaxed mb-12">
                <p>
                  CivDocs already captures what's happening on site — pre-starts, timesheets, plant hours, attachments, and invoices.
                </p>
                <p>
                  Crank.ai connects it all and turns that day-to-day data into answers owners and directors actually need — while the job is still running.
                </p>
                <p>
                  Instead of digging through screens, waiting on reports, or exporting data to spreadsheets, you ask a question and get a straight answer backed by your real numbers.
                </p>
              </div>

              {/* Supporting bullets */}
              <ul className="space-y-6 mb-12 text-lg font-normal text-neutral-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>See labour, plant, and material costs as they build</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>Catch overruns and inefficiencies before margin disappears</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0">•</span>
                  <span>Understand job performance without spreadsheets or reports</span>
                </li>
              </ul>

              {/* Transition line */}
              <p className="text-lg font-normal text-neutral-700 leading-relaxed">
                It's the difference between finding problems after the invoice — and seeing them while there's still time to act.
              </p>
            </div>

            {/* Right Column - Visual Container */}
            <div className="w-full flex flex-col items-center justify-center">
              {/* Optional label */}
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-6">
                Crank.ai Preview
              </p>
              
              {/* Premium SaaS-style card */}
              <div className="w-full flex justify-center">
                <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] overflow-hidden p-6 sm:p-8 lg:p-10">
                  <video 
                    src="/Crank.ai/crankvidhome.mp4.mp4" 
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="rounded-xl w-full h-auto max-w-full"
                    style={{
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                      display: 'block'
                    }}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              
              {/* CTA below video */}
              <div className="mt-8 flex flex-col items-center gap-4">
                <a 
                  href="/book" 
                  className="inline-flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-sm sm:text-base rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
                >
                  <span className="text-center">Book a call</span>
                  <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#E67E22] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
                <Link
                  href="/crank-ai"
                  className="inline-flex items-center text-base font-normal text-neutral-700 hover:text-[#FF8C32] transition-colors duration-300"
                >
                  See how Crank.ai works →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Machine Compliance Section */}
      <section className="relative overflow-hidden bg-[#FFFEFB] pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-semibold text-[#FF8C32] uppercase tracking-widest mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Machine Compliance
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-6">
              Every compliance document, one place. One click to share.
            </h2>
            <p className="text-xl text-neutral-700 leading-relaxed">
              Store risk assessments, service history, operator manuals, insurances, and operator tickets against each machine. When an engineer or project manager needs them, send a branded link in seconds — no Dropbox hunting, no email chains.
            </p>
          </div>

          {/* Two screenshots */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 items-start">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Your machine library</p>
              <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
                <OptimizedImage
                  src="/machinehomepageattachements/machine-compliance-list.png"
                  alt="CivDocs machine compliance list showing risk assessments, service history and operator tickets per machine"
                  width={1024}
                  height={768}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 90vw, 520px"
                  quality={95}
                />
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">What the recipient sees</p>
              <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
                <OptimizedImage
                  src="/machinehomepageattachements/machine-compliance-export.png"
                  alt="CivDocs compliance export page — what a client or engineer sees after receiving the link"
                  width={1024}
                  height={1400}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 90vw, 520px"
                  quality={95}
                />
              </div>
            </div>
          </div>

          {/* Feature bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {[
              { title: 'Everything stored per machine', body: 'Risk assessments, service history, operator manual, insurances, and operator tickets & VOCs — all attached directly to the machine.' },
              { title: 'No risk assessment? Create one free.', body: 'Use the CivDocs free risk assessment generator. Build one in minutes and attach it straight to the machine.', link: { label: 'Generate a free risk assessment →', href: '/free-tools/risk-assessment' } },
              { title: 'Export in one click', body: 'Hit "Export data", choose email or SMS, and the recipient gets a link — no CivDocs account needed to view or download.' },
              { title: 'Stop digging through Dropbox', body: 'No more hunting through shared drives to find the right document. It\'s already there — one link covers everything.' },
              { title: 'Looks professional', body: 'Your client or engineer receives a clean, branded compliance pack with your company name — exactly what Tier One sites expect.' },
            ].map(({ title, body, link }) => (
              <div key={title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                {link && (
                  <a href={link.href} className="mt-3 inline-block text-sm font-semibold text-[#FF8C32] hover:underline">{link.label}</a>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/40 px-8 py-6 shadow-sm">
            <p className="text-lg font-medium text-gray-700">Keep all your compliance documents in one place — ready to share instantly.</p>
            <a href="/start-trial#signup-form" className="inline-flex items-center justify-center px-7 py-3 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all whitespace-nowrap">
              Start Free Trial →
            </a>
          </div>
        </div>
      </section>

      {/* Site Works Section */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <div className="max-w-3xl mb-16">
            <p className="text-sm font-semibold text-[#FF8C32] uppercase tracking-widest mb-3 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Site Works
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-6">
              Everything happening on site — tracked in real time.
            </h2>
            <p className="text-xl text-neutral-700 leading-relaxed">
              Site equipment, truck loads, and daily notes — all in one place. Your crew can see what&apos;s at the yard, log truck movements, and record what happened on site, all from their phone.
            </p>
          </div>

          {/* Three tabs layout */}
          <div className="flex flex-col gap-20">

            {/* Site Equipment */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#FF8C32] mb-3">Site Equipment</p>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4 tracking-tight">
                  No more driving to the yard for a tool that isn&apos;t there.
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Water trailers, DPUs, demo saws, whacker plates — any small plant your crew shares day to day. Employees check items out to a job or to themselves, and check them back in when done. Everyone can see exactly what&apos;s at the yard and who has what, right now.
                </p>
                <ul className="space-y-3 text-base text-gray-600">
                  {[
                    'Check equipment out to a job or your possession',
                    'Every employee can see what\'s available at the yard',
                    'See who has what — line up with other crews before leaving',
                    'Check back in when the job\'s done',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 h-5 w-5 shrink-0 flex items-center justify-center rounded-full bg-orange-100">
                        <svg className="h-3 w-3 text-[#FF8C32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
                <OptimizedImage
                  src="/machinehomepageattachements/site-equipment.png"
                  alt="CivDocs site equipment screen showing check in and check out for yard equipment"
                  width={1024}
                  height={1200}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 90vw, 520px"
                  quality={95}
                />
              </div>
            </div>

            {/* Truck Tracking */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="lg:order-2">
                <p className="text-xs font-bold uppercase tracking-widest text-[#FF8C32] mb-3">Truck Tracking</p>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4 tracking-tight">
                  Every load tracked. Every truck accounted for.
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Add a truck by numberplate, select the material, and tap each time a load goes out or tips. At the end of the day, export the load count straight to the supervisor — no trying to remember how many runs were done.
                </p>
                <ul className="space-y-3 text-base text-gray-600">
                  {[
                    'Log loads by numberplate and material type',
                    'Tap once per load — nothing complicated',
                    'Multiple trucks on one job, tracked separately',
                    'Export the daily load summary to the supervisor',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 h-5 w-5 shrink-0 flex items-center justify-center rounded-full bg-orange-100">
                        <svg className="h-3 w-3 text-[#FF8C32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:order-1 overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
                <OptimizedImage
                  src="/machinehomepageattachements/truck-tracking.png"
                  alt="CivDocs truck tracking screen showing load count per truck"
                  width={1024}
                  height={1200}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 90vw, 520px"
                  quality={95}
                />
              </div>
            </div>

            {/* Site Diary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#FF8C32] mb-3">Site Diary</p>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4 tracking-tight">
                  A daily record of what actually happened on site.
                </h3>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Supervisors and operators can record what the crew got done, any delays, issues, or things the office needs to know — straight from their phone at end of day. No paperwork, no calls back to the office.
                </p>
                <ul className="space-y-3 text-base text-gray-600">
                  {[
                    'Quick daily notes tied to the job',
                    'Issues and delays recorded on the spot',
                    'Office stays informed without calls back to site',
                    'Builds a project history automatically',
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span className="mt-1 h-5 w-5 shrink-0 flex items-center justify-center rounded-full bg-orange-100">
                        <svg className="h-3 w-3 text-[#FF8C32]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
                <OptimizedImage
                  src="/machinehomepageattachements/site-diary.png"
                  alt="CivDocs site diary screen showing daily notes field for supervisors"
                  width={1024}
                  height={1200}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 90vw, 520px"
                  quality={95}
                />
              </div>
            </div>

          </div>

          {/* CTA */}
          <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/40 px-8 py-6 shadow-sm">
            <p className="text-lg font-medium text-gray-700">See everything happening on your sites — from one app.</p>
            <a href="/start-trial#signup-form" className="inline-flex items-center justify-center px-7 py-3 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all whitespace-nowrap">
              Start Free Trial →
            </a>
          </div>

        </div>
      </section>

      {/* Built for Civil Section */}
      <section className="py-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Eyebrow label */}
            <p className="text-sm font-semibold text-[#FF8C32] uppercase tracking-wide mb-6">
              BUILT FOR CIVIL
            </p>

            {/* H2 */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-8">
              Software that matches how civil work actually happens.
            </h2>

            {/* Body paragraphs */}
            <div className="space-y-6 text-lg font-normal text-neutral-700 leading-relaxed mb-12">
              <p>
                Civil projects don't run off neat spreadsheets — they run off machines, crews, hours, and site decisions made every day.
              </p>
              <p>
                CivDocs is built to match that reality.
                <br />
                It captures what happens on site and turns it into clean, approved data you can actually rely on.
              </p>
            </div>

            {/* Bullet list */}
            <ul className="space-y-5 mb-16 text-lg font-normal text-neutral-700">
              <li className="flex items-start gap-3">
                <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                <span>Site-first workflows that don't slow crews down</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                <span>Plant, labour, and materials tied to real jobs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                <span>Supervisor sign-offs that lock data in place</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                <span>Clear numbers without chasing people or paperwork</span>
              </li>
            </ul>

            {/* CTA Section */}
            <div className="pt-12 border-t border-gray-200">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
                <div className="mb-4">Better data.</div>
                <div className="mb-4">Better decisions.</div>
                <div>Better margins.</div>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
                CivDocs connects site activity to real project costs so you can act early — not after it's too late.
              </p>
              <div className="flex flex-col items-start gap-4">
                <a 
                  href="/book" 
                  className="inline-flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-sm sm:text-base rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center sm:justify-start"
                >
                  <span className="text-center sm:text-left">Book a call</span>
                  <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#E67E22] flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </a>
                <p className="text-sm text-gray-500">
                  Free 15-minute fit check
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      </div>
    </div>
    </>
  );
}
