'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
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
  const allSchemas = [organizationSchema, brandSchema, homepageSchema];

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
      <section className="relative overflow-hidden bg-[#FFFEFB] pt-32 pb-32 sm:pt-40 sm:pb-40 lg:pt-48 lg:pb-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-8">
              Know your job costs while work is still underway.
            </h1>
            <h2 className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-12 font-medium">
              CivDocs turns your daily site activity into live project, plant, and cost data — without paperwork or spending $120,000 a year on an engineer/analyst.
              </h2>
            <div className="flex flex-col items-center">
                <a 
                href="/book" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                Book a call →
                </a>
              <p className="text-base font-bold text-[#FF8C32] mt-4 animate-pulse-glow drop-shadow-sm">Free 15-minute fit check</p>
            </div>
            
            {/* Dashboard Preview */}
            <div className="mt-16 flex items-center justify-center">
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
            <div className="mt-12 flex items-center justify-center">
              <div className="w-full max-w-[230px] sm:max-w-[270px] md:max-w-[310px]">
                <OptimizedImage 
                  src="/homepage/dashboardcostreport.png" 
                  alt="Desktop cost tracking dashboard" 
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
          </div>
        </div>
      </section>

      {/* Trust Your Numbers Section - Humblytics Style */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-left">
            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-8">
              Imagine being able to trust your numbers
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
            </div>
          </div>
        </div>
      </section>

      {/* How CivDocs Works Section - Humblytics Style */}
      <section className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-left">
            {/* Eyebrow heading */}
            <p className="text-sm font-semibold text-[#FF8C32] uppercase tracking-wide mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              How CivDocs Works
            </p>

            {/* Main headline */}
            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-8">
              From messy site data to trusted project numbers.
            </h2>

            {/* Body copy */}
            <div className="space-y-6 text-lg font-normal text-neutral-700 leading-relaxed mb-12">
              <p>
                CivDocs turns your daily site activity into live project costs — automatically.
              </p>
              
              <ul className="space-y-8">
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
                Every entry is approved and locked to the job. Costs roll up into your project scope in real time — so budget vs actuals are always current.
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
      </section>

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
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
                <div className="mb-4">Better data.</div>
                <div className="mb-4">Better decisions.</div>
                <div>Better margins.</div>
              </h1>
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
