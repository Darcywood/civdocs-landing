'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFF5ED] pt-12 pb-32 sm:pt-20 sm:pb-40 lg:pt-28 lg:pb-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-8">
              Support & Help Center
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-12 font-medium">
              Get the help you need to make the most of CivDocs. We&apos;re here to support you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Support Options Section */}
      <section className="py-20 sm:py-32 lg:py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight tracking-tight">
              How Can We Help?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Support Option 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">
                Help Center
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Browse our comprehensive knowledge base with articles, guides, and FAQs covering all aspects of CivDocs.
              </p>
              <a href="/guides" className="text-[#FF8C32] font-medium hover:underline inline-flex items-center">
                Visit Help Center →
              </a>
            </div>

            {/* Support Option 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">
                Contact Support
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Get in touch with our support team via email. We typically respond within 24 hours.
              </p>
              <a href="mailto:support@civdocs.com.au" className="text-[#FF8C32] font-medium hover:underline inline-flex items-center">
                Email Support →
              </a>
            </div>

            {/* Support Option 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">
                Video Tutorials
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Watch step-by-step video tutorials to learn how to use CivDocs features effectively.
              </p>
              <a href="/video-tutorials" className="text-[#FF8C32] font-medium hover:underline inline-flex items-center">
                Watch Tutorials →
              </a>
            </div>

            {/* Support Option 4 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">
                Documentation
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Access detailed documentation and guides to help you set up and customize CivDocs for your team.
              </p>
              <a href="/guides" className="text-[#FF8C32] font-medium hover:underline inline-flex items-center">
                Read Docs →
              </a>
            </div>

            {/* Support Option 5 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">
                Community Forum
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Connect with other CivDocs users, share tips, and get answers from the community.
              </p>
              <a href="#community" className="text-[#FF8C32] font-medium hover:underline inline-flex items-center">
                Join Forum →
              </a>
            </div>

            {/* Support Option 6 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 tracking-tight">
                Report an Issue
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Found a bug or have a feature request? Let us know and we&apos;ll work on it.
              </p>
              <a href="mailto:support@civdocs.com.au?subject=Issue Report" className="text-[#FF8C32] font-medium hover:underline inline-flex items-center">
                Report Issue →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-[#FFF5ED] to-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-6">
            {/* FAQ 1 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-2">
                How do I get started with CivDocs?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Getting started is easy! Sign up for a free trial, create your organization, and invite your team members. Check out our <a href="/guides" className="text-[#FF8C32] hover:underline">Getting Started Guide</a> for step-by-step instructions.
              </p>
            </div>

            {/* FAQ 2 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-2">
                What&apos;s included in the free trial?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your 14-day free trial includes full access to all features: Pre-Starts, Timesheets, Reporting, and more. No credit card required to start.
              </p>
            </div>

            {/* FAQ 3 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-2">
                How do I contact support?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                You can reach our support team by emailing <a href="mailto:support@civdocs.com.au" className="text-[#FF8C32] hover:underline">support@civdocs.com.au</a>. We typically respond within 24 hours during business days.
              </p>
            </div>

            {/* FAQ 4 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-2">
                Can I export my data?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Yes! You can export your data in various formats including CSV, Excel, and PDF. All export options are available in the Reporting section.
              </p>
            </div>

            {/* FAQ 5 */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-[#1E1E1E] mb-2">
                Is my data secure?
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Absolutely. We use industry-standard encryption and security practices to protect your data. All data is stored securely and backed up regularly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 lg:py-40 bg-gradient-to-b from-white to-[#FFF5ED]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-8 tracking-tight">
            Still Need Help?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed">
            Our support team is here to help. Reach out and we&apos;ll get back to you as soon as possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:support@civdocs.com.au" 
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Contact Support →
            </a>
            <a 
              href="https://app.civdocs.com/auth/signup" 
              className="inline-flex items-center px-8 py-4 bg-white border-2 border-[#FF8C32] text-[#FF8C32] font-semibold text-lg rounded-full hover:bg-[#FFF5ED] transition-all duration-300"
            >
              Start Free Trial →
            </a>
          </div>
        </div>
      </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}






