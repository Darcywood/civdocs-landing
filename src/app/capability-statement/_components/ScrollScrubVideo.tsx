'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FRAME_COUNT = 121;
const PREVIEW_PDF_URL = '/api/capability-statement/preview-pdf';
const FINAL_FRAME_PATH = '/capability-statement/1lead112/1lead112/CAPABILITY.png';

// Frame delay alternates: i % 3 === 1 → 0.041s, else → 0.042s
function getFramePath(i: number): string {
  const delay = i % 3 === 1 ? '0.041s' : '0.042s';
  const num = String(i).padStart(3, '0');
  return `/capability-statement/1lead112/1lead112/frame_${num}_delay-${delay}.jpg`;
}

export default function ScrollScrubVideo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const finalFrameRef = useRef<HTMLImageElement | null>(null);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const aspectRef = useRef<number | null>(null);
  const [pdfOpen, setPdfOpen] = useState(false);

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
      const h = aspect ? w / aspect : w * 0.5625; // fallback 16:9
      canvas.width = w;
      canvas.height = h;
      wrapper.style.height = `${h}px`;
    }

    function drawFrame(index: number) {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;
      // Use CAPABILITY.png as the final frame when animation is complete
      const img =
        index === FRAME_COUNT - 1 && finalFrameRef.current?.complete
          ? finalFrameRef.current
          : framesRef.current[index];
      if (!img?.complete || !img.naturalWidth) return;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
    }

    function tryDraw() {
      setSize();
      drawFrame(currentFrameRef.current);
    }

    // Preload final frame (CAPABILITY.png)
    const finalImg = new Image();
    finalImg.src = FINAL_FRAME_PATH;
    finalImg.onload = () => tryDraw();
    finalFrameRef.current = finalImg;

    // Preload frames; on frame 0 load, lock in aspect ratio then draw
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

    // ResizeObserver: canvas may have 0 size until layout completes
    const ro = new ResizeObserver(() => tryDraw());
    ro.observe(wrapper);

    function onScroll() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const vh = window.innerHeight;
        // Start later: require 32vh scroll before animation begins
        // End: after 50vh of scroll
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

    function onResize() {
      tryDraw();
    }

    // Initial draw after layout
    requestAnimationFrame(() => {
      tryDraw();
      onScroll();
    });

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
    <>
      <div ref={containerRef} style={{ height: '70vh' }} className="relative">
        <div className="sticky top-[10vh] flex justify-center px-4">
          <button
            type="button"
            onClick={() => setPdfOpen(true)}
            className="group relative mx-auto w-full max-w-sm cursor-pointer overflow-hidden rounded-2xl shadow-2xl transition-shadow hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#FF8C32] focus:ring-offset-2"
          >
            <div ref={wrapperRef} className="relative w-full">
              <canvas ref={canvasRef} className="block h-full w-full" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                <span className="rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-gray-900 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  View sample PDF
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {pdfOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-white"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
              <h2 className="text-lg font-semibold text-gray-900">Sample capability statement</h2>
              <button
                type="button"
                onClick={() => setPdfOpen(false)}
                className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <iframe
                src={PREVIEW_PDF_URL}
                title="Sample capability statement"
                className="h-full w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
