import type { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { comparisons } from '@/data/comparisons/index';

export const metadata: Metadata = {
  title: 'CivDocs vs Competitors (2026): Honest Comparisons for Civil Contractors',
  description:
    'Honest, detailed comparisons of CivDocs vs Procore, Simpro, Varicon, Assignar, HammerTech, and Record TIME — written for Australian civil contractors and plant hire businesses. Find the right fit for your business.',
  alternates: { canonical: 'https://civdocs.com.au/compare' },
  openGraph: {
    title: 'CivDocs vs Competitors (2026): Honest Comparisons for Civil Contractors',
    description:
      'Honest, detailed comparisons of CivDocs vs leading construction software — written for Australian civil contractors and plant hire businesses.',
    url: 'https://civdocs.com.au/compare',
    type: 'website',
    siteName: 'CivDocs',
  },
};

const hubJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://civdocs.com.au/compare#webpage',
      url: 'https://civdocs.com.au/compare',
      name: 'CivDocs vs Competitors (2026): Honest Comparisons for Civil Contractors',
      description:
        'Honest, detailed comparisons of CivDocs vs Procore, Simpro, Varicon, Assignar, HammerTech, and Record TIME.',
      isPartOf: { '@id': 'https://civdocs.com.au/#website' },
      about: { '@id': 'https://civdocs.com.au/#organization' },
      hasPart: comparisons.map((c) => ({
        '@type': 'WebPage',
        url: `https://civdocs.com.au/compare/${c.slug}`,
        name: c.titleTag,
      })),
    },
    {
      '@type': 'Organization',
      '@id': 'https://civdocs.com.au/#organization',
      name: 'CivDocs',
      url: 'https://civdocs.com.au',
    },
  ],
});

