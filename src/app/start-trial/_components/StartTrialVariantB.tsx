'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import StartTrialQuizForm from './StartTrialQuizForm';
import TrialExperimentBeacon from './TrialExperimentBeacon';
import { trackTrialExperiment } from '@/lib/trialExperimentClient';

const TESTIMONIALS = [
  {
    name: 'Harry',
    company: 'HLM Earthworks',
    quote:
      'Pulling hours out of the paper logbook and typing it all up used to take me half a day. It’s all on the phone now and it’s done in 20 minutes.',
    logoSrc: '/variant-b/2.png',
  },
  {
    name: 'Reece',
    company: 'Glade Civil',
    quote:
      'The supervisor signs off the day docket on site and it goes straight through. No more chasing operators for paperwork.',
    logoSrc: '/variant-b/1.png',
  },
  {
    name: 'Cirsty',
    company: "Bono's Excavations",
    quote: "Out of everything we've tried, CivDocs is the best system out there.",
    logoSrc: '/variant-b/3.png',
  },
];

const CAROUSEL_TOP = [
  { name: 'Jacko', company: 'Elev8 Earthworks', quote: 'My bookkeeper loves it.', logoSrc: '/homepage_logos/2.png' },
  { name: 'Nikola', company: 'Jovex Group', quote: 'I can actually see how many loads my trucks are doing, and invoicing off it is straightforward now.', logoSrc: '/logos-testomonials/10.png' },
  { name: 'Ryan', company: 'Campbell Earthmoving', quote: 'CivDocs saves us around 30 hours of admin every week — I can spend that time on site instead of stuck behind a desk.', logoSrc: '/homepage_logos/6.png' },
  { name: 'Morgan', company: 'Fogarty Earthmoving', quote: "Makes it easy to keep track of where I've been working — and makes sure I never forget to invoice hours or attachments.", logoSrc: '/homepage_logos/5.png' },
];

const CAROUSEL_BOTTOM = [
  { name: 'John Lynch', company: 'JAL Civil Earthworks', quote: 'Day dockets are perfect for what we do. The supervisor and the office get a copy at the end of each day, so everyone is on the same page.', logoSrc: '/capability-statement/Jal.png' },
  { name: 'Riley', company: 'RMF Concreting', quote: "Being able to track costs between the earthworks and concrete sides of a project — so I can see exactly where we're making money.", logoSrc: '/capability-statement/rmf.png' },
  { name: 'Colby', company: 'Ali Excavations', quote: "We're a small crew and don't have admin staff. This took care of something we always put off.", logoSrc: '/capability-statement/ali.png' },
  { name: 'Riley', company: 'RJ Piling', quote: "Dead simple to use. Answer a few questions and the report's done. No mucking around.", logoSrc: '/capability-statement/rj.png' },
];

const FAQ = [
  {
    q: 'Is there a free trial?',
    a: 'Yes. 14 days, no credit card required. Add your projects, machines and crew — then start with one live job. No complex onboarding. Just mirror how you already run work.',
  },
  {
    q: 'Will my operators actually use it?',
    a: 'CivDocs is built for site use — big buttons, minimal steps, no clutter. If someone can use basic apps on their phone, they can use this. Most crews pick it up in minutes because it mirrors how they already think about their day.',
  },
  {
    q: 'Who can see the data?',
    a: "There are three access levels. Employees log their own hours and pre-starts only. Supervisors approve submissions and see their projects. Admins have full visibility and control. Operators can't see sensitive rates or business-wide data. You control access.",
  },
  {
    q: 'Can we cancel anytime?',
    a: "Yes. No lock-in contracts. Cancel during the trial and you won't be charged. Not happy? We'll refund you — no questions asked.",
  },
  {
    q: 'Can I test it without the whole team?',
    a: 'Yes. Start with just yourself or one supervisor. Get comfortable with the system before rolling it out to crew.',
  },
  {
    q: 'How do service reminders work?',
    a: "You get a reminder when a machine is due for a service, and every service is kept in that machine's full history.",
  },
  {
    q: 'Who signs the day dockets?',
    a: "The supervisor signs them off, then they're sent.",
  },
];

/** Held back until the answers are confirmed. */
const UNCONFIRMED_FAQ = [
  { q: 'TODO(confirm): Does it work offline on remote sites?', a: '' },
  { q: 'TODO(confirm): Can existing logbooks be moved across?', a: '' },
];
const SHOW_UNCONFIRMED_FAQ = false;

const COPIES = 3;
const ROW_GAP = 20;

