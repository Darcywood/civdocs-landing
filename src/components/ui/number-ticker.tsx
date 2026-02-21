'use client';

import { type ComponentPropsWithoutRef, useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NumberTickerProps extends ComponentPropsWithoutRef<'span'> {
  value: number;
  startValue?: number;
  direction?: 'up' | 'down';
  delay?: number;
  decimalPlaces?: number;
  onComplete?: () => void;
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = 'up',
  delay = 0,
  className,
  decimalPlaces = 0,
  onComplete,
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? value : startValue);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(direction === 'down' ? startValue : value);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [motionValue, isInView, delay, value, direction, startValue]);

  const targetValue = direction === 'down' ? startValue : value;
  const hasCalledComplete = useRef(false);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat('en-US', {
          minimumFractionDigits: decimalPlaces,
          maximumFractionDigits: decimalPlaces,
        }).format(Number(latest.toFixed(decimalPlaces)));
      }
      if (onComplete && !hasCalledComplete.current && Math.abs(latest - targetValue) < 0.5) {
        hasCalledComplete.current = true;
        setTimeout(onComplete, 150);
      }
    });
    return unsubscribe;
  }, [springValue, decimalPlaces, onComplete, targetValue]);

  return (
    <span
      ref={ref}
      className={cn(
        'inline-block tabular-nums tracking-wider',
        className
      )}
      {...props}
    >
      {Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }).format(startValue)}
    </span>
  );
}
