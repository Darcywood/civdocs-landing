'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface PdfViewerModalProps {
  pdfUrl: string | null;
  businessName: string;
  onClose: () => void;
}

export default function PdfViewerModal({ pdfUrl, businessName }: PdfViewerModalProps) {
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
              href="/capability-statement"
              className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Done
            </Link>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <iframe
            src={pdfUrl}
            title="Capability statement"
            className="h-full w-full"
          />
        </div>
        <div className="shrink-0 border-t border-gray-200 bg-gray-50 px-4 py-3 text-center text-sm text-gray-500">
          We&apos;ve also emailed you a secure link to download. The link expires in 7 days.
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
