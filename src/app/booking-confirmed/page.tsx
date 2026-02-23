import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import DarcyPhoto from '@/components/marketing/DarcyPhoto';

export const metadata: Metadata = {
  title: "You're booked — CivDocs",
  description: 'Your CivDocs fit check is confirmed. See you on the call.',
};

const CALL_BULLETS = [
  "We'll look at how your business is currently running jobs and tracking costs.",
  "I'll show you where CivDocs plugs in — timesheets, plant hours, the logbook.",
  "You ask whatever you want. If it's not a fit, I'll tell you straight.",
];

export default function BookingConfirmedPage() {
  return (
    <>
      <Header />

      <main className="bg-[#F8F9FA] min-h-screen pt-[130px] pb-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">

          {/* ── Success badge ───────────────────────────────────── */}
          <div className="flex justify-center mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <svg
                className="h-8 w-8 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* ── Headline ────────────────────────────────────────── */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              You&apos;re booked — see you soon
            </h1>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Check your email for the calendar invite. No prep needed — just show up and
              we&apos;ll have a straight-up chat about whether CivDocs is a fit.
            </p>
          </div>

          {/* ── What to expect card ─────────────────────────────── */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#FF8C32] mb-4">
              What to expect on the call
            </p>
            <ul className="space-y-3">
              {CALL_BULLETS.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-sm text-gray-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs font-bold">
                    ✓
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Darcy intro ─────────────────────────────────────── */}
          <div className="flex items-center gap-4 mb-8 px-1">
            <DarcyPhoto />
            <div>
              <p className="font-semibold text-gray-900 text-sm">Darcy</p>
              <p className="text-sm text-slate-500">Founder, CivDocs</p>
            </div>
          </div>

          {/* ── Capability statement CTA ────────────────────────── */}
          <div className="rounded-2xl border border-[#FF8C32]/30 bg-orange-50 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#FF8C32] mb-2">
              While you wait
            </p>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Generate your capability statement
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-5">
              Takes about 2 minutes. Plug in your business details and get a professional
              capability statement you can send to clients straight away — no design skills
              needed.
            </p>
            <Link
              href="/capability-statement"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FF8C32] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#e67c28] transition-colors"
            >
              Try it free →
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
