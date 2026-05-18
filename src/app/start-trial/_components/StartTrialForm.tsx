'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import OptimizedImage from '@/components/OptimizedImage';
import FancySpinner from '@/components/fancyspinner/FancySpinner';
import { getStoredAttributionForSignup } from '@/lib/marketingAttribution';

export default function StartTrialForm() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    company: '',
    company_type: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [termsAndPrivacyAccepted, setTermsAndPrivacyAccepted] = useState(false);
  const [orgSignupAccepted, setOrgSignupAccepted] = useState(false);
  const [legalError, setLegalError] = useState('');
  const [isOrgAckExpanded, setIsOrgAckExpanded] = useState(false);

  useEffect(() => {
    const keysToClear = ['company_type', 'view_mode', 'default_view_mode', 'organization_view_mode'];
    keysToClear.forEach((key) => {
      try {
        if (localStorage.getItem(key)) localStorage.removeItem(key);
      } catch {
        /* ignore */
      }
    });

    const preloadImages = () => {
      ['/John Smith/whitepaper.png', '/realfancyspinner/left.png', '/realfancyspinner/right.png'].forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    };
    preloadImages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formDataElement = form.querySelector('input[name="company_type"]:checked') as HTMLInputElement;
    const finalCompanyType = formDataElement?.value || formData.company_type;

    if (!finalCompanyType) {
      alert('⚠️ Please select a company type');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    if (!termsAndPrivacyAccepted || !orgSignupAccepted) {
      setLegalError('You must accept all terms and agreements to continue');
      return;
    }

    setPasswordError('');
    setLegalError('');
    setLoading(true);

    try {
      const response = await fetch('/api/start-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          company_type: finalCompanyType,
          terms_and_privacy_accepted: termsAndPrivacyAccepted,
          org_acknowledgement_accepted: orgSignupAccepted,
          signup_attribution: getStoredAttributionForSignup(),
        }),
      });

      const data = await response.json();

      if (data.ok || data.success) {
        /* Google Ads: successful signup from "Create Organisation" (form submit), before redirect */
        if (typeof window !== 'undefined') {
          const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
          if (typeof gtag === 'function') {
            try {
              gtag('event', 'conversion', {
                send_to: 'AW-18162388889/cK4KCJvr-6wcEJmfwNRD',
                value: 1.0,
                currency: 'AUD',
              });
            } catch {
              /* ignore */
            }
          }
        }

        if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
          try {
            (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', 'StartTrial', {
              value: 0,
              currency: 'AUD',
              subscription_id: data.organizationId || '',
              predicted_ltv: 20,
            });
            await new Promise((r) => setTimeout(r, 500));
          } catch {
            /* ignore */
          }
        }

        if (data.magicLink) {
          localStorage.setItem('showSpinner', 'true');
          localStorage.setItem('spinnerMessage', 'Getting your org setup');
          window.location.href = data.magicLink;
        } else {
          window.location.href = `/trial-success?email=${encodeURIComponent(formData.email)}`;
        }
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
    <>
      <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
        <Image src="/John Smith/whitepaper.png" alt="" width={180} height={180} priority />
        <Image src="/realfancyspinner/left.png" alt="" width={180} height={180} priority />
        <Image src="/realfancyspinner/right.png" alt="" width={180} height={180} priority />
      </div>
      {loading && <FancySpinner size="md" showOverlay={true} />}
      <div id="signup-form" className="scroll-mt-24">
        <div className="mb-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">Start your free trial</h2>
          <p className="text-base sm:text-lg text-gray-500 mt-3">No credit card required</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="John Smith"
                required
                disabled={loading}
                suppressHydrationWarning
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Work Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="you@company.com"
                required
                disabled={loading}
                suppressHydrationWarning
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="Acme Construction"
                required
                disabled={loading}
                suppressHydrationWarning
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="Create a secure password"
                required
                disabled={loading}
                suppressHydrationWarning
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="Confirm your password"
                required
                disabled={loading}
                suppressHydrationWarning
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-gray-900"
                placeholder="e.g. 0400 123 456"
                disabled={loading}
                suppressHydrationWarning
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={termsAndPrivacyAccepted}
                  onChange={(e) => {
                    setTermsAndPrivacyAccepted(e.target.checked);
                    setLegalError('');
                  }}
                  className="mt-1 h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-2 focus:ring-gray-400 cursor-pointer"
                  disabled={loading}
                />
                <span className="text-xs text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-[#F97316] hover:underline">
                    Terms & Conditions
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-[#F97316] hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {legalError && <p className="text-xs text-red-600 mt-1">{legalError}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Which setup best suits your company? *</label>
              <p className="text-xs text-gray-500 mb-3">Don&apos;t worry, you can change this anytime later</p>
              <div className="space-y-4">
                <div
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all group ${
                    formData.company_type === 'civil'
                      ? 'border-[#F97316] bg-[#F97316]/10'
                      : 'border-gray-300 hover:border-[#F97316]/50 hover:bg-[#F97316]/5'
                  }`}
                  onClick={() => { if (!loading) setFormData({ ...formData, company_type: 'civil' }); }}
                >
                  <input
                    type="radio"
                    name="company_type"
                    value="civil"
                    checked={formData.company_type === 'civil'}
                    onChange={(e) => setFormData({ ...formData, company_type: e.target.value })}
                    className="w-4 h-4 text-[#F97316] border-gray-300 focus:ring-[#F97316] mr-2 cursor-pointer accent-[#F97316]"
                    required
                    disabled={loading}
                  />
                  <div className="flex items-center flex-1 justify-between">
                    <div>
                      <div className={`text-sm font-medium ${formData.company_type === 'civil' ? 'text-[#F97316]' : 'text-gray-900'}`}>Civil Contractor</div>
                      <div className="text-xs text-gray-500">Select this for cost tracking.</div>
                    </div>
                    <OptimizedImage src="/icons-pricing/Civil-Contractor.png" alt="Civil Contractor" width={64} height={64} className="w-16 h-16 ml-1 object-contain" />
                  </div>
                </div>
                <div
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all group ${
                    formData.company_type === 'plant_hire'
                      ? 'border-[#F97316] bg-[#F97316]/10'
                      : 'border-gray-300 hover:border-[#F97316]/50 hover:bg-[#F97316]/5'
                  }`}
                  onClick={() => { if (!loading) setFormData({ ...formData, company_type: 'plant_hire' }); }}
                >
                  <input
                    type="radio"
                    name="company_type"
                    value="plant_hire"
                    checked={formData.company_type === 'plant_hire'}
                    onChange={(e) => setFormData({ ...formData, company_type: e.target.value })}
                    className="w-4 h-4 text-[#F97316] border-gray-300 focus:ring-[#F97316] mr-2 cursor-pointer accent-[#F97316]"
                    required
                    disabled={loading}
                  />
                  <div className="flex items-center flex-1 justify-between">
                    <div>
                      <div className={`text-sm font-medium ${formData.company_type === 'plant_hire' ? 'text-[#F97316]' : 'text-gray-900'}`}>Plant Hire Company</div>
                      <div className="text-xs text-gray-500">Select this for logbooks / invoicing</div>
                    </div>
                    <OptimizedImage src="/icons-pricing/Plant-hire.png" alt="Plant Hire Company" width={64} height={64} className="w-16 h-16 ml-1 object-contain" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setIsOrgAckExpanded(!isOrgAckExpanded)}
                className="w-full flex items-center justify-between p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
                disabled={loading}
              >
                <h3 className="text-base font-semibold text-gray-900">Organisation Acknowledgement</h3>
                <svg className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${isOrgAckExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isOrgAckExpanded && (
                <div className="px-4 py-4">
                  <p className="text-sm text-gray-700 mb-4">By creating an organisation in CivDocs, you acknowledge and agree that:</p>
                  <ul className="space-y-2.5 mb-4 text-sm text-gray-700">
                    {[
                      'CivDocs is a productivity and record-keeping tool only',
                      'CivDocs does not verify, validate, or enforce WHS, safety, payroll, tax, or legal compliance',
                      'Pre-starts, timesheets, invoices, and reports are user-generated records and are not certified',
                      'CivDocs does not prevent machines, workers, or jobs from being used based on entered data',
                      'Any AI-generated insights are informational only and must be independently verified',
                      'Your organisation remains fully responsible for all operational, safety, financial, and legal decisions',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#F97316] mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <label className="flex items-start gap-2 cursor-pointer pt-2 border-t border-gray-100">
                    <input
                      type="checkbox"
                      checked={orgSignupAccepted}
                      onChange={(e) => { setOrgSignupAccepted(e.target.checked); setLegalError(''); }}
                      className="mt-0.5 h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-2 focus:ring-gray-400 cursor-pointer"
                      disabled={loading}
                    />
                    <span className="text-sm text-gray-700">I accept and agree on behalf of my organisation</span>
                  </label>
                </div>
              )}
            </div>

            <button
              id="create-organisation-submit"
              type="submit"
              disabled={loading || !termsAndPrivacyAccepted || !orgSignupAccepted}
              className="w-full py-3 px-6 bg-[#F97316] text-white font-semibold rounded-full hover:bg-[#EA580C] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Organisation...' : 'Create Organisation'}
            </button>
          </form>
          <p className="text-xs text-gray-500 text-center mt-4">✓ No credit card required • ✓ 14 days free • ✓ Full access to all features</p>
        </div>
      </div>
    </>
  );
}
