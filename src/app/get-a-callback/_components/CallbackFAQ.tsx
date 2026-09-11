'use client';

import { useState } from 'react';

const FAQ_ITEMS = [
  {
    question: 'Is there a free trial?',
    answer: (
      <>
        <p>Yes. 14 days, no credit card required.</p>
        <p>Add your projects, machines and crew — then start with one live job. No complex onboarding. Just mirror how you already run work.</p>
      </>
    ),
  },
  {
    question: 'What happens after I request a call back?',
    answer: (
      <>
        <p>Darcy calls you. That&apos;s it.</p>
        <p>No demo script and no slide deck. A straight conversation about how you&apos;re doing admin now and whether CivDocs would save you time.</p>
      </>
    ),
  },
  {
    question: 'Can I test this without involving the whole team?',
    answer: (
      <>
        <p>Yes. Trial it with one job or a small group first — no full rollout required.</p>
        <p>Test it properly, then decide.</p>
      </>
    ),
  },
  {
    question: 'Who can see the data?',
    answer: (
      <>
        <p>Three access levels:</p>
        <ul>
          <li><strong>Employees</strong> log their own hours and pre-starts only.</li>
          <li><strong>Supervisors</strong> approve submissions and see their projects.</li>
          <li><strong>Admins</strong> get full visibility and control.</li>
        </ul>
        <p>Operators can&apos;t see sensitive rates or business-wide data. You control access.</p>
      </>
    ),
  },
  {
    question: 'Can we cancel anytime?',
    answer: (
      <>
        <p>Yes. No lock-in contracts. Cancel during the trial and you won&apos;t be charged.</p>
        <p>Not happy? We&apos;ll refund you — no questions asked.</p>
      </>
    ),
  },
  {
    question: 'Do older operators struggle with the app?',
    answer: (
      <>
        <p>That was one of the biggest concerns we heard early on.</p>
        <p>CivDocs is built for site use — big buttons, minimal steps, no clutter. If someone can use basic apps on their phone, they can use this. Most crews pick it up in minutes because it mirrors how they already think about their day.</p>
      </>
    ),
  },
];

export default function CallbackFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.22em] text-[#FF8C32]">
          Before the call
        </p>
        <h2 className="mt-3 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Common questions
        </h2>

        <div className="mt-10 border-t border-gray-200/80 sm:mt-12">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.question} className="border-b border-gray-200/80">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-start justify-between gap-6 py-6 text-left sm:py-7"
                >
                  <span
                    className={`text-xl font-semibold leading-snug tracking-tight transition-colors sm:text-[1.65rem] ${
                      isOpen ? 'text-gray-900' : 'text-gray-800 group-hover:text-gray-900'
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center text-2xl font-light leading-none transition-colors sm:mt-1.5 ${
                      isOpen ? 'text-[#FF8C32]' : 'text-gray-400 group-hover:text-gray-700'
                    }`}
                    aria-hidden
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-3 pb-7 text-lg leading-relaxed text-slate-600 sm:pb-8 sm:text-xl sm:leading-relaxed [&_strong]:font-semibold [&_strong]:text-gray-800 [&_ul]:mt-1 [&_ul]:space-y-1.5">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
