'use client';

import { useEffect, useRef, useState } from 'react';

const SOURCE_FRAME_COUNT = 90;
const FRAME_STEP = 2;
const LOGICAL_FRAME_COUNT = Math.ceil(SOURCE_FRAME_COUNT / FRAME_STEP);
const FRAME_BASE = '/riskassesement/fff3ed-ezgif-14a0e0c9bed3a19d-webp-jpg';
const PRELOAD_BUFFER = 2;

function getSourceFrameIndex(logicalIndex: number): number {
  return Math.min(logicalIndex * FRAME_STEP, SOURCE_FRAME_COUNT - 1);
}

function getFramePath(sourceIndex: number): string {
  const num = String(sourceIndex).padStart(2, '0');
  return `${FRAME_BASE}/frame_${num}_delay-0.033s.jpg`;
}

export default function RiskAssessmentScrollScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadingRef = useRef<Set<number>>(new Set());
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const aspectRef = useRef<number | null>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !wrapper) return;

    function setSize() {
      if (!canvas || !wrapper) return;
      const w = wrapper.offsetWidth;
      if (w === 0) return;
      const aspect = aspectRef.current;
      let h = aspect ? w / aspect : w * 0.5625;
      if (window.matchMedia('(min-width: 1024px)').matches) {
        h = Math.min(h, 400);
      }
      canvas.width = w;
      canvas.height = h;
      wrapper.style.height = `${h}px`;
    }

    function drawFrame(logicalIndex: number) {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;
      const sourceIndex = getSourceFrameIndex(logicalIndex);
      const img = framesRef.current[sourceIndex];
      if (!img?.complete || !img.naturalWidth) return;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
    }

    function tryDraw() {
      setSize();
      drawFrame(currentFrameRef.current);
    }

    function loadFrame(sourceIndex: number) {
      if (loadingRef.current.has(sourceIndex) || framesRef.current[sourceIndex]) return;
      loadingRef.current.add(sourceIndex);

      const img = new Image();
      img.src = getFramePath(sourceIndex);
      img.onload = () => {
        if (sourceIndex === 0 && aspectRef.current === null) {
          aspectRef.current = img.naturalWidth / img.naturalHeight;
          tryDraw();
        }
        if (getSourceFrameIndex(currentFrameRef.current) === sourceIndex) {
          drawFrame(currentFrameRef.current);
        }
      };
      framesRef.current[sourceIndex] = img;
    }

    function preloadAround(logicalIndex: number) {
      for (let offset = -PRELOAD_BUFFER; offset <= PRELOAD_BUFFER; offset++) {
        const idx = logicalIndex + offset;
        if (idx < 0 || idx >= LOGICAL_FRAME_COUNT) continue;
        loadFrame(getSourceFrameIndex(idx));
      }
    }

    loadFrame(0);

    const ro = new ResizeObserver(() => tryDraw());
    ro.observe(wrapper);

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const vh = window.innerHeight;
        const startOffset = vh * 0.32;
        const scrollRange = vh * 0.5;
        const scrolled = vh - rect.top;
        const progress = Math.max(0, Math.min(1, (scrolled - startOffset) / scrollRange));
        const frame = Math.min(LOGICAL_FRAME_COUNT - 1, Math.floor(progress * LOGICAL_FRAME_COUNT));
        if (frame !== currentFrameRef.current) {
          currentFrameRef.current = frame;
          preloadAround(frame);
          drawFrame(frame);
        }
      });
    }

    requestAnimationFrame(() => {
      tryDraw();
      onScroll();
    });

    function onResize() {
      tryDraw();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActive]);

  return (
    <div ref={containerRef} className="relative h-[45vh] overflow-hidden lg:mb-10 lg:h-auto lg:overflow-visible">
      <div className="sticky top-[5vh] w-full px-4 max-lg:sticky lg:relative lg:top-0 lg:px-6">
        <div ref={wrapperRef} className="relative mx-auto w-full max-w-4xl overflow-hidden">
          <canvas ref={canvasRef} className="block h-full w-full" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[12%]" style={{ background: 'linear-gradient(to right, #F7F3EC, transparent)' }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[12%]" style={{ background: 'linear-gradient(to left, #F7F3EC, transparent)' }} />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[10%]" style={{ background: 'linear-gradient(to bottom, #F7F3EC, transparent)' }} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[25%] max-lg:h-[10%]" style={{ background: 'linear-gradient(to top, #F7F3EC, transparent)' }} />
        </div>
      </div>
    </div>
  );
}
