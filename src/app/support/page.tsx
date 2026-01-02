'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

function SupportPageContent() {
  const searchParams = useSearchParams();
  const isEnterprise = searchParams.get('inquiry') === 'enterprise';
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: isEnterprise ? 'Enterprise' : '',
    message: '',
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
      const submitData = {
        ...formData,
        inquiryType: isEnterprise ? 'Enterprise' : formData.inquiryType,
      };
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSuccess(true);
      setFormData({ name: '', email: '', company: '', phone: '', inquiryType: isEnterprise ? 'Enterprise' : '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs: FAQItem[] = [
    // General
    {
      question: 'What is CivDocs and who is it for?',
      answer: 'CivDocs is a construction management platform for civil contractors and plant hire companies. It helps track timesheets, pre-start inspections, project costs, machine maintenance, and daily operations—all in one place.',
      category: 'General',
    },
    {
      question: 'Do I need to download an app or can I use it in my browser?',
      answer: 'Both. Use it in your browser or download the iOS or Android app.',
      category: 'General',
    },
    {
      question: 'How do I get my team set up on CivDocs?',
      answer: 'Go to Settings / Employees and invite via email and assign roles (Admin, Supervisor, or Employee). They\'ll receive an email invitation to join.',
      category: 'General',
    },
    {
      question: 'Can I use CivDocs for both civil contracting and plant hire?',
      answer: 'Yes. Switch between Civil Contractor and Plant Hire views in settings. Each view has features tailored to that workflow.',
      category: 'General',
    },
    // Prestarts & Inspections
    {
      question: 'How do pre-start inspections work?',
      answer: 'Complete a digital checklist for each machine before use. Add photos, notes, and faults. Sign electronically, and a PDF report is generated automatically.',
      category: 'Prestarts & Inspections',
    },
    {
      question: 'Can I view pre-start history for a specific machine?',
      answer: 'Yes. Go to the machine details page to see all pre-start records, including dates, operators, and any faults logged. Filter by date range or search for specific records.',
      category: 'Prestarts & Inspections',
    },
    {
      question: 'What happens if I find a fault during a pre-start?',
      answer: 'Mark the item as failed, add notes and photos. The supervisor is immediately notified about the fault on that machine so it can be fixed ASAP.',
      category: 'Prestarts & Inspections',
    },
    // Timesheets & Labour Tracking
    {
      question: 'How do I fill out a timesheet?',
      answer: 'Select your project, enter start/end times, add break duration, and optional comments. The system calculates total hours automatically.',
      category: 'Timesheets & Labour Tracking',
    },
    {
      question: 'Can I work on multiple projects for the week?',
      answer: 'Yes.',
      category: 'Timesheets & Labour Tracking',
    },
    {
      question: 'How do leave requests work?',
      answer: 'Request leave from the same place you submit timesheets. Select leave type (annual, personal, sick, RDO, LSL or custom), choose the date range, add notes, and send to your supervisor for approval. Approved leave is stored with your timesheet history.',
      category: 'Timesheets & Labour Tracking',
    },
    {
      question: 'Who can approve timesheets?',
      answer: 'Supervisors and admins can review and approve timesheets. Employees submit them for approval.',
      category: 'Timesheets & Labour Tracking',
    },
    {
      question: 'How does payroll access the timesheets?',
      answer: 'Go to Settings → Employees, select the employee, and view their weekly timesheet PDF. Each approved timesheet generates a clean PDF ready for payroll processing, with all hours, projects, leave, and approvals included.',
      category: 'Timesheets & Labour Tracking',
    },
    {
      question: 'Can I edit a timesheet after submitting it?',
      answer: 'Yes, but if it\'s already approved, you may need supervisor permission to make changes.',
      category: 'Timesheets & Labour Tracking',
    },
    // Cost Tracking & Budgets
    {
      question: 'How does cost tracking work?',
      answer: 'Costs are tracked automatically from timesheets (labour), machine bookings (plant), and material purchases. View costs by project, scope, or cost code.',
      category: 'Cost Tracking & Budgets',
    },
    {
      question: 'What are cost codes and why do I need them?',
      answer: 'Cost codes categorize work (e.g., "Excavation", "Concrete Pour"). They help track budgets and compare actual vs. planned costs.',
      category: 'Cost Tracking & Budgets',
    },
    {
      question: 'Can I set budgets for projects?',
      answer: 'Yes. Set budgets at the project and scope level for labour, materials, and plant. The system shows budget vs. actual in real time.',
      category: 'Cost Tracking & Budgets',
    },
    {
      question: 'How do I see if a project is over budget?',
      answer: 'Use the Cost Tracking page or ask Crank AI. You\'ll see budget status, variance, and which cost codes are driving overruns.',
      category: 'Cost Tracking & Budgets',
    },
    // Crank AI Assistant
    {
      question: 'What can Crank AI help me with?',
      answer: 'Ask questions like: "What does a metre of AGI cost us?", "What\'s blowing the budget on this job?", "Show me cost per m² of footpath", "How many hours has Jake worked this month?", "Compare Pakenham to Clyde North"',
      category: 'Crank AI Assistant',
    },
    {
      question: 'Do I need special training to use Crank AI?',
      answer: 'No. Ask questions in plain English. Crank AI reads your CivDocs data and returns answers with supporting numbers.',
      category: 'Crank AI Assistant',
    },
    {
      question: 'What data can Crank AI access?',
      answer: 'Crank AI only accesses your organization\'s data. It can\'t see other organizations\' information.',
      category: 'Crank AI Assistant',
    },
    // Machines & Fleet Management
    {
      question: 'How do I add machines to my fleet?',
      answer: 'Go to Settings → Machines, click "Add Machine", and enter the asset number, current hours, and next service hours.',
      category: 'Machines & Fleet Management',
    },
    {
      question: 'Can I track machine service schedules?',
      answer: 'Yes. Set next service hours for each machine. You\'ll get alerts when services are due.',
      category: 'Machines & Fleet Management',
    },
    {
      question: 'How do I track machine faults?',
      answer: 'Log faults during pre-starts. Track status, assign resolution, and add photos. Supervisors can view all faults and their resolution status.',
      category: 'Machines & Fleet Management',
    },
    {
      question: 'Can I set different rates for different machines?',
      answer: 'Yes. Set hourly, daily, weekly, and overtime rates per machine. These are used for cost calculations and invoicing (plant hire).',
      category: 'Machines & Fleet Management',
    },
    // Plant Hire Logbook
    {
      question: 'How does the daily logbook work?',
      answer: 'The logbook is your daily operations hub: Add Pre-Starts (select the machine being invoiced), Log Hours (record hours worked using machine rates), Add Attachments (chargeable items like hammers or GPS), Supervisor Sign-Off (site supervisor approves for invoicing).',
      category: 'Plant Hire Logbook',
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <div className="pt-20">
        {/* Contact Form Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FFFEFB] to-white">
          <div className="max-w-2xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-6">
                {isEnterprise ? 'Enterprise enquiries' : 'Contact us'}
              </span>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 sm:p-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E1E] leading-tight tracking-tight mb-4">
                  {isEnterprise ? 'Let\'s discuss your enterprise needs' : 'Need support or have a question?'}
                </h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
                  {isEnterprise 
                    ? 'Tell us about your organization and requirements. Our team will work with you to create a tailored solution for your business.'
                    : 'If you have feedback or are facing issues, please provide as much detail as possible, and we\'ll get back to you.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
                <div>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isEnterprise ? "Your name" : "Your Name"}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF8C32] focus:border-[#FF8C32] outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    disabled={loading}
                    suppressHydrationWarning
                  />
                </div>

                <div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={isEnterprise ? "Your work email" : "Your email"}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF8C32] focus:border-[#FF8C32] outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    disabled={loading}
                    suppressHydrationWarning
                  />
                </div>

                <div>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your Company name"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF8C32] focus:border-[#FF8C32] outline-none transition-all text-gray-900 placeholder:text-gray-400"
                    disabled={loading}
                    suppressHydrationWarning
                  />
                </div>

                {isEnterprise && (
                  <div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Your phone number"
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF8C32] focus:border-[#FF8C32] outline-none transition-all text-gray-900 placeholder:text-gray-400"
                      disabled={loading}
                      suppressHydrationWarning
                    />
                  </div>
                )}

                {!isEnterprise && (
                  <div className="relative">
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#FF8C32] focus:border-[#FF8C32] outline-none transition-all text-gray-900 appearance-none cursor-pointer pr-10"
                      disabled={loading}
                    >
                      <option value="">Select…</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Support">Support</option>
                      <option value="Sales inquiry">Sales inquiry</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                )}

                <div>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={isEnterprise ? "Tell us about your organization, team size, and specific requirements..." : "Your message"}
                    required
                    rows={6}
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
                      {isEnterprise 
                        ? 'Thank you for your interest! Our enterprise team will contact you within 24 hours to discuss your requirements.'
                        : 'Your message has been sent successfully. We\'ll get back to you soon!'}
                    </p>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#FF8C32] text-white font-semibold rounded-full hover:bg-[#F5B041] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                  >
                    {loading ? 'Sending...' : isEnterprise ? 'Request enterprise consultation' : 'Send a message'}
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

        {/* Contact Information Cards */}
        {!isEnterprise && (
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[#FFF5ED] to-white">
          <div className="max-w-2xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Card */}
              <a 
                href="tel:1300071577"
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-[#1E1E1E] mb-1 group-hover:text-[#FF8C32] transition-colors">
                      Call Us
                    </h3>
                    <p className="text-lg font-medium text-gray-700">
                      1300 071 577
                    </p>
                  </div>
                </div>
              </a>

              {/* Email Card */}
              <a 
                href="mailto:support@civdocs.com.au"
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-[#1E1E1E] mb-1 group-hover:text-[#FF8C32] transition-colors">
                      Email Us
                    </h3>
                    <p className="text-sm font-medium text-gray-700 break-all">
                      support@civdocs.com.au
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>
        )}

        {/* FAQ Section - Only show if not enterprise */}
        {!isEnterprise && (
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-[#FFF5ED] to-white">
          <div className="max-w-2xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1E1E1E] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-600 mb-8">
              Don&apos;t see the answer you&apos;re looking for? Get in touch.
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
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function SupportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white font-sans antialiased">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[#FF8C32] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <SupportPageContent />
    </Suspense>
  );
}






