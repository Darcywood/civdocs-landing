'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function CostTrackingPage() {
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


  return (
    <div className="min-h-screen bg-[#FFFEFB]">
      <Header />
      <div className="pt-20">
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
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {/* Text Content */}
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Labour Costing
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Labour cost is calculated from timesheets. Each employee has an hourly rate, and when they select a <span className="font-semibold">project + scope</span> when filling their timesheet out, CivDocs automatically posts that cost into the scope's <span className="font-semibold">Labour cost code</span>.
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
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12">
            {/* Text Content */}
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Cost Codes
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Your organisation has a library of cost codes. CivDocs comes with common defaults (for example: <span className="font-semibold">3100-L</span> is all rock install Labour, <span className="font-semibold">3100-P</span> is all rock install Plant, <span className="font-semibold">3100-M</span> is all rock install Material), and you're encouraged to create your own to match how your business wants to track costs. When you build a scope, you choose which codes that scope will use — then CivDocs posts costs automatically into them.
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

      {/* Footer */}
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
