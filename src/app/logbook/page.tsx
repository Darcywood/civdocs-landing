'use client';



import { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import Link from 'next/link';

import OptimizedImage from '@/components/OptimizedImage';
import Footer from '@/components/Footer';
import Header from '@/components/Header';



export default function LogbookPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isUnlocksVideoModalOpen, setIsUnlocksVideoModalOpen] = useState(false);






  return (
    <div className="min-h-screen bg-[#FFFEFB] overflow-x-hidden">
      <Header />
      <div className="pt-20">
      {/* 1. Hero Section */}

      <section className="py-20 bg-[#FFFEFB]">

        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Column - Text Content */}

            <div className="text-center lg:text-left">

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] mb-6">

                Your logbook shouldn't be the problem at the end of the month.
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">

                CivDocs gives you a single, trusted record of every machine hour, attachment, and operator — so billing is accurate and disputes disappear.
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
                aria-label="Play logbook video"
              >
                <OptimizedImage 
                  src="/logbook/Logbookvidplaceholder.png" 
                  alt="Logbook Video Preview"
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



      {/* 2. The Problem Section */}
      <section className="py-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">

              Paper logbooks and spreadsheets cost you money.
              </h2>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">

              When your logbook lives on scraps of paper or buried in Excel, billing becomes a monthly battle. Overtime gets missed. Attachments never make it to the invoice. And when a client questions the hours, you're digging through messy notes trying to prove what actually happened.
              </p>

              

            {/* Key Issues */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>

                <span className="text-gray-700 text-lg">Missed machine hours and attachments</span>
              </div>
              <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>

                <span className="text-gray-700 text-lg">Overtime disputes at month-end</span>
              </div>
              <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>

                <span className="text-gray-700 text-lg">No audit trail when clients challenge invoices</span>
              </div>
              <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>

                <span className="text-gray-700 text-lg">Hours of manual reconciliation between what's logged and what's billed</span>
            </div>

              </div>


            <p className="text-lg text-gray-600 mt-8 leading-relaxed">
              You shouldn't have to chase operators for missing entries or second-guess your own numbers.
            </p>
          </div>

        </div>

      </section>



      {/* 3. The CivDocs Logbook Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">

              One logbook. Complete trust.
              </h2>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">

              The CivDocs Logbook is the <span className="font-semibold">single source of truth</span> for everything that happens on your machines each day. It's where operators record what they used, how long they worked, and which job it was for — and supervisors sign off before it becomes final.
              </p>

              

            <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4">What gets captured:</h3>
            <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">

                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

                <span className="text-gray-700 text-lg">Machine and asset number</span>
                </li>

                <li className="flex items-start gap-3">

                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

                <span className="text-gray-700 text-lg">Start and finish times (including overtime)</span>
                </li>

                <li className="flex items-start gap-3">

                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

                <span className="text-gray-700 text-lg">Attachments used</span>
                </li>

                <li className="flex items-start gap-3">

                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

                <span className="text-gray-700 text-lg">Job or project</span>
                </li>

                <li className="flex items-start gap-3">

                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

                <span className="text-gray-700 text-lg">Operator name</span>
                </li>

                <li className="flex items-start gap-3">

                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

                <span className="text-gray-700 text-lg">Supervisor approval</span>
                </li>

              </ul>


            <p className="text-lg text-gray-600 leading-relaxed">
              Everything is timestamped, recorded on site, and locked in once approved. No backdating. No guessing. No missing hours.
            </p>
          </div>

        </div>

      </section>



      {/* 4. How the Logbook Works Section */}
      <section className="py-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">

              Built for operators. Trusted by owners.
              </h2>

            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              The workflow is fast and mobile-first. Operators fill it in from their phone at the end of the shift, and supervisors approve it before the day closes out.
            </p>
          </div>

          {/* Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-4">
                <span className="text-white font-bold text-xl">1</span>
            </div>

              <h3 className="text-xl font-semibold text-[#111827] mb-3">Operator selects the machine</h3>
              <p className="text-[#6B7280]">
                They choose the asset from the fleet list — excavator, grader, roller, whatever they ran that day.
              </p>
          </div>



            {/* Step 2 */}
            <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-[#111827] mb-3">Enter hours worked</h3>
              <p className="text-[#6B7280]">
                Start time, finish time, and any overtime. CivDocs calculates the total automatically.
              </p>
            </div>



            {/* Step 3 */}
            <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-[#111827] mb-3">Add attachments (if any)</h3>
              <p className="text-[#6B7280]">
                Hammers, GPS, UTS — whatever was on the machine. Attachments are tracked separately so they're billed correctly.
                </p>

              </div>



            {/* Step 4 */}
            <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>

              <h3 className="text-xl font-semibold text-[#111827] mb-3">Select the job</h3>
              <p className="text-[#6B7280]">
                The operator selects which plant hire job the machine was working on. Jobs are already set up and ready to select from the list.
              </p>
            </div>



            {/* Step 5 */}
            <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm p-8">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-4">
                <span className="text-white font-bold text-xl">5</span>
              </div>
              <h3 className="text-xl font-semibold text-[#111827] mb-3">Supervisor approval</h3>
              <p className="text-[#6B7280]">
                Before the day is locked, a supervisor reviews and signs off. Once approved, the entry is final and ready for billing.
              </p>
            </div>

          </div>

        </div>

      </section>



      {/* 5. What It Unlocks Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">

              From logbook to invoice — automatically.
              </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Once logbook entries are approved, they flow straight into plant hire jobs and billing reports. No re-entering data. No missed charges. No disputes about what was actually used.
              </p>

          </div>
              

          {/* What This Means */}
          <div className="max-w-4xl mx-auto space-y-4 mb-12">
            <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

              <span className="text-gray-700 text-lg"><span className="font-semibold">Accurate plant hire jobs</span> — every hour and attachment is captured and ready to invoice</span>
            </div>
            <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

              <span className="text-gray-700 text-lg"><span className="font-semibold">Correct overtime billing</span> — overtime rates apply automatically based on what's logged</span>
            </div>
            <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

              <span className="text-gray-700 text-lg"><span className="font-semibold">Attachment revenue never missed</span> — hammers, GPS, UTS and other gear are tracked separately and charged accordingly</span>
            </div>
            <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

              <span className="text-gray-700 text-lg"><span className="font-semibold">Clean, audit-ready invoices</span> — clients see exactly what was used, when, and by whom</span>
              </div>

            </div>



          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
            The logbook becomes your proof. When a client questions an invoice, you show them the timestamped, supervisor-approved entry and the conversation is over.
          </p>

          {/* Video Placeholder */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsUnlocksVideoModalOpen(true)}
              className="relative w-full max-w-sm sm:max-w-md cursor-pointer hover:scale-[1.02] transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF8C32] focus:ring-offset-2"
              aria-label="Play invoice workflow video"
            >
              <OptimizedImage 
                src="/logbook/invoicelineitem.png" 
                alt="Invoice Workflow Video Preview"
                width={600}
                height={1200}
                className="w-full h-auto"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF8C32] ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
              </div>
              </div>
            </button>
          </div>

        </div>

      </section>



      {/* 6. Built For Plant Hire & Internal Fleets Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6 text-center">

              Built for plant hire operations.
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed text-center">

              The CivDocs Logbook captures everything needed to bill plant hire jobs — machine hours, operator time, overtime, and attachments. Each entry is timestamped and supervisor-approved, creating an audit trail from the worksite to the invoice.
            </p>
            
            <h3 className="text-xl font-semibold text-[#1E1E1E] mb-4 text-center">Who this is for:</h3>
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                    </svg>

                <span className="text-gray-700 text-lg"><span className="font-semibold">Plant hire companies</span> billing clients per hour, per day, or per week</span>
              </div>

              <div className="flex items-start gap-3">

                <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                </svg>

                <span className="text-gray-700 text-lg"><span className="font-semibold">Civil contractors</span> with internal fleets tracking costs across projects</span>
              </div>

              <div className="flex items-start gap-3">

                <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                </svg>

                <span className="text-gray-700 text-lg"><span className="font-semibold">Mixed operations</span> doing both external hire and internal work</span>
              </div>

            </div>


            <p className="text-lg text-gray-600 leading-relaxed text-center">
              Whether you're billing external clients or tracking internal plant costs, the logbook ensures every hour and every attachment is accounted for.
            </p>
          </div>

        </div>

      </section>



      {/* 7. Why CivDocs is Different Section */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6 text-center">
              Purpose-built for civil construction.
            </h2>

            <p className="text-xl text-gray-600 mb-12 leading-relaxed text-center">
              Most timesheet apps weren't designed for plant hire or equipment-heavy operations. They don't track attachments. They don't handle supervisor sign-offs properly. And they definitely weren't built to create audit-ready billing reports.
            </p>
            <p className="text-2xl font-semibold text-[#FF8C32] mb-12 text-center">
              CivDocs was.
            </p>


            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Compared to Paper Logbooks */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">

                <h3 className="text-xl font-semibold text-gray-900 mb-6">Compared to paper logbooks:</h3>
              <ul className="space-y-4">

                <li className="flex items-start gap-3">

                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

                    <span className="text-gray-700">No lost or illegible entries</span>
                </li>

                <li className="flex items-start gap-3">

                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

                    <span className="text-gray-700">Instant supervisor approval</span>
                </li>

                <li className="flex items-start gap-3">

                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

                    <span className="text-gray-700">Automatic calculations for hours and overtime</span>
                </li>

                <li className="flex items-start gap-3">

                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

                    <span className="text-gray-700">Digital audit trail for every shift</span>
                </li>

              </ul>

            </div>



              {/* Compared to Generic Apps */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">

                <h3 className="text-xl font-semibold text-gray-900 mb-6">Compared to generic apps:</h3>
              <ul className="space-y-4">

                <li className="flex items-start gap-3">

                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

                    <span className="text-gray-700">Built-in attachment tracking</span>
                </li>

                <li className="flex items-start gap-3">

                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

                    <span className="text-gray-700">Machine-specific workflows</span>
                </li>

                <li className="flex items-start gap-3">

                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

                    <span className="text-gray-700">Direct integration with plant hire jobs and cost tracking</span>
                </li>

                <li className="flex items-start gap-3">

                  <svg className="w-6 h-6 text-[#FF8C32] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">

                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

                  </svg>

                    <span className="text-gray-700">Designed for the way civil contractors and plant hire companies actually work</span>
                </li>

              </ul>

            </div>

            </div>

            <p className="text-lg text-gray-600 leading-relaxed text-center">
              You don't need another spreadsheet tool. You need a logbook that works the way your business does.
            </p>
          </div>

        </div>

      </section>



      {/* 8. Final CTA Section */}
      <section className="bg-[#FFFEFB] py-20 sm:py-32">

        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-8 tracking-tight">

            Start tracking machines the right way.
          </h2>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">

            Stop fighting with paper logbooks and spreadsheets at the end of every month. CivDocs gives you one clean, trusted record of every machine hour — and billing that actually matches what happened on site.
          </p>

          <div className="flex justify-center mb-4">
            <Link

              href="/start-trial"

              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all"

            >

              Start Free Trial →

            </Link>

          </div>

          <p className="text-sm text-gray-600">
            <span className="font-bold text-[#FF8C32]">No credit card required.</span>

            <span className="text-gray-500"> See how the logbook works in your business within 5 minutes.</span>
          </p>

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
                  <source src="/logbook/logbookfull.mp4.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Unlocks Video Modal */}
      <AnimatePresence>
        {isUnlocksVideoModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-[100] flex items-center justify-center md:p-4"
              onClick={() => setIsUnlocksVideoModalOpen(false)}
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
                  onClick={() => setIsUnlocksVideoModalOpen(false)}
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
                  onEnded={() => setIsUnlocksVideoModalOpen(false)}
                >
                  <source src="/logbook/createinvoice.mp4.mp4" type="video/mp4" />
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
