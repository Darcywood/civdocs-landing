'use client';

import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function GuidesSelectionPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-0 pb-6 sm:pt-4 sm:pb-8 lg:pt-8 lg:pb-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-8">
              Step-by-Step Instructions
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-12 font-medium">
              Choose your business type to view tailored guides and instructions.
            </p>
          </div>
        </div>
      </section>

      {/* Selection Section */}
      <section className="pt-4 pb-[250px] sm:pt-6 sm:pb-[250px] lg:pt-8 lg:pb-[250px] bg-gradient-to-b from-white via-[#FFF5ED] to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto flex flex-col gap-[50px]">
            {/* Civil Contractor Card */}
            <Link href="/guides/civil-contractor" className="block">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                <div className="p-8 flex items-center justify-between">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                      <OptimizedImage 
                        src="/icons-pricing/Civil-Contractor.png" 
                        alt="Civil Contractor" 
                        width={56} 
                        height={56} 
                        className="w-9 h-9 object-contain"
                      />
          </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                        Civil Contractor
              </h3>
              <p className="text-gray-600 leading-relaxed">
                        Guides for project management, crew timesheets, cost tracking, and construction workflows.
              </p>
            </div>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              </div>
            </Link>

            {/* Plant Hire Card */}
            <Link href="/guides/plant-hire" className="block">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer">
                <div className="p-8 flex items-center justify-between">
                  <div className="flex items-center gap-6 flex-1">
                    <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                      <OptimizedImage 
                        src="/icons-pricing/Plant-hire.png" 
                        alt="Plant Hire" 
                        width={56} 
                        height={56} 
                        className="w-9 h-9 object-contain"
                      />
              </div>
                    <div className="text-left">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                        Plant Hire
              </h3>
              <p className="text-gray-600 leading-relaxed">
                        Guides for equipment management, rental tracking, machine maintenance, and fleet operations.
              </p>
            </div>
                  </div>
                  <svg
                    className="w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
