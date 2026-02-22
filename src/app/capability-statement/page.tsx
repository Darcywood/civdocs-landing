import { Marquee } from '@/components/ui/marquee';
import { PulsatingButton } from '@/components/ui/pulsating-button';
import { TestimonialCard } from './_components/TestimonialCard';
import { CapabilityStatCounter } from './_components/CapabilityStatCounter';
import ScrollScrubVideo from './_components/ScrollScrubVideo';
import StepCards from './_components/StepCards';
import IncludedItems from './_components/IncludedItems';

const BUILDER_PATH = '/capability-statement/build';

const TOP_ROW_CARDS = [
  {
    name: 'John',
    company: 'Jal Civil',
    quote: "Feels built by someone who actually understands civil jobs and tenders.",
    logoSrc: '/capability-statement/Jal.png',
  },
  {
    name: 'Riley',
    company: 'RMF Earthworx',
    quote: "This is the first time our plant, projects and compliance were actually laid out properly in one document.",
    logoSrc: '/capability-statement/rmf.png',
  },
];

const BOTTOM_ROW_CARDS = [
  {
    name: 'Colby',
    company: 'Ali Excavations',
    quote: "We're a small crew and don't have admin staff. This took care of something we always put off.",
    logoSrc: '/capability-statement/ali.png',
  },
  {
    name: 'Riley',
    company: 'Rj Piling',
    quote: "No logins, no fluff. Just answered the questions and got the PDF. Exactly what we needed.",
    logoSrc: '/capability-statement/rj.png',
  },
];

export default function CapabilityStatementLandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <main>
        {/* Hero */}
        <section className="px-4 py-16 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-3xl font-semibold tracking-tight text-[#1E1E1E] sm:text-4xl lg:text-5xl">
              Get a tender-ready capability statement in 5 minutes
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              Answer a few simple questions and we&apos;ll generate a clean PDF that matches what councils, builders, and Tier-1s expect. Built for Australian civil contractors and plant hire.
            </p>
            <ul className="mt-8 space-y-3">
              <li className="flex items-center gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#FF8C32]/25 bg-[#FF8C32]/10 text-[#FF8C32]">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                Structured to meet council & Tier-1 tender expectations
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#FF8C32]/25 bg-[#FF8C32]/10 text-[#FF8C32]">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                Professional PDF you can attach immediately
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#FF8C32]/25 bg-[#FF8C32]/10 text-[#FF8C32]">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                Built for civil contractors, earthworks & plant hire
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#FF8C32]/25 bg-[#FF8C32]/10 text-[#FF8C32]">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                Takes ~5 minutes
              </li>
            </ul>
            <div className="mt-10 space-y-4 overflow-hidden">
              <Marquee className="[--duration:25s] [--gap:1.5rem]" reverse={false} pauseOnHover>
                {TOP_ROW_CARDS.map((card) => (
                  <TestimonialCard
                    key={`${card.name}-${card.company}`}
                    name={card.name}
                    company={card.company}
                    quote={card.quote}
                    logoSrc={card.logoSrc}
                  />
                ))}
              </Marquee>
              <Marquee className="[--duration:25s] [--gap:1.5rem]" reverse pauseOnHover>
                {BOTTOM_ROW_CARDS.map((card) => (
                  <TestimonialCard
                    key={`${card.name}-${card.company}`}
                    name={card.name}
                    company={card.company}
                    quote={card.quote}
                    logoSrc={card.logoSrc}
                  />
                ))}
              </Marquee>
            </div>
            <CapabilityStatCounter />
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-gray-100 bg-gray-50/50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-semibold text-[#1E1E1E] sm:text-3xl">How it works</h2>
            <p className="mt-2 text-gray-600">Three simple steps to your capability statement.</p>
            <div className="mt-10">
              <ScrollScrubVideo />
            </div>
            <StepCards />
          </div>
        </section>

        {/* What's included */}
        <section className="border-t border-gray-100 px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-semibold text-[#1E1E1E] sm:text-3xl">Everything tender reviewers expect to see</h2>
            <p className="mt-2 text-gray-600">Each capability statement is structured to match how councils, builders, and Tier-1s assess submissions.</p>
            <IncludedItems />
          </div>
        </section>

        {/* CTA - bottom of page */}
        <section className="border-t border-gray-100 px-4 pt-6 pb-[50px] sm:pt-8 sm:pb-[50px]">
          <div className="mx-auto max-w-6xl text-center">
            <p className="mb-4 text-sm text-slate-600">This is the exact structure used in real tender submissions.</p>
            <PulsatingButton href={BUILDER_PATH}>Start building</PulsatingButton>
          </div>
        </section>
      </main>
    </div>
  );
}
