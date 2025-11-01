'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function TrialSuccessPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  useEffect(() => {
    // Auto-redirect disabled for local development
    // In production, uncomment this to redirect to app.civdocs.com
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFFAF7] to-[#FFF5ED] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-full flex items-center justify-center shadow-xl animate-bounce">
            <svg 
              className="w-14 h-14 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl sm:text-5xl font-semibold text-[#1E1E1E] mb-6 tracking-tight">
          Your Trial Has Started! 🎉
        </h1>
        
        <p className="text-xl text-gray-600 mb-4 leading-relaxed">
          Welcome to CivDocs! Your <span className="font-semibold text-[#FF8C32]">14-day free trial</span> is now active.
        </p>

        {email && (
          <p className="text-lg text-gray-600 mb-8">
            We&apos;ve sent setup instructions to <span className="font-semibold text-[#1E1E1E]">{email}</span>
          </p>
        )}

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
          <h2 className="text-2xl font-semibold text-[#1E1E1E] mb-4">What Happens Next?</h2>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-full flex items-center justify-center text-white font-semibold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-[#1E1E1E] mb-1">Check Your Email</h3>
                <p className="text-gray-600">You&apos;ll receive login credentials and a setup guide within the next few minutes.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-full flex items-center justify-center text-white font-semibold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-[#1E1E1E] mb-1">Log In to Your Dashboard</h3>
                <p className="text-gray-600">Use your credentials to access CivDocs and start setting up your team.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-full flex items-center justify-center text-white font-semibold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-[#1E1E1E] mb-1">Explore All Features</h3>
                <p className="text-gray-600">You have full access to Pre-Starts, Timesheets, Safety Reports, and more for 14 days.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Info Box */}
        <div className="bg-gradient-to-r from-[#FF8C32]/10 to-[#F5B041]/10 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-[#1E1E1E] mb-2">No Credit Card Required</h3>
          <p className="text-gray-700">
            Your trial is completely free for 14 days. We&apos;ll never charge you without your permission.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            ← Back to Home
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center px-8 py-4 bg-white border-2 border-gray-200 text-[#1E1E1E] font-semibold text-lg rounded-full hover:border-[#FF8C32] hover:text-[#FF8C32] transition-all duration-300"
          >
            View Pricing
          </Link>
        </div>

        {/* Help Link */}
        <p className="text-sm text-gray-500 mt-8">
          Need help getting started?{' '}
          <a href="#support" className="text-[#FF8C32] hover:underline font-medium">
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
}

