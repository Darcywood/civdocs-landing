'use client';

import { useEffect, useRef } from 'react';

const FRAME_COUNT = 90;
const FRAME_BASE = '/riskassesement/fff3ed-ezgif-14a0e0c9bed3a19d-webp-jpg';

function getFramePath(i: number): string {
  const num = String(i).padStart(2, '0');
  return `${FRAME_BASE}/frame_${num}_delay-0.033s.jpg`;
}

export default function RiskAssessmentScrollScrub() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const aspectRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !wrapper) return;

    function setSize() {
      if (!canvas || !wrapper) return;
      const w = wrapper.offsetWidth;
      if (w === 0) return;
      const aspect = aspectRef.current;
      const h = aspect ? w / aspect : w * 0.5625;
      canvas.width = w;
      canvas.height = h;
      wrapper.style.height = `${h}px`;
    }

    function drawFrame(index: number) {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;
      const img = framesRef.current[index];
      if (!img?.complete || !img.naturalWidth) return;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
    }

    function tryDraw() {
      setSize();
      drawFrame(currentFrameRef.current);
    }

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      const idx = i;
      img.src = getFramePath(i);
      img.onload = () => {
        if (idx === 0) {
          aspectRef.current = img.naturalWidth / img.naturalHeight;
          tryDraw();
        }
      };
      framesRef.current[i] = img;
    }

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
        const frame = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
        if (frame !== currentFrameRef.current) {
          currentFrameRef.current = frame;
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
  }, []);

  return (
    <div ref={containerRef} style={{ height: '45vh' }} className="relative">
      <div className="sticky top-[5vh] w-full px-4">
        <div ref={wrapperRef} className="relative w-full overflow-hidden">
          <canvas ref={canvasRef} className="block h-full w-full" />
          {/* Left fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-[12%]" style={{ background: 'linear-gradient(to right, #F7F3EC, transparent)' }} />
          {/* Right fade */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[12%]" style={{ background: 'linear-gradient(to left, #F7F3EC, transparent)' }} />
          {/* Top fade */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[10%]" style={{ background: 'linear-gradient(to bottom, #F7F3EC, transparent)' }} />
          {/* Bottom fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[10%]" style={{ background: 'linear-gradient(to top, #F7F3EC, transparent)' }} />
        </div>
      </div>
    </div>
  );
}
