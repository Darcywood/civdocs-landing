'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import PrestartSteps from '@/components/marketing/PrestartSteps';
import TimesheetSteps from '@/components/marketing/TimesheetSteps';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function CivilContractorsPage() {
  const [isCostVideoModalOpen, setIsCostVideoModalOpen] = useState(false);
  const [isPrestartVideoModalOpen, setIsPrestartVideoModalOpen] = useState(false);
  const [isTimesheetVideoModalOpen, setIsTimesheetVideoModalOpen] = useState(false);
  const [preloadedVideoUrl, setPreloadedVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;
    const controller = new AbortController();

    const preload = async () => {
      try {
        const res = await fetch('/John Smith/cost tracking/costtrackingvid.mp4.mp4', { signal: controller.signal });
        if (!res.ok) return;
        const blob = await res.blob();
        objectUrl = URL.createObjectURL(blob);
        setPreloadedVideoUrl(objectUrl);
      } catch {
        // Ignore
      }
    };

    preload();

    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFEFB]">
      <Header />
      <div className="pt-20">

      {/* ─────────────────────────────────────────────
          STORY / PROBLEM / HOW IT WORKS
      ───────────────────────────────────────────── */}

      {/* Story Section */}
      <section className="relative overflow-hidden bg-white pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-left">
            <h2 className="text-3xl sm:text-4xl font-medium text-[#1E1E1E] leading-tight tracking-tight mb-10 max-w-3xl">
              It's the end of the month — and you're left scratching your head.
            </h2>

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

            <h3 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mt-10 mb-8">
              CivDocs changes this.
            </h3>
            
            <div className="max-w-2xl space-y-2">
              <p className="text-lg font-normal text-neutral-700 leading-relaxed">
                Construction management software for civil contractors.
              </p>
              <p className="text-lg font-normal text-neutral-700 leading-relaxed">
                Pre-starts, timesheets, plant logbooks, and cost tracking — all connected, approved, and trusted.
              </p>
            </div>

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

      {/* Section Nav Cards — 2×2 grid */}
      <section className="relative bg-white pt-8 pb-16 sm:pt-10 sm:pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4">

            {/* How it works */}
            <a
              href="#how-it-works"
              onClick={(e) => { e.preventDefault(); document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="group flex flex-col gap-3 rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/40 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF8C32] to-[#F5B041]">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#1E1E1E] group-hover:text-[#FF8C32] transition-colors">How it works</h3>
                <p className="mt-1 text-sm text-gray-500 leading-snug">See how site data flows into live project costs</p>
              </div>
              <span className="mt-auto text-xs font-medium text-[#FF8C32] flex items-center gap-1">
                Jump to section
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </a>

            {/* Cost tracking */}
            <a
              href="#cost-tracking"
              onClick={(e) => { e.preventDefault(); document.getElementById('cost-tracking')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="group flex flex-col gap-3 rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/40 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF8C32] to-[#F5B041]">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#1E1E1E] group-hover:text-[#FF8C32] transition-colors">Cost tracking</h3>
                <p className="mt-1 text-sm text-gray-500 leading-snug">Scopes, cost codes, budgets and real-time actuals</p>
              </div>
              <span className="mt-auto text-xs font-medium text-[#FF8C32] flex items-center gap-1">
                Jump to section
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </a>

            {/* Pre-Starts */}
            <a
              href="#pre-starts"
              onClick={(e) => { e.preventDefault(); document.getElementById('pre-starts')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="group flex flex-col gap-3 rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/40 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF8C32] to-[#F5B041]">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#1E1E1E] group-hover:text-[#FF8C32] transition-colors">Pre-Starts</h3>
                <p className="mt-1 text-sm text-gray-500 leading-snug">Digital safety checks with fault reporting and PDF records</p>
              </div>
              <span className="mt-auto text-xs font-medium text-[#FF8C32] flex items-center gap-1">
                Jump to section
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </a>

            {/* Timesheets */}
            <a
              href="#timesheets"
              onClick={(e) => { e.preventDefault(); document.getElementById('timesheets')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="group flex flex-col gap-3 rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/40 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF8C32] to-[#F5B041]">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#1E1E1E] group-hover:text-[#FF8C32] transition-colors">Timesheets</h3>
                <p className="mt-1 text-sm text-gray-500 leading-snug">Hours, leave, approvals and payroll PDFs in one flow</p>
              </div>
              <span className="mt-auto text-xs font-medium text-[#FF8C32] flex items-center gap-1">
                Jump to section
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </span>
            </a>

          </div>
        </div>
      </section>

      {/* How CivDocs Works Section */}
      <section id="how-it-works" className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-left">
            <p className="text-sm font-semibold text-[#FF8C32] uppercase tracking-wide mb-4 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              How CivDocs Works
            </p>

            <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-8">
              From messy site data to trusted project numbers.
            </h2>

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

            <p className="text-sm text-gray-500 text-center italic">
              Approved site data → cost codes → live project scope → trusted reporting
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          COST TRACKING
      ───────────────────────────────────────────── */}

      {/* 1. Hero Section */}
      <section id="cost-tracking" className="py-20 bg-[#FFFEFB]">
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
                  href="/start-trial#signup-form"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Start Free Trial
                </Link>
                <button
                  onClick={() => setIsCostVideoModalOpen(true)}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-300 text-gray-900 font-semibold text-lg rounded-full hover:border-[#FF8C32] hover:text-[#FF8C32] transition-all"
                >
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Column - Phone Placeholder with Video */}
            <div className="flex items-center justify-center">
              <button
                onClick={() => setIsCostVideoModalOpen(true)}
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
      <section className="py-24 lg:py-32 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="max-w-3xl lg:max-w-none">
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
                  <span className="text-gray-700 text-lg"><span className="font-semibold">Timesheets</span> post to the scope's <span className="font-semibold">Labour</span> cost code</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg"><span className="font-semibold">Pre-starts</span> post machine <span className="font-semibold">day rates</span> to the scope's <span className="font-semibold">Plant</span> cost code</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg"><span className="font-semibold">Materials</span> added by supervisors post to the scope's <span className="font-semibold">Material</span> cost code</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg"><span className="font-semibold">Daily progress</span> updates the scope quantity so you can see <span className="font-semibold">overall cost per unit</span></span>
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-center lg:justify-end shrink-0">
              <OptimizedImage
                src="/John Smith/cost tracking/costreporting.png"
                alt="Cost Reporting Overview"
                width={320}
                height={640}
                sizes="(max-width: 768px) 90vw, 380px"
                className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Labour Costing Section */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="max-w-3xl lg:max-w-none lg:order-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Labour Costing
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Labour cost is calculated from timesheets. Each employee has an hourly rate, and when they select a <span className="font-semibold">project + scope</span> when filling their timesheet out, CivDocs automatically posts that cost into the scope's <span className="font-semibold">Labour cost code</span>.
              </p>
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
            <div className="flex items-center justify-center lg:order-1 lg:justify-start shrink-0">
              <OptimizedImage
                src="/John Smith/cost tracking/labourreports.png"
                alt="Labour Costing Reports"
                width={320}
                height={640}
                sizes="(max-width: 768px) 90vw, 380px"
                className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Plant & Equipment Costing Section */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="max-w-3xl lg:max-w-none">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Plant & Equipment Costs
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Pre-starts post machinery <span className="font-semibold">day rates</span> into project scopes. When an operator completes a pre-start and selects the <span className="font-semibold">project + scope</span>, CivDocs posts that day rate into the scope's <span className="font-semibold">Plant cost code</span>. If multiple machines work the same scope, you'll see multiple pre-starts — and multiple plant cost entries.
              </p>
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
            <div className="flex items-center justify-center lg:justify-end shrink-0">
              <OptimizedImage
                src="/John Smith/cost tracking/Plantreports.png"
                alt="Plant Costing Reports"
                width={320}
                height={640}
                sizes="(max-width: 768px) 90vw, 380px"
                className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Materials Costing Section */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="max-w-3xl lg:max-w-none lg:order-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Materials Costing
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Supervisors add materials used on site through the dashboard. Your materials library stores the unit and rate (and you can create materials on the fly). When materials are added to a <span className="font-semibold">scope</span>, CivDocs posts the cost into that scope's <span className="font-semibold">Material cost code</span> and updates actuals instantly.
              </p>
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
            <div className="flex items-center justify-center lg:order-1 lg:justify-start shrink-0">
              <OptimizedImage
                src="/John Smith/cost tracking/materialsreports.png"
                alt="Materials Costing Reports"
                width={320}
                height={640}
                sizes="(max-width: 768px) 90vw, 380px"
                className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Project Scopes Section */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="max-w-3xl lg:max-w-none">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Project Scopes
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Each scope has a planned quantity (200m, 4000t, etc.) and the <span className="font-semibold">specific cost codes</span> you assign to it for Labour, Plant and Materials. You also set your <span className="font-semibold">budgets inside those scope cost codes</span>, so budget vs actual is always comparing apples with apples.
              </p>
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
            <div className="flex items-center justify-center lg:justify-end shrink-0">
              <OptimizedImage
                src="/John Smith/cost tracking/scopesproper (1).png"
                alt="Project Scopes"
                width={320}
                height={640}
                sizes="(max-width: 768px) 90vw, 380px"
                className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Daily Progress Section */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="max-w-3xl lg:max-w-none lg:order-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Daily Progress Updates
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Supervisors enter daily progress updates for each scope. For example: Scope: 4000t planned. Supervisor enters 1500t completed today. CivDocs updates % complete, cost-per-unit, and forecasts remaining work.
              </p>
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
            <div className="flex items-center justify-center lg:order-1 lg:justify-start shrink-0">
              <OptimizedImage
                src="/John Smith/cost tracking/dailyprogress.png"
                alt="Daily Progress Updates"
                width={320}
                height={640}
                sizes="(max-width: 768px) 90vw, 380px"
                className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Cost Codes Section */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="max-w-3xl lg:max-w-none">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Cost Codes
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Your organisation has a library of cost codes. CivDocs comes with common defaults (for example: <span className="font-semibold">3100-L</span> is all rock install Labour, <span className="font-semibold">3100-P</span> is all rock install Plant, <span className="font-semibold">3100-M</span> is all rock install Material), and you're encouraged to create your own to match how your business wants to track costs. When you build a scope, you choose which codes that scope will use — then CivDocs posts costs automatically into them.
              </p>
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
            <div className="flex items-center justify-center lg:justify-end shrink-0">
              <OptimizedImage
                src="/John Smith/cost tracking/costcodes.png"
                alt="Cost Codes"
                width={320}
                height={640}
                sizes="(max-width: 768px) 90vw, 380px"
                className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. How All Costs Roll Up Section */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="max-w-3xl lg:max-w-none lg:order-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                How All Costs Roll Up
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Every transaction lands on a <span className="font-semibold">project + scope + cost code</span>. Labour comes from timesheets, plant comes from pre-starts, and materials come from supervisors — and daily progress updates the completed quantity. That gives you a single real-time view of <span className="font-semibold">actual cost</span>, <span className="font-semibold">budget vs actual</span>, and <span className="font-semibold">overall cost per unit</span> at the scope level.
              </p>
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
            <div className="flex items-center justify-center lg:order-1 lg:justify-start shrink-0">
              <OptimizedImage
                src="/John Smith/cost tracking/scopes1.png"
                alt="How All Costs Roll Up"
                width={320}
                height={640}
                sizes="(max-width: 768px) 90vw, 380px"
                className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10. Materials Library Section */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="max-w-3xl lg:max-w-none">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Materials Library
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Store material name, unit type, and unit rate in your materials library. Supervisors pull these materials into progress entries, ensuring consistent pricing and accurate cost tracking.
              </p>
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
            <div className="flex items-center justify-center lg:justify-end shrink-0">
              <OptimizedImage
                src="/John Smith/cost tracking/materials.png"
                alt="Materials Library"
                width={320}
                height={640}
                sizes="(max-width: 768px) 90vw, 380px"
                className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 11. Cost Reports Section */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="max-w-3xl lg:max-w-none lg:order-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Cost Reports
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Generate comprehensive cost reports showing budget vs actual, remaining budget, over/under analysis, and cost breakdown by category. All reports update in real-time as costs are added.
              </p>
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
            <div className="flex items-center justify-center lg:order-1 lg:justify-start shrink-0">
              <OptimizedImage
                src="/John Smith/cost tracking/scopes.png"
                alt="Cost Reports"
                width={320}
                height={640}
                sizes="(max-width: 768px) 90vw, 380px"
                className="rounded-xl drop-shadow-2xl w-full max-w-[320px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 12. Supervisor Tools Section */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="max-w-3xl lg:max-w-none">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Supervisor Tools
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Supervisors have everything they need in one place: add daily progress, add materials, approve timesheets, and review scope performance — all from their dashboard.
              </p>
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
            <div className="flex items-center justify-center lg:justify-end shrink-0">
              <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm px-6 py-4 md:px-8 md:py-6 flex flex-col items-center max-w-xl mx-auto lg:mx-0">
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

      {/* ─────────────────────────────────────────────
          PRE-STARTS
      ───────────────────────────────────────────── */}

      {/* Pre-Starts Divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="border-t border-gray-200" />
      </div>

      {/* Pre-Starts Hero */}
      <section id="pre-starts" className="py-20 lg:py-28 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] mb-6">
                Digital pre-starts that simply make sense.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                A fast, guided workflow that keeps your team compliant and your machines checked every morning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8 lg:mb-0">
                <Link
                  href="/start-trial#signup-form"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Start Free Trial
                </Link>
                <button
                  onClick={() => setIsPrestartVideoModalOpen(true)}
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-300 text-gray-900 font-semibold text-lg rounded-full hover:border-[#FF8C32] hover:text-[#FF8C32] transition-all"
                >
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end shrink-0">
              <button
                onClick={() => setIsPrestartVideoModalOpen(true)}
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

      {/* How Pre-Starts Work */}
      <PrestartSteps />

      {/* Early Fault Detection */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="max-w-3xl lg:max-w-none lg:order-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Fix issues before they become downtime.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Operators can report issues like hydraulic leaks, broken teeth or GPS / UTS issues directly in CivDocs. Supervisors are alerted instantly so problems are handled before they cause costly delays.
              </p>
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
            <div className="flex items-center justify-center lg:order-1 lg:justify-start shrink-0">
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

      {/* Pre-Start PDF */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="text-center lg:text-left max-w-3xl lg:max-w-none mx-auto lg:mx-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Every Pre-Start becomes a clean, compliant PDF.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Created instantly and stored under the project for easy audit and safety compliance.
              </p>
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
            <div className="flex items-center justify-center lg:justify-end shrink-0">
              <div className="w-full md:hidden p-4 lg:p-0">
                <div className="w-full rounded-xl border border-gray-200 bg-white overflow-hidden">
                  <div className="max-h-[900px] overflow-y-auto">
                    <OptimizedImage src="/prestart-page/prestartpdf1.png" alt="Pre-Start PDF Report Page 1" width={800} height={1000} className="w-full h-auto" />
                    <OptimizedImage src="/prestart-page/prestartpdf2.png" alt="Pre-Start PDF Report Page 2" width={800} height={1000} className="w-full h-auto" />
                  </div>
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center p-8 lg:p-0 w-full">
                <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white overflow-hidden">
                  <div className="max-h-[900px] overflow-y-auto">
                    <OptimizedImage src="/prestart-page/prestartpdf1.png" alt="Pre-Start PDF Report Page 1" width={800} height={1000} className="w-full h-auto" />
                    <OptimizedImage src="/prestart-page/prestartpdf2.png" alt="Pre-Start PDF Report Page 2" width={800} height={1000} className="w-full h-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Start Content Section */}
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
          </div>
        </div>
      </section>

      {/* Pre-Start UX Section */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="flex items-center justify-center lg:order-1 lg:justify-start shrink-0">
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
            <div className="text-center lg:text-left max-w-3xl lg:max-w-none mx-auto lg:mx-0 lg:order-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Built for real crews — simple, fast and familiar.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                CivDocs Pre-Starts are designed for non-techy operators. Large buttons, clean screens and a simple flow make it easy for anyone to use on site.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 justify-center lg:justify-start">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Works on phones, tablets and desktops</span>
                </li>
                <li className="flex items-start gap-3 justify-center lg:justify-start">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Zero learning curve</span>
                </li>
                <li className="flex items-start gap-3 justify-center lg:justify-start">
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

      {/* Pre-Start Testimonial */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#FFF5ED] to-orange-50 rounded-3xl p-12 border border-orange-100 shadow-lg">
            <div className="text-center">
              <svg className="w-12 h-12 text-[#FF8C32] mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <blockquote className="text-2xl sm:text-3xl font-medium text-gray-900 mb-6 leading-relaxed">
                &ldquo;Pre-start paperwork used to take ages every morning. CivDocs makes it quick and supervisors get reports instantly.&rdquo;
              </blockquote>
              <p className="text-lg text-gray-600 font-medium">
                — John Lynch, JAL Civil Earthworks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          TIMESHEETS
      ───────────────────────────────────────────── */}

      {/* Timesheets Divider */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="border-t border-gray-200" />
      </div>

      {/* Timesheets Hero */}
      <section id="timesheets" className="py-20 lg:py-28 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="text-center lg:text-left max-w-3xl lg:max-w-none mx-auto lg:mx-0">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] mb-6">
                Digital timesheets your crew will actually enjoy using.
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Log hours by project, submit once a week, and keep payroll and approvals in one clean workflow.
              </p>
              <div className="flex justify-center lg:justify-start mb-8 lg:mb-0">
                <Link
                  href="/start-trial#signup-form"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-end shrink-0">
              <button
                onClick={() => setIsTimesheetVideoModalOpen(true)}
                className="relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] cursor-pointer hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF8C32] focus:ring-offset-2 rounded-2xl"
                aria-label="Play timesheet video"
              >
                <OptimizedImage 
                  src="/John Smith/phtimesheet.png" 
                  alt="Timesheet Video Preview"
                  width={400}
                  height={800}
                  className="w-full h-auto"
                />
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

      {/* How Timesheets Work */}
      <TimesheetSteps />

      {/* Weekly PDF Preview */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="max-w-3xl lg:max-w-none lg:order-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Weekly PDFs built for payroll
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Every submitted timesheet generates a clean PDF for that employee's week — ready to send straight to payroll or keep on file.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">One PDF per employee, per week</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Hours broken down by project and scope</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Notes, approvals and leave all captured in one place</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center lg:order-1 lg:justify-start shrink-0">
              <OptimizedImage 
                src="/John Smith/timesheet-pdf.png" 
                alt="Weekly Timesheet PDF"
                width={800}
                height={600}
                className="w-full max-w-lg h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Leave Requests */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="max-w-3xl lg:max-w-none">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Leave requests in the same flow as timesheets
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Employees can request annual leave, sick leave or RDOs from the same place they submit their hours, so supervisors see the full picture for the week.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Select leave type — annual, personal, sick, RDO, LSL or custom</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Choose the date range and add any notes</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Send to a supervisor for approval with one click</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Approved leave is stored with the employee's timesheet history</span>
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center lg:justify-end shrink-0">
              <OptimizedImage 
                src="/John Smith/leave request.png" 
                alt="Leave Request Form"
                width={800}
                height={600}
                className="w-full max-w-lg h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Supervisor Approvals */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20">
            <div className="flex items-center justify-center lg:order-1 lg:justify-start shrink-0">
              <OptimizedImage 
                src="/John Smith/supervisorapproval.png"
                alt="Supervisor Approvals Screen"
                width={800}
                height={600}
                className="w-full max-w-xs h-auto"
              />
            </div>
            <div className="max-w-3xl lg:max-w-none lg:order-2">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Supervisor sign-off without chasing paper
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Supervisors get a central queue of submitted timesheets and leave requests, so approvals are quick, consistent and auditable.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">See all pending timesheets by employee and week</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Open a submission, review hours, notes and leave in seconds</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Approve, reject or request changes — with a full history of who signed off and when</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 text-lg">Keep a clean audit trail for payroll, compliance and disputes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#FFFEFB] py-20 sm:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-8 tracking-tight">
            Take control of your project costs — without spreadsheets.
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            See where every dollar goes with real-time cost tracking that updates automatically from timesheets, pre-starts, and materials.
          </p>
          <div className="flex flex-col items-center gap-4">
            <a 
              href="/start-trial#signup-form" 
              className="inline-flex items-center gap-2 sm:gap-3 px-4 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-sm sm:text-base rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <span className="text-center">Start 14-Day Trial - No Credit Card Required</span>
              <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#E67E22] flex items-center justify-center flex-shrink-0">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </a>
            <p className="text-sm text-gray-500">Get started in minutes</p>
          </div>
        </div>
      </section>

      <Footer />
      </div>

      {/* Cost Tracking Video Modal */}
      <AnimatePresence>
        {isCostVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-[100] flex items-center justify-center md:p-4"
            onClick={() => setIsCostVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full md:w-[400px] md:h-auto md:max-h-[90vh] bg-black md:rounded-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsCostVideoModalOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-black/80 hover:bg-black rounded-full flex items-center justify-center transition-colors shadow-lg border-2 border-white/20"
                aria-label="Close video"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <video
                className="w-full h-full object-contain md:h-auto"
                controls autoPlay playsInline preload="auto" muted
                onEnded={() => setIsCostVideoModalOpen(false)}
              >
                <source src={preloadedVideoUrl ?? "/John Smith/cost tracking/costtrackingvid.mp4.mp4"} type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pre-Start Video Modal */}
      <AnimatePresence>
        {isPrestartVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-[100] flex items-center justify-center md:p-4"
            onClick={() => setIsPrestartVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full md:w-[400px] md:h-auto md:max-h-[90vh] bg-black md:rounded-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsPrestartVideoModalOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-black/80 hover:bg-black rounded-full flex items-center justify-center transition-colors shadow-lg border-2 border-white/20"
                aria-label="Close video"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <video
                className="w-full h-full object-contain md:h-auto"
                controls autoPlay playsInline preload="auto" muted
                onEnded={() => setIsPrestartVideoModalOpen(false)}
              >
                <source src="/prestart-page/prestart.mp4.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timesheet Video Modal */}
      <AnimatePresence>
        {isTimesheetVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-[100] flex items-center justify-center md:p-4"
            onClick={() => setIsTimesheetVideoModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full md:w-[400px] md:h-auto md:max-h-[90vh] bg-black md:rounded-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsTimesheetVideoModalOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-12 h-12 sm:w-14 sm:h-14 bg-black/80 hover:bg-black rounded-full flex items-center justify-center transition-colors shadow-lg border-2 border-white/20"
                aria-label="Close video"
              >
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <video
                className="w-full h-full object-contain md:h-auto"
                controls autoPlay playsInline preload="auto" muted
                onEnded={() => setIsTimesheetVideoModalOpen(false)}
              >
                <source src="/John Smith/timesheetvideos.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
