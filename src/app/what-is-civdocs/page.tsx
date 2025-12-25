import type { Metadata } from "next";
import Link from "next/link";
import SoftwareApplicationSchema from "@/components/SoftwareApplicationSchema";

export const metadata: Metadata = {
  title: "What is CivDocs? - Construction Management Software Definition",
  description: "CivDocs is a cloud-based construction management software platform designed for civil construction companies in Australia. It replaces paper-based pre-starts, timesheets, plant logbooks, and manual job cost tracking with a single digital system.",
  robots: {
    index: true,
    follow: true,
  },
};

// FAQ Schema for Google AI Overviews
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is CivDocs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CivDocs is a cloud-based construction management software platform designed for civil construction companies in Australia. It replaces paper-based pre-starts, timesheets, plant logbooks, and manual job cost tracking with a single digital system used on site and in the office."
      }
    },
    {
      "@type": "Question",
      "name": "What is CivDocs used for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CivDocs is used for digital pre-start inspections with photos, defects, and signatures; construction timesheets with supervisor approval; plant and equipment logbooks; and job cost tracking for labour, plant, and materials."
      }
    },
    {
      "@type": "Question",
      "name": "Is CivDocs construction management software?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. CivDocs is construction management software built specifically for civil construction workflows. It is not documentation software, gaming content, or generic 'civil documents.'"
      }
    },
    {
      "@type": "Question",
      "name": "Who is CivDocs designed for?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CivDocs is designed for civil construction contractors, earthworks and excavation companies, drainage, road, and infrastructure contractors, as well as site supervisors, operators, and project managers."
      }
    }
  ]
};

export default function WhatIsCivDocsPage() {
  return (
    <>
      {/* SoftwareApplication Schema */}
      <SoftwareApplicationSchema
        url="https://www.civdocs.com.au"
        name="CivDocs"
        alternateName="CivDocs Construction Software"
        description="CivDocs is a cloud-based construction management software platform designed for civil construction companies in Australia. It replaces paper-based pre-starts, timesheets, plant logbooks, and manual job cost tracking with a single digital system used on site and in the office."
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-6">
            <Link href="/" className="text-[#1E1E1E] hover:text-[#FF8C32] transition-colors font-medium">
              ← Back to CivDocs
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
          <article>
            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl font-semibold text-[#1E1E1E] mb-6">
              What is CivDocs?
            </h1>

            {/* Intro Paragraph */}
            <p className="text-xl text-gray-700 leading-relaxed mb-12">
              CivDocs is a cloud-based construction management software platform designed for civil construction companies in Australia. It replaces paper-based pre-starts, timesheets, plant logbooks, and manual job cost tracking with a single digital system used on site and in the office.
            </p>

            {/* What is CivDocs used for? */}
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">
                What is CivDocs used for?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                CivDocs is used for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 ml-4">
                <li>Digital pre-start inspections with photos, defects, and signatures</li>
                <li>Construction timesheets with supervisor approval</li>
                <li>Plant and equipment logbooks</li>
                <li>Job cost tracking for labour, plant, and materials</li>
              </ul>
            </section>

            {/* Who is CivDocs designed for? */}
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">
                Who is CivDocs designed for?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                CivDocs is designed for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 ml-4">
                <li>Civil construction contractors</li>
                <li>Earthworks and excavation companies</li>
                <li>Drainage, road, and infrastructure contractors</li>
                <li>Site supervisors, operators, and project managers</li>
              </ul>
            </section>

            {/* How CivDocs replaces paper-based systems */}
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">
                How CivDocs replaces paper-based systems
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                CivDocs replaces:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 ml-4 mb-4">
                <li>Paper pre-starts</li>
                <li>Handwritten timesheets</li>
                <li>Spreadsheets</li>
                <li>Disconnected systems</li>
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed">
                With a single digital construction management platform that creates an auditable record.
              </p>
            </section>

            {/* CivDocs software modules */}
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">
                CivDocs software modules
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                CivDocs includes the following modules:
              </p>
              <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 ml-4">
                <li>Pre-Starts</li>
                <li>Timesheets</li>
                <li>Plant Logbooks</li>
                <li>Cost Tracking</li>
              </ul>
            </section>

            {/* Cost tracking in CivDocs */}
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">
                Cost tracking in CivDocs
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                CivDocs focuses on capturing accurate job cost data for labour, plant, and materials using operational inputs collected on site.
              </p>
            </section>

            {/* Is CivDocs construction management software? */}
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">
                Is CivDocs construction management software?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Yes. CivDocs is construction management software built specifically for civil construction workflows. It is not documentation software, gaming content, or generic "civil documents."
              </p>
            </section>

            {/* Where CivDocs is used */}
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">
                Where CivDocs is used
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                CivDocs is used on construction sites and in construction offices across Australia and is available via web browsers, the Apple App Store (iOS), and the Google Play Store (Android).
              </p>
            </section>

            {/* Internal Links */}
            <section className="border-t border-gray-200 pt-8 mt-12">
              <p className="text-lg text-gray-700 mb-4">
                Learn more:
              </p>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-[#FF8C32] hover:underline">
                    CivDocs homepage
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-[#FF8C32] hover:underline">
                    CivDocs pricing
                  </Link>
                </li>
              </ul>
            </section>
          </article>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 mt-16">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
            <p className="text-sm text-gray-500">
              © 2025 CivDocs. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

