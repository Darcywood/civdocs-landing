'use client';

import Link from 'next/link';

const CAPABILITY_VIDEO_URL = process.env.NEXT_PUBLIC_CAPABILITY_VIDEO_URL || 'https://placeholder.com/video';
const CAPABILITY_BOOK_URL = process.env.NEXT_PUBLIC_CAPABILITY_BOOK_URL || 'https://calendly.com/placeholder';

export default function CapabilityStatementSuccessPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <main>
        <section className="bg-gradient-to-b from-white to-[#FFF5ED] py-16 sm:py-24">
          <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
            <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold text-[#1E1E1E] mb-4">
              Your capability statement is on its way
            </h1>
            <p className="text-lg text-gray-600 mb-12">
              Check your inbox — we&apos;ve sent you a secure link to download your PDF. The link expires in 7 days.
            </p>
            <div className="space-y-4">
              <a
                href={CAPABILITY_VIDEO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-6 py-3 font-semibold text-white shadow-md transition-all hover:shadow-lg"
              >
                Watch 3-min CivDocs video
              </a>
              <a
                href={CAPABILITY_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-full border-2 border-gray-200 px-6 py-3 font-semibold text-gray-700 transition-all hover:border-[#FF8C32] hover:text-[#FF8C32]"
              >
                Book a 15-min walkthrough
              </a>
            </div>
            <p className="mt-8 text-sm text-gray-500">
              While you wait, see what CivDocs can do for your business.
            </p>
            <Link
              href="/"
              className="mt-4 inline-block text-sm font-medium text-[#FF8C32] hover:text-[#E67E22]"
            >
              ← Back to homepage
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
