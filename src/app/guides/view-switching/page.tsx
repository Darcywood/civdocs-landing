'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function ViewSwitchingGuidesPage() {
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
      <section className="pt-6 pb-0 sm:pt-8 sm:pb-0 lg:pt-10 lg:pb-0 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight tracking-tight">
              View Switching Guide
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 pb-20 sm:pb-24 lg:pb-32">
            {/* Guide 1 - How View Modes Work */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'view-modes' ? null : 'view-modes')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      How View Modes Work
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Understand how different user roles access and switch between Civil Contractor and Plant Hire views.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'view-modes' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'view-modes' && (
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
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            For Admins & Supervisors:
                          </p>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Switch freely between views at any time</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Your preference is saved and persists across sessions</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Switching changes the interface, not your data</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            For Employees:
                          </p>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Locked to your organization's default view mode</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>If your company is set as "Plant Hire," you see Plant Hire view</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>If set as "Civil Contractor," you see Civil Contractor view</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Can unlock the alternate view with the organization password (see Employee Lock below)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guide 2 - Civil Contractor View */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'civil-view' ? null : 'civil-view')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Civil Contractor View
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Designed for construction companies managing multiple projects with detailed cost tracking.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'civil-view' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'civil-view' && (
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
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            What you see:
                          </p>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Projects & Scopes</strong> — organize work by project</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Timesheets</strong> — employees log hours against projects</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Cost Tracking</strong> — track labour, plant, and materials against budgets</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Machines</strong> — fleet management with maintenance tracking</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Prestarts</strong> — daily equipment inspections</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            Best for:
                          </p>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Construction companies</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Companies managing multiple projects</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Teams tracking costs against budgets</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Companies needing detailed timesheet approval workflows</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guide 3 - Plant Hire View */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'plant-view' ? null : 'plant-view')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Plant Hire View
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Designed for equipment hire companies needing quick invoicing from daily logs.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'plant-view' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'plant-view' && (
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
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            What you see:
                          </p>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Jobs</strong> — customer jobs with locations and details</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Bookings</strong> — schedule equipment to jobs</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Logbook</strong> — daily machine hours, prestarts, and attachments</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Invoice Creator</strong> — generate invoices from logbook data</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span><strong>Machines</strong> — fleet management with booking status</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            Best for:
                          </p>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Equipment hire companies</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Companies renting out machinery</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Teams needing quick invoicing from daily logs</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Companies managing equipment availability</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guide 4 - Employee Lock Feature */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'employee-lock' ? null : 'employee-lock')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Employee Lock Feature
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Keeps employees focused on their organization's primary workflow while allowing flexibility when needed.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'employee-lock' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'employee-lock' && (
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
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            What it does:
                          </p>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Keeps employees focused on their organization's primary workflow</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Prevents confusion from switching views</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Maintains data consistency</span>
                            </li>
                          </ul>
                        </div>

                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            How it works:
                          </p>
                          <div className="space-y-4">
                            <div>
                              <p className="text-gray-700 font-semibold mb-2">Default behavior:</p>
                              <ul className="space-y-2 text-gray-700 ml-4">
                                <li className="flex items-start gap-3">
                                  <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                                  <span>Employees are locked to their organization's default view</span>
                                </li>
                                <li className="flex items-start gap-3">
                                  <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                                  <span>A Plant Hire company employee sees Plant Hire view</span>
                                </li>
                                <li className="flex items-start gap-3">
                                  <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                                  <span>A Civil Contractor employee sees Civil Contractor view</span>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <p className="text-gray-700 font-semibold mb-2">Unlocking access:</p>
                              <ul className="space-y-2 text-gray-700 ml-4">
                                <li className="flex items-start gap-3">
                                  <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                                  <span>Employees can unlock the alternate view with the organization password</span>
                                </li>
                                <li className="flex items-start gap-3">
                                  <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                                  <span>The password is the organization name (spaces removed)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                  <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                                  <span>Example: "ABC Construction" → password: "ABCConstruction"</span>
                                </li>
                                <li className="flex items-start gap-3">
                                  <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                                  <span>Admins can see this password in Settings → Organizations</span>
                                </li>
                              </ul>
                            </div>
                            <div>
                              <p className="text-gray-700 font-semibold mb-2">After unlocking:</p>
                              <ul className="space-y-2 text-gray-700 ml-4">
                                <li className="flex items-start gap-3">
                                  <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                                  <span>Employees can switch between both views</span>
                                </li>
                                <li className="flex items-start gap-3">
                                  <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                                  <span>Access is permanent (no need to unlock again)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                  <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                                  <span>All data remains accessible in both views</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            Why it exists:
                          </p>
                          <ul className="space-y-2 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Simplifies the interface for employees</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Reduces training needs</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Keeps workflows consistent</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                              <span>Admins can grant access when needed</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guide 5 - Quick Summary */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'summary' ? null : 'summary')}
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
                      Quick Summary
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      View mode access by user role at a glance.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'summary' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'summary' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 border-t border-gray-100">
                      <div className="pt-6 space-y-4">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left text-gray-700">
                            <thead>
                              <tr className="border-b border-gray-200">
                                <th className="pb-3 pr-4 font-semibold">User Role</th>
                                <th className="pb-3 pr-4 font-semibold">View Mode Access</th>
                                <th className="pb-3 font-semibold">Can Switch?</th>
                              </tr>
                            </thead>
                            <tbody className="space-y-2">
                              <tr className="border-b border-gray-100">
                                <td className="py-3 pr-4">Admin</td>
                                <td className="py-3 pr-4">Both views</td>
                                <td className="py-3 text-[#FF8C32] font-semibold">✅ Yes, anytime</td>
                              </tr>
                              <tr className="border-b border-gray-100">
                                <td className="py-3 pr-4">Supervisor</td>
                                <td className="py-3 pr-4">Both views</td>
                                <td className="py-3 text-[#FF8C32] font-semibold">✅ Yes, anytime</td>
                              </tr>
                              <tr className="border-b border-gray-100">
                                <td className="py-3 pr-4">Employee</td>
                                <td className="py-3 pr-4">Default view only</td>
                                <td className="py-3 text-gray-500">❌ Locked (unless unlocked)</td>
                              </tr>
                              <tr>
                                <td className="py-3 pr-4">Employee (Unlocked)</td>
                                <td className="py-3 pr-4">Both views</td>
                                <td className="py-3 text-[#FF8C32] font-semibold">✅ Yes, anytime</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guide 6 - Switching Views */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'switching' ? null : 'switching')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Switching Views
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Step-by-step instructions for switching between view modes.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'switching' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'switching' && (
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
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            For Admins/Supervisors:
                          </p>
                          <ol className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">1.</span>
                              <span>Go to Settings → Organizations</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">2.</span>
                              <span>Find the "View Mode" section</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">3.</span>
                              <span>Click the view you want (Civil Contractor or Plant Hire)</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">4.</span>
                              <span>Confirm the switch</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">5.</span>
                              <span>The interface updates immediately</span>
                            </li>
                          </ol>
                        </div>

                        <div>
                          <p className="text-gray-700 leading-relaxed font-bold mb-3">
                            For Employees:
                          </p>
                          <ol className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">1.</span>
                              <span>If locked, you'll see a lock icon on the alternate view</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">2.</span>
                              <span>To unlock, get the organization password from your admin</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">3.</span>
                              <span>Enter the password when prompted</span>
                            </li>
                            <li className="flex items-start gap-3">
                              <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">4.</span>
                              <span>Once unlocked, you can switch freely</span>
                            </li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guide 7 - Important Notes */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'notes' ? null : 'notes')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Important Notes
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Key things to remember about view switching and data access.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'notes' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'notes' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0 border-t border-gray-100">
                      <div className="pt-6 space-y-4">
                        <ul className="space-y-3 text-gray-700">
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                            <span><strong>Data is shared:</strong> switching views doesn't change your data; it changes how you see it</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                            <span><strong>Some features are view-specific:</strong></span>
                            <ul className="ml-6 mt-2 space-y-2">
                              <li className="flex items-start gap-2">
                                <span className="text-[#FF8C32] mt-1 flex-shrink-0">-</span>
                                <span>Civil Contractor: Cost Tracking, Project Scopes</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-[#FF8C32] mt-1 flex-shrink-0">-</span>
                                <span>Plant Hire: Bookings, Invoice Creator, Jobs</span>
                              </li>
                            </ul>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                            <span>Your organization type determines the default view, but admins can override this</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] mt-1 flex-shrink-0">•</span>
                            <span>This setup keeps the interface focused while allowing flexibility when needed</span>
                          </li>
                        </ul>
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
      <section className="pt-20 pb-20 sm:pt-32 sm:pb-32 lg:pt-40 lg:pb-40 bg-white">
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

