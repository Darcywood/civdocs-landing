'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

const STATES = [
  { id: 'QLD', label: 'Queensland' },
  { id: 'NSW', label: 'New South Wales' },
  { id: 'VIC', label: 'Victoria' },
  { id: 'ACT', label: 'Australian Capital Territory' },
  { id: 'TAS', label: 'Tasmania' },
  { id: 'SA', label: 'South Australia' },
  { id: 'NT', label: 'Northern Territory' },
  { id: 'WA', label: 'Western Australia' },
] as const;

const TOOLS = ['Excel', 'Paper', 'Other software'] as const;
const SIZES = ['1–5', '5–15', '15+'] as const;
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

const NEXT_PAGES = [
  {
    href: '/logbook',
    title: 'Logbook',
    body: 'See how crews log hours, dockets and plant.',
  },
  {
    href: '/civil-contractors',
    title: 'Civil contractors',
    body: 'How CivDocs runs day-to-day on a civil job.',
  },
  {
    href: '/free-tools/risk-assessment',
    title: 'Create a risk assessment',
    body: 'Build one free and download the PDF.',
  },
] as const;

const ZONE_STATE: Record<string, string> = {
  'Australia/Brisbane': 'QLD',
  'Australia/Lindeman': 'QLD',
  'Australia/Sydney': 'NSW',
  'Australia/Melbourne': 'VIC',
  'Australia/Hobart': 'TAS',
  'Australia/Currie': 'TAS',
  'Australia/Adelaide': 'SA',
  'Australia/Broken_Hill': 'SA',
  'Australia/Darwin': 'NT',
  'Australia/Perth': 'WA',
  'Australia/Eucla': 'WA',
};

type Slot = { startTime: string };
type SlotsResponse = { timeZone: string; slots: Slot[] };
type CallType = 'phone' | 'zoom';

const inputClass =
  'w-full appearance-none rounded-2xl border border-[#E7E5E4] bg-white bg-[length:16px] bg-[right_0.95rem_center] bg-no-repeat px-4 py-3.5 text-[15px] text-[#111827] outline-none transition placeholder:text-[#A8A29E] focus:border-[#FF8C32] focus:ring-4 focus:ring-[#FF8C32]/15 disabled:opacity-60';

const selectClass = `${inputClass} pr-11`;

function dayKey(iso: string, timeZone: string) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(iso));
}

function timeLabel(iso: string, timeZone: string) {
  return new Intl.DateTimeFormat('en-AU', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(iso));
}

function longDay(iso: string, timeZone: string) {
  return new Intl.DateTimeFormat('en-AU', {
    timeZone,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(iso));
}

function monthTitle(year: number, month: number, timeZone: string) {
  const sample = new Date(Date.UTC(year, month - 1, 15, 12));
  return new Intl.DateTimeFormat('en-AU', { timeZone, month: 'long', year: 'numeric' }).format(sample);
}

function weekdayMonday(year: number, month: number, day: number, timeZone: string) {
  const guess = Date.UTC(year, month - 1, day, 12);
  const formatted = dayKey(new Date(guess).toISOString(), timeZone);
  const [fy, fm, fd] = formatted.split('-').map(Number);
  const adjusted = guess + (Date.UTC(year, month - 1, day) - Date.UTC(fy, fm - 1, fd));
  const name = new Intl.DateTimeFormat('en-AU', { timeZone, weekday: 'short' }).format(new Date(adjusted));
  const index = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].indexOf(name);
  return index < 0 ? 0 : index;
}

function monthCells(year: number, month: number, timeZone: string) {
  const lead = weekdayMonday(year, month, 1, timeZone);
  const count = new Date(year, month, 0).getDate();
  const cells: Array<{ day: number; key: string } | null> = Array.from({ length: lead }, () => null);
  for (let day = 1; day <= count; day += 1) {
    cells.push({
      day,
      key: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    });
  }
  return cells;
}

function guessState() {
  if (typeof Intl === 'undefined') return '';
  return ZONE_STATE[Intl.DateTimeFormat().resolvedOptions().timeZone] ?? '';
}

