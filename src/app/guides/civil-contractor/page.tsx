'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function CivilContractorGuidesPage() {
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
              Civil Contractor Guides
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {/* Guide 1 - Pre-Starts */}
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
                      Ensure your machines are safe and compliant.
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
                          How to complete a Pre-Start safety check:
                        </p>
                        <ol className="space-y-3 text-gray-700">
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">1.</span>
                            <span><strong>Select your project and machine:</strong> Navigate to the Pre-Starts section and choose the project you're working on. Then select the specific machine or equipment you'll be using.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">2.</span>
                            <span><strong>Complete the checklist:</strong> Go through each item on the safety checklist systematically. Check fluid levels, inspect for damage, test safety features, and verify all equipment is in working order.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">3.</span>
                            <span><strong>Document any issues:</strong> If you find any faults or concerns, take photos and add detailed notes. Mark the item as requiring attention.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">4.</span>
                            <span><strong>Sign and submit:</strong> Once the checklist is complete, add your digital signature and submit. The Pre-Start will generate a PDF that you can share.</span>
                          </li>
                        </ol>
                        <p className="text-gray-700 leading-relaxed pt-2">
                          <strong>Tip:</strong> If critical issues are found, supervisors receive instant alerts so problems can be addressed before they cause downtime.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guide 2 - Timesheets */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'timesheets' ? null : 'timesheets')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Timesheets
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Log crew hours quickly and accurately with automated calculations.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'timesheets' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'timesheets' && (
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
                          How to log your timesheet:
                        </p>
                        <ol className="space-y-3 text-gray-700">
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">1.</span>
                            <span><strong>Select your project:</strong> Open the Timesheets section and choose the project you worked on. You can log hours for multiple projects throughout the week.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">2.</span>
                            <span><strong>Enter your times:</strong> For each day, enter your start time, finish time, and any break durations. The system automatically calculates your total hours worked.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">3.</span>
                            <span><strong>Add notes (optional):</strong> Include any relevant notes about the work performed, locations, or special circumstances.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">4.</span>
                            <span><strong>Review and submit:</strong> At the end of the week, review all your entries for accuracy. Once confirmed, submit your timesheet for supervisor approval.</span>
                          </li>
                        </ol>
                        <p className="text-gray-700 leading-relaxed pt-2">
                          <strong>Note:</strong> Supervisors review and approve all timesheet entries at the end of each week. Approved timesheets are automatically converted to PDFs and stored under your employee profile for payroll processing.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guide 3 - Cost tracking */}
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
                      Cost tracking
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Track project expenses and costs in real-time with detailed breakdowns.
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
                          Cost Tracking in CivDocs (quick version):
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          Everything is tracked on a <strong>scope</strong>. You set the scope’s <strong>cost codes + budgets</strong>, and CivDocs posts the actuals automatically.
                        </p>
                        <ol className="space-y-3 text-gray-700">
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">1.</span>
                            <span><strong>Create scopes</strong> (e.g. 300m of AGI, 2500t rock install).</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">2.</span>
                            <span><strong>Assign cost codes + budgets</strong> to each scope (Labour, Plant, Material).</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">3.</span>
                            <span><strong>Log work to one scope</strong> — CivDocs allocates the cost automatically: timesheets → Labour, pre-start day rate → Plant, materials via “+” → Material.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">4.</span>
                            <span><strong>Enter daily progress</strong> for the scope (e.g. 100m today) to see <strong>overall cost per unit</strong> and <strong>budget vs actual</strong> in reporting.</span>
                          </li>
                        </ol>
                        <p className="text-gray-700 leading-relaxed pt-2">
                          <strong>Rule:</strong> every transaction lands on a <strong>project + scope + cost code</strong>.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Guide 4 - Crank.ai */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300">
              <button
                onClick={() => setExpandedFeature(expandedFeature === 'crank-ai' ? null : 'crank-ai')}
                className="w-full p-8 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex-shrink-0">
                    <OptimizedImage 
                      src="/Crank.ai/crank.ai.png" 
                      alt="Crank.ai" 
                      width={36} 
                      height={36} 
                      className="w-9 h-9 object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 tracking-tight">
                      Crank.ai
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      AI-powered assistant to help streamline your workflow and answer questions.
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${expandedFeature === 'crank-ai' ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <AnimatePresence>
                {expandedFeature === 'crank-ai' && (
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
                          How to use Crank.ai for project forecasting:
                        </p>
                        <ol className="space-y-3 text-gray-700">
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">1.</span>
                            <span><strong>Access Crank.ai:</strong> Navigate to the Crank.ai section in your dashboard. The AI assistant analyzes your historical project data to provide insights.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">2.</span>
                            <span><strong>Select similar past projects:</strong> Choose completed projects that are similar to the upcoming work you want to forecast. Crank.ai uses these as reference points.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">3.</span>
                            <span><strong>Review cost predictions:</strong> Crank.ai will analyze labour costs, plant usage, and productivity from past projects to predict the total cost of similar upcoming work.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">4.</span>
                            <span><strong>Check cost per metre:</strong> View your exact cost per metre calculations based on real completed projects. This helps you understand true project economics.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">5.</span>
                            <span><strong>Analyze crew productivity:</strong> Review productivity metrics to understand how efficiently your crew works. Use this to plan labour and plant requirements accurately.</span>
                          </li>
                          <li className="flex items-start gap-3">
                            <span className="text-[#FF8C32] font-bold mt-0.5 flex-shrink-0">6.</span>
                            <span><strong>Compare and quote:</strong> Use the cost predictions to compare past jobs with new tenders. Quote with confidence knowing your pricing is based on real historical data.</span>
                          </li>
                        </ol>
                        <p className="text-gray-700 leading-relaxed pt-2">
                          <strong>Tip:</strong> The more completed projects you have in CivDocs, the more accurate Crank.ai's predictions become. It learns from your actual project performance to help you avoid underpricing or missing tenders.
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
      <section className="py-20 sm:py-32 lg:py-40 bg-[#FFF5ED]">
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

