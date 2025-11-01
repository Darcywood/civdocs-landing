'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Send custom email via our API (which handles Supabase token generation)
      const emailResponse = await fetch('/api/send-password-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name: email.split('@')[0] // Extract name from email
        })
      });

      if (emailResponse.ok) {
        setMessage('If an account exists with that email, you&apos;ll receive reset instructions shortly.');
      } else {
        const errorData = await emailResponse.json();
        setMessage('Error: ' + (errorData.error || 'Failed to send reset email'));
      }
    } catch {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFFAF7] to-[#FFF5ED] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        {/* Back to login link */}
        <div className="mb-6">
          <a 
            href="/login" 
            className="inline-flex items-center text-gray-600 hover:text-[#FF8C32] transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to login
          </a>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-[#1E1E1E] mb-2">
            Forgot Password?
          </h1>
          <p className="text-gray-600">
            Enter your email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF8C32] focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="you@company.com"
                required
                disabled={loading}
                suppressHydrationWarning
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold rounded-full hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              message.includes('Error') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}

          <p className="text-xs text-gray-500 text-center mt-4">
            Remember your password? <a href="/login" className="text-[#FF8C32] hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