function wrapScroll(value: number, setWidth: number) {
  if (setWidth <= 0) return value;
  let next = value;
  while (next >= setWidth) next -= setWidth;
  while (next < 0) next += setWidth;
  return next;
}

function GrabRow({
  children,
  reverse = false,
  duration = 55,
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  const firstSet = useRef<HTMLDivElement>(null);
  const drag = useRef({
    active: false,
    locked: false,
    pointerId: -1,
    startX: 0,
    startY: 0,
    origin: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
  });
  const coast = useRef(0);
  const position = useRef(0);
  const freed = useRef(false);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    let alive = true;
    let last = performance.now();
    if (reverse) position.current = (firstSet.current?.offsetWidth ?? 0) + ROW_GAP;

    const tick = (now: number) => {
      if (!alive) return;
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      const setWidth = (firstSet.current?.offsetWidth ?? 0) + ROW_GAP;
      const coasting = Math.abs(coast.current) > 12;
      const paused = drag.current.active || setWidth <= 0 || (freed.current && !coasting);
      if (!paused) {
        const delta = coasting ? coast.current : (reverse ? -1 : 1) * (setWidth / duration);
        if (coasting) coast.current *= Math.exp(-2.4 * dt);
        else coast.current = 0;
        position.current = wrapScroll(position.current + delta * dt, setWidth);
        el.scrollLeft = position.current;
      }
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => {
      alive = false;
    };
  }, [duration, reverse]);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      drag.current = {
        active: true,
        locked: false,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        origin: el.scrollLeft,
        lastX: event.clientX,
        lastT: performance.now(),
        velocity: 0,
      };
      coast.current = 0;
      position.current = el.scrollLeft;
    };

    const onMove = (event: PointerEvent) => {
      const state = drag.current;
      if (!state.active || event.pointerId !== state.pointerId) return;
      const dx = event.clientX - state.startX;
      const dy = event.clientY - state.startY;
      if (!state.locked) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        if (Math.abs(dy) > Math.abs(dx)) {
          state.active = false;
          return;
        }
        state.locked = true;
        el.setPointerCapture(event.pointerId);
      }
      if (event.cancelable) event.preventDefault();
      const now = performance.now();
      const stepDt = now - state.lastT;
      if (stepDt > 0) {
        const instant = -(event.clientX - state.lastX) / (stepDt / 1000);
        const blended = state.velocity * 0.65 + instant * 0.35;
        state.velocity = Math.max(-1800, Math.min(1800, blended));
      }
      state.lastX = event.clientX;
      state.lastT = now;
      const setWidth = (firstSet.current?.offsetWidth ?? 0) + ROW_GAP;
      position.current = wrapScroll(state.origin - dx, setWidth);
      el.scrollLeft = position.current;
    };

    const onUp = (event: PointerEvent) => {
      const state = drag.current;
      if (!state.active || event.pointerId !== state.pointerId) return;
      state.active = false;
      position.current = el.scrollLeft;
      if (state.locked) {
        freed.current = true;
        coast.current = state.velocity;
      }
      if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, []);

  return (
    <div
      ref={scroller}
      className="flex cursor-grab touch-pan-y select-none overflow-x-hidden px-1 py-7 active:cursor-grabbing"
      style={{ gap: ROW_GAP }}
    >
      {Array.from({ length: COPIES }, (_, copy) => (
        <div key={copy} ref={copy === 0 ? firstSet : undefined} className="flex shrink-0" style={{ gap: ROW_GAP }}>
          {children}
        </div>
      ))}
    </div>
  );
}

function logoFrame(logoSrc: string) {
  if (logoSrc.endsWith('6.png')) {
    return { box: 'h-11 w-[4.5rem] rounded-xl bg-white', image: 'h-full w-full object-cover object-center', width: 144, height: 88 };
  }
  if (logoSrc.endsWith('10.png')) {
    return { box: 'h-12 w-[7.75rem] rounded-xl bg-white', image: 'h-full w-full object-contain', width: 186, height: 96 };
  }
  if (logoSrc.endsWith('rj.png')) {
    return { box: 'h-10 w-[9.25rem] rounded-xl bg-black', image: 'h-full w-full object-cover object-center', width: 222, height: 80 };
  }
  if (logoSrc.endsWith('5.png')) {
    return {
      box: 'h-16 w-16 rounded-full bg-black',
      image: 'h-full w-full scale-[1.04] object-contain',
      width: 256,
      height: 256,
    };
  }
  return { box: 'h-14 w-14 rounded-xl bg-[#111827]', image: 'h-full w-full object-cover', width: 112, height: 112 };
}

