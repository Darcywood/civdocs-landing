'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Redirect to dashboard after 5 seconds
    if (countdown === 0) {
      window.location.href = 'https://app.civdocs.com';
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFFAF7] to-[#FFF5ED] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-full flex items-center justify-center shadow-xl">
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
          Welcome to CivDocs! 🎉
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Your subscription is now active. You have <span className="font-semibold text-[#FF8C32]">30 days of free access</span> to all features.
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
          <h2 className="text-2xl font-semibold text-[#1E1E1E] mb-4">What&apos;s Next?</h2>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-full flex items-center justify-center text-white font-semibold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-[#1E1E1E] mb-1">Set Up Your Team</h3>
                <p className="text-gray-600">Invite your crew members and supervisors to join your workspace.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-full flex items-center justify-center text-white font-semibold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-[#1E1E1E] mb-1">Add Your Equipment</h3>
                <p className="text-gray-600">Register your machines and assets for tracking and pre-start checks.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-full flex items-center justify-center text-white font-semibold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-[#1E1E1E] mb-1">Start Logging Data</h3>
                <p className="text-gray-600">Begin creating pre-starts, timesheets, and safety reports.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Redirect Message */}
        <div className="bg-gradient-to-r from-[#FF8C32]/10 to-[#F5B041]/10 rounded-xl p-6 mb-6">
          <p className="text-gray-700 font-medium">
            Redirecting to your dashboard in <span className="text-[#FF8C32] font-bold text-2xl">{countdown}</span> seconds...
          </p>
        </div>

        {/* CTA Button */}
        <a
          href="https://app.civdocs.com"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold text-lg rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300"
        >
          Go to Dashboard Now →
        </a>

        {/* Session Info (for debugging, can remove in production) */}
        {sessionId && (
          <p className="text-sm text-gray-400 mt-8">
            Session ID: {sessionId}
          </p>
        )}
      </div>
    </div>
  );
}


