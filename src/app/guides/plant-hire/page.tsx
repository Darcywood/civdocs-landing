'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function PlantHireGuidesPage() {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFF5ED] pt-12 pb-32 sm:pt-20 sm:pb-40 lg:pt-28 lg:pb-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <Link href="/guides" className="inline-flex items-center text-[#FF8C32] hover:text-[#F5B041] transition-colors text-sm font-medium">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Guides
              </Link>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-8">
              Step-by-Step Instructions
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-12 font-medium">
              Learn how to get the most out of CivDocs for plant hire operations.
            </p>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-20 sm:py-32 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight tracking-tight">
              Plant Hire Guides
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {/* Guide 1 - Equipment Management */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'equipment' ? null : 'equipment')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Equipment Management
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Manage your fleet, track equipment availability, and monitor machine status.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'equipment' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'equipment' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 border-t border-gray-100">
                      <div className="pt-6 space-y-4">
                        <p className="text-gray-700 leading-relaxed font-bold">
                          How to manage your equipment fleet:
                        </p>
                        <ol className="space-y-3 text-gray-700">
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">1.</span>
                            <span><strong>Add equipment to your fleet:</strong> Navigate to Equipment Management and add each machine with details like make, model, registration, and hourly rate.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">2.</span>
                            <span><strong>Set equipment status:</strong> Mark equipment as Available, On Hire, In Maintenance, or Out of Service. This helps you quickly see what's ready to rent.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">3.</span>
                            <span><strong>Track equipment location:</strong> Update where each piece of equipment is located, whether it's at your yard, on a job site, or with a customer.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">4.</span>
                            <span><strong>Monitor utilization:</strong> View reports showing which equipment is most frequently hired, utilization rates, and revenue per machine.</span>
                          </li>
                        </ol>
                        <p className="text-gray-700 leading-relaxed pt-2">
                          <strong>Tip:</strong> Keep equipment details up to date, including service schedules and maintenance records, to ensure maximum availability and compliance.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guide 2 - Pre-Starts */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'prestarts' ? null : 'prestarts')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Pre-Starts
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Complete safety checks before equipment goes out on hire — protect your assets and customers.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'prestarts' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'prestarts' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 border-t border-gray-100">
                      <div className="pt-6 space-y-4">
                        <p className="text-gray-700 leading-relaxed font-bold">
                          How to complete Pre-Start checks for plant hire:
                        </p>
                        <ol className="space-y-3 text-gray-700">
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">1.</span>
                            <span><strong>Select equipment and customer:</strong> Choose the specific machine going out on hire and select the customer or hire contract.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">2.</span>
                            <span><strong>Complete safety inspection:</strong> Go through the Pre-Start checklist, checking fluid levels, tyres, lights, safety features, and overall condition.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">3.</span>
                            <span><strong>Document condition:</strong> Take photos of the equipment from multiple angles, noting any existing damage or wear. This protects you from liability claims.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">4.</span>
                            <span><strong>Get customer sign-off:</strong> Have the customer sign the Pre-Start to acknowledge they've inspected the equipment and accept it in its current condition.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">5.</span>
                            <span><strong>Store documentation:</strong> The Pre-Start PDF is automatically stored with the hire contract, providing a complete record for insurance and legal purposes.</span>
                          </li>
                        </ol>
                        <p className="text-gray-700 leading-relaxed pt-2">
                          <strong>Tip:</strong> Complete Pre-Starts both when equipment goes out and when it returns. This helps you track damage and ensures equipment is safe for the next customer.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guide 3 - Rental Tracking */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'rental-tracking' ? null : 'rental-tracking')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Rental Tracking
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Track hire periods, calculate rental charges, and manage customer contracts.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'rental-tracking' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'rental-tracking' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 border-t border-gray-100">
                      <div className="pt-6 space-y-4">
                        <p className="text-gray-700 leading-relaxed font-bold">
                          How to track equipment rentals:
                        </p>
                        <ol className="space-y-3 text-gray-700">
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">1.</span>
                            <span><strong>Create a hire contract:</strong> Set up a new rental contract with customer details, equipment selected, start date, and hourly or daily rates.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">2.</span>
                            <span><strong>Track hire duration:</strong> Monitor how long equipment has been out on hire. The system automatically calculates rental charges based on time and rates.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">3.</span>
                            <span><strong>Record usage hours:</strong> If tracking hourly usage, log meter readings or hours worked. This ensures accurate billing for equipment usage.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">4.</span>
                            <span><strong>Manage returns:</strong> When equipment is returned, mark the contract as complete. Review any damage or additional charges before finalizing the invoice.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">5.</span>
                            <span><strong>Generate invoices:</strong> Create invoices automatically based on hire duration, rates, and any additional charges like fuel, damage, or overtime.</span>
                          </li>
                        </ol>
                        <p className="text-gray-700 leading-relaxed pt-2">
                          <strong>Tip:</strong> Set up automated reminders for equipment due back to help prevent overdue rentals and improve fleet utilization.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guide 4 - Cost Tracking */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'cost-tracking' ? null : 'cost-tracking')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Cost Tracking
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Track equipment costs, maintenance expenses, and profitability per machine.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'cost-tracking' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'cost-tracking' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 border-t border-gray-100">
                      <div className="pt-6 space-y-4">
                        <p className="text-gray-700 leading-relaxed font-bold">
                          How to track costs and profitability:
                        </p>
                        <ol className="space-y-3 text-gray-700">
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">1.</span>
                            <span><strong>Monitor rental revenue:</strong> View total revenue generated by each piece of equipment. See which machines are your most profitable assets.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">2.</span>
                            <span><strong>Track maintenance costs:</strong> Record all maintenance, repairs, and service expenses for each machine. This helps you understand true cost of ownership.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">3.</span>
                            <span><strong>Calculate utilization rates:</strong> See how often each machine is hired versus sitting idle. Identify underutilized equipment that may need better marketing or pricing.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">4.</span>
                            <span><strong>Analyze profitability:</strong> Compare revenue against costs to see which equipment generates the best return on investment. Use this to inform fleet expansion decisions.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">5.</span>
                            <span><strong>Generate financial reports:</strong> Export detailed reports showing revenue, costs, and profit margins for management, tax, and business planning purposes.</span>
                          </li>
                        </ol>
                        <p className="text-gray-700 leading-relaxed pt-2">
                          <strong>Tip:</strong> Regularly review cost tracking reports to identify trends, optimize pricing, and make informed decisions about fleet composition and maintenance schedules.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 lg:py-40 bg-gradient-to-b from-[#FFF5ED] to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-8 tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed">
            Start your free trial and explore all the features with our step-by-step guides.
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








