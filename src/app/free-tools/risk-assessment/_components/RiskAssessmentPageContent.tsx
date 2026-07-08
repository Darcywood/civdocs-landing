'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { Marquee } from '@/components/ui/marquee';
import { TestimonialCard } from '@/app/capability-statement/_components/TestimonialCard';
import RiskAssessmentHero from './RiskAssessmentHero';
import RiskAssessmentScrollScrub from './RiskAssessmentScrollScrub';

const TOP_ROW_CARDS = [
  {
    name: 'John',
    company: 'Jal Civil',
    quote: "Used to be scrambling the night before mobilisation trying to piece a risk assessment together. Now it takes a few minutes and it's done properly.",
    logoSrc: '/capability-statement/Jal.png',
  },
  {
    name: 'Riley',
    company: 'RJ Piling',
    quote: "Dead simple to use. Answer a few questions and the report's done. No mucking around.",
    logoSrc: '/capability-statement/rj.png',
  },
];

const BOTTOM_ROW_CARDS = [
  {
    name: 'Colby',
    company: 'Ali Excavations',
    quote: "We used to copy old Word docs and hope they were right. Now every machine gets its own proper assessment.",
    logoSrc: '/capability-statement/ali.png',
  },
  {
    name: 'Riley',
    company: 'RMF Earthworx',
    quote: "Took about five minutes the first time. Saved us paying a consultant a few hundred bucks.",
    logoSrc: '/capability-statement/rmf.png',
  },
];

const NEW_STEPS = [
  { num: '1', title: 'Enter Machine Details' },
  { num: '2', title: 'Answer Compliance Questions' },
  { num: '3', title: 'System Generates the Report' },
  { num: '4', title: 'Download Your PDF' },
];