interface BookCallButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function BookCallButton({ children, className }: BookCallButtonProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [state, setState] = useState('');
  const [slots, setSlots] = useState<SlotsResponse | null>(null);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsLoaded, setSlotsLoaded] = useState(false);
  const [slotsError, setSlotsError] = useState('');
  const [monthCursor, setMonthCursor] = useState(0);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentTool, setCurrentTool] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [callType, setCallType] = useState<CallType | ''>('');
  const [formError, setFormError] = useState('');
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const close = useCallback(() => {
    if (booking) return;
    setOpen(false);
  }, [booking]);

  const openModal = () => {
    setOpen(true);
    setState((current) => current || guessState());
  };

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  useEffect(() => {
    if (!open || !state) {
      setSlots(null);
      setSlotsError('');
      setSlotsLoading(false);
      return;
    }

    const controller = new AbortController();
    setSlotsLoading(true);
    setSlotsLoaded(false);
    setSlotsError('');

    fetch(`/api/book/slots?state=${encodeURIComponent(state)}`, {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = (await response.json().catch(() => ({}))) as SlotsResponse & { error?: string };
        if (!response.ok) {
          setSlots(null);
          setSlotsError(data.error || 'Could not load times.');
          return;
        }
        setSlots({ timeZone: data.timeZone, slots: data.slots ?? [] });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setSlots(null);
        setSlotsError('Could not load times.');
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setSlotsLoading(false);
          setSlotsLoaded(true);
        }
      });

    return () => controller.abort();
  }, [open, state, reloadKey]);

  const timeZone = slots?.timeZone || 'Australia/Brisbane';

  const byDay = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const slot of slots?.slots ?? []) {
      const key = dayKey(slot.startTime, timeZone);
      const list = map.get(key) ?? [];
      list.push(slot.startTime);
      map.set(key, list);
    }
    return map;
  }, [slots, timeZone]);

  const months = useMemo(() => {
    const seen = new Set<string>();
    const list: { year: number; month: number }[] = [];
    for (const key of byDay.keys()) {
      const monthKey = key.slice(0, 7);
      if (seen.has(monthKey)) continue;
      seen.add(monthKey);
      const [year, month] = monthKey.split('-').map(Number);
      list.push({ year, month });
    }
    return list;
  }, [byDay]);

  const month = months[Math.min(monthCursor, Math.max(months.length - 1, 0))];
  const cells = month ? monthCells(month.year, month.month, timeZone) : [];
  const daySlots = selectedDay ? byDay.get(selectedDay) ?? [] : [];
  const selectedIso = daySlots[0] || selectedTime;
  const todayKey = dayKey(new Date().toISOString(), timeZone);
  const showTimes = Boolean(selectedDay && daySlots.length > 0);

  const pickDay = (key: string) => {
    if (!byDay.has(key)) return;
    setSelectedDay(key);
    setSelectedTime(null);
    setFormError('');
  };

  const pickTime = (startTime: string) => {
    setSelectedTime(startTime);
    setStep(2);
    setFormError('');
  };

  const book = async () => {
    if (booking || !selectedTime) return;
    if (!currentTool || !teamSize || !companyName.trim() || !name.trim() || !email.trim() || !phone.trim() || !callType) {
      setFormError('Fill in each question, then confirm.');
      return;
    }
    setBooking(true);
    setFormError('');
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          state,
          startTime: selectedTime,
          companyName,
          teamSize,
          currentTool,
          callType,
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok || data.error) {
        const message = data.error || 'That time is no longer open. Pick another one.';
        setFormError(message);
        if (/time/i.test(message)) {
          setStep(1);
          setSelectedTime(null);
          setReloadKey((key) => key + 1);
        }
        return;
      }
      setBooked(true);
    } catch {
      setFormError('Could not book that time. Try again.');
    } finally {
      setBooking(false);
    }
  };

  return (
    <>
      <button type="button" onClick={openModal} className={className} style={{ WebkitTapHighlightColor: 'transparent' }}>
        {children}
      </button>

      {open && (
        <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-6" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
          <div className="absolute inset-0 bg-[#1C1917]/50 backdrop-blur-[3px]" onClick={close} />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="book-call-title"
            className="relative z-10 flex h-[100dvh] w-full flex-col overflow-hidden bg-white text-left shadow-[0_30px_80px_rgba(28,25,23,0.28)] sm:h-[min(820px,92vh)] sm:max-w-[1080px] sm:rounded-[28px]"
          >
            {(step === 1 || booked) && <h2 id="book-call-title" className="sr-only">30 minute meeting</h2>}
            {booked ? (
              <div className="relative flex min-h-0 flex-1 flex-col bg-[#FBF8F4]">
                <CloseButton onClick={close} disabled={booking} className="absolute right-4 top-[max(1rem,env(safe-area-inset-top))] z-10" />
                <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-16 sm:px-10">
                  <div className="w-full max-w-2xl text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#FF8C32] shadow-[0_8px_24px_rgba(255,140,50,0.18)]">
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FF8C32]">CivDocs</p>
                    <p className="mx-auto mt-3 max-w-md text-2xl font-semibold tracking-tight text-[#1C1917] sm:text-[1.75rem]">
                      You&apos;re booked. Check your email and your phone for the confirmation.
                    </p>
                    <p className="mt-8 text-sm font-medium text-[#78716C]">Worth a look while you wait</p>
                    <div className="mt-3 grid gap-3 text-left sm:grid-cols-3">
                      {NEXT_PAGES.map((page) => (
                        <Link
                          key={page.href}
                          href={page.href}
                          className="group flex flex-col rounded-2xl border border-[#E7E5E4] bg-white px-4 py-4 shadow-[0_1px_0_rgba(28,25,23,0.03)] transition hover:-translate-y-0.5 hover:border-[#FF8C32] hover:shadow-[0_10px_24px_rgba(28,25,23,0.06)]"
                        >
                          <span className="text-[15px] font-semibold leading-snug text-[#1C1917] group-hover:text-[#C2410C]">
                            {page.title}
                          </span>
                          <span className="mt-1.5 flex-1 text-sm leading-snug text-[#78716C]">{page.body}</span>
                          <span className="mt-4 text-sm font-semibold text-[#FF8C32]">Open</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : step === 1 ? (
              <div className="flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-[272px_minmax(0,1fr)]">
                <div className="flex items-start justify-between gap-3 border-b border-[#F0EBE6] bg-[#FBF8F4] px-5 pb-4 pt-[max(1rem,env(safe-area-inset-top))] lg:hidden">
                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FF8C32]">CivDocs</p>
                    <h2 className="mt-1 text-xl font-semibold tracking-tight text-[#1C1917]">
                      30 minute meeting
                    </h2>
                    <p className="text-sm text-[#78716C]">A short fit check</p>
                  </div>
                  <CloseButton onClick={close} disabled={booking} />
                </div>

                <aside className="hidden flex-col border-[#F0EBE6] bg-[#FBF8F4] px-8 py-9 lg:flex lg:border-r">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#FF8C32]">CivDocs</p>
                  <h2 className="mt-5 text-[2rem] font-semibold leading-[1.1] tracking-tight text-[#1C1917]">
                    30 minute meeting
                  </h2>
                  <p className="mt-2 text-[15px] text-[#78716C]">A short fit check</p>
                  <p className="mt-6 text-[15px] leading-relaxed text-[#57534E]">
                    Pick a day, then a time. If you choose Zoom, the link is emailed when the meeting starts. Please use a laptop for Zoom.
                  </p>
                  <div className="mt-auto pt-8">
                    <StateField
                      id="book-state"
                      state={state}
                      onChange={(value) => {
                        setState(value);
                        setSelectedDay(null);
                        setSelectedTime(null);
                        setMonthCursor(0);
                        setStep(1);
                      }}
                    />
                  </div>
                </aside>

                <div className="flex min-h-0 flex-1 flex-col bg-white lg:flex-row">
                  <div className={`min-h-0 flex-col px-4 py-4 sm:px-8 sm:py-7 ${showTimes ? 'hidden lg:flex lg:flex-1' : 'flex flex-1'}`}>
                    <div className="mb-4 lg:hidden">
                      <StateField
                        id="book-state-mobile"
                        state={state}
                        onChange={(value) => {
                          setState(value);
                          setSelectedDay(null);
                          setSelectedTime(null);
                          setMonthCursor(0);
                          setStep(1);
                        }}
                      />
                    </div>
                    <div className="relative flex min-h-0 flex-1 items-center justify-center">
                      {!showTimes && <CloseButton onClick={close} disabled={booking} className="absolute right-0 top-0 hidden lg:inline-flex" />}
                      <div className="w-full max-w-[560px]">
                        {!state && <p className="text-sm text-[#78716C]">Pick your state to see open days.</p>}
                        {state && slotsLoading && <p className="text-sm text-[#78716C]">Loading the calendar…</p>}
                        {slotsError && <p className="text-sm text-[#991B1B]">{slotsError}</p>}
                        {state && slotsLoaded && !slotsLoading && !slotsError && months.length === 0 && (
                          <p className="text-sm text-[#78716C]">No open times in the next month.</p>
                        )}
                        {month && (
                          <CalendarMonth
                            title={monthTitle(month.year, month.month, timeZone)}
                            cells={cells}
                            todayKey={todayKey}
                            selectedDay={selectedDay}
                            openDays={byDay}
                            canPrev={monthCursor > 0}
                            canNext={monthCursor < months.length - 1}
                            onPrev={() => setMonthCursor((value) => Math.max(0, value - 1))}
                            onNext={() => setMonthCursor((value) => Math.min(months.length - 1, value + 1))}
                            onPick={pickDay}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {showTimes && (
                    <div className="flex min-h-0 flex-1 flex-col border-[#F0EBE6] bg-white lg:w-[248px] lg:flex-none lg:border-l">
                      <div className="flex items-start justify-between gap-3 px-5 pb-3 pt-4 lg:px-5 lg:pb-4 lg:pt-6">
                        <div className="min-w-0">
                          <button
                            type="button"
                            onClick={() => setSelectedDay(null)}
                            className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-[#78716C] lg:hidden"
                          >
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Calendar
                          </button>
                          <p className="text-[15px] font-semibold leading-snug text-[#1C1917]">
                            {selectedIso ? longDay(selectedIso, timeZone) : 'Times'}
                          </p>
                        </div>
                        <CloseButton onClick={close} disabled={booking} className="hidden lg:inline-flex" />
                      </div>
                      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-1">
                          {daySlots.map((startTime) => (
                            <button
                              key={startTime}
                              type="button"
                              onClick={() => pickTime(startTime)}
                              className="rounded-2xl border border-[#E7E5E4] bg-white px-3 py-3.5 text-[15px] font-semibold text-[#1C1917] shadow-[0_1px_0_rgba(28,25,23,0.03)] transition hover:border-[#FF8C32] hover:bg-[#FF8C32] hover:text-white active:scale-[0.98]"
                            >
                              {timeLabel(startTime, timeZone)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-3 border-b border-[#F0EBE6] bg-[#FBF8F4] px-5 py-5 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8">
                  <div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      disabled={booking}
                      className="mb-2 inline-flex items-center gap-1 text-sm font-medium text-[#78716C] hover:text-[#1C1917] disabled:opacity-40"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Change time
                    </button>
                    <h2 id="book-call-title" className="text-2xl font-semibold tracking-tight text-[#1C1917]">
                      Tell us a bit about the business
                    </h2>
                    {selectedTime && (
                      <p className="mt-1 text-sm text-[#78716C]">
                        {longDay(selectedTime, timeZone)} · {timeLabel(selectedTime, timeZone)}
                      </p>
                    )}
                  </div>
                  <CloseButton onClick={close} disabled={booking} />
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-8">
                  <div className="mx-auto max-w-xl space-y-6">
                    <fieldset>
                      <legend className="mb-2.5 text-sm font-medium text-[#1C1917]">What are you using currently to run your business?</legend>
                      <div className="grid grid-cols-3 gap-2">
                        {TOOLS.map((tool) => (
                          <Choice key={tool} selected={currentTool === tool} onClick={() => setCurrentTool(tool)}>
                            {tool}
                          </Choice>
                        ))}
                      </div>
                    </fieldset>
                    <fieldset>
                      <legend className="mb-2.5 text-sm font-medium text-[#1C1917]">How many people are in your company?</legend>
                      <div className="grid grid-cols-3 gap-2">
                        {SIZES.map((size) => (
                          <Choice key={size} selected={teamSize === size} onClick={() => setTeamSize(size)}>
                            {size}
                          </Choice>
                        ))}
                      </div>
                    </fieldset>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-[#1C1917]">What is your company called?</span>
                      <input value={companyName} disabled={booking} onChange={(event) => setCompanyName(event.target.value)} className={inputClass} />
                    </label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium text-[#1C1917]">Name</span>
                        <input autoComplete="name" value={name} disabled={booking} onChange={(event) => setName(event.target.value)} className={inputClass} />
                      </label>
                      <label className="block">
                        <span className="mb-1.5 block text-sm font-medium text-[#1C1917]">Email</span>
                        <input type="email" autoComplete="email" value={email} disabled={booking} onChange={(event) => setEmail(event.target.value)} className={inputClass} />
                      </label>
                    </div>
                    <label className="block">
                      <span className="mb-1.5 block text-sm font-medium text-[#1C1917]">Phone</span>
                      <input
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="04xx xxx xxx"
                        value={phone}
                        disabled={booking}
                        onChange={(event) => setPhone(event.target.value)}
                        className={inputClass}
                      />
                    </label>
                    <fieldset>
                      <legend className="mb-2.5 text-sm font-medium text-[#1C1917]">How would you like to meet?</legend>
                      <div className="grid grid-cols-2 gap-2">
                        <Choice selected={callType === 'phone'} onClick={() => setCallType('phone')}>
                          Phone call
                        </Choice>
                        <Choice selected={callType === 'zoom'} onClick={() => setCallType('zoom')}>
                          Zoom call
                        </Choice>
                      </div>
                    </fieldset>
                  </div>
                </div>
                <div className="border-t border-[#F0EBE6] bg-white px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-8">
                  <div className="mx-auto max-w-xl">
                    {formError && (
                      <p className="mb-3 rounded-2xl border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm text-[#991B1B]" role="alert">
                        {formError}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={book}
                      disabled={booking}
                      className="w-full rounded-2xl bg-[#FF8C32] px-4 py-4 text-base font-semibold text-white shadow-[0_8px_20px_rgba(255,140,50,0.28)] transition hover:bg-[#E67E22] disabled:opacity-60"
                    >
                      {booking ? 'Booking…' : 'Confirm booking'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function CloseButton({
  onClick,
  disabled,
  className = '',
}: {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label="Close"
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#78716C] transition hover:bg-white hover:text-[#1C1917] disabled:opacity-40 ${className}`}
    >
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

function StateField({ id, state, onChange }: { id: string; state: string; onChange: (value: string) => void }) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block text-sm font-medium text-[#1C1917]">Your state</span>
      <select
        id={id}
        value={state}
        onChange={(event) => onChange(event.target.value)}
        className={selectClass}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%2378716C' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.6' d='M6 8l4 4 4-4'/%3E%3C/svg%3E\")",
        }}
      >
        <option value="">Pick a state</option>
        {STATES.map((item) => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function CalendarMonth({
  title,
  cells,
  todayKey,
  selectedDay,
  openDays,
  canPrev,
  canNext,
  onPrev,
  onNext,
  onPick,
}: {
  title: string;
  cells: Array<{ day: number; key: string } | null>;
  todayKey: string;
  selectedDay: string | null;
  openDays: Map<string, string[]>;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onPick: (key: string) => void;
}) {
  return (
    <>
      <div className="mb-5 flex items-center justify-between sm:mb-7">
        <button
          type="button"
          aria-label="Previous month"
          disabled={!canPrev}
          onClick={onPrev}
          className="flex h-11 w-11 items-center justify-center rounded-full text-[#1C1917] transition hover:bg-[#FFF4EB] disabled:opacity-25"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-lg font-semibold tracking-tight text-[#1C1917] sm:text-xl">{title}</h3>
        <button
          type="button"
          aria-label="Next month"
          disabled={!canNext}
          onClick={onNext}
          className="flex h-11 w-11 items-center justify-center rounded-full text-[#1C1917] transition hover:bg-[#FFF4EB] disabled:opacity-25"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 text-center">
        {WEEKDAYS.map((label) => (
          <div key={label} className="pb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A8A29E] sm:text-xs">
            {label}
          </div>
        ))}
        {cells.map((cell, index) => {
          if (!cell) return <div key={`empty-${index}`} className="py-1" />;
          const openDay = openDays.has(cell.key);
          const selected = selectedDay === cell.key;
          const today = cell.key === todayKey;
          return (
            <div key={cell.key} className="flex justify-center py-1 sm:py-1.5">
              <button
                type="button"
                disabled={!openDay}
                onClick={() => onPick(cell.key)}
                className={`flex h-12 w-12 items-center justify-center rounded-full text-base transition sm:h-14 sm:w-14 sm:text-[17px] ${
                  selected
                    ? 'bg-[#FF8C32] font-semibold text-white shadow-[0_8px_18px_rgba(255,140,50,0.35)]'
                    : openDay
                      ? `font-semibold text-[#1C1917] hover:bg-[#FFF4EB] ${today ? 'ring-1 ring-[#FF8C32]/50' : ''}`
                      : 'cursor-default font-medium text-[#D6D3D1]'
                }`}
              >
                {cell.day}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

function Choice({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-[52px] rounded-2xl border px-2 py-3 text-center text-[13px] font-semibold leading-tight transition sm:text-sm ${
        selected
          ? 'border-[#FF8C32] bg-[#FF8C32] text-white shadow-[0_8px_18px_rgba(255,140,50,0.28)]'
          : 'border-[#E7E5E4] bg-white text-[#1C1917] hover:border-[#FF8C32]'
      }`}
    >
      {children}
    </button>
  );
}
