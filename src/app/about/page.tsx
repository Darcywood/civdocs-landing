import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SITE = 'https://www.civdocs.com.au';

export const metadata: Metadata = {
  title: 'About | CivDocs — Civil Construction Management Software',
  description:
    'CivDocs was founded by Darcy Wood, a civil construction professional from Victoria. Learn about the team behind Australia\'s purpose-built civil contractor software.',
  alternates: { canonical: `${SITE}/about` },
  openGraph: {
    title: 'About | CivDocs — Civil Construction Management Software',
    description:
      "CivDocs was founded by Darcy Wood, a civil construction professional from Victoria. Learn about the team behind Australia's purpose-built civil contractor software.",
    url: `${SITE}/about`,
    siteName: 'CivDocs',
    type: 'profile',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About CivDocs — Darcy Wood',
    description:
      "CivDocs was founded by Darcy Wood, a civil construction professional from Victoria, Australia.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE}/about#darcy-wood`,
      name: 'Darcy Wood',
      jobTitle: 'Founder',
      description:
        'Darcy Wood is the founder of CivDocs, civil construction management software built for Australian contractors. He has hands-on experience in civil construction and earthmoving in Victoria.',
      url: `${SITE}/about`,
      sameAs: [
        'https://www.linkedin.com/in/-darcywood',
        'https://www.civdocs.com.au',
      ],
      email: 'darcy@civdocs.com.au',
      address: {
        '@type': 'PostalAddress',
        addressRegion: 'Victoria',
        addressCountry: 'AU',
      },
      worksFor: {
        '@type': 'Organization',
        '@id': `${SITE}/#organization`,
        name: 'CivDocs',
        url: SITE,
      },
      knowsAbout: [
        'Civil construction',
        'Earthmoving',
        'Plant hire',
        'Construction management software',
        'Timesheet management',
        'Pre-start checklists',
        'Job cost tracking',
      ],
    },
    {
      '@type': 'AboutPage',
      '@id': `${SITE}/about`,
      url: `${SITE}/about`,
      name: 'About CivDocs',
      description:
        'Learn about CivDocs — purpose-built civil construction management software founded by Darcy Wood in Victoria, Australia.',
      mainEntity: { '@id': `${SITE}/about#darcy-wood` },
      isPartOf: { '@type': 'WebSite', url: SITE },
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <div className="pt-20">

        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFF5ED] pt-32 pb-20 sm:pt-40 sm:pb-28">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
              Built for the people who build Australia
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              CivDocs is civil construction management software designed from the ground up for Australian contractors, earthworks operators, and plant hire businesses.
            </p>
          </div>
        </section>

        {/* About CivDocs */}
        <section className="py-20 sm:py-28 bg-gradient-to-b from-[#FFF5ED] to-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="mb-2">
              <span className="text-sm font-semibold text-[#F97316] uppercase tracking-widest">About CivDocs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-8">
              Built because nothing else fit
            </h2>
            <div className="space-y-5 text-[17px] text-gray-700 leading-relaxed">
              <p>
                CivDocs was built to solve a problem that every civil contractor knows: the industry runs on paperwork, and none of the existing software was built with civil and earthworks in mind. Generic platforms meant workarounds, wasted time, and jobs falling through the cracks.
              </p>
              <p>
                CivDocs brings pre-starts, timesheets, plant hire logbooks, cost tracking, and job management into one place — purpose-built for the way civil work actually gets done.
              </p>
            </div>
          </div>
        </section>

        {/* About the Founder */}
        <section className="py-20 sm:py-28 bg-white" itemScope itemType="https://schema.org/Person">
          <meta itemProp="name" content="Darcy Wood" />
          <meta itemProp="jobTitle" content="Founder, CivDocs" />
          <meta itemProp="url" content={`${SITE}/about`} />
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="mb-2">
              <span className="text-sm font-semibold text-[#F97316] uppercase tracking-widest">Founder</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-8">
              Darcy Wood
            </h2>
            <div className="space-y-5 text-[17px] text-gray-700 leading-relaxed" itemProp="description">
              <p>
                Darcy Wood founded CivDocs after working in civil construction and earthmoving in Victoria. Having seen first-hand how contractors were managing compliance, site documentation, and plant operations across spreadsheets, paper forms, and disconnected tools, he set out to build something better.
              </p>
              <p>
                Based in Victoria, Darcy combines hands-on industry knowledge with software development to build tools that work the way contractors think — not the other way around.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://www.linkedin.com/in/-darcywood"
                target="_blank"
                rel="noopener noreferrer"
                itemProp="sameAs"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#F97316] transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn — Darcy Wood
              </a>
              <a
                href="mailto:darcy@civdocs.com.au"
                itemProp="email"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#F97316] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                darcy@civdocs.com.au
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-[#FFF5ED] to-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <div className="mb-2">
              <span className="text-sm font-semibold text-[#F97316] uppercase tracking-widest">Contact</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
              Get in touch
            </h2>
            <p className="text-[17px] text-gray-700 leading-relaxed mb-8">
              Whether you&apos;re looking to trial CivDocs or just want to ask a question, we&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:darcy@civdocs.com.au"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white transition-all hover:opacity-95 shadow-lg"
                style={{ backgroundColor: '#F97316' }}
              >
                darcy@civdocs.com.au
              </a>
              <Link
                href="/start-trial"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold border-2 border-gray-200 text-gray-900 hover:border-[#F97316] hover:text-[#F97316] transition-all"
              >
                Start free trial
              </Link>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}
