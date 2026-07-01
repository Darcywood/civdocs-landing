'use client';

import { useState, Suspense, useEffect } from 'react';
import Image from 'next/image';
import { Marquee } from '@/components/ui/marquee';
import { TestimonialCard } from '@/app/capability-statement/_components/TestimonialCard';
import StartTrialForm from './_components/StartTrialForm';

const ORANGE = '#F97316';

const TOP_ROW_CARDS = [
  { name: 'Harry', company: 'HLM Earthworks', quote: "End of month invoicing takes 20 minutes, not half a day.", logoSrc: '/logos-testomonials/hlm.png' },
  { name: 'Jacko', company: 'Elev8 Earthworks', quote: "My bookkeeper loves it.", logoSrc: '/homepage_logos/2.png' },
];

const BOTTOM_ROW_CARDS = [
  { name: 'Matt', company: 'Roughans Haulage', quote: "Perfect user friendly scheduling and day docket system.", logoSrc: '/homepage_logos/1.png' },
  { name: 'Reece', company: 'Glade Civil', quote: "Perfect for tracking UTS/GPS and float movements.", logoSrc: '/logos-testomonials/gladelogo.png' },
];
const FAQ_ITEMS = [
  {
    num: '1',
    q: 'Is there a free trial?',
    a: 'Yes. 14 days, no credit card required. Add your projects, machines and crew — then start with one live job. No complex onboarding. Just mirror how you already run work.',
  },
  {
    num: '2',
    q: 'Will my operators actually use it?',
    a: "That was one of the biggest concerns we heard early on. CivDocs is built for site use — big buttons, minimal steps, no clutter. If someone can use basic apps on their phone, they can use this. Most crews pick it up in minutes because it mirrors how they already think about their day.",
  },
  {
    num: '3',
    q: 'Who can see the data?',
    a: "There are three access levels. Employees log their own hours and pre-starts only. Supervisors approve submissions and see their projects. Admins have full visibility and control. Operators can't see sensitive rates or business-wide data. You control access.",
  },
  {
    num: '4',
    q: 'Can we cancel anytime?',
    a: 'Yes. No lock-in contracts. Cancel during the trial and you won\'t be charged. Not happy? We\'ll refund you — no questions asked.',
  },
  {
    num: '5',
    q: 'Can I test it without the whole team?',
    a: 'Yes. Start with just yourself or one supervisor. Get comfortable with the system before rolling it out to crew.',
  },
];

function scrollToForm() {
  document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' });
}

