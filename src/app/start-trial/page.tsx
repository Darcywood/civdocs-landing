'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function StartTrialContent() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    company: '',
    company_type: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate company type is selected
    if (!formData.company_type) {
      alert('⚠️ Please select a company type');
      return;
    }
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    setPasswordError('');
    setLoading(true);

    try {
      const response = await fetch('/api/start-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.ok || data.success) {
        // Redirect to success page
        window.location.href = `/trial-success?email=${encodeURIComponent(formData.email)}`;
      } else {
        alert('⚠️ ' + (data.error || 'An error occurred'));
        setLoading(false);
      }
    } catch {
      alert('⚠️ An error occurred. Please try again.');
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFFAF7] to-[#FFF5ED] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        {/* Back to home link */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-[#FF8C32] transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-semibold text-[#1E1E1E] mb-2">
            Start Your Free Trial
          </h1>
          <p className="text-gray-600">
            No credit card required. 14 days of unlimited access to all features.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF8C32] focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="John Smith"
                required
                disabled={loading}
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Work Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF8C32] focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="you@company.com"
                required
                disabled={loading}
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF8C32] focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="Acme Construction"
                required
                disabled={loading}
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password *
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF8C32] focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="Create a secure password"
                required
                disabled={loading}
                suppressHydrationWarning
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF8C32] focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="Confirm your password"
                required
                disabled={loading}
                suppressHydrationWarning
              />
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Which setup best suits your company? *
              </label>
              <p className="text-xs text-gray-500 mb-3">
                Don't worry, you can change this anytime later
              </p>
              <div className="space-y-2">
                <div
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all group ${
                    formData.company_type === 'civil'
                      ? 'border-[#FF8C32] bg-gradient-to-r from-[#FF8C32]/10 to-[#F5B041]/10'
                      : 'border-gray-300 hover:border-[#FF8C32] hover:bg-[#FF8C32]/5'
                  }`}
                  onClick={() => !loading && setFormData({ ...formData, company_type: 'civil' })}
                >
                  <input
                    type="radio"
                    name="company_type"
                    value="civil"
                    checked={formData.company_type === 'civil'}
                    onChange={(e) => {
                      e.stopPropagation();
                      setFormData({ ...formData, company_type: e.target.value });
                    }}
                    className="w-4 h-4 text-[#FF8C32] border-gray-300 focus:ring-[#FF8C32] focus:ring-2 mr-2 cursor-pointer accent-[#FF8C32]"
                    required
                    disabled={loading}
                  />
                  <div className="flex items-center flex-1 justify-between">
                    <div>
                      <div className={`text-sm font-medium transition-colors ${
                        formData.company_type === 'civil'
                          ? 'text-[#FF8C32]'
                          : 'text-gray-900 group-hover:text-[#FF8C32]'
                      }`}>
                        Civil Contractor
                      </div>
                      <div className="text-xs text-gray-500">
                        Project management and construction
                      </div>
                    </div>
                    <Image 
                      src="/icons-pricing/Civil-Contractor.png" 
                      alt="Civil Contractor" 
                      width={64} 
                      height={64} 
                      className="w-16 h-16 ml-1 object-contain"
                    />
                  </div>
                </div>
                <div
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all group ${
                    formData.company_type === 'plant_hire'
                      ? 'border-[#FF8C32] bg-gradient-to-r from-[#FF8C32]/10 to-[#F5B041]/10'
                      : 'border-gray-300 hover:border-[#FF8C32] hover:bg-[#FF8C32]/5'
                  }`}
                  onClick={() => !loading && setFormData({ ...formData, company_type: 'plant_hire' })}
                >
                  <input
                    type="radio"
                    name="company_type"
                    value="plant_hire"
                    checked={formData.company_type === 'plant_hire'}
                    onChange={(e) => {
                      e.stopPropagation();
                      setFormData({ ...formData, company_type: e.target.value });
                    }}
                    className="w-4 h-4 text-[#FF8C32] border-gray-300 focus:ring-[#FF8C32] focus:ring-2 mr-2 cursor-pointer accent-[#FF8C32]"
                    required
                    disabled={loading}
                  />
                  <div className="flex items-center flex-1 justify-between">
                    <div>
                      <div className={`text-sm font-medium transition-colors ${
                        formData.company_type === 'plant_hire'
                          ? 'text-[#FF8C32]'
                          : 'text-gray-900 group-hover:text-[#FF8C32]'
                      }`}>
                        Plant Hire Company
                      </div>
                      <div className="text-xs text-gray-500">
                        Wet hire and fleet management
                      </div>
                    </div>
                    <Image 
                      src="/icons-pricing/Plant-hire.png" 
                      alt="Plant Hire Company" 
                      width={64} 
                      height={64} 
                      className="w-16 h-16 ml-1 object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold rounded-full hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Starting Your Trial...' : 'Start Free Trial →'}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            ✓ No credit card required • ✓ 14 days free • ✓ Full access to all features • ✓ Select a plan after trial
          </p>
        </div>

        <div className="text-center">
          <Link href="/pricing" className="text-sm text-gray-600 hover:text-[#FF8C32] transition-colors">
            ← Back to pricing
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function StartTrialPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-white via-[#FFFAF7] to-[#FFF5ED] flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <StartTrialContent />
    </Suspense>
  );
}
