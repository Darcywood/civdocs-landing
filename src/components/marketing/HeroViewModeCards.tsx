'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import ExpandedTestimonialsGrid from '@/components/marketing/ExpandedTestimonialsGrid';

type ViewModeCard = {
  title: string;
  tagline: string;
  trackLine: string;
  iconSrc: string;
  iconAlt: string;
  href: string;
};

const VIEW_MODES: ViewModeCard[] = [
  {
    title: 'Plant Hire View',
    tagline: 'You do wet hire between different jobs',
    trackLine: 'Track: Machine revenue, Invoicing, Attachments, Floats, etc.',
    iconSrc: '/machinehomepageattachements/3.png',
    iconAlt: 'Plant hire',
    href: '/plant-hire',
  },
  {
    title: 'Civil Contractors View',
    tagline: 'You run projects requiring cost tracking',
    trackLine: 'Track: Materials, Project scopes, Prestarts, Timesheets',
    iconSrc: '/machinehomepageattachements/1.png',
    iconAlt: 'Cost tracking',
    href: '/civil-contractors',
  },
];

const BORDER_RADIUS = 32;
const STROKE_WIDTH = 3;
const LOOP_SECONDS = 26;

type StartCorner = 'top-right' | 'bottom-left';

/** Distance along a rounded-rect perimeter as a 0–100 pathLength fraction. */
function getStartOffsetPercent(
  width: number,
  height: number,
  rx: number,
  corner: StartCorner,
): number {
  const top = Math.max(width - 2 * rx, 0);
  const right = Math.max(height - 2 * rx, 0);
  const arc = (Math.PI * rx) / 2;
  const total = 2 * (top + right) + 4 * arc;

  const topRight = top + arc * 0.5;
  const bottomLeft = top + arc + right + arc + top + arc * 0.5;

  const point = corner === 'top-right' ? topRight : bottomLeft;
  return (point / total) * 100;
}

function NeonBorder({
  filterId,
  width,
  height,
  startCorner,
  animate = true,
}: {
  filterId: string;
  width: number;
  height: number;
  startCorner: StartCorner;
  animate?: boolean;
}) {
  if (width < 1 || height < 1) return null;

  const inset = STROKE_WIDTH / 2;
  const rx = Math.min(BORDER_RADIUS, (width - STROKE_WIDTH) / 2, (height - STROKE_WIDTH) / 2);
  const startPercent = getStartOffsetPercent(width, height, rx, startCorner);
  const phaseDelay = `${-((startPercent / 100) * LOOP_SECONDS).toFixed(3)}s`;

  const rectProps = {
    x: inset,
    y: inset,
    width: width - STROKE_WIDTH,
    height: height - STROKE_WIDTH,
    rx,
    ry: rx,
    fill: 'none' as const,
    pathLength: 100,
  };

  const sharedStroke = {
    style: { animationDelay: phaseDelay },
  };

  return (
    <svg
      className="view-mode-card-border-svg"
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      aria-hidden="true"
    >
      <defs>
        <filter
          id={filterId}
          filterUnits="userSpaceOnUse"
          x={-width * 0.15}
          y={-height * 0.15}
          width={width * 1.3}
          height={height * 1.3}
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        {...rectProps}
        className="view-mode-card-border-track"
        stroke="#ffb347"
        strokeWidth={STROKE_WIDTH}
      />
      {animate && (
        <rect
          {...rectProps}
          {...sharedStroke}
          className="view-mode-card-border-neon-beam"
          stroke="#ffffff"
          strokeWidth={STROKE_WIDTH}
          filter={`url(#${filterId})`}
        />
      )}
    </svg>
  );
}

function ViewModeCardItem({
  card,
  startCorner,
}: {
  card: ViewModeCard;
  startCorner: StartCorner;
}) {
  const filterId = useId().replace(/:/g, '');
  const shellRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener('change', updateMotion);
    return () => media.removeEventListener('change', updateMotion);
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const updateSize = () => {
      const { width, height } = shell.getBoundingClientRect();
      setSize({ width: Math.round(width), height: Math.round(height) });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(shell);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={shellRef}
      className={`view-mode-card-shell w-full ${reducedMotion ? 'view-mode-card-shell-static' : ''}`}
    >
      {size.width > 0 && size.height > 0 && (
        <NeonBorder
          filterId={filterId}
          width={size.width}
          height={size.height}
          startCorner={startCorner}
          animate={!reducedMotion}
        />
      )}
      <div className="view-mode-card-body flex min-h-[26rem] flex-col px-9 py-12 sm:min-h-[28rem] sm:px-10 sm:py-14 lg:min-h-[18rem] lg:px-9 lg:py-10">
        <div className="mb-8 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 sm:mb-9 sm:h-20 sm:w-20 lg:mb-6 lg:h-16 lg:w-16">
          <Image
            src={card.iconSrc}
            alt={card.iconAlt}
            width={64}
            height={64}
            className="h-11 w-11 object-contain sm:h-12 sm:w-12 lg:h-10 lg:w-10"
          />
        </div>

        <h3 className="font-serif text-[2.375rem] font-normal leading-[1.08] tracking-tight text-[#1E1E1E] sm:text-[2.625rem] lg:font-sans lg:text-[1.375rem] lg:font-bold lg:leading-snug lg:text-gray-900 xl:text-2xl">
          {card.title}
        </h3>

        <p className="mt-7 text-[1.375rem] font-semibold leading-snug text-gray-900 sm:mt-8 sm:text-2xl lg:mt-3 lg:text-base lg:font-normal lg:leading-relaxed lg:text-gray-600 xl:text-lg">
          {card.tagline}
        </p>

        <p className="mt-6 text-[1.25rem] font-normal leading-relaxed text-gray-500 sm:mt-7 sm:text-xl lg:mt-2 lg:text-base lg:text-gray-600 xl:text-lg">
          {card.trackLine}
        </p>

        <Link href={card.href} className="view-mode-learn-more mx-auto lg:mt-8">
          <span className="relative z-10">Learn more</span>
        </Link>
      </div>
    </div>
  );
}

