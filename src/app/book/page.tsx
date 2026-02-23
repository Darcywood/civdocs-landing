import type { Metadata } from 'next';
import { Suspense } from 'react';
import Header from '@/components/Header';
import DarcyPhoto from '@/components/marketing/DarcyPhoto';
import CalendlyWithUtm from '@/components/marketing/CalendlyWithUtm';
import { DraggableMarquee } from '@/components/ui/DraggableMarquee';
import { TestimonialCard } from '@/app/capability-statement/_components/TestimonialCard';
import BookFAQ from './_components/BookFAQ';

export const metadata: Metadata = {
  title: 'Book a Quick CivDocs Fit Check',
  description:
    'Book a 15-minute chat to see if CivDocs is a fit for your civil contracting or plant hire business.',
};

const IS_LIST = [
  'Straight-up and practical — no fluff',
  'About your setup, not a generic pitch',
  'Zero prep. Just show up.',
];

const IS_NOT_LIST = [
  'A hard sell or pushy demo',
  'An hour of slides you don’t need',
  'Any commitment to sign up',
];

const TOP_ROW_CARDS = [
  { name: 'John', company: 'Jal Civil', quote: "I was sceptical because we'd tried other systems before. This one actually fits how site runs. The blokes use it without drama.", logoSrc: '/capability-statement/Jal.png' },
  { name: 'Riley', company: 'RMF Earthworx', quote: "It's simple. Select the job, log the hours, submit. The blokes picked it up without needing a training day.", logoSrc: '/capability-statement/rmf.png' },
];

const BOTTOM_ROW_CARDS = [
  { name: 'Colby', company: 'Ali Excavations', quote: "Plant hours used to live in notebooks. Now they're logged daily and tied back to the job properly.", logoSrc: '/capability-statement/ali.png' },
  { name: 'Riley', company: 'Rj Piling', quote: "Being able to click into a job and see exactly where the hours and plant costs came from has made quoting less stressful.", logoSrc: '/capability-statement/rj.png' },
];

export default function BookPage() {
  return (
    <>
      <Header />

      <main className="bg-[#F8F9FA] min-h-screen pt-[130px] pb-12 sm:pb-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">

            {/* ── Left column ─────────────────────────────────────── */}
            <div className="mb-10 lg:mb-0 lg:sticky lg:top-24">

              {/* Darcy intro — alternating photos from Bookacall */}
              <div className="flex items-center gap-4 mb-6">
                <DarcyPhoto />
                <div>
                  <p className="font-semibold text-gray-900">Darcy</p>
                  <p className="text-sm text-slate-500">Founder, CivDocs</p>
                </div>
              </div>

              {/* H1 */}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Quick CivDocs Fit Check
              </h1>

              {/* Subhead — casual, for someone who&apos;s seen CivDocs but isn&apos;t sure */}
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                You&apos;ve had a look — now let&apos;s work out if it actually fits.
                No prep, no pressure. Just a quick friendly chat to see if CivDocs would
                help your business.
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

          {/* Social proof marquee — underneath booking card */}
          <div className="mt-10 overflow-hidden -mx-4 sm:-mx-6 lg:mx-0">
            <DraggableMarquee className="p-2" duration={25} repeat={4} gap={1.5}>
              {[...TOP_ROW_CARDS, ...BOTTOM_ROW_CARDS].map((card) => (
                <TestimonialCard
                  key={`${card.name}-${card.company}`}
                  name={card.name}
                  company={card.company}
                  quote={card.quote}
                  logoSrc={card.logoSrc}
                />
              ))}
            </DraggableMarquee>
          </div>

          {/* FAQ section */}
          <BookFAQ />
        </div>
      </main>
    </>
  );
}