function SlideCard({
  name,
  company,
  quote,
  logoSrc,
}: {
  name: string;
  company: string;
  quote: string;
  logoSrc: string;
}) {
  const frame = logoFrame(logoSrc);

  return (
    <article className="flex h-[17.5rem] w-[min(86vw,360px)] shrink-0 flex-col rounded-[24px] bg-white p-6 shadow-[0_8px_16px_-12px_rgba(15,23,42,0.45)] ring-1 ring-black/[0.05]">
      <blockquote className="flex-1 text-[16px] font-semibold leading-snug tracking-tight text-[#111827] sm:text-[17px]">
        “{quote}”
      </blockquote>
      <div className="mt-5 flex items-center gap-3 border-t border-[#E7E5E4] pt-4">
        <span className={`flex shrink-0 items-center justify-center overflow-hidden ring-1 ring-black/[0.06] ${frame.box}`}>
          <Image
            src={logoSrc}
            alt=""
            width={frame.width}
            height={frame.height}
            draggable={false}
            className={frame.image}
          />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#111827]">{name}</p>
          <p className="truncate text-xs text-[#78716C]">{company}</p>
        </div>
      </div>
    </article>
  );
}

function scrollToForm() {
  trackTrialExperiment('cta_click');
  document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' });
}

export default function StartTrialVariantB() {
  const [open, setOpen] = useState<number | null>(null);
  const questions = SHOW_UNCONFIRMED_FAQ ? [...FAQ, ...UNCONFIRMED_FAQ] : FAQ;

  return (
    <div className="min-h-screen bg-[#FFFEFB] text-[#111827]">
      <TrialExperimentBeacon />

      <section className="px-4 pb-2 pt-6 text-center sm:px-6 sm:pt-10">
        <div className="mx-auto max-w-3xl">
          <Image
            src="/variant-b/prestart-cab.jpg"
            alt="Pre-start checklist open on a phone in the cab"
            width={768}
            height={1024}
            priority
            className="mx-auto w-full max-w-[440px] rounded-[28px] shadow-[0_24px_50px_-28px_rgba(15,23,42,0.45)]"
          />
          <h1 className="mt-8 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">Ditch the paper chaos.</h1>
          <p className="mx-auto mt-5 max-w-3xl text-xl font-medium leading-snug text-[#1C1917] sm:text-[1.7rem]">
            Pre-starts, timesheets, digital day dockets and a full service history for every machine. All in one app, built for civil.
          </p>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col rounded-[28px] bg-white p-7 shadow-[0_24px_50px_-28px_rgba(15,23,42,0.35)] ring-1 ring-black/[0.04]"
            >
              <blockquote className="flex-1 text-lg font-semibold leading-snug text-[#111827] sm:text-xl">“{item.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-[#E7E5E4] pt-5">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-black/[0.06]">
                  <Image
                    src={item.logoSrc}
                    alt=""
                    width={112}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{item.name}</span>
                  <span className="block text-xs text-[#78716C]">{item.company}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="px-2 pb-20 pt-2 sm:px-4 sm:pb-28">
        <div className="mx-auto w-full max-w-[800px]">
          <StartTrialQuizForm />
        </div>
      </section>

      <section className="overflow-hidden py-10 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]">
        <div className="space-y-1">
          <GrabRow>
            {CAROUSEL_TOP.map((card) => (
              <SlideCard key={card.company} {...card} />
            ))}
          </GrabRow>
          <GrabRow reverse duration={62}>
            {CAROUSEL_BOTTOM.map((card) => (
              <SlideCard key={card.company} {...card} />
            ))}
          </GrabRow>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight">Common questions</h2>
          <div className="mt-5 space-y-2">
            {questions.map((item, index) => {
              const isOpen = open === index;
              return (
                <div key={item.q} className="rounded-2xl border border-[#E7E5E4] bg-white">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-semibold"
                  >
                    {item.q}
                    <span className="text-[#A8A29E]">{isOpen ? '–' : '+'}</span>
                  </button>
                  {isOpen && <p className="px-5 pb-4 text-sm leading-relaxed text-[#57534E]">{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 text-center sm:px-6">
        <button
          type="button"
          onClick={scrollToForm}
          className="inline-flex items-center justify-center rounded-full bg-[#F97316] px-8 py-4 font-semibold text-white shadow-[0_14px_30px_-12px_rgba(249,115,22,0.8)]"
        >
          Start free trial
        </button>
        <p className="mt-4 text-sm text-[#57534E]">No credit card required. 14 days free. Full access to all features.</p>
      </section>
    </div>
  );
}