export default function RiskAssessmentPageContent() {
  return (
    <div className="min-h-screen font-sans antialiased" style={{ background: '#F7F3EC' }}>
      <Header />
      <div className="pt-20">
        <RiskAssessmentHero />

        {/* Scroll scrub — between hero and Problem section */}
        <section className="relative z-0 w-full px-4">
          <div className="w-full">
            <RiskAssessmentScrollScrub />
          </div>
        </section>

        {/* Section 1 — Problem */}
        <section className="relative z-10 px-4 pt-4 pb-16 sm:pt-6 sm:pb-20">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="max-w-2xl lg:mx-auto lg:max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-8">
                Most contractors are doing risk assessments the hard way
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Most civil contractors either:
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-[#FF8C32] mt-0.5">•</span>
                  <span className="text-gray-700">Pay consultants $300+ per machine</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF8C32] mt-0.5">•</span>
                  <span className="text-gray-700">Copy outdated reports from previous jobs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#FF8C32] mt-0.5">•</span>
                  <span className="text-gray-700">Spend hours editing Word documents</span>
                </li>
              </ul>
              <p className="text-gray-600 mb-4">
                When a principal contractor or safety auditor asks for a plant risk assessment, it turns into a scramble.
              </p>
              <p className="text-lg font-semibold text-gray-900">
                This tool removes that problem.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2 — Solution */}
        <section className="relative z-10 px-4 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="max-w-2xl lg:mx-auto lg:max-w-4xl">
              <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-14">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
                    CivDocs built a faster way
                  </h2>
                  <p className="text-lg text-gray-600">
                    Instead of writing risk assessments manually, answer a few questions about your machine and CivDocs generates a structured risk management report in minutes.
                  </p>
                  <p className="mt-8 text-gray-600 lg:mt-10">
                    This produces the exact type of document safety auditors expect.
                  </p>
                </div>
                <div className="mt-8 lg:mt-0 lg:rounded-2xl lg:border lg:border-gray-200/70 lg:bg-white/70 lg:p-8 lg:shadow-sm">
                  <p className="text-gray-700 mb-5 font-medium">The report includes:</p>
                  <ul className="space-y-3">
                    {['Hazard identification', 'Risk evaluation matrix', 'Control measures', 'Standards references', 'Operator acknowledgement'].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF8C32]/10 text-[#FF8C32]">
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 — How it Works */}
        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="max-w-2xl lg:mx-auto lg:max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-10">
                How it works
              </h2>
              <ol className="space-y-6 mb-12">
                {NEW_STEPS.map((s) => (
                  <li key={s.num} className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-bold flex items-center justify-center shrink-0 text-base">
                      {s.num}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{s.title}</span>
                  </li>
                ))}
              </ol>
              <Link
                href="/free-tools/risk-assessment/build"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-8 py-4 font-semibold text-white shadow-md hover:shadow-lg transition-all"
              >
                Build Your Risk Assessment →
              </Link>
            </div>
          </div>
        </section>

        {/* QR Code hosting section */}
        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="max-w-2xl lg:mx-auto lg:max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5">
                Your report. On the machine. Always accessible.
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Once your report is generated, we'll host it securely and give you a unique QR code linked directly to it.
              </p>
              <p className="text-gray-600 mb-8">
                Print it out and stick it on the machine. When a safety auditor or principal contractor wants to see the risk assessment, they scan the code — no paperwork, no searching through folders, no emailing PDFs back and forth.
              </p>
              <ul className="space-y-4">
                {[
                  'QR code printed and mounted on the machine',
                  'Report hosted securely by CivDocs',
                  'Accessible from any phone, instantly',
                  'Always the latest version',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF8C32]/10 text-[#FF8C32]">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 — Sample Report Preview */}
        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="mb-10 max-w-2xl lg:mx-auto lg:max-w-3xl lg:text-center">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                Sample Report Preview
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Example pages from a report generated by CivDocs
              </p>
            </div>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { label: 'Cover page', src: '/riskassesement/1.png' },
                { label: 'Risk matrix', src: '/riskassesement/4.png' },
                { label: 'Hazard treatment section', src: '/riskassesement/6.png' },
              ].map((card) => (
                <div key={card.src} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <p className="px-4 py-3 text-sm font-medium text-gray-700 border-b border-gray-100">
                    {card.label}
                  </p>
                  <div className="aspect-[3/4] bg-gray-50 relative">
                    <Image
                      src={card.src}
                      alt={card.label}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5 — CTA */}
        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="max-w-2xl lg:mx-auto lg:max-w-3xl lg:text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-8">
                Stop paying consultants for plant risk assessments
              </h2>
              <Link
                href="/free-tools/risk-assessment/build"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-8 py-4 font-semibold text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                Build Your Risk Assessment →
              </Link>
              <p className="mt-4 text-sm text-gray-500">
                Takes less than 5 minutes.
              </p>
              <div className="mt-8 mx-auto max-w-[600px] space-y-4 overflow-hidden">
                <Marquee className="[--duration:25s] [--gap:1.5rem]" reverse={false} pauseOnHover>
                  {TOP_ROW_CARDS.map((card) => (
                    <TestimonialCard key={`${card.name}-${card.company}`} {...card} />
                  ))}
                </Marquee>
                <Marquee className="[--duration:25s] [--gap:1.5rem]" reverse pauseOnHover>
                  {BOTTOM_ROW_CARDS.map((card) => (
                    <TestimonialCard key={`${card.name}-${card.company}`} {...card} />
                  ))}
                </Marquee>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6 — CivDocs Soft Pitch */}
        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="max-w-2xl lg:mx-auto lg:max-w-3xl">
              <p className="text-gray-600 mb-4">
                This free generator is powered by <span className="font-semibold text-gray-900">CivDocs</span>.
              </p>
              <p className="text-gray-600 mb-6">
                CivDocs helps civil contractors manage:
              </p>
              <ul className="space-y-3 mb-8">
                {['plant logbooks', 'pre-starts', 'timesheets', 'job cost tracking', 'project scopes'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF8C32]/10 text-[#FF8C32]">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-500 text-sm mb-10">
                All captured daily from site.
              </p>
              <Link
                href="/free-tools/risk-assessment/build"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-8 py-4 font-semibold text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                Build Your Risk Assessment →
              </Link>
            </div>
          </div>
        </section>

        {/* SEO / educational Q&A sections */}
        <section className="border-t border-gray-200 px-4 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1200px] space-y-14">
            <div className="max-w-2xl lg:mx-auto lg:max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                What is a machine risk assessment?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                A machine risk assessment is a structured document that identifies hazards linked to operating a specific piece of plant, rates the level of risk, and sets out control measures to bring that risk down to an acceptable level. On civil and earthmoving sites, principal contractors and safety auditors routinely ask for a plant risk assessment before a machine mobilises — covering everything from pinch points and rollover risk to operator competency and maintenance requirements. CivDocs generates a complete machine risk assessment template in minutes: hazard identification, risk evaluation matrix, control measures, and relevant Australian standards references, all in a professional PDF ready for site.
              </p>
            </div>

            <div className="max-w-2xl lg:mx-auto lg:max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                Do I need a risk assessment for every machine on site?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                In practice, yes — each machine should have its own plant risk assessment. Hazards, operating conditions, and control measures differ between machine types and even between individual units in your fleet. A principal contractor or safety auditor will typically want to see a separate assessment per machine, not a generic document copied from a previous job. If you are running excavators, graders, rollers, and posi tracks across multiple sites, that can mean a significant compliance workload. CivDocs lets you generate a machine-specific, audit-ready plant risk assessment for each unit free of charge, so nothing gets missed when you mobilise.
              </p>
            </div>

            <div className="max-w-2xl lg:mx-auto lg:max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                How is this different from a SWMS?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                A SWMS (Safe Work Method Statement) describes how a specific high-risk construction task will be carried out safely — it is task-focused and tied to a particular activity on a particular day. A machine risk assessment is plant-focused: it documents the hazards inherent to operating that machine, regardless of which task it is performing. On most civil sites you need both. Your SWMS covers the safe work method for trenching, lifting, or earthworks on that job; your plant risk assessment covers the machine itself. CivDocs generates the machine risk assessment. Your SWMS is prepared separately for each high-risk task.
              </p>
            </div>

            <div className="max-w-2xl lg:mx-auto lg:max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                How much does a professional risk assessment normally cost?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                WHS consultants typically charge $250 to $400 per machine for a professional plant risk assessment in Australia. For a contractor running five or more machines across active sites, that adds up fast — and assessments need updating when machines change, controls are revised, or new principal contractor requirements come through. CivDocs offers a free machine risk assessment generator that produces a structured, audit-ready PDF in under five minutes. No consultant fees, no waiting on a third party, and no copying outdated Word templates from a previous mobilisation.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
