'use client';

import { useEffect, useState } from 'react';
import { getStoredAttributionForSignup } from '@/lib/marketingAttribution';
import { trackLeadFormSubmitted } from '@/lib/metaPixel';
import BookVideoPlayer from '@/app/book/_components/BookVideoPlayer';

const inputClass =
  'w-full rounded-xl border border-gray-300 px-4 py-3.5 text-base text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#FF8C32] disabled:opacity-60';

export default function CallbackForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [timeSink, setTimeSink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!submitted) return;
    document.getElementById('callback-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = e.currentTarget;
    const gotcha = (form.elements.namedItem('_gotcha') as HTMLInputElement | null)?.value ?? '';

    try {
      const response = await fetch('/api/get-a-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          mobile,
          companyName,
          timeSink,
          attribution: getStoredAttributionForSignup(),
          _gotcha: gotcha,
        }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || 'Something went wrong. Please try again.');
        setLoading(false);
        return;
      }

      trackLeadFormSubmitted(data.id);
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-[1.75rem] font-bold leading-[1.15] tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
          Still doing civil paperwork at night?
        </h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600 sm:mt-4 sm:text-lg">
          {submitted
            ? "We'll call you shortly — watch this first so you know what we'll go over."
            : "Fill this in, we'll call you."}
        </p>
      </header>

      <div className="mt-6 sm:mt-8">
        {submitted ? (
          <div className="space-y-5">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-xl sm:p-8">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                <svg className="h-7 w-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Thanks — we&apos;ll call you shortly</h2>
              <p className="mt-3 text-base leading-relaxed text-slate-600">
                Keep your phone handy. Darcy will call you on {mobile || 'the number you left'}.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xl sm:p-6">
              <h3 className="text-center text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                Get a better picture of what we&apos;ll go over on your call
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-center text-base leading-relaxed text-slate-600">
                Watch this short walkthrough first. It covers how CivDocs works, so our call can skip the fluff and go straight into your setup.
              </p>
              <div className="mt-5">
                <BookVideoPlayer />
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-2xl border border-gray-100 bg-white p-5 shadow-xl sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputClass}
                    placeholder="John"
                    required
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={inputClass}
                    placeholder="Smith"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mobile" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  id="mobile"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={inputClass}
                  placeholder="0412 345 678"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="companyName" className="mb-1.5 block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  id="companyName"
                  type="text"
                  autoComplete="organization"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={inputClass}
                  placeholder="Wilson Earthmoving"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="timeSink" className="mb-1.5 block text-sm font-medium text-gray-700">
                  What&apos;s eating the most time right now? <span className="font-normal text-gray-400">(optional)</span>
                </label>
                <input
                  id="timeSink"
                  type="text"
                  value={timeSink}
                  onChange={(e) => setTimeSink(e.target.value)}
                  className={inputClass}
                  placeholder="Invoicing, timesheets, chasing operators…"
                  disabled={loading}
                />
              </div>

              {error && <p className="text-sm font-medium text-red-600">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-[#FF8C32] px-6 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-[#E67E22] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Sending…' : 'Submit'}
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
