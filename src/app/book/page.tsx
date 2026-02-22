import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalendlyWithUtm from '@/components/marketing/CalendlyWithUtm';

export const metadata: Metadata = {
  title: 'Book a Quick CivDocs Fit Check',
  description:
    'Book a 15-minute chat to see if CivDocs is a fit for your civil contracting or plant hire business.',
};

const IS_LIST = [
  'Practical and straight-up',
  'Focused on your setup',
  'No prep required',
  '15 minutes',
];

const IS_NOT_LIST = [
  'A hard sales pitch',
  'A long demo',
  'A commitment',
  'A generic SaaS call',
];

const COVER_BULLETS = [
  'Your current capability statement process',
  'What tender reviewers typically check',
  'Where compliance / info usually falls over',
  'Whether CivDocs would simplify this for you',
];

export default function BookPage() {
  return (
    <>
      <Header />

      <main className="bg-[#F8F9FA] min-h-screen">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">

            {/* ── Left column ─────────────────────────────────────── */}
            <div className="mb-10 lg:mb-0 lg:sticky lg:top-24">

              {/* Eyebrow */}
              <p className="text-sm font-semibold uppercase tracking-widest text-[#FF8C32] mb-3">
                Free · 15 minutes
              </p>

              {/* H1 */}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Quick CivDocs Fit Check
              </h1>

              {/* Subhead */}
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                A short, no-pressure chat to see whether CivDocs would actually
                help your business. No prep required.
              </p>

              {/* Is / Isn't cards */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-3">
                    This call is
                  </p>
                  <ul className="space-y-2">
                    {IS_LIST.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-0.5 text-emerald-500 shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-rose-500 mb-3">
                    This call isn&apos;t
                  </p>
                  <ul className="space-y-2">
                    {IS_NOT_LIST.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-0.5 text-rose-400 shrink-0">✗</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* What we'll cover */}
              <div className="mt-8">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  What we&apos;ll cover
                </h2>
                <ul className="space-y-2.5">
                  {COVER_BULLETS.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF8C32]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust line */}
              <p className="mt-8 text-xs text-slate-400">
                Built for Australian civil contractors and plant hire.
              </p>
            </div>

            {/* ── Right column — booking card ──────────────────────── */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="px-6 pt-6 pb-2">
                <h2 className="text-xl font-semibold text-gray-900">Pick a time</h2>
                <p className="mt-1 text-sm text-slate-500">Free chat. No sales pressure.</p>
              </div>

              <Suspense fallback={
                <div className="flex items-center justify-center" style={{ height: 720 }}>
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#FF8C32] border-t-transparent" />
                </div>
              }>
                <CalendlyWithUtm height={720} />
              </Suspense>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
