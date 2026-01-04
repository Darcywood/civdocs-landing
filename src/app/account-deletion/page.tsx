'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AccountDeletionPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <div className="pt-20">
      {/* Main Content */}
      <main className="pt-12 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 sm:p-12 lg:p-16">
            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-6 tracking-tight">
              Account Deletion Request
            </h1>

            {/* Introduction */}
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We&apos;re sorry to see you go. To delete your CivDocs account, please follow the steps below.
            </p>

            {/* Instructions */}
            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  How to Request Account Deletion
                </h2>
                <ol className="space-y-4 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF8C32] text-white flex items-center justify-center font-semibold text-sm">1</span>
                    <span>Email <a href="mailto:support@civdocs.com.au" className="text-[#FF8C32] hover:text-[#F5B041] font-semibold underline">support@civdocs.com.au</a> from the email address linked to your CivDocs account.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF8C32] text-white flex items-center justify-center font-semibold text-sm">2</span>
                    <span>Include the following information in your email:
                      <ul className="mt-2 ml-4 space-y-2 list-disc">
                        <li>Your company name</li>
                        <li>Your account email address</li>
                        <li>Confirmation that you want to delete your account</li>
                      </ul>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#FF8C32] text-white flex items-center justify-center font-semibold text-sm">3</span>
                    <span>We will confirm receipt of your request and process the deletion within <strong className="text-gray-900">7 days</strong> of receiving your email.</span>
                  </li>
                </ol>
              </div>

              {/* Email Template */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Email Template
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700">
                  <p className="mb-2">Subject: Account Deletion Request</p>
                  <p className="mb-2">To: support@civdocs.com.au</p>
                  <p className="mb-2">---</p>
                  <p className="mb-1">Hello,</p>
                  <p className="mb-1">I would like to request deletion of my CivDocs account.</p>
                  <p className="mb-1">Company Name: [Your Company Name]</p>
                  <p className="mb-1">Account Email: [Your Account Email]</p>
                  <p className="mb-1">Please confirm receipt and proceed with account deletion.</p>
                  <p>Thank you.</p>
                </div>
              </div>

              {/* Important Note */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#FF8C32] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Important Information
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Once your account is deleted, all data associated with your account will be permanently removed and cannot be recovered. This includes all projects, timesheets, pre-starts, plant logbooks, and cost tracking data. Please ensure you have exported any data you wish to keep before requesting deletion.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="pt-6 border-t border-gray-200">
              <p className="text-gray-600 mb-4">
                If you have any questions or need assistance, please don&apos;t hesitate to contact our support team.
              </p>
              <Link 
                href="/support"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-base rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Contact Support
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>
      </div>

      <Footer />
    </div>
  );
}



