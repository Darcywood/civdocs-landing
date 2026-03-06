'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import { Marquee } from '@/components/ui/marquee';
import { TestimonialCard } from '@/app/capability-statement/_components/TestimonialCard';
import SampleReportModal from '@/components/marketing/SampleReportModal';
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
  const [showSampleReport, setShowSampleReport] = useState(false);

  return (
    <div className="min-h-screen font-sans antialiased" style={{ background: '#F7F3EC' }}>
      <Header />
      <div className="pt-20">
        <RiskAssessmentHero />

        <SampleReportModal
          isOpen={showSampleReport}
          onClose={() => setShowSampleReport(false)}
        />

        {/* Scroll scrub — between hero and Problem section */}
        <section className="w-full px-4">
          <div className="w-full">
            <RiskAssessmentScrollScrub />
          </div>
        </section>

        {/* Section 1 — Problem */}
        <section className="px-4 pt-4 pb-16 sm:pt-6 sm:pb-20">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="max-w-2xl">
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
        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
                CivDocs built a faster way
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Instead of writing risk assessments manually, answer a few questions about your machine and CivDocs generates a structured risk management report in minutes.
              </p>
              <p className="text-gray-700 mb-5 font-medium">The report includes:</p>
              <ul className="space-y-3 mb-8">
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
              <p className="text-gray-600">
                This produces the exact type of document safety auditors expect.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 — How it Works */}
        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="max-w-2xl">
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
            <div className="max-w-2xl">
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
            <div className="max-w-2xl mb-10">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
                Sample Report Preview
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                Example pages from a report generated by CivDocs
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
              {[
                { label: 'Cover page', src: '/riskassesement/1.png' },
                { label: 'Risk matrix', src: '/riskassesement/4.png' },
                { label: 'Hazard treatment section', src: '/riskassesement/6.png' },
              ].map((card) => (
                <div key={card.src} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="aspect-[3/4] bg-gray-50 relative">
                    <Image
                      src={card.src}
                      alt={card.label}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  <p className="px-4 py-3 text-sm font-medium text-gray-700 border-t border-gray-100">
                    {card.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <button
                type="button"
                onClick={() => setShowSampleReport(true)}
                className="text-[#FF8C32] font-semibold hover:underline"
              >
                View full sample report →
              </button>
            </div>
          </div>
        </section>

        {/* Section 5 — CTA */}
        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="max-w-2xl">
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
            <div className="max-w-2xl">
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
              <p className="text-gray-500 text-sm">
                All captured daily from site.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
