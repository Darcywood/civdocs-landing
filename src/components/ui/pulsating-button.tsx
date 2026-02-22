'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PulsatingButtonProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  href: string;
  pulseColor?: string;
  duration?: string;
  children: React.ReactNode;
  className?: string;
}

export function PulsatingButton({
  className,
  children,
  pulseColor = 'rgba(255, 140, 50, 0.5)',
  duration = '1.5s',
  href,
  ...props
}: PulsatingButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'relative flex cursor-pointer items-center justify-center rounded-full px-10 py-4 text-center text-lg font-semibold text-white shadow-md transition-all hover:shadow-lg',
        'bg-gradient-to-r from-[#FF8C32] to-[#F5B041]',
        className
      )}
      style={
        {
          '--pulse-color': pulseColor,
          '--duration': duration,
        } as React.CSSProperties
      }
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span
        className="absolute top-1/2 left-1/2 size-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-transparent animate-pulsating-ring pointer-events-none"
        aria-hidden
      />
    </Link>
  );
}
