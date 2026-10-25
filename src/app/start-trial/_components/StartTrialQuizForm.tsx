'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import OptimizedImage from '@/components/OptimizedImage';
import FancySpinner from '@/components/fancyspinner/FancySpinner';
import { isAustralianPhone } from '@/lib/australianPhone';
import { getStoredAttributionForSignup } from '@/lib/marketingAttribution';
import { trackTrialExperiment } from '@/lib/trialExperimentClient';

const MACHINE_SIZES = [
  { value: '1', label: '1' },
  { value: '2_5', label: '2–5' },
  { value: '5_15', label: '5–15' },
  { value: '15_plus', label: '15+' },
] as const;

const EMPLOYEE_SIZES = [
  { value: 'owner_operator', label: 'Owner operator' },
  { value: '2_5', label: '2–5' },
  { value: '5_15', label: '5–15' },
  { value: '15_plus', label: '15+' },
] as const;

type SizeValue = (typeof MACHINE_SIZES)[number]['value'] | (typeof EMPLOYEE_SIZES)[number]['value'];

const inputClass =
  'w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#F97316] focus:border-transparent outline-none transition-all text-gray-900';

export default function StartTrialQuizForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [companyType, setCompanyType] = useState<'civil' | 'plant_hire' | ''>('');
  const [company, setCompany] = useState('');
  const [machines, setMachines] = useState<SizeValue | ''>('');
  const [employees, setEmployees] = useState<SizeValue | ''>('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [trackedStart, setTrackedStart] = useState(false);

  useEffect(() => {
    ['/John Smith/whitepaper.png', '/realfancyspinner/left.png', '/realfancyspinner/right.png'].forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  const goTo = (next: 1 | 2 | 3) => {
    setError('');
    setStep(next);
    if (next === 2 && !trackedStart) {
      trackTrialExperiment('form_start');
      setTrackedStart(true);
    }
  };

  const continueFrom = (current: 1 | 2) => {
    if (current === 1 && !companyType) {
      setError('Choose the setup that fits you.');
      return;
    }
    if (current === 2 && (!company.trim() || !machines || !employees)) {
      setError('Add your company name, machines and crew size.');
      return;
    }
    goTo((current + 1) as 2 | 3);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!companyType || !company.trim() || !machines || !employees) {
      setError('Go back and finish the first two steps.');
      return;
    }
    if (!fullName.trim() || !email.trim() || !password) {
      setError('Name, email and password are required.');
      return;
    }
    if (!termsAccepted) {
      setError('Agree to the Terms & Conditions and Privacy Policy to continue.');
      return;
    }
    if (!isAustralianPhone(phone)) {
      setError('Enter an Australian phone number, like 0400 123 456.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      const response = await fetch('/api/start-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName.trim(),
          email: email.trim(),
          company: company.trim(),
          company_type: companyType,
          password,
          phone,
          terms_and_privacy_accepted: true,
          org_acknowledgement_accepted: false,
          signup_surface: 'experiment',
          signup_flow: 'quiz',
          company_website: companyWebsite,
          signup_attribution: {
            ...(getStoredAttributionForSignup() || {}),
            quiz_machines: machines,
            quiz_employees: employees,
          },
        }),
      });
      const data = await response.json();

      if (data.ignored) {
        window.location.href = `/trial-success?email=${encodeURIComponent(email.trim())}`;
        return;
      }

      if (data.ok || data.success) {
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
          const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
          if (typeof fbq === 'function') {
            try {
              fbq('track', 'StartTrial', {
                value: 0,
                currency: 'AUD',
                subscription_id: data.organizationId || '',
                predicted_ltv: 20,
              });
              await new Promise((resolve) => setTimeout(resolve, 500));
            } catch {
              /* ignore */
            }
          }
        }
        if (data.magicLink) {
          localStorage.setItem('showSpinner', 'true');
          localStorage.setItem('spinnerMessage', 'Getting your org setup');
          window.location.href = data.magicLink;
        } else {
          window.location.href = `/trial-success?email=${encodeURIComponent(email.trim())}`;
        }
        return;
      }
      setError(data.error || 'An error occurred');
      setLoading(false);
    } catch {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      <div className="pointer-events-none absolute opacity-0" aria-hidden="true">
        <Image src="/John Smith/whitepaper.png" alt="" width={180} height={180} priority />
        <Image src="/realfancyspinner/left.png" alt="" width={180} height={180} priority />
        <Image src="/realfancyspinner/right.png" alt="" width={180} height={180} priority />
      </div>
      {loading && <FancySpinner size="md" showOverlay={true} />}
      <div id="signup-form" className="scroll-mt-24">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Start your free trial</h2>
          <p className="mt-3 text-base text-gray-500 sm:text-lg">No credit card required</p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-xl sm:p-10">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm font-semibold text-[#78716C]">Step {step} of 3</p>
            <div className="flex gap-1.5" aria-hidden="true">
              {[1, 2, 3].map((item) => (
                <span
                  key={item}
                  className={`h-1.5 w-8 rounded-full ${item <= step ? 'bg-[#F97316]' : 'bg-[#E7E5E4]'}`}
                />
              ))}
            </div>
          </div>

          {step === 1 && (
            <div>
              <h3 className="text-xl font-bold tracking-tight text-[#111827]">What best fits you?</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <SetupCard
                  title="Civil contractor"
                  body="Cost tracking on Projects"
                  image="/icons-pricing/Civil-Contractor.png"
                  selected={companyType === 'civil'}
                  onSelect={() => {
                    setCompanyType('civil');
                    goTo(2);
                  }}
                />
                <SetupCard
                  title="Plant hire"
                  body="Wet hire on jobs with day dockets"
                  image="/icons-pricing/Plant-hire.png"
                  selected={companyType === 'plant_hire'}
                  onSelect={() => {
                    setCompanyType('plant_hire');
                    goTo(2);
                  }}
                />
              </div>
              <p className="mt-6 text-base font-semibold leading-relaxed text-[#111827]">
                You can change it whenever you want in the app.
              </p>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-xl font-bold tracking-tight text-[#111827]">About your company</h3>
              <ChoiceGroup
                label="How many machines do you have?"
                options={MACHINE_SIZES}
                value={machines}
                onChange={(value) => {
                  setMachines(value);
                  setError('');
                }}
              />
              <ChoiceGroup
                label="How many employees do you have?"
                options={EMPLOYEE_SIZES}
                value={employees}
                onChange={(value) => {
                  setEmployees(value);
                  setError('');
                }}
              />
              <label className="mt-6 block text-sm font-medium text-gray-700">
                Company name
                <input
                  type="text"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                  className={`${inputClass} mt-2`}
                  placeholder="ABC Civil"
                />
              </label>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                <label>
                  Website
                  <input
                    type="text"
                    name="company_website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={companyWebsite}
                    onChange={(event) => setCompanyWebsite(event.target.value)}
                  />
                </label>
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[#111827]">Create your account</h3>
              <label className="block text-sm font-medium text-gray-700">
                Name
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className={`${inputClass} mt-2`}
                  placeholder="John Smith"
                  autoComplete="name"
                  disabled={loading}
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={`${inputClass} mt-2`}
                  placeholder="you@company.com"
                  autoComplete="email"
                  disabled={loading}
                />
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Password
                <span className="relative mt-2 block">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className={`${inputClass} pr-11`}
                    placeholder="Create a secure password"
                    autoComplete="new-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    disabled={loading}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </span>
              </label>
              <label className="block text-sm font-medium text-gray-700">
                Australian phone
                <input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className={`${inputClass} mt-2`}
                  placeholder="e.g. 0400 123 456"
                  autoComplete="tel"
                  required
                  disabled={loading}
                />
              </label>
              <label className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(event) => {
                    setTermsAccepted(event.target.checked);
                    setError('');
                  }}
                  className="mt-1 h-4 w-4 rounded border-gray-300 accent-[#F97316]"
                  disabled={loading}
                />
                <span className="text-sm text-gray-700">
                  I agree to the{' '}
                  <Link href="/terms" target="_blank" rel="noopener noreferrer" className="text-[#F97316] hover:underline">
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" target="_blank" rel="noopener noreferrer" className="text-[#F97316] hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => goTo(2)}
                  disabled={loading}
                  className="rounded-full px-5 py-3 text-sm font-semibold text-[#57534E]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading || !termsAccepted}
                  className="flex-1 rounded-full bg-[#F97316] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#EA580C] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? 'Creating Organisation...' : 'Start free trial'}
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <>
              {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
              <div className="mt-6 flex items-center gap-3">
                {step === 2 && (
                  <button
                    type="button"
                    onClick={() => goTo(1)}
                    className="rounded-full px-5 py-3 text-sm font-semibold text-[#57534E]"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => continueFrom(step)}
                  className="flex-1 rounded-full bg-[#F97316] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#EA580C]"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          <p className="mt-4 text-center text-xs text-gray-500">✓ No credit card required • ✓ 14 days free • ✓ Full access to all features</p>
        </div>
      </div>
    </>
  );
}

function SetupCard({
  title,
  body,
  image,
  selected,
  onSelect,
}: {
  title: string;
  body: string;
  image: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex min-h-[168px] flex-col rounded-2xl border p-6 text-left transition-all ${
        selected ? 'border-[#F97316] bg-[#F97316]/10' : 'border-gray-200 hover:border-[#F97316]/50'
      }`}
    >
      <span className="flex items-start justify-between gap-3">
        <span className="text-base font-semibold text-[#111827]">{title}</span>
        <OptimizedImage src={image} alt="" width={64} height={64} className="h-14 w-14 shrink-0 object-contain" />
      </span>
      <span className="mt-2 text-sm leading-relaxed text-[#57534E]">{body}</span>
    </button>
  );
}

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly { value: SizeValue; label: string }[];
  value: SizeValue | '';
  onChange: (value: SizeValue) => void;
}) {
  return (
    <fieldset className="mt-6">
      <legend className="text-sm font-medium text-gray-700">{label}</legend>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {options.map((option) => {
          const selected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className={`rounded-xl border px-3 py-4 text-sm font-semibold transition-all ${
                selected ? 'border-[#F97316] bg-[#F97316]/10 text-[#C2410C]' : 'border-gray-200 text-[#111827] hover:border-[#F97316]/50'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
