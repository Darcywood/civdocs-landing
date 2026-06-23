'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CsvToKmlHero from './CsvToKmlHero';
import RiskAssessmentScrollScrub from '@/app/free-tools/risk-assessment/_components/RiskAssessmentScrollScrub';
import CsvToKmlConverter from './CsvToKmlConverter';
import Link from 'next/link';

const STEPS = [
  { num: '1', title: 'Upload your control point CSV' },
  { num: '2', title: 'Select your datum and MGA zone' },
  { num: '3', title: 'Download the KML and open in Google Earth' },
];

function smoothScrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function CsvToKmlPageContent() {
  return (
    <div className="min-h-screen font-sans antialiased" style={{ background: '#F7F3EC' }}>
      <Header />
      <div className="pt-20">
        <CsvToKmlHero />

        {/* Scroll-scrub grader animation */}
        <section className="w-full px-4">
          <div className="w-full">
            <RiskAssessmentScrollScrub />
          </div>
        </section>

        {/* Section 1 — How it works */}
        <section className="px-4 pt-4 pb-16 sm:pt-6 sm:pb-20">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-10">
                How it works
              </h2>
              <ol className="space-y-6 mb-12">
                {STEPS.map((s) => (
                  <li key={s.num} className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-bold flex items-center justify-center shrink-0 text-base">
                      {s.num}
                    </div>
                    <span className="text-lg font-semibold text-gray-900">{s.title}</span>
                  </li>
                ))}
              </ol>
              <button
                type="button"
                onClick={() => smoothScrollTo('converter')}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-8 py-4 font-semibold text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                Convert My Points →
              </button>
            </div>
          </div>
        </section>

        {/* Section 2 — Who it's for */}
        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6">
                Stop shooting retros until two of them match up
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                If you&apos;ve ever set up a total station on a job where the retros aren&apos;t named, you know the drill — shoot one, shoot another, keep going until two coordinates match what&apos;s in your list. It works, but it wastes time.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Upload your control CSV here and get a KML you can open in Google Earth — every point sitting on satellite imagery so you can see roughly where each mark should be before you even pick up the instrument. If you&apos;re on CivDocs, load it straight into the map and your phone will show you the distance and direction to each point from where you&apos;re standing.
              </p>
              <p className="text-lg font-semibold text-gray-900 mb-6">
                Know where you&apos;re setting up before you get there.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'See where each control point sits on the ground before you set up',
                  'Narrow down which retros to shoot instead of trying them all',
                  'Open in Google Earth or load straight into CivDocs',
                  'Works with CSV exports from Trimble, Topcon, or Leica',
                  'Upload your file, pick your zone, download your KML',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF8C32]/10 text-[#FF8C32] mt-0.5">
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

        {/* ── CONVERTER TOOL ───────────────────────────────────── */}
        <div className="h-16 w-full" style={{ background: 'linear-gradient(to bottom, #F7F3EC, #FFFFFF)' }} />
        <div style={{ background: '#FFFFFF' }}>
          <CsvToKmlConverter />
        </div>
        <div className="h-16 w-full" style={{ background: 'linear-gradient(to bottom, #FFFFFF, #F7F3EC)' }} />

        {/* Section 3 — App 3D map feature pitch */}
        <section className="px-4 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5">
                Know exactly where every control point is before you get on site
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                On most jobs the surveyor sets the ground marks and retros but half the time the point name isn&apos;t written on them. The grader operator doesn&apos;t know which mark is which, the survey is off site or flat out, and then you end up burning time and looking unprofessional trying to figure it out.
              </p>
              <p className="text-gray-600 mb-8">
                Upload your control CSV into CivDocs and every point gets plotted on a live 3D map — named, coordinated, and visible to everyone on the job. The grader can pull it up from the cab on their phone or tablet and see exactly which mark is which before they even get out of the seat.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  'See every control point named and plotted on the 3D map',
                  'Know which mark is which without calling the surveyor',
                  'Works from the cab on any phone or tablet',
                  'Upload your CSV and it\'s live in seconds',
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
              <p className="text-gray-600 mb-6">
                CivDocs also handles your plant logbooks, pre-starts, timesheets, and invoicing — everything a civil contractor needs in one place.
              </p>
              <Link
                href="/start-trial#signup-form"
                className="inline-flex items-center rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-8 py-4 font-semibold text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                Start Free Trial →
              </Link>
              <p className="mt-3 text-sm text-gray-400">No credit card required.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Gradient fade into footer's white background */}
      <div className="h-16 w-full" style={{ background: 'linear-gradient(to bottom, #F7F3EC, #FFFFFF)' }} />
      <Footer />
    </div>
  );
}
