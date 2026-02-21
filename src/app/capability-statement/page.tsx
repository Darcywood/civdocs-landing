import Link from 'next/link';
import { Marquee } from '@/components/ui/marquee';
import { TestimonialCard } from './_components/TestimonialCard';
import { CapabilityStatCounter } from './_components/CapabilityStatCounter';

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
              Free Civil Capability Statement Generator
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-600">
              Answer a few questions. Get a tender-ready PDF, built for Australian civil contractors and plant hire.
            </p>
            <ul className="mt-8 space-y-3">
              <li className="flex items-center gap-3 text-gray-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF8C32]/20 text-[#FF8C32]">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Free, no credit card
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF8C32]/20 text-[#FF8C32]">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Built for civil contractors & plant hire
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF8C32]/20 text-[#FF8C32]">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Clean PDF emailed to you
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FF8C32]/20 text-[#FF8C32]">
                  <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FF8C32]/10 text-lg font-bold text-[#FF8C32]">1</span>
                <h3 className="mt-4 font-semibold text-gray-900">Answer 12 questions</h3>
                <p className="mt-2 text-sm text-gray-600">Business basics, projects, and portfolio — all tailored for civil contractors.</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FF8C32]/10 text-lg font-bold text-[#FF8C32]">2</span>
                <h3 className="mt-4 font-semibold text-gray-900">Upload logo & photos (optional)</h3>
                <p className="mt-2 text-sm text-gray-600">Add your branding and project images for a polished result.</p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FF8C32]/10 text-lg font-bold text-[#FF8C32]">3</span>
                <h3 className="mt-4 font-semibold text-gray-900">We generate + email your PDF</h3>
                <p className="mt-2 text-sm text-gray-600">Get a clean, professional PDF delivered to your inbox.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="border-t border-gray-100 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-semibold text-[#1E1E1E] sm:text-3xl">What&apos;s included</h2>
            <p className="mt-2 text-gray-600">Your PDF covers everything tenders and clients expect.</p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Company overview</h3>
                <p className="text-sm text-gray-600">Business name, regions, and type — front and centre.</p>
                <h3 className="font-medium text-gray-900">Core capabilities</h3>
                <p className="text-sm text-gray-600">Services you offer, from earthworks to plant hire.</p>
                <h3 className="font-medium text-gray-900">Project experience</h3>
                <p className="text-sm text-gray-600">Featured projects with scope, client, and outcomes.</p>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Plant & equipment</h3>
                <p className="text-sm text-gray-600">Machinery and assets you operate.</p>
                <h3 className="font-medium text-gray-900">Key personnel</h3>
                <p className="text-sm text-gray-600">Team members, roles, and experience.</p>
                <h3 className="font-medium text-gray-900">Compliance snapshot</h3>
                <p className="text-sm text-gray-600">Certifications and insurance at a glance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Preview */}
        <section id="preview" className="scroll-mt-20 border-t border-gray-100 bg-gray-50/50 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-semibold text-[#1E1E1E] sm:text-3xl">Preview</h2>
            <p className="mt-2 text-gray-600">A clean, professional document — ready to send.</p>
            <div className="mt-10 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
              <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
                <div className="h-4 w-48 rounded bg-gray-300" />
                <div className="mt-2 h-3 w-64 rounded bg-gray-200" />
              </div>
              <div className="space-y-6 p-6">
                <div>
                  <div className="h-4 w-32 rounded bg-gray-300" />
                  <div className="mt-2 h-3 w-full max-w-md rounded bg-gray-200" />
                  <div className="mt-1 h-3 w-full max-w-sm rounded bg-gray-200" />
                </div>
                <div>
                  <div className="h-4 w-36 rounded bg-gray-300" />
                  <div className="mt-2 flex gap-2">
                    <div className="h-3 w-24 rounded bg-gray-200" />
                    <div className="h-3 w-20 rounded bg-gray-200" />
                    <div className="h-3 w-28 rounded bg-gray-200" />
                  </div>
                </div>
                <div>
                  <div className="h-4 w-28 rounded bg-gray-300" />
                  <div className="mt-2 space-y-2">
                    <div className="h-3 w-full rounded bg-gray-200" />
                    <div className="h-3 w-[80%] rounded bg-gray-200" />
                    <div className="h-3 w-[75%] rounded bg-gray-200" />
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 px-6 py-3">
                <div className="h-3 w-56 rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA - bottom of page */}
        <section className="border-t border-gray-100 px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl text-center">
            <Link
              href={BUILDER_PATH}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-10 py-4 text-lg font-semibold text-white shadow-md transition-all hover:shadow-lg"
            >
              Start building
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
