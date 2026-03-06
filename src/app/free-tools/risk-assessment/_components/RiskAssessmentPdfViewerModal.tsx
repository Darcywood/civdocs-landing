'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface RiskAssessmentPdfViewerModalProps {
  pdfUrl: string | null;
  reportNumber: string;
  machineLabel: string;
  treatmentsInPlace: number;
  treatmentsRequired: number;
  publicReportUrl?: string;
  qrCodeDataUrl?: string;
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
  publicReportUrl,
  qrCodeDataUrl,
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
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Your Risk Management Report</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {machineLabel} · {reportNumber}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#FF8C32] px-4 py-2 text-sm font-semibold text-white hover:bg-[#E67E22]"
            >
              Download PDF
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Done
            </button>
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

          {/* QR code panel */}
          {qrCodeDataUrl && publicReportUrl && (
            <div className="mt-3 flex items-start gap-4 rounded-xl border border-[#FF8C32]/20 bg-white px-4 py-3">
              <Image
                src={qrCodeDataUrl}
                alt="QR code for this report"
                width={72}
                height={72}
                className="shrink-0 rounded"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">Print this QR code on the machine</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Anyone can scan it to instantly view this risk assessment — no app, no login.
                </p>
                <a
                  href={publicReportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-block text-xs font-medium text-[#FF8C32] hover:underline break-all"
                >
                  {publicReportUrl}
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
