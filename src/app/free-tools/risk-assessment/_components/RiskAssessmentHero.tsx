'use client';

import Image from 'next/image';
import Link from 'next/link';

const CONTRACTOR_LOGOS = [
  { src: '/capability-statement/Jal.png', alt: 'Jal Civil' },
  { src: '/capability-statement/rj.png', alt: 'RJ Piling' },
  { src: '/capability-statement/ali.png', alt: 'Ali Excavations' },
  { src: '/capability-statement/rmf.png', alt: 'RMF Earthworx' },
];

const BULLETS = [
  'Covers 70+ compliance checks',
  'Built to AS3450, ISO31000, AS/NZS4024',
  'Works for Graders, Excavators, Posi Tracks & Rollers',
  'Generates a full 17–18 page structured PDF report',
];

export default function RiskAssessmentHero() {
  return (
    <section
      className="relative flex flex-col px-4 pt-16 pb-2 sm:pt-20 sm:pb-2 lg:pt-24 lg:pb-2"
      style={{ background: '#F7F3EC' }}
    >
      <div className="mx-auto w-full max-w-[1200px] flex-1 flex flex-col">
        <div className="max-w-2xl lg:mx-auto lg:max-w-3xl lg:text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF8C32]/20 bg-[#FF8C32]/5 px-3 py-1 mb-6">
            <span className="text-xs font-semibold text-[#CC5500]">FREE TOOL</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1E1E1E] sm:text-4xl lg:text-[2.75rem] xl:text-5xl leading-[1.15]">
            Stop Paying $300 Per Machine for Risk Assessments
          </h1>
          <div className="mt-[30px]">
            <p className="text-sm font-medium text-gray-500 mb-3">Used by civil contractors across Australia</p>
            <div className="flex items-center gap-6 sm:gap-8 flex-wrap lg:justify-center">
              {CONTRACTOR_LOGOS.map((logo) => (
                <div key={logo.alt} className="h-12 w-12 rounded-full overflow-hidden border border-gray-200 bg-white shrink-0">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <p className="mt-[15px] text-lg text-gray-600 leading-relaxed max-w-xl lg:mx-auto">
            Generate a compliant plant risk assessment in 5 minutes — ready for site audits and principal contractors.
          </p>
          <ul className="mt-8 space-y-4 lg:inline-block lg:text-left">
            {BULLETS.map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#FF8C32]/25 bg-[#FF8C32]/10 text-[#FF8C32]">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link
              href="/free-tools/risk-assessment/build"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-8 py-4 font-semibold text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              Build Your Risk Assessment →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
