'use client';

import { useRef, useState, useEffect, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DraggableMarqueeProps {
  children: ReactNode;
  className?: string;
  /** Duration in seconds for one full scroll cycle (matches original marquee pace) */
  duration?: number;
  /** Number of content copies for seamless loop */
  repeat?: number;
  /** Gap between items in rem */
  gap?: number;
}

export function DraggableMarquee({
  children,
  className,
  duration = 25,
  repeat = 4,
  gap = 1.5,
}: DraggableMarqueeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const lastFrame = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    const rect = scrollRef.current.getBoundingClientRect();
    startX.current = e.clientX - rect.left;
    scrollLeftStart.current = scrollRef.current.scrollLeft;
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => setIsDragging(false);

  // Global listeners for drag (so we capture move/up when cursor leaves element)
  useEffect(() => {
    if (!isDragging) return;
    const onMove = (e: MouseEvent) => {
      if (!scrollRef.current) return;
      e.preventDefault();
      const rect = scrollRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const walk = (x - startX.current) * 1.2;
      scrollRef.current.scrollLeft = scrollLeftStart.current - walk;
    };
    const onUp = () => setIsDragging(false);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [isDragging]);
  const handleTouchEnd = () => setIsDragging(false);

  // Auto-scroll at same pace as original marquee (pauses during drag)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let rafId: number;

    const tick = (timestamp: number) => {
      if (!el || isDragging) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      const delta = lastFrame.current ? (timestamp - lastFrame.current) / 1000 : 0;
      lastFrame.current = timestamp;

      const oneSetWidth = el.scrollWidth / repeat;
      const speed = oneSetWidth / duration;
      const newScroll = el.scrollLeft + speed * delta;

      if (newScroll >= oneSetWidth) {
        el.scrollLeft = newScroll - oneSetWidth;
      } else {
        el.scrollLeft = newScroll;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [duration, repeat, isDragging]);

  return (
    <div
      ref={scrollRef}
      className={cn(
        'flex overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing select-none',
        'scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none]',
        'touch-pan-x',
        className
      )}
      style={{ gap: `${gap}rem` }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex shrink-0 flex-row items-stretch" style={{ gap: `${gap}rem` }}>
            {children}
          </div>
        ))}
    </div>
  );
}
