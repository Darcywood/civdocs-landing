'use client';



import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import Link from 'next/link';

import OptimizedImage from '@/components/OptimizedImage';
import DemoDayDocketPdfPreview from '@/components/marketing/DemoDayDocketPdfPreview';
import HeroStackedTestimonials from '@/components/marketing/HeroStackedTestimonials';
import Footer from '@/components/Footer';
import Header from '@/components/Header';



function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function PlantHirePage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const scrollToFeature = (anchorId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById(anchorId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const featureOverviewItems = [
    {
      anchorId: 'logbook',
      title: 'Logbook',
      description: 'Every machine hour and attachment, captured on site and signed off.',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      anchorId: 'payroll',
      title: 'Payroll',
      description: 'Hours on site flow to EBA pay runs — OT, allowances, leave.',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      anchorId: 'scheduling',
      title: 'Scheduling',
      description: 'Put machines and crew on jobs. They get a text. Dry hire too.',
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  const plantHireTestimonials = [
    {
      quote: 'Being able to be certain we aren\'t missing float fees or attachments is game-changing.',
      name: 'Reece',
      company: 'Glade Civil',
      logoSrc: '/homepage_logos/4.png',
      logoAlt: 'Glade Civil',
      logoBg: '#ffffff',
      logoContain: true,
    },
    {
      quote:
        'Day dockets are perfect for what we do. The supervisor and the office get a copy at the end of each day, so everyone is on the same page.',
      name: 'John Lynch',
      company: 'JAL Civil Earthworks',
      logoSrc: '/capability-statement/Jal.png',
      logoAlt: 'JAL Civil Earthworks',
      logoBg: '#ffffff',
      logoContain: true,
    },
    {
      quote:
        'CivDocs saves us around 30 hours of admin every week — I can spend that time on site instead of stuck behind a desk.',
      name: 'Ryan',
      company: 'Campbell Earthmoving',
      logoSrc: '/homepage_logos/6.png',
      logoAlt: 'Campbell Earthmoving',
      logoBg: '#ffffff',
      logoContain: true,
    },
  ];






  return (
    <div className="min-h-screen bg-[#FFFEFB] overflow-x-hidden">
      <Header />
      <div className="pt-20">
      {/* 1. Hero Section */}

      <section className="pt-20 pb-[130px] bg-[#FFFEFB]">

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

                  href="/start-trial#signup-form"

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

      {/* Testimonials */}
      <section className="relative z-10 bg-[#FFFEFB] pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
          <FadeUp>
            <HeroStackedTestimonials
              testimonials={plantHireTestimonials}
              sectionClassName="w-full lg:pt-0"
            />
          </FadeUp>
        </div>
      </section>



      {/* Feature Overview */}
      <section className="py-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Everything plant hire needs. In one place.
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                From the operator&apos;s logbook to the client&apos;s invoice — here&apos;s the lot. Tap any one to jump straight to it.
              </p>
            </div>
          </FadeUp>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4">
            {featureOverviewItems.map((item, i) => (
              <FadeUp key={item.anchorId} delay={i * 0.08}>
                <a
                  href={`#${item.anchorId}`}
                  onClick={scrollToFeature(item.anchorId)}
                  className="group flex flex-col gap-3 rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/40 p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF8C32] to-[#F5B041]">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1E1E1E] group-hover:text-[#FF8C32] transition-colors">{item.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 leading-snug">{item.description}</p>
                  </div>
                  <span className="mt-auto text-xs font-medium text-[#FF8C32] flex items-center gap-1">
                    Jump to section
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </span>
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>



      {/* 4. How the Logbook Works Section */}
      <section className="py-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                From logbook to invoice — in 3 steps.
              </h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { n: '1', title: 'Log the day on site', body: 'The operator runs the pre-start, picks the job and machine, and logs hours and attachments — all from their phone.' },
              { n: '2', title: 'Supervisor signs off', body: 'A supervisor reviews and approves. A day docket is created and stored for this day.' },
              { n: '3', title: 'Straight to invoicing', body: 'The approved data flows into the job, ready to invoice. No re-entering. No missed charges.' },
            ].map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.1}>
                <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm p-8 h-full">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-4">
                    <span className="text-white font-bold text-xl">{step.n}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#111827] mb-3">{step.title}</h3>
                  <p className="text-[#6B7280]">{step.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>



      {/* 2. The Problem Section */}
      <section id="logbook" className="py-24 lg:py-32 bg-[#FFFEFB] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20 min-h-[280px] lg:min-h-[360px]">
            <FadeUp className="max-w-3xl lg:max-w-none">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Paper logbooks and spreadsheets cost you money.
              </h2>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                When your logbook lives on scraps of paper or buried in Excel, billing becomes a monthly battle. Overtime gets missed. Attachments never make it to the invoice. And when a client questions the hours, you&apos;re digging through messy notes trying to prove what actually happened.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-700 text-lg">Missed machine hours and attachments</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-700 text-lg">Overtime disputes at month-end</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-700 text-lg">No audit trail when clients challenge invoices</span>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-700 text-lg">Hours of manual reconciliation between what&apos;s logged and what&apos;s billed</span>
                </div>
              </div>

              <p className="text-lg text-gray-600 mt-8 leading-relaxed">
                You shouldn&apos;t have to chase operators for missing entries or second-guess your own numbers.
              </p>
            </FadeUp>

            <FadeUp delay={0.15} className="flex items-center justify-center lg:justify-end shrink-0">
              <OptimizedImage
                src="/logbook/paper-logbook-mess.png"
                alt="Desk buried under piles of paper logbooks and messy paperwork"
                width={480}
                height={640}
                sizes="(max-width: 768px) 90vw, 420px"
                className="rounded-2xl shadow-xl w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] h-auto object-cover"
              />
            </FadeUp>
          </div>
        </div>
      </section>



      {/* 3. The CivDocs Logbook Section */}
      <section className="pt-20 pb-24 lg:pt-32 lg:pb-36 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20 min-h-[280px] lg:min-h-[360px]">
            <FadeUp delay={0.1} className="order-2 flex items-center justify-center lg:order-1 lg:justify-start shrink-0">
              <div className="shadow-xl rounded-2xl overflow-hidden bg-white p-2">
                <OptimizedImage
                  src="/homepage/logbook-home.png"
                  alt="CivDocs daily logbook mobile screen showing machine hours and supervisor sign-off"
                  width={600}
                  height={1200}
                  sizes="(max-width: 768px) 90vw, 380px"
                  className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] mx-auto rounded-xl"
                  quality={95}
                />
              </div>
            </FadeUp>

            <FadeUp className="order-1 max-w-3xl lg:max-w-none lg:order-2 lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                CivDocs logbook. Complete trust.
              </h2>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The CivDocs Logbook is the <span className="font-semibold">single source of truth</span> for everything that happens on your machines each day. It&apos;s where operators record what they used, how long they worked, and which job it was for — and supervisors sign off before it becomes final.
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
            </FadeUp>
          </div>
        </div>
      </section>



      {/* Logbook CTA */}
      <div className="bg-[#FFFEFB] py-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-lg font-medium text-gray-700">Ready to ditch the paper logbook?</p>
          <Link href="/start-trial#signup-form" className="inline-flex items-center justify-center px-7 py-3 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all whitespace-nowrap">
            Start Free Trial →
          </Link>
        </div>
      </div>

      {/* Day Docket Preview */}
      <section className="pt-20 pb-24 bg-[#FFFEFB]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <DemoDayDocketPdfPreview />
          </FadeUp>
        </div>
      </section>



      {/* Day Docket CTA */}
      <div className="bg-[#FFFEFB] py-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-lg font-medium text-gray-700">See how Day Dockets work in your business.</p>
          <Link href="/start-trial#signup-form" className="inline-flex items-center justify-center px-7 py-3 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all whitespace-nowrap">
            Start Free Trial →
          </Link>
        </div>
      </div>

      {/* Payroll Section */}
      <section id="payroll" className="pt-20 pb-24 bg-[#FFFEFB] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <FadeUp>
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Payroll done before Friday afternoon even starts.
              </h2>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                When an operator fills in their logbook and the supervisor signs off, those hours — including overtime and allowances — are automatically sent to Xero as a draft pay run. Your payroll team reviews it, makes any changes they need, and approves. That's it.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                No re-entering hours. No cross-referencing timesheets. No chasing anyone.
              </p>
            </div>
          </FadeUp>

          {/* How it works steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {[
              { n: '1', title: 'Operator logs hours on site', body: 'Hours, overtime, attachments and allowances are recorded in the logbook — all from the operator\'s phone.' },
              { n: '2', title: 'Supervisor signs off', body: 'The moment the supervisor approves, CivDocs automatically pushes a draft pay run to Xero — no one in the office needs to touch it.' },
              { n: '3', title: 'Office reviews and approves', body: 'Payroll reviews the draft in Xero, makes any adjustments, and approves. Everything is already calculated — they\'re just checking it.' },
            ].map((step, i) => (
              <FadeUp key={step.n} delay={i * 0.1}>
                <div className="bg-gradient-to-b from-white to-[#f4f4f4] rounded-2xl shadow-sm p-8 h-full">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-4">
                    <span className="text-white font-bold text-xl">{step.n}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#111827] mb-3">{step.title}</h3>
                  <p className="text-[#6B7280] leading-relaxed">{step.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Overtime */}
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20 mb-20">
            <FadeUp>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-5">Overtime calculated automatically</h3>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Set the overtime rules once per employee — time-and-a-half after 8 hours, double time after that, whatever your EBA says. From then on, CivDocs applies the right rates every time without anyone having to check.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Overtime hours are broken out separately in the logbook and in the Xero pay run, so your payroll team always knows exactly what they&apos;re approving.
              </p>
            </FadeUp>
            <div className="space-y-4">
              {[
                { label: 'Regular hours', detail: 'Straight time — captured and pushed automatically' },
                { label: 'Overtime hours', detail: 'Calculated from rules set per employee' },
                { label: 'Custom earnings', detail: 'Inclement weather, RDO, night shift' },
              ].map(({ label, detail }, i) => (
                <FadeUp key={label} delay={i * 0.08}>
                  <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF8C32] to-[#F5B041]">
                      <svg className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900">{label}</p>
                      <p className="mt-0.5 text-sm text-gray-500">{detail}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* CFMEU Allowances */}
          <FadeUp>
          <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/40 p-8 sm:p-10 shadow-sm mb-20">
            <div className="max-w-2xl mb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-[#FF8C32] mb-3">CFMEU Awards</p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">
                The only app that handles CFMEU allowances automatically.
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Generic payroll apps don&apos;t know what site allowance is. CivDocs was built for civil construction — so CFMEU allowances are calculated on the job, not manually added by your admin team at the end of the week.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Site allowance</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Automatically calculated based on the job and hours worked. No admin input required — it&apos;s already on the pay run.</p>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Meal &amp; crib allowance</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Triggered automatically once an employee works past the threshold hours on the job. Nothing to remember.</p>
              </div>
              <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
                <h4 className="font-semibold text-gray-900 mb-2">Travel allowance</h4>
                <p className="text-sm text-gray-600 leading-relaxed">Employees get their travel allowance applied per day worked. Pushes straight through to the Xero draft — no spreadsheet needed.</p>
              </div>
            </div>
          </div>
          </FadeUp>

        </div>
      </section>

      {/* Payroll CTA */}
      <div className="bg-[#FFFEFB] py-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-lg font-medium text-gray-700">Stop re-entering hours into Xero every week.</p>
          <Link href="/start-trial#signup-form" className="inline-flex items-center justify-center px-7 py-3 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all whitespace-nowrap">
            Start Free Trial →
          </Link>
        </div>
      </div>

      {/* Scheduling Section */}
      <section id="scheduling" className="pt-20 pb-24 bg-[#FFFEFB] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Heading */}
          <FadeUp>
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Stop ringing around. Everyone knows where to be.
              </h2>
              <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                Before CivDocs, scheduling meant a whiteboard no-one else could see, a flurry of phone calls every morning, and a fleet of machines you weren&apos;t completely sure where they were.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed">
                Now it&apos;s drag, drop, confirm — and CivDocs handles the rest.
              </p>
            </div>
          </FadeUp>

          {/* Screenshot + feature list */}
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16 xl:gap-20 mb-20">
            <FadeUp className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
              <OptimizedImage
                src="/machinehomepageattachements/scheduling-screenshot.png"
                alt="CivDocs scheduling calendar — drag and drop employees and machines onto jobs"
                width={1024}
                height={576}
                className="w-full h-auto"
                sizes="(max-width: 768px) 90vw, 520px"
                quality={95}
              />
            </FadeUp>

            <div className="space-y-6">
              {[
                {
                  title: 'Drag and drop — machines and employees',
                  body: 'Put any employee or machine onto a job by dragging them onto the calendar. Link an operator directly to a machine. Schedule across the month, the week, or right down to the day.',
                },
                {
                  title: 'CivDocs messages them automatically',
                  body: 'The moment you confirm changes, CivDocs sends the employee an SMS with their start time, a Google Maps pin to the job location, and the supervisor\'s name and phone number. No calls. No "did you get the message?"',
                },
                {
                  title: 'Dry hire — straight to invoicing',
                  body: 'Scheduling a machine or attachment on a job adds it to the job\'s revenue automatically. When invoicing time comes, the dry hire charges are already there — nothing to re-enter.',
                },
              ].map(({ title, body }, i) => (
                <FadeUp key={title} delay={i * 0.1}>
                  <div className="flex items-start gap-4">
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FF8C32] to-[#F5B041]">
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{title}</p>
                      <p className="mt-1 text-gray-600 leading-relaxed">{body}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* View modes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { view: 'Month view', desc: 'Plan the whole fleet a month out. See who\'s on what job and spot gaps before they become problems.' },
              { view: 'Week view', desc: 'Fine-tune the week. Move people and machines around as jobs shift — without any phone calls.' },
              { view: 'Day view', desc: 'Drill into a single day. Perfect for busy sites with multiple crews and machines running at once.' },
            ].map(({ view, desc }, i) => (
              <FadeUp key={view} delay={i * 0.1}>
                <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/40 p-6 shadow-sm">
                  <h4 className="font-semibold text-[#1E1E1E] mb-2">{view}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

        </div>
      </section>

      {/* Scheduling CTA */}
      <div className="bg-[#FFFEFB] py-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-lg font-medium text-gray-700">Put your whole fleet on the right jobs — in minutes.</p>
          <Link href="/start-trial#signup-form" className="inline-flex items-center justify-center px-7 py-3 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all whitespace-nowrap">
            Start Free Trial →
          </Link>
        </div>
      </div>

      {/* Machine Compliance Section */}
      <section id="compliance" className="pt-20 pb-24 bg-[#FFFEFB] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          <FadeUp>
            <div className="max-w-3xl mb-16">
              <p className="text-sm font-bold uppercase tracking-widest text-[#FF8C32] mb-3">Machine Compliance</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#1E1E1E] mb-6">
                Every compliance document, one place. One click to share.
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Store risk assessments, service history, operator manuals, insurance certificates, and operator tickets against each machine in CivDocs. When an engineer, project manager, or supervisor needs to see them, you send a link in seconds — no Dropbox hunting, no email chains.
              </p>
            </div>
          </FadeUp>

          {/* Two screenshots side by side */}
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:items-start lg:gap-12 mb-20">
            <FadeUp>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Your machine library</p>
              <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
                <OptimizedImage
                  src="/machinehomepageattachements/machine-compliance-list.png"
                  alt="CivDocs machine compliance list — risk assessments, service history, operator tickets per machine"
                  width={1024}
                  height={768}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 90vw, 520px"
                  quality={95}
                />
              </div>
            </FadeUp>

            <FadeUp delay={0.12}>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">What the recipient sees</p>
              <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
                <OptimizedImage
                  src="/machinehomepageattachements/machine-compliance-export.png"
                  alt="CivDocs compliance export page — what a client or engineer sees after receiving the link"
                  width={1024}
                  height={1400}
                  className="w-full h-auto"
                  sizes="(max-width: 768px) 90vw, 520px"
                  quality={95}
                />
              </div>
            </FadeUp>
          </div>

          {/* Feature list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: 'Everything stored per machine',
                body: 'Risk assessment, service history, operator manual, insurances, and operator tickets & VOCs — all attached directly to the machine in CivDocs.',
              },
              {
                title: 'No risk assessment? Create one free.',
                body: 'CivDocs includes a free risk assessment generator. Build one in minutes and attach it straight to the machine.',
                link: { label: 'Generate a free risk assessment →', href: '/free-tools/risk-assessment' },
              },
              {
                title: 'Export in one click',
                body: 'Hit "Export data", enter a name and email or phone number, and CivDocs sends them a link. They can view and download everything — no CivDocs account needed.',
              },
              {
                title: 'No account required to view',
                body: 'The recipient gets a clean, branded compliance page with all documents available to view or download. Nothing to install. Nothing to log into.',
              },
              {
                title: 'Stop digging through Dropbox',
                body: 'No more hunting through shared drives to find the right service record for the right machine and forwarding it manually. It\'s already there — one link covers everything.',
              },
              {
                title: 'Looks professional',
                body: 'Your client or engineer gets a clean, well-presented compliance pack with your company name. First impressions matter on Tier One sites.',
              },
            ].map(({ title, body, link }, i) => (
              <FadeUp key={title} delay={(i % 3) * 0.08}>
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm h-full">
                  <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                  {link && (
                    <a href={link.href} className="mt-3 inline-block text-sm font-semibold text-[#FF8C32] hover:underline">
                      {link.label}
                    </a>
                  )}
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Compliance CTA */}
          <FadeUp>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-orange-100 bg-gradient-to-br from-white to-orange-50/40 px-8 py-6 shadow-sm">
              <p className="text-lg font-medium text-gray-700">Keep all your compliance documents in one place — ready to share instantly.</p>
              <a href="/start-trial#signup-form" className="inline-flex items-center justify-center px-7 py-3 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all whitespace-nowrap">
                Start Free Trial →
              </a>
            </div>
          </FadeUp>

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

              href="/start-trial#signup-form"

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
    </div>
  );
}