function FounderQuote() {
  return (
    <div className="relative mx-auto max-w-4xl px-6 py-14 text-center sm:py-20 lg:py-24">
      <span
        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 select-none font-serif text-[7rem] leading-none text-[#F97316] opacity-[0.08] sm:top-10 sm:text-[9rem] lg:top-12 lg:text-[11rem]"
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <div className="relative z-10">
        <blockquote className="text-[1.625rem] font-medium leading-[1.35] tracking-tight text-[#1E1E1E] sm:text-[2rem] sm:leading-[1.3] lg:text-[2.375rem] xl:text-[2.5rem]">
          &ldquo;Most software makes contractors change how they work to fit the tool. I built CivDocs to fit the work instead — designed on site, not in a boardroom.&rdquo;
        </blockquote>
        <div className="mt-10 flex flex-col items-center sm:mt-12">
          <div className="h-3 w-3 rounded-full bg-black" aria-hidden="true" />
          <p className="mt-5 text-xl font-medium text-[#FF8C32] sm:text-[1.375rem]">Darcy Wood</p>
          <p className="mt-1.5 text-base text-gray-600 sm:text-lg">CivDocs Founder</p>
          <hr className="mt-8 w-20 border-t border-gray-300" />
        </div>
      </div>
    </div>
  );
}

function FeatureWalkthroughIntro() {
  return (
    <div className="mt-16 w-full bg-[#f4f5f7] sm:mt-20 lg:mt-24">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-20 lg:max-w-4xl lg:py-28">
        <p className="font-serif text-[1.625rem] font-normal leading-[1.35] tracking-tight text-[#1E1E1E] sm:text-[2rem] sm:leading-[1.3] lg:text-[2.25rem]">
          Here&apos;s what that looks like, day to day.
        </p>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-gray-600 sm:mt-6 sm:text-lg">
          Three tools civil crews actually use, every job.
        </p>
      </div>
    </div>
  );
}

function SchedulingCard() {
  const shellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wasOutOfViewRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener('change', updateMotion);
    return () => media.removeEventListener('change', updateMotion);
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          const video = videoRef.current;
          if (video && !reducedMotion && wasOutOfViewRef.current) {
            video.currentTime = 0;
            void video.play().catch(() => {});
          }
          wasOutOfViewRef.current = false;
        } else {
          wasOutOfViewRef.current = true;
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(shell);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.duration && Number.isFinite(video.duration)) {
      video.currentTime = Math.max(video.duration - 0.05, 0);
    }
    video.pause();
  };

  return (
    <div ref={shellRef} className="w-full">
      <div className="rounded-[2rem] border border-gray-100 bg-white px-5 py-10 shadow-sm sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mx-auto w-full overflow-hidden rounded-2xl border border-gray-200 bg-[#111827] shadow-lg">
            {shouldLoad ? (
              <video
                ref={videoRef}
                src="/homepage/schedulingss.mp4"
                className="h-auto w-full"
                autoPlay
                muted
                playsInline
                loop={false}
                preload="none"
                onEnded={handleVideoEnded}
                aria-label="CivDocs scheduling demo — drag an employee onto a job and send an SMS notification"
              />
            ) : (
              <div className="aspect-video w-full bg-[#111827]" />
            )}
          </div>

          <div className="mt-8 text-center sm:mt-10">
            <h3 className="font-serif text-[2.375rem] font-normal leading-[1.08] tracking-tight text-[#1E1E1E] sm:text-[2.625rem] lg:text-[2.75rem]">
              Schedule your crew in seconds
            </h3>
            <p className="mx-auto mt-5 max-w-2xl text-[1.25rem] font-normal leading-relaxed text-gray-600 sm:mt-6 sm:text-xl lg:text-lg">
              Assign a job and they&apos;re notified instantly — address, map pin, and supervisor contact, all in one text.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroViewModeCards() {
  return (
    <section className="mt-14 w-full overflow-visible sm:mt-16 lg:mt-20">
      <h2 className="text-center font-serif text-[2rem] leading-[1.15] tracking-tight text-[#1E1E1E] sm:text-[2.5rem] lg:text-[2.75rem] xl:text-[3.25rem]">
        Choose your view mode
      </h2>
      <div className="mx-auto mt-10 grid max-w-5xl gap-10 overflow-visible sm:mt-12 sm:gap-12 lg:grid-cols-2 lg:gap-10">
        {VIEW_MODES.map((card, index) => (
          <ViewModeCardItem
            key={card.title}
            card={card}
            startCorner={index === 0 ? 'top-right' : 'bottom-left'}
          />
        ))}
      </div>
      <div className="mx-auto mt-[175px] max-w-5xl">
        <FounderQuote />
      </div>
      <ExpandedTestimonialsGrid />
      <FeatureWalkthroughIntro />
      <div className="mx-auto mt-8 max-w-5xl sm:mt-10 lg:mt-12">
        <SchedulingCard />
      </div>
    </section>
  );
}
