'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function StartTrialPage() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan');
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    company: '',
    plan_type: planParam || 'bronze',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Update plan if URL param changes
  useEffect(() => {
    if (planParam) {
      setFormData(prev => ({ ...prev, plan_type: planParam }));
    }
  }, [planParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
    } catch (error: any) {
      alert('⚠️ An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const planDetails = {
    bronze: { name: 'Bronze', emoji: '🥉', image: null, price: 97 },
    silver: { name: 'Silver', emoji: '🥈', image: null, price: 197 },
    gold: { name: 'Gold', emoji: '🥇', image: '/CivDocs 500x500 GOLD.svg', price: 297 },
  };

  const currentPlan = planDetails[formData.plan_type as keyof typeof planDetails] || planDetails.bronze;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFFAF7] to-[#FFF5ED] flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full">
        {/* Back to home link */}
        <div className="mb-6">
          <a 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-[#FF8C32] transition-colors font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </a>
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
            No credit card required. 14 days of full access.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Selected Plan Display */}
          <div className="bg-gradient-to-r from-[#FF8C32]/10 to-[#F5B041]/10 rounded-xl p-4 mb-6 text-center">
            <p className="text-sm text-gray-600 mb-1">Selected Plan</p>
            <div className="flex items-center justify-center gap-2">
              {currentPlan.image ? (
                <img src={currentPlan.image} alt={currentPlan.name} className="w-8 h-8" />
              ) : (
                <span className="text-2xl">{currentPlan.emoji}</span>
              )}
              <span className="text-xl font-semibold text-[#1E1E1E]">{currentPlan.name}</span>
              <span className="text-gray-600">— ${currentPlan.price}/month</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plan
              </label>
              <select
                value={formData.plan_type}
                onChange={(e) => setFormData({ ...formData, plan_type: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FF8C32] focus:border-transparent outline-none transition-all text-gray-900"
                disabled={loading}
                suppressHydrationWarning
              >
                <option value="bronze">🥉 Bronze - $97/month</option>
                <option value="silver">🥈 Silver - $197/month</option>
                <option value="gold">🥇 Gold - $297/month</option>
              </select>
            </div>

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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-gradient-to-r from-[#FF8C32] to-[#F5B041] text-white font-semibold rounded-full hover:shadow-xl hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? 'Starting Your Trial...' : 'Start Free Trial →'}
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            ✓ No credit card required • ✓ 14 days free • ✓ Cancel anytime
          </p>
        </div>

        <div className="text-center">
          <a href="/pricing" className="text-sm text-gray-600 hover:text-[#FF8C32] transition-colors">
            ← Back to pricing
          </a>
        </div>
      </div>
    </div>
  );
}