function StartTrialWarmupContent() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  useEffect(() => {
    if (window.location.hash === '#signup-form') {
      const el = document.getElementById('signup-form');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, []);

  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{
        background: 'linear-gradient(to bottom, #ffffff 0%, #fefaf8 15%, #FFF5ED 35%, #FFF5ED 65%, #faf9f8 85%, #f3f4f6 100%)',
      }}
    >
      {/* Hero */}
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-20 px-4 sm:px-6">
        <div className="mx-auto max-w-[680px] text-center">
          <div className="w-14 h-14 mx-auto mb-8 flex items-center justify-center">
            <Image src="/CivDocs 500x500.svg" alt="CivDocs" width={56} height={56} className="w-14 h-14" />
          </div>
          <h1 className="text-[3.4rem] sm:text-[4.59rem] md:text-[4.59rem] lg:text-[5.5rem] xl:text-[6.5rem] font-bold text-gray-900 leading-[1.05] tracking-tight mx-auto">
            Every Missed Hour Is Money You&apos;ll Never See Again.
          </h1>
          <p className="mt-8 sm:mt-10 text-[1.5125rem] sm:text-[1.815rem] lg:text-[1.75rem] text-slate-700 leading-relaxed max-w-3xl mx-auto">
            CivDocs captures every machine hour, overtime, and attachment on site — then turns it straight into invoices. No missed charges. No disputes. No chasing operators for paperwork.
          </p>
          <p className="mt-4 text-[1.5125rem] sm:text-[1.815rem] lg:text-[1.75rem] text-slate-700 leading-relaxed max-w-3xl mx-auto">
            Built for plant hire companies and civil contractors across Australia.
          </p>
          <button
            onClick={scrollToForm}
            className="mt-10 inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white transition-all hover:opacity-95 shadow-lg"
            style={{ backgroundColor: ORANGE }}
          >
            Start Free Trial — No Credit Card Needed
          </button>
          <p className="mt-4 text-xs text-gray-500">14 days free. Cancel anytime.</p>
        </div>
      </section>

      {/* Social proof — Trusted by civil contractors */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight text-center">
            Trusted by civil contractors across Australia
          </h2>
          <div className="mt-8 mx-auto max-w-[600px] lg:max-w-full space-y-4 overflow-hidden" style={{ touchAction: 'pan-y' }}>
            <Marquee className="[--duration:25s] [--gap:1.5rem]" reverse={false} pauseOnHover>
              {TOP_ROW_CARDS.map((card) => (
                <TestimonialCard key={`${card.name}-${card.company}`} {...card} />
              ))}
            </Marquee>
            <Marquee className="[--duration:25s] [--gap:1.5rem]" reverse pauseOnHover>
              {BOTTOM_ROW_CARDS.map((card) => (
                <TestimonialCard key={`${card.name}-${card.company}`} {...card} />
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* What changes */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight text-center mb-12">What actually changes.</h2>
          <div className="flex flex-col gap-6">
            <div className="rounded-[14px] overflow-hidden border-[0.5px] border-gray-200 bg-white py-7 px-6">
              <p className="text-[43px] font-bold leading-none mb-3" style={{ color: '#D85A30' }}>01</p>
              <h3 className="text-[18px] font-semibold text-gray-900 mb-3">From logbooks to invoices — without the retyping.</h3>
              <div className="w-[29px] h-[1.8px] bg-gray-300 mb-3" />
              <p className="text-[15.6px] text-gray-500 leading-relaxed mb-2">Hours stuck in notebooks mean hours retyped into invoices — and that&apos;s where charges get missed or wrong.</p>
              <p className="text-[15.6px] text-gray-900 leading-relaxed">CivDocs captures approved hours and attachments on site, then it flows straight into billing — so you&apos;re not rebuilding the week from scratch and wasting valuable time.</p>
            </div>
            <div className="rounded-[14px] overflow-hidden border-[0.5px] border-gray-200 bg-white py-7 px-6">
              <p className="text-[43px] font-bold leading-none mb-3" style={{ color: '#D85A30' }}>02</p>
              <h3 className="text-[18px] font-semibold text-gray-900 mb-3">Labour, plant and materials cost — before the job&apos;s finished.</h3>
              <div className="w-[29px] h-[1.8px] bg-gray-300 mb-3" />
              <p className="text-[15.6px] text-gray-500 leading-relaxed mb-2">When labour, plant and materials live in different places, you only see the full picture after the job finishes.</p>
              <p className="text-[15.6px] text-gray-900 leading-relaxed">CivDocs rolls labour, plant and materials into one live view as the job runs — so you can spot blowouts and fix them while you still can.</p>
            </div>
            <div className="rounded-[14px] overflow-hidden border-[0.5px] border-gray-200 bg-white py-7 px-6">
              <p className="text-[43px] font-bold leading-none mb-3" style={{ color: '#D85A30' }}>03</p>
              <h3 className="text-[18px] font-semibold text-gray-900 mb-3">Payroll that doesn&apos;t eat your Friday.</h3>
              <div className="w-[29px] h-[1.8px] bg-gray-300 mb-3" />
              <p className="text-[15.6px] text-gray-500 leading-relaxed mb-2">Chasing timesheets at the end of the week is a tax on your whole operation.</p>
              <p className="text-[15.6px] text-gray-900 leading-relaxed">Operators submit from their phone. Supervisors approve in seconds. It&apos;s done before the week closes out.</p>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center">
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white transition-all hover:opacity-95 shadow-lg"
              style={{ backgroundColor: ORANGE }}
            >
              Start Free Trial — No Credit Card Needed
            </button>
            <p className="mt-4 text-xs text-gray-500">14 days free. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight text-center mb-12">What civil contractors say.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-full bg-gray-100">
                  <Image src="/logos-testomonials/hlm.png" alt="HLM Earthworks" width={48} height={48} className="object-cover w-full h-full" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Harry</p>
                  <p className="text-sm text-gray-500">HLM Earthworks, Brisbane</p>
                  <p className="text-xs text-gray-400 mt-0.5">Invoicing &amp; Xero integration</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">&quot;End of month used to take me half a day — pulling hours from the logbook, typing it all up, checking it twice. Now the approved hours flow straight into the invoice and it syncs to Xero. I&apos;m done in 20 minutes and I know it&apos;s right.&quot;</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-lg flex items-center justify-center" style={{ backgroundColor: '#111827' }}>
                  <Image src="/homepage_logos/2.png" alt="Elev8 Earthworks" width={48} height={48} className="object-contain w-full h-full" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Jacko</p>
                  <p className="text-sm text-gray-500">Elev8 Earthworks</p>
                  <p className="text-xs text-gray-400 mt-0.5">Civil contractor</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">&quot;My bookkeeper loves it.&quot;</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 shrink-0 overflow-hidden rounded-lg flex items-center justify-center" style={{ backgroundColor: '#1d355e' }}>
                  <Image src="/homepage_logos/1.png" alt="Roughans Haulage" width={48} height={48} className="object-contain w-full h-full" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Matt</p>
                  <p className="text-sm text-gray-500">Roughans Haulage</p>
                  <p className="text-xs text-gray-400 mt-0.5">Scheduling &amp; day dockets</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">&quot;Perfect user friendly scheduling and day docket system.&quot;</p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative h-12 w-12 shrink-0 flex items-center justify-center rounded-lg bg-gray-100">
                  <Image src="/logos-testomonials/gladelogo.png" alt="Glade Civil" width={48} height={48} className="object-contain w-full h-full" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Reece</p>
                  <p className="text-sm text-gray-500">Glade Civil</p>
                  <p className="text-xs text-gray-400 mt-0.5">Tier One infrastructure — multi-site machine tracking</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">&quot;We&apos;re running graders across Tier One infrastructure — night shifts, live rail corridors, multiple machines on multiple sites. Every hour and UTS attachment needs to be logged correctly or the invoice to the head contractor is wrong. CivDocs captures it on site, supervisor signs it off, and it goes straight to billing. No more chasing operators at the end of the week.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[680px]">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-10">Common questions.</h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = faqOpen === i;
              return (
                <div
                  key={item.num}
                  className={`rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm transition-all duration-300 ${
                    isOpen
                      ? 'shadow-lg shadow-orange-900/5 ring-1 ring-orange-200/60'
                      : 'shadow-sm hover:shadow-md hover:ring-1 hover:ring-gray-200/80'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setFaqOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl group"
                  >
                    <span
                      className={`text-lg font-semibold transition-colors duration-200 ${
                        isOpen ? 'text-orange-600' : 'text-gray-900 group-hover:text-orange-600'
                      }`}
                    >
                      {item.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-orange-50 group-hover:text-orange-600'
                      }`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      >
                        <path
                          d="M7 2v10M2 7h10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                    style={{ maxHeight: isOpen ? 600 : 0 }}
                  >
                    <div className="border-t border-orange-100/80 bg-gradient-to-b from-orange-50/40 to-transparent px-6 pb-6 pt-4">
                      <p className="text-[15px] leading-[1.75] text-gray-600">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Signup form */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="mx-auto max-w-[680px]">
          <StartTrialForm />
        </div>
      </section>
    </div>
  );
}

export default function StartTrialPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{
            background: 'linear-gradient(to bottom, #ffffff 0%, #fefaf8 15%, #FFF5ED 35%, #FFF5ED 65%, #faf9f8 85%, #f3f4f6 100%)',
          }}
        >
          <p className="text-gray-600">Loading...</p>
        </div>
      }
    >
      <StartTrialWarmupContent />
    </Suspense>
  );
}
