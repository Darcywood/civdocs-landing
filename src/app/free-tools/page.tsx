'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';

export default function FreeToolsPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFF5ED] pt-12 pb-20 sm:pt-20 sm:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-8">
              Free Tools for Civil Contractors
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-12 font-medium">
              Practical utilities built by CivDocs for site engineers, surveyors, and plant hire operators.
            </p>
          </div>
        </div>
      </section>

      {/* Tools grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Machine Risk Assessment Generator */}
            <Link href="/free-tools/risk-assessment" className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-0.5">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight group-hover:text-[#FF8C32] transition-colors">
                Machine Risk Assessment Generator
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Generate a compliant plant risk management report in 5 minutes. Covers graders, excavators, rollers, and posi tracks. Free PDF, no account required.
              </p>
            </Link>

            {/* CSV to KML Converter */}
            <Link href="/free-tools/csv-to-kml" className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-0.5">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight group-hover:text-[#FF8C32] transition-colors">
                CSV to KML Converter
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Convert survey control points (MGA / GDA2020 / GDA94) from CSV to Google Earth KML in seconds. Preview on a live map and download instantly.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 lg:py-40 bg-gradient-to-b from-[#FFF5ED] to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-8 tracking-tight">
            Ready to Use These Tools?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed">
            Start your free trial to access all these tools and more within CivDocs.
          </p>
          <a 
            href="https://app.civdocs.com/auth/signup" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Free Trial →
          </a>
          <p className="text-sm mt-4">
            <span className="font-bold text-[#FF8C32] animate-pulse-glow">No credit card required</span>
            <span className="text-gray-500"> • Get started in minutes</span>
          </p>
        </div>
      </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

