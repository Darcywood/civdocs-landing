'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';

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
    </section>
  );
}
