import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Marquee } from '@/components/ui/marquee';
import { TestimonialCard } from '@/app/capability-statement/_components/TestimonialCard';
import QuickGenerateButton from './_components/QuickGenerateButton';

export const metadata: Metadata = {
  title: 'Free Machine Risk Assessment Generator — CivDocs',
  description: 'Generate a professional machine risk management report in minutes. Free for Australian civil contractors and plant operators. Covers graders, excavators, and more.',
};

const TESTIMONIAL_CARDS = [
  {
    name: 'John',
    company: 'Jal Civil',
    quote: "Before CivDocs, risk assessments were rushed the night before mobilisation. Now they're structured and consistent every time. Instead of editing Word docs from 2018, we're generating assessments specific to the machine and job.",
    logoSrc: '/capability-statement/Jal.png',
  },
  {
    name: 'Riley',
    company: 'RJ Piling',
    quote: "It's simple. Fill it out, export the PDF, done. No overcomplicated forms. It's honestly dead simple. Answer a few questions and the risk assessment's done. No overthinking it.",
    logoSrc: '/capability-statement/rj.png',
  },
  {
    name: 'Colby',
    company: 'Ali Excavations',
    quote: "Plant hours used to live in notebooks. Now they're logged daily and tied back to the job properly.",
    logoSrc: '/capability-statement/ali.png',
  },
  {
    name: 'Riley',
    company: 'RMF Earthworx',
    quote: "It's simple. Select the job, log the hours, submit. The blokes picked it up without needing a training day.",
    logoSrc: '/capability-statement/rmf.png',
  },
];

const STEPS = [
  { num: '1', title: 'Machine Details', desc: 'Enter the make, model, type and basic identification info.' },
  { num: '2', title: 'Standard Specs', desc: 'Fill in the machine specs grouped by category.' },
  { num: '3', title: 'Compliance Questions', desc: 'Answer Yes, No, or N/A for each safety question.' },
  { num: '4', title: 'Get Your PDF', desc: 'Enter your details and we\'ll email you the full report.' },
];

export default function RiskAssessmentPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <div className="pt-20">
      {/* Hero */}
      <section className="px-4 py-16 sm:py-24 bg-[#FFF5ED]" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #FFF5ED 40%)' }}>
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF8C32]/20 bg-[#FF8C32]/5 px-3 py-1 mb-6">
            <span className="text-xs font-semibold text-[#CC5500]">FREE TOOL</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1E1E1E] sm:text-4xl lg:text-5xl max-w-3xl">
            Machine Risk Assessment Generator
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Generate a professional Risk Management Report for your plant in minutes. Covers all standard compliance questions and produces a PDF that matches what safety auditors and principal contractors expect.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              'Covers 70+ compliance checks across 16 categories',
              'Grader-specific Section 1 specs — more machine types coming',
              'Sections 4 & 5 auto-filled based on your Yes/No answers',
              'Operator Acknowledgement page included',
              'Formatted to Australian Standards (AS3450, ISO3471, AS/NZS4024)',
            ].map((item) => (
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
          <div className="mt-10 flex flex-col items-start gap-2">
            <QuickGenerateButton />
            <Link
              href="/free-tools/risk-assessment/build"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-8 py-3.5 font-semibold text-white shadow-md hover:shadow-lg transition-all"
            >
              Build Your Risk Assessment →
            </Link>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-8 overflow-hidden" style={{ background: 'linear-gradient(to bottom, #FFF5ED 0%, #ffffff 100%)' }}>
        <Marquee className="p-2 [--duration:30s] [--gap:1.5rem]" repeat={4} pauseOnHover>
          {TESTIMONIAL_CARDS.map((card) => (
            <TestimonialCard key={card.company} {...card} />
          ))}
        </Marquee>
      </section>

      {/* How it works */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-10 text-center">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div key={s.num} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-bold flex items-center justify-center mb-4 text-sm">
                  {s.num}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/free-tools/risk-assessment/build"
              className="inline-flex items-center rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-10 py-4 font-semibold text-white shadow-md hover:shadow-lg transition-all text-lg"
            >
              Build Your Risk Assessment →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA to cap statement */}
      <section className="px-4 py-12 bg-[#1E1E1E]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-gray-400 text-sm mb-2">Also free</p>
          <h2 className="text-xl font-semibold text-white mb-4">Need a Capability Statement too?</h2>
          <p className="text-gray-400 text-sm mb-6">Generate a tender-ready PDF capability statement in 5 minutes — same deal, no cost.</p>
          <Link
            href="/capability-statement"
            className="inline-block rounded-full border border-[#FF8C32] text-[#FF8C32] px-6 py-2.5 text-sm font-semibold hover:bg-[#FF8C32] hover:text-white transition-all"
          >
            Try the Capability Statement Generator →
          </Link>
        </div>
      </section>
      </div>
      <Footer />
    </div>
  );
}
