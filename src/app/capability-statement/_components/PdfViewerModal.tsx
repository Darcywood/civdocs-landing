'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface PdfViewerModalProps {
  pdfUrl: string | null;
  businessName: string;
  onClose: () => void;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const check = () => setIsMobile(mq.matches);
    check();
    mq.addEventListener('change', check);
    return () => mq.removeEventListener('change', check);
  }, []);
  return isMobile;
}

export default function PdfViewerModal({ pdfUrl, businessName }: PdfViewerModalProps) {
  const isMobile = useIsMobile();

  if (!pdfUrl) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex flex-col bg-white"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-3">
          <h2 className="text-lg font-semibold text-gray-900">
            Your capability statement
          </h2>
          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#FF8C32] px-4 py-2 text-sm font-semibold text-white hover:bg-[#E67E22]"
            >
              Download PDF
            </a>
            <Link
              href="/book"
              className="rounded-full bg-[#FF8C32] px-4 py-2 text-sm font-semibold text-white hover:bg-[#E67E22]"
            >
              Done
            </Link>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          {isMobile ? (
            <div className="flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
              <p className="text-gray-600">
                Mobile browsers can&apos;t scroll multi-page PDFs in this view. Open your PDF in a new tab to view all pages.
              </p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-10 py-4 text-lg font-semibold text-white shadow-md hover:shadow-lg"
              >
                Open PDF
              </a>
            </div>
          ) : (
            <iframe
              src={pdfUrl}
              title="Capability statement"
              className="h-full w-full"
            />
          )}
        </div>
        <div className="shrink-0 border-t border-gray-200 bg-gray-50 px-4 py-3 text-center text-sm text-gray-500">
          We&apos;ve also emailed you a secure link to download. The link expires in 7 days.
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