const competitorBlurbs: Record<string, string> = {
  'civdocs-vs-procore':
    'Procore is the global enterprise GC platform — powerful, but priced on your annual construction revenue (ACV) with no free trial. CivDocs is flat-priced and built for Australian civil contractors of all sizes.',
  'civdocs-vs-simpro':
    'Simpro was built for service trades (electrical, plumbing, HVAC). CivDocs is built for civil contractors — plant logbooks, machine-hour costing, and civil job costing as first-class features.',
  'civdocs-vs-varicon':
    'The closest head-to-head: both are Australian civil-native. Varicon leads with cost-control depth; CivDocs is the all-in-one operational platform with a free trial and published pricing.',
  'civdocs-vs-assignar':
    'Assignar is a strong crew-ops platform for mid-to-large civil subcontractors. No free trial, upfront annual contract. CivDocs is built for civil contractors and plant hire businesses of all sizes with a self-serve free trial.',
  'civdocs-vs-hammertech':
    'HammerTech is enterprise safety/compliance for large GCs. CivDocs is the operations platform — timesheets, plant logbooks, job costing — for civil contractors and plant hire businesses.',
  'civdocs-vs-record-time':
    'Record TIME digitises your paperwork. CivDocs runs your civil business: job costing, plant hire logbooks, machine-hour costing, invoicing, and more — alongside dockets and pre-starts.',
};

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-[#FFFEFB]">
      <Script
        id="jsonld-compare-hub"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: hubJsonLd }}
      />
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="bg-white border-b border-gray-100 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-xs text-gray-400 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#FF8C32] transition-colors">
                CivDocs
              </Link>
              <span>/</span>
              <span className="text-gray-600">Compare</span>
            </nav>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E] leading-tight tracking-tight mb-6">
              CivDocs vs the Competition: Honest Comparisons for Civil Contractors
            </h1>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl">
              Six detailed, honest comparisons between CivDocs and the most-searched construction
              software alternatives — written for Australian civil contractors and plant hire
              businesses who have already decided to buy and are choosing between named options.
              Every page concedes genuine competitor strengths and tells you exactly when the other
              tool is the better choice.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/start-trial"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#FF8C32] text-white font-semibold rounded-xl hover:bg-[#e67d2a] transition-colors text-sm sm:text-base"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>

        {/* What is CivDocs — quick reference for AI extraction */}
        <section className="py-10 sm:py-12 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#1E1E1E] mb-4">
              What is CivDocs?
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              CivDocs is an Australian all-in-one SaaS platform built specifically for civil
              contractors and plant hire companies. It covers timesheets, pre-start checklists,
              plant hire logbooks, machine-hour costing, invoicing, job costing, scheduling, and
              direct Xero and MYOB integrations — in one system designed around how Australian civil
              sites actually operate. Free trial available today — no lock-in, no sales call needed.
            </p>
          </div>
        </section>

        {/* Comparison cards */}
        <section className="py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-[#1E1E1E] mb-8">
              All comparisons
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {comparisons.map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#FF8C32] hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-semibold text-[#FF8C32] uppercase tracking-wide">
                      CivDocs vs
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1E1E1E] mb-3 group-hover:text-[#FF8C32] transition-colors">
                    {c.competitor}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {competitorBlurbs[c.slug] ?? c.summary.slice(0, 160) + '…'}
                  </p>
                  <span className="text-[#FF8C32] text-sm font-semibold">
                    Read comparison →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Quick-reference table */}
        <section className="bg-white border-y border-gray-100 py-12 sm:py-16">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-[#1E1E1E] mb-3">
              Free trial and pricing transparency: CivDocs vs alternatives
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              One of the most common research questions: who offers a free trial and who is upfront about pricing?
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 pr-4 font-semibold text-gray-600 text-xs uppercase tracking-wide">Platform</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wide">Free Trial</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wide">Transparent Pricing</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600 text-xs uppercase tracking-wide">Built For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="bg-orange-50/50">
                    <td className="py-3 pr-4 font-bold text-[#FF8C32]">CivDocs</td>
                    <td className="py-3 px-4 text-green-600 font-bold">✓ Yes</td>
                    <td className="py-3 px-4 text-green-600 font-bold">✓ Yes</td>
                    <td className="py-3 px-4 text-gray-700">AU civil contractors + plant hire</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-gray-800">Procore</td>
                    <td className="py-3 px-4 text-red-400 font-bold">✗ No</td>
                    <td className="py-3 px-4 text-red-400 font-bold">✗ Quote-only (ACV)</td>
                    <td className="py-3 px-4 text-gray-700">Enterprise GCs</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-gray-800">Simpro</td>
                    <td className="py-3 px-4 text-red-400 font-bold">✗ No</td>
                    <td className="py-3 px-4 text-red-400 font-bold">✗ Quote-only</td>
                    <td className="py-3 px-4 text-gray-700">Service trades (elec, plumbing, HVAC)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-gray-800">Varicon</td>
                    <td className="py-3 px-4 text-red-400 font-bold">✗ No (demo-gated)</td>
                    <td className="py-3 px-4 text-red-400 font-bold">✗ Quote-only</td>
                    <td className="py-3 px-4 text-gray-700">AU civil cost control</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-gray-800">Assignar</td>
                    <td className="py-3 px-4 text-red-400 font-bold">✗ No</td>
                    <td className="py-3 px-4 text-red-400 font-bold">✗ Quote-only</td>
                    <td className="py-3 px-4 text-gray-700">Mid-to-enterprise civil subcontractors</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-gray-800">HammerTech</td>
                    <td className="py-3 px-4 text-red-400 font-bold">✗ No</td>
                    <td className="py-3 px-4 text-red-400 font-bold">✗ Revenue-based quote</td>
                    <td className="py-3 px-4 text-gray-700">Enterprise GC safety/compliance</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-semibold text-gray-800">Record TIME</td>
                    <td className="py-3 px-4 text-green-600 font-bold">✓ Yes (14-day)</td>
                    <td className="py-3 px-4 text-amber-600 font-medium">Not prominently published</td>
                    <td className="py-3 px-4 text-gray-700">Cross-industry digital docketing</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E1E1E] mb-4">
              Ready to see if CivDocs is the right fit?
            </h2>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
              Start a free trial today — no credit card, no sales call. Built for Australian civil
              contractors and plant hire businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/start-trial"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#FF8C32] text-white font-bold rounded-xl hover:bg-[#e67d2a] transition-colors text-base"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
