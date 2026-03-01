'use client';

import { useState } from 'react';
import type { RiskAssessmentLead } from '@/lib/risk-assessment/types';

interface Props {
  onSubmit: (lead: RiskAssessmentLead) => void;
  onBack: () => void;
  initial?: Partial<RiskAssessmentLead>;
  isSubmitting?: boolean;
}

export default function Step4Lead({ onSubmit, onBack, initial, isSubmitting }: Props) {
  const [form, setForm] = useState<RiskAssessmentLead>({
    firstName: initial?.firstName || '',
    email: initial?.email || '',
    companyName: initial?.companyName || '',
    phone: initial?.phone || '',
    marketingConsent: initial?.marketingConsent ?? false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RiskAssessmentLead, string>>>({});
  const [_gotcha, setGotcha] = useState('');

  function set<K extends keyof RiskAssessmentLead>(key: K, value: RiskAssessmentLead[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const errs: Partial<Record<keyof RiskAssessmentLead, string>> = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.companyName.trim()) errs.companyName = 'Company name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (_gotcha) return; // honeypot
    if (validate()) onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Your Details</h2>
        <p className="text-sm text-gray-500">We'll email your Risk Management Report PDF as soon as it's generated.</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
            <input
              className={inp(errors.firstName)}
              value={form.firstName}
              onChange={(e) => set('firstName', e.target.value)}
              placeholder="e.g. Darcy"
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
            <input
              className={inp(errors.companyName)}
              value={form.companyName}
              onChange={(e) => set('companyName', e.target.value)}
              placeholder="e.g. Blade Earthmoving"
            />
            {errors.companyName && <p className="mt-1 text-xs text-red-600">{errors.companyName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              className={inp(errors.email)}
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder="e.g. darcy@company.com.au"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
            <input
              className={inp()}
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder="e.g. 0400 123 456"
            />
          </div>
        </div>

        {/* Honeypot */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          style={{ display: 'none' }}
          value={_gotcha}
          onChange={(e) => setGotcha(e.target.value)}
        />

        <label className="flex items-start gap-3 cursor-pointer pt-2">
          <input
            type="checkbox"
            className="mt-0.5 w-4 h-4 accent-[#FF8C32]"
            checked={form.marketingConsent}
            onChange={(e) => set('marketingConsent', e.target.checked)}
          />
          <span className="text-sm text-gray-600">
            I'd like to receive tips and updates from CivDocs. You can unsubscribe at any time.
          </span>
        </label>
      </div>

      {/* What you get */}
      <div className="rounded-xl border border-orange-100 bg-orange-50 p-5">
        <p className="text-sm font-semibold text-[#CC5500] mb-3">What you'll receive:</p>
        <ul className="space-y-2">
          {[
            'Professional Risk Management Report PDF',
            'Section 5 — all risk treatments currently in place',
            'Section 4 — any risk treatments required (based on your answers)',
            'Operator Acknowledgement page',
            'Download link via email (valid 7 days)',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-[#FF8C32] mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 rounded-full border border-gray-300 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-[2] rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] py-3 font-semibold text-white shadow-md hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating Report…
            </span>
          ) : (
            'Generate My Risk Assessment →'
          )}
        </button>
      </div>

      <p className="text-center text-xs text-gray-400">Free. No credit card. No obligation.</p>
    </form>
  );
}

function inp(error?: string) {
  return `w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8C32] transition ${error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`;
}
