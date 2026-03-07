'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface RiskAssessmentPdfViewerModalProps {
  pdfUrl: string | null;
  reportNumber: string;
  machineLabel: string;
  treatmentsInPlace: number;
  treatmentsRequired: number;
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

export default function RiskAssessmentPdfViewerModal({
  pdfUrl,
  reportNumber,
  machineLabel,
  treatmentsInPlace,
  treatmentsRequired,
  onClose,
}: RiskAssessmentPdfViewerModalProps) {
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
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
              aria-label="Close"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Your Risk Management Report</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {machineLabel} · {reportNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#FF8C32] px-4 py-2 text-sm font-semibold text-white hover:bg-[#E67E22]"
            >
              View PDF
            </a>
            <a
              href={pdfUrl}
              download
              className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Download
            </a>
            <Link
              href="/book"
              className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Book a call
            </Link>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          {isMobile ? (
            <div className="flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
              <p className="text-gray-600">
                Open your PDF in a new tab to view all pages.
              </p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-[#FF8C32] px-10 py-4 text-lg font-semibold text-white hover:bg-[#E67E22]"
              >
                View PDF
              </a>
            </div>
          ) : (
            <iframe
              src={pdfUrl}
              title="Risk Management Report"
              className="h-full w-full"
            />
          )}
        </div>
        <div className="shrink-0 border-t border-gray-200 bg-gray-50 px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-6 text-sm">
              <span className="text-gray-600">
                <span className="font-semibold text-green-600">{treatmentsInPlace}</span> treatments in place
              </span>
              {treatmentsRequired > 0 && (
                <span className="text-gray-600">
                  <span className="font-semibold text-red-600">{treatmentsRequired}</span> treatments required
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">We&apos;ve also emailed you a secure link to download. The link expires in 7 days.</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
