'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ComparisonTable from '@/components/compare/ComparisonTable';
import type { ComparisonData } from '@/data/comparisons/types';
import { comparisons } from '@/data/comparisons/index';

interface ComparisonPageProps {
  data: ComparisonData;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">{question}</span>
        <ChevronIcon open={open} />
      </button>
      <div
        className={`px-5 border-t border-gray-100 overflow-hidden transition-all duration-200 ${
          open ? 'max-h-96 py-4' : 'max-h-0 py-0'
        }`}
        aria-hidden={!open}
      >
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{answer}</p>
      </div>
      <noscript>
        <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
          <p className="text-gray-700 text-sm leading-relaxed">{answer}</p>
        </div>
      </noscript>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-4">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg sm:text-xl font-semibold text-[#1E1E1E] mb-2 mt-6">{children}</h3>
  );
}

function TrialCta({ label = 'Start Free Trial' }: { label?: string }) {
  return (
    <Link
      href="/start-trial"
      className="inline-flex items-center justify-center px-6 py-3 bg-[#FF8C32] text-white font-semibold rounded-xl hover:bg-[#e67d2a] transition-colors text-sm sm:text-base"
    >
      {label}
    </Link>
  );
}

function BodyText({ children }: { children: string }) {
  return (
    <p className="text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
      {children}
    </p>
  );
}

export default function ComparisonPage({ data }: ComparisonPageProps) {
  const otherComparisons = comparisons.filter((c) => c.slug !== data.slug);

  return (
    <div className="min-h-screen bg-[#FFFEFB]">
      <Header />
      <main className="pt-20">
        {/* ── Hero / H1 + Summary ── */}
        <section className="bg-white border-b border-gray-100 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#FF8C32] transition-colors">CivDocs</Link>
              <span>/</span>
              <Link href="/compare" className="hover:text-[#FF8C32] transition-colors">Compare</Link>
              <span>/</span>
              <span className="text-gray-600">CivDocs vs {data.competitor}</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E] leading-tight tracking-tight mb-6">
              {data.h1}
            </h1>

            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl">
              {data.summary}
            </p>

            <TrialCta />
          </div>
        </section>

        {/* ── Comparison Table ── */}
        <section className="py-12 sm:py-16" aria-labelledby="comparison-table-heading">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <SectionHeading>
              <span id="comparison-table-heading">
                CivDocs vs {data.competitor}: feature comparison
              </span>
            </SectionHeading>
            <p className="text-gray-600 text-sm sm:text-base mb-8">
              A side-by-side view of the features that matter most to civil contractors and plant hire businesses.
            </p>
            <ComparisonTable rows={data.tableRows} competitorName={data.competitor} />
          </div>
        </section>

        {/* ── Differentiation Thesis ── */}
        <section className="bg-white border-y border-gray-100 py-12 sm:py-16" aria-labelledby="diff-thesis-heading">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <SectionHeading>
              <span id="diff-thesis-heading">{data.differentiationThesis.heading}</span>
            </SectionHeading>
            <BodyText>{data.differentiationThesis.intro}</BodyText>
            {data.differentiationThesis.sections.map((s, i) => (
              <div key={i}>
                <SubHeading>{s.h3}</SubHeading>
                <BodyText>{s.body}</BodyText>
              </div>
            ))}
          </div>
        </section>

        {/* ── Feature Deep Dive ── */}
        <section className="py-12 sm:py-16" aria-labelledby="feature-deepdive-heading">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <SectionHeading>
              <span id="feature-deepdive-heading">{data.featureDeepDive.heading}</span>
            </SectionHeading>
            {data.featureDeepDive.sections.map((s, i) => (
              <div key={i}>
                <SubHeading>{s.h3}</SubHeading>
                <BodyText>{s.body}</BodyText>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="bg-white border-y border-gray-100 py-12 sm:py-16" aria-labelledby="pricing-heading">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <SectionHeading>
              <span id="pricing-heading">{data.pricing.heading}</span>
            </SectionHeading>
            <BodyText>{data.pricing.body}</BodyText>

            <div className="mt-8">
              <TrialCta label="Start Free Trial — No Credit Card" />
            </div>
          </div>
        </section>

        {/* ── When Competitor Wins ── */}
        <section className="py-12 sm:py-16" aria-labelledby="when-competitor-heading">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <SectionHeading>
              <span id="when-competitor-heading">{data.whenCompetitorWins.heading}</span>
            </SectionHeading>
            <p className="text-gray-600 text-sm mb-6">
              We believe in honest self-qualification. If the scenarios below describe your business,
              {' '}{data.competitor} may be the better fit — and we would rather you find the right tool
              than choose the wrong one.
            </p>
            <ul className="space-y-3">
              {data.whenCompetitorWins.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm sm:text-base">
                  <span className="text-gray-400 mt-0.5 flex-shrink-0">•</span>
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Why CivDocs Wins ── */}
        <section className="bg-[#1E1E1E] py-12 sm:py-16" aria-labelledby="why-civdocs-heading">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2
              id="why-civdocs-heading"
              className="text-2xl sm:text-3xl font-semibold text-white leading-tight tracking-tight mb-4"
            >
              {data.whyCivdocsWins.heading}
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-6">
              {data.whyCivdocsWins.body}
            </p>
            <ul className="space-y-3 mb-8">
              {data.whyCivdocsWins.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-200 text-sm sm:text-base">
                  <span className="text-[#FF8C32] mt-0.5 flex-shrink-0 font-bold">✓</span>
                  <span className="leading-relaxed">{bullet}</span>
                </li>
              ))}
            </ul>
            <TrialCta />
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-12 sm:py-16" aria-labelledby="faq-heading">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <SectionHeading>
              <span id="faq-heading">
                Frequently asked questions: CivDocs vs {data.competitor}
              </span>
            </SectionHeading>
            <div className="space-y-3">
              {data.faq.map((item, i) => (
                <FaqItem key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Internal links to other comparisons ── */}
        <section className="bg-gray-50 border-t border-gray-200 py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              See how CivDocs compares to other platforms
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Or{' '}
              <Link href="/compare" className="text-[#FF8C32] hover:underline">
                view the full comparison hub
              </Link>
              .
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {otherComparisons.map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="block bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-[#FF8C32] hover:shadow-sm transition-all text-sm font-medium text-gray-700 hover:text-[#FF8C32]"
                >
                  CivDocs vs {c.competitor} →
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="bg-white border-t border-gray-200 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] mb-4">
              Ready to try CivDocs?
            </h2>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
              Start a free trial today — no credit card, no sales call, no lock-in. Built for
              Australian civil contractors and plant hire businesses.
            </p>
            <TrialCta label="Start Free Trial" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
