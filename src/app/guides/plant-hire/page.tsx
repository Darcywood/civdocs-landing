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
      {/* Top Bar */}
      <section className="bg-white pt-6 pb-6 sm:pt-8 sm:pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-start">
            <Link
              href="/guides"
              className="inline-flex items-center text-[#FF8C32] hover:text-[#F5B041] transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section className="pt-6 pb-20 sm:pt-8 sm:pb-24 lg:pt-10 lg:pb-32 bg-[linear-gradient(to_bottom,#ffffff_0%,#ffffff_55%,#FFF5ED_100%)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight tracking-tight">
              Plant Hire Guides
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {/* Guide 1 - Logbook */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'logbook' ? null : 'logbook')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Logbook
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Your single source of truth for billing — records daily operations and is the foundation for accurate billing and compliance.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'logbook' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'logbook' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 border-t border-gray-100">
                      <div className="pt-6 space-y-6">
                        <div>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            The Logbook records daily operations and is the foundation for accurate billing and compliance.
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            Key features:
                          </p>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Daily prestart checks:</strong> Complete prestart inspections before logging hours or adding attachments</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Machine hours tracking:</strong> Log start/end times, breaks, and total hours per day</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Attachment management:</strong> Track attachments (GPS, hammers, etc.) with hourly or flat-rate pricing</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Operator details:</strong> Record which operator worked on each machine</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Supervisor signatures:</strong> Capture digital signatures for compliance</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Weekly signoffs:</strong> Review and approve weekly entries before invoicing</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>PDF reports:</strong> Generate prestart PDFs with photos and checklists</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            Workflow:
                          </p>
                          <ol className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">1.</span>
                              <span>Select a date in the weekly calendar view</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">2.</span>
                              <span>Complete a prestart inspection (required before logging hours)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">3.</span>
                              <span>Log machine hours with start/end times</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">4.</span>
                              <span>Add attachments if applicable</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">5.</span>
                              <span>Add operator details and notes</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">6.</span>
                              <span>Get supervisor approval and signature</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">7.</span>
                              <span>Weekly signoff for billing</span>
                            </li>
                          </ol>
                        </div>

                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            Benefits:
                          </p>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Accurate billing from daily records</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Compliance-ready documentation</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Real-time visibility of fleet operations</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Seamless integration with invoicing</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guide 2 - Invoice Creator */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'invoice-creator' ? null : 'invoice-creator')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Invoice Creator
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Generate professional invoices automatically — reduces manual work and errors.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'invoice-creator' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'invoice-creator' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 border-t border-gray-100">
                      <div className="pt-6 space-y-6">
                        <div>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            The Invoice Creator generates invoices from approved logbook entries and job contracts, reducing manual work and errors.
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            Key features:
                          </p>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Automatic data pull:</strong> Pulls machine hours, operator hours, and attachments from logbook entries</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Job-based invoicing:</strong> Create invoices per job with customer details and contract terms</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Flexible billing:</strong> Weekly, monthly, or one-time invoices</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Line item breakdown:</strong> Detailed daily breakdowns showing hours, rates, and attachments</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>GST calculation:</strong> Automatic GST calculation and inclusion</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Professional templates:</strong> Branded invoices with company and client details</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Payment terms:</strong> Set due dates and payment terms</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>PDF export:</strong> Download or email invoices directly</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            Workflow:
                          </p>
                          <ol className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">1.</span>
                              <span>Select a job from your jobs list</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">2.</span>
                              <span>Choose billing period (weekly/monthly/one-time)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">3.</span>
                              <span>System auto-populates line items from logbook entries</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">4.</span>
                              <span>Review and adjust line items as needed</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">5.</span>
                              <span>Add company and client details</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">6.</span>
                              <span>Set payment terms and due date</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">7.</span>
                              <span>Preview and generate PDF invoice</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">8.</span>
                              <span>Download or email to client</span>
                            </li>
                          </ol>
                        </div>

                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            Benefits:
                          </p>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Faster invoicing (minutes instead of hours)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Fewer errors from manual entry</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Consistent, professional invoices</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Complete audit trail from logbook to invoice</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guide 3 - Jobs Creator */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'jobs-creator' ? null : 'jobs-creator')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Jobs Creator
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Organize your plant hire operations — set up and manage jobs with customer details, rates, and contract terms.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'jobs-creator' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'jobs-creator' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 border-t border-gray-100">
                      <div className="pt-6 space-y-6">
                        <div>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            Jobs Creator helps set up and manage plant hire jobs with customer details, rates, and contract terms in one place.
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            Key features:
                          </p>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Job setup:</strong> Create jobs with customer name, location, and contact details</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Date tracking:</strong> Set start and end dates for each job</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Revenue tracking:</strong> Automatically calculate revenue from machine hours and attachments</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Machine tracking:</strong> See which machines are assigned to each job</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Operator tracking:</strong> Track operators working on each job</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Performance metrics:</strong> View total hours, machines used, and revenue per job</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Quick invoice creation:</strong> Generate invoices directly from job details</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            Workflow:
                          </p>
                          <ol className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">1.</span>
                              <span>Click "Create Job" and enter job name</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">2.</span>
                              <span>Add customer details (name, location, contact)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">3.</span>
                              <span>Set contract dates (start and end)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">4.</span>
                              <span>Assign machines and operators through bookings</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">5.</span>
                              <span>Track hours and revenue automatically</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">6.</span>
                              <span>Generate invoices when ready</span>
                            </li>
                          </ol>
                        </div>

                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            Benefits:
                          </p>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Centralized job management</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Real-time revenue tracking</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Clear visibility of job performance</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Streamlined invoicing workflow</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guide 4 - Booking Creation */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'booking-creation' ? null : 'booking-creation')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Booking Creation
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Schedule and manage equipment availability — schedule hires and assign operators for efficient fleet utilization.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'booking-creation' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'booking-creation' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 border-t border-gray-100">
                      <div className="pt-6 space-y-6">
                        <div>
                          <p className="text-gray-700 leading-relaxed mb-4">
                            Booking Creation lets you schedule equipment hires, manage availability, and assign operators to ensure efficient fleet utilization.
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            Key features:
                          </p>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Calendar view:</strong> Weekly calendar view of all bookings</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Machine assignment:</strong> Assign machines to specific jobs</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Operator assignment:</strong> Assign operators to each booking</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Status tracking:</strong> Track booking status (Pending, Confirmed, In Use, Complete, Maintenance)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Conflict detection:</strong> Automatic detection of double-bookings</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Date/time management:</strong> Set precise start and end times</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Notes and details:</strong> Add notes for special requirements</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Quick navigation:</strong> Jump to specific weeks and filter by machine or job</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            Workflow:
                          </p>
                          <ol className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">1.</span>
                              <span>Navigate to the Bookings page</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">2.</span>
                              <span>Select the week you want to schedule</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">3.</span>
                              <span>Click "Add Booking"</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">4.</span>
                              <span>Select machine from your fleet</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">5.</span>
                              <span>Choose the job for this booking</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">6.</span>
                              <span>Assign an operator (optional)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">7.</span>
                              <span>Set start and end date/time</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">8.</span>
                              <span>Set status (Pending/Confirmed)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">9.</span>
                              <span>Add any notes</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">10.</span>
                              <span>Save and view in calendar</span>
                            </li>
                          </ol>
                        </div>

                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            Benefits:
                          </p>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Avoid double-bookings with conflict detection</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Optimize fleet utilization</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Clear visibility of machine availability</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Easy scheduling and rescheduling</span>
                            </li>
                          </ul>
                        </div>
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
      <section className="py-20 sm:py-32 lg:py-40 bg-[#FFF5ED]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-8 tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed">
            Start your free trial and explore all the features with our step-by-step guides.
          </p>
          <Link 
            href="/start-trial" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Start Free Trial →
          </Link>
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








