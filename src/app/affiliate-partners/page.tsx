'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AffiliatePartnersPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    howDoYouKnow: '',
    whoWouldYouRefer: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          inquiryType: 'Affiliate Partner Application',
          message: `How do you know CivDocs: ${formData.howDoYouKnow}\n\nWho would you refer CivDocs to: ${formData.whoWouldYouRefer}`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', company: '', howDoYouKnow: '', whoWouldYouRefer: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: 'Is this open to everyone?',
      answer: 'No. All partners are approved manually to protect the CivDocs brand and ensure referrals are a good fit.',
    },
    {
      question: 'Can I run ads or spam links?',
      answer: 'No. Referrals must be genuine and direct. This program is built on trust.',
    },
    {
      question: 'When do commissions start?',
      answer: 'When a referred company becomes a paying CivDocs customer.',
    },
    {
      question: 'How do I get paid?',
      answer: 'Commissions are paid monthly once approved.',
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white pt-12 pb-32 sm:pt-20 sm:pb-40 lg:pt-28 lg:pb-48">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Main Card with Gradient */}
              <div className="relative bg-gray-50 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden">
                {/* Enhanced gradient overlay extending from bottom-right corner */}
                <div 
                  className="absolute -bottom-32 -right-32 w-[120%] h-[120%] opacity-100"
                  style={{
                    background: 'radial-gradient(ellipse 80% 80% at bottom right, #FF8C32 0%, #FF9D4A 5%, #FFB366 12%, #FFC88A 22%, #FFD4A3 35%, #FFE4CC 50%, #FFF0E6 65%, rgba(255, 240, 230, 0.4) 78%, rgba(249, 250, 251, 0.2) 88%, rgba(249, 250, 251, 0) 100%)'
                  }}
                ></div>
                
                {/* Content */}
                <div className="relative p-8 sm:p-12 lg:p-16 z-10 text-center">
                  {/* Pill Label */}
                  <div className="inline-block mb-8">
                    <span className="px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                      CivDocs Partners
                    </span>
                  </div>
                  
                  {/* Heading */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-8 max-w-3xl mx-auto">
                    CivDocs Partners
                  </h1>
                  
                  {/* Description */}
                  <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto mb-8">
                    Earn ongoing monthly revenue by referring CivDocs to builders and operators who care about running better jobs.
                  </p>
                  
                  <p className="text-base text-gray-500 max-w-xl mx-auto">
                    This is a referral program for people already working in construction — not a public affiliate scheme.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who This Is For Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[#FFF5ED] to-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E1E1E] mb-4">
                Who This Is For
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                CivDocs Partners works best when it&apos;s built on trust and real-world experience.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-10">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                This program is for:
              </p>
              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg text-gray-700 leading-relaxed">Builders or supervisors already using CivDocs</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg text-gray-700 leading-relaxed">Operators with influence on site or across multiple companies</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg text-gray-700 leading-relaxed">People already helping others run jobs more efficiently</span>
                </li>
              </ul>
              <p className="text-lg text-gray-700 leading-relaxed">
                If you&apos;re already having conversations about paperwork, job visibility, or cost blowouts — this program is likely a good fit.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[#FFF5ED] to-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E1E1E] mb-4">
                How It Works
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-10">
              <ol className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    1
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-lg text-gray-700 leading-relaxed">Apply to the CivDocs Partners program</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    2
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-lg text-gray-700 leading-relaxed">Get approved manually</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    3
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-lg text-gray-700 leading-relaxed">Receive your unique referral link</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                    4
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-lg text-gray-700 leading-relaxed">Earn 30% recurring commission on paying customers you refer</p>
                  </div>
                </li>
              </ol>
              <p className="mt-8 text-lg text-gray-600 leading-relaxed">
                Commissions are paid monthly for as long as the customer remains active.
              </p>
            </div>
          </div>
        </section>

        {/* Earn Ongoing Monthly Revenue Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[#FFF5ED] to-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#1E1E1E] mb-4">
                Earn Ongoing Monthly Revenue
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="text-lg font-semibold text-[#1E1E1E] mb-1">30% recurring commission</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="text-lg font-semibold text-[#1E1E1E] mb-1">No caps</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="text-lg font-semibold text-[#1E1E1E] mb-1">No one-off bounties</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="text-lg font-semibold text-[#1E1E1E] mb-1">Paid monthly</p>
                  </div>
                </div>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                Designed for long-term partnerships, not quick promotions
              </p>
              <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                This program rewards quality referrals — not volume.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[#FFF5ED] to-white">
          <div className="max-w-2xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">
              FAQs
            </h2>
            <p className="text-base text-gray-600 mb-8">
              Have questions? We&apos;ve got answers.
            </p>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-100 transition-colors duration-200"
                    >
                      <span className="text-base font-medium text-[#1E1E1E] pr-4">
                        {faq.question}
                      </span>
                      <svg
                        className={`w-5 h-5 text-gray-400 flex-shrink-0 transform transition-transform duration-300 ${
                          openFAQ === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFAQ === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-4 pt-0">
                            <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[#FFF5ED] to-white">
          <div className="max-w-2xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6">
                Apply to Become a Partner
              </span>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 sm:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E] leading-tight tracking-tight mb-4">
                  Apply to Become a Partner
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
                  If you already work with builders or operators and believe CivDocs would genuinely help them, apply below.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF8C32] focus:border-[#FF8C32] outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    disabled={loading}
                    suppressHydrationWarning
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Your email address"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF8C32] focus:border-[#FF8C32] outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    disabled={loading}
                    suppressHydrationWarning
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company / role
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your company and role"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF8C32] focus:border-[#FF8C32] outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    disabled={loading}
                    suppressHydrationWarning
                  />
                </div>

                <div>
                  <label htmlFor="howDoYouKnow" className="block text-sm font-medium text-gray-700 mb-2">
                    How do you know CivDocs?
                  </label>
                  <textarea
                    id="howDoYouKnow"
                    value={formData.howDoYouKnow}
                    onChange={(e) => setFormData({ ...formData, howDoYouKnow: e.target.value })}
                    placeholder="Tell us how you know about CivDocs"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF8C32] focus:border-[#FF8C32] outline-none transition-all text-gray-900 placeholder:text-gray-400 resize-none"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="whoWouldYouRefer" className="block text-sm font-medium text-gray-700 mb-2">
                    Who would you refer CivDocs to?
                  </label>
                  <textarea
                    id="whoWouldYouRefer"
                    value={formData.whoWouldYouRefer}
                    onChange={(e) => setFormData({ ...formData, whoWouldYouRefer: e.target.value })}
                    placeholder="Describe the types of companies or people you would refer"
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF8C32] focus:border-[#FF8C32] outline-none transition-all text-gray-900 placeholder:text-gray-400 resize-none"
                    disabled={loading}
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                    <p className="text-green-600 text-sm">
                      Thank you for your application! We&apos;ll review it and get back to you soon.
                    </p>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#FF8C32] text-white font-semibold rounded-full hover:bg-[#F5B041] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                  >
                    {loading ? 'Submitting...' : 'Apply for partner access'}
                    {!loading && (
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
