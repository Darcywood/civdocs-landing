import type { Metadata } from 'next';
import { Suspense } from 'react';
import CalendlyPopupButton from '@/components/marketing/CalendlyPopupButton';
import { Marquee } from '@/components/ui/marquee';
import { TestimonialCard } from '@/app/capability-statement/_components/TestimonialCard';
import BookFAQ from './_components/BookFAQ';
import StepHeading from './_components/StepHeading';
import BookVideoPlayer from './_components/BookVideoPlayer';

export const metadata: Metadata = {
  title: 'Book a Quick CivDocs Fit Check',
  description:
    'Book a 15-minute chat to see if CivDocs is a fit for your civil contracting or plant hire business.',
};

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
    <main className="bg-[#F8F9FA] min-h-screen pt-8 sm:pt-12 pb-16 sm:pb-24">
      <div className="mx-auto max-w-3xl lg:max-w-4xl xl:max-w-5xl px-4 sm:px-6 lg:px-12 xl:px-16">

          {/* ── Hero / Intro ───────────────────────────────────────── */}
          <section className="mb-20 sm:mb-28 text-center">
            <h1 className="text-[3.4rem] sm:text-[4.59rem] md:text-[4.59rem] lg:text-[5.5rem] xl:text-[6.5rem] font-bold text-gray-900 leading-[1.05] tracking-tight mx-auto">
              Still Doing Civil Paperwork at Night?
            </h1>

            <p className="mt-8 sm:mt-10 text-[1.5125rem] sm:text-[1.815rem] lg:text-[1.75rem] text-slate-700 leading-relaxed max-w-3xl mx-auto">
              CivDocs connects day dockets, logbooks and plant hours directly to your invoicing — so admin takes minutes instead of hours.
            </p>
          </section>

          {/* ── Step 1 of 2: Watch Video ─────────────────────────────── */}
          <section className="mb-24 sm:mb-28">
            <StepHeading step="Step 1 of 2:" title="Watch Video" />
            <div className="mt-8 sm:mt-10">
              <BookVideoPlayer />
            </div>
          </section>

          {/* ── Step 2 of 2: Book a Call ────────────────────────────── */}
          <section className="mb-20 sm:mb-24 text-center">
            <StepHeading step="Step 2 of 2:" title="Book a Call" />
            <p className="mt-8 sm:mt-10 text-[1.5125rem] sm:text-[1.815rem] lg:text-[1.75rem] text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Just a quick chat about how you&apos;re currently doing admin and whether CivDocs could save you time.
            </p>
            <p className="mt-5 text-[1.5125rem] sm:text-[1.815rem] lg:text-[1.75rem] text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Zoom or phone — whatever&apos;s easiest.
            </p>
            <div className="mt-12 sm:mt-14 flex justify-center">
              <Suspense fallback={
                <a
                  href="https://calendly.com/darcy-civdocs/30min?primary_color=FF8C32"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-14 py-5 sm:px-16 sm:py-6 bg-[#FF8C32] hover:bg-[#E67E22] text-white font-bold text-xl rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl animate-button-pulse"
                >
                  Book a Call
                </a>
              }>
                <CalendlyPopupButton className="inline-flex items-center justify-center px-14 py-5 sm:px-16 sm:py-6 bg-[#FF8C32] hover:bg-[#E67E22] text-white font-bold text-xl rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl animate-button-pulse">
                  Book a Call
                </CalendlyPopupButton>
              </Suspense>
            </div>
          </section>

          {/* ── Testimonials ────────────────────────────────────────── */}
          <section className="mb-20 sm:mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Trusted by civil contractors
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Simple enough for crews to use. Powerful enough to save serious admin time.
            </p>
            <div className="mt-8 mx-auto max-w-[600px] lg:max-w-full space-y-4 overflow-hidden">
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
          </section>

          {/* ── FAQ ─────────────────────────────────────────────────── */}
          <BookFAQ />
        </div>
    </main>
  );
}
