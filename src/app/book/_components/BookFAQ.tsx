'use client';

import { useState, Suspense } from 'react';
import CalendlyPopupButton from '@/components/marketing/CalendlyPopupButton';

const FAQ_ITEMS = [
  {
    num: '1',
    question: 'Is there a free trial?',
    answer: (
      <>
        <p className="font-medium text-gray-900">Yes. 14 days, no credit card required.</p>
        <p className="mt-2 text-gray-600">
          Add your projects, machines and crew — then start with one live job.
        </p>
        <p className="mt-2 text-gray-600">
          No complex onboarding. Just mirror how you already run work.
        </p>
      </>
    ),
  },
  {
    num: '2',
    question: 'Can I test this without involving the whole team?',
    answer: (
      <>
        <p className="font-medium text-gray-900">Yes.</p>
        <p className="mt-2 text-gray-600">
          You can trial it with one job or a small group first. No full rollout required.
        </p>
        <p className="mt-2 text-gray-600">Test it properly, then decide.</p>
      </>
    ),
  },
  {
    num: '3',
    question: 'Who can see the data? (Access Levels)',
    answer: (
      <>
        <p className="font-medium text-gray-900">There are three access levels:</p>
        <ul className="mt-2 space-y-1.5 text-gray-600">
          <li><strong className="text-gray-800">Employees</strong> – log their own hours and pre-starts only.</li>
          <li><strong className="text-gray-800">Supervisors</strong> – approve submissions and see their projects.</li>
          <li><strong className="text-gray-800">Admins</strong> – full visibility and control.</li>
        </ul>
        <p className="mt-2 text-gray-600">
          Operators can&apos;t see sensitive rates or business-wide data. You control access.
        </p>
      </>
    ),
  },
  {
    num: '4',
    question: 'Can we cancel anytime?',
    answer: (
      <>
        <p className="font-medium text-gray-900">Yes.</p>
        <p className="mt-2 text-gray-600">
          There are no lock-in contracts. Cancel during the trial and you won&apos;t be charged.
        </p>
        <p className="mt-2 text-gray-600">
          Not happy? We&apos;ll refund you — no questions asked. If it&apos;s not the right fit, you can stop anytime.
        </p>
      </>
    ),
  },
  {
    num: '5',
    question: 'Do older operators struggle with the app?',
    answer: (
      <>
        <p className="text-gray-600">
          That was one of the biggest concerns we heard early on.
        </p>
        <p className="mt-2 text-gray-600">
          CivDocs is built for site use — big buttons, minimal steps, no clutter.
        </p>
        <p className="mt-2 text-gray-600">
          If someone can use basic apps on their phone, they can use this. Most crews pick it up in minutes because it mirrors how they already think about their day.
        </p>
      </>
    ),
  },
];

export default function BookFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mt-16 sm:mt-20">
      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Common questions
      </h2>
      <p className="mt-2 text-gray-600">
        Quick answers before you book.
      </p>

      <div className="mt-8 space-y-4">
        {FAQ_ITEMS.map((item, i) => (
          <div
            key={item.num}
            className={`rounded-2xl overflow-hidden transition-all duration-300 ${
              openIndex === i
                ? 'bg-white shadow-lg shadow-gray-200/50 ring-1 ring-[#FF8C32]/20'
                : 'bg-white/80 shadow-md shadow-gray-100 hover:shadow-lg hover:ring-1 hover:ring-[#FF8C32]/10'
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-gray-50/50"
            >
              <span className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF8C32]/15 to-[#F5B041]/10 text-base font-bold text-[#FF8C32] ring-1 ring-[#FF8C32]/20">
                  {item.num}
                </span>
                <span className="font-semibold text-gray-900 text-base">{item.question}</span>
              </span>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                openIndex === i ? 'bg-[#FF8C32]/10 text-[#FF8C32]' : 'bg-gray-100 text-gray-500'
              }`}>
                <svg
                  className={`h-5 w-5 transition-transform duration-200 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
            {openIndex === i && (
              <div className="border-t border-gray-100 bg-gradient-to-b from-gray-50/50 to-white px-6 pb-6 pt-4">
                <div className="pl-14 text-sm leading-relaxed text-gray-600">
                  {item.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Suspense fallback={
          <a
            href="https://calendly.com/darcy-civdocs/30min?primary_color=FF8C32"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-14 py-5 sm:px-16 sm:py-6 bg-[#FF8C32] hover:bg-[#E67E22] text-white font-bold text-xl rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl animate-button-pulse"
          >
            Book a Call
          </a>
        }>
          <CalendlyPopupButton className="inline-flex items-center justify-center px-14 py-5 sm:px-16 sm:py-6 bg-[#FF8C32] hover:bg-[#E67E22] text-white font-bold text-xl rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl animate-button-pulse">
            Book a Call
          </CalendlyPopupButton>
        </Suspense>
      </div>
    </section>
  );
}
