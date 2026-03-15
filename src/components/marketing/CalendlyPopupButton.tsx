'use client';

import { useSearchParams } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';

const BASE_URL = 'https://calendly.com/darcy-civdocs/30min';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

interface CalendlyPopupButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function CalendlyPopupButton({ children, className }: CalendlyPopupButtonProps) {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const utmParams = UTM_KEYS.reduce<Record<string, string>>((acc, key) => {
    const val = searchParams.get(key);
    if (val) acc[key] = val;
    return acc;
  }, {});

  const params = new URLSearchParams({ primary_color: 'FF8C32', ...utmParams });
  const finalUrl = `${BASE_URL}?${params.toString()}`;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={className}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {children}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="relative z-10 w-full sm:w-[90vw] sm:max-w-2xl h-[92dvh] sm:h-[85vh] bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            {/* Close bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 shrink-0">
              <span className="text-sm font-medium text-gray-700">Book a Call</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Calendly iframe */}
            <iframe
              src={finalUrl}
              title="Book a call with CivDocs"
              className="flex-1 w-full border-0"
              allow="camera; microphone"
            />
          </div>
        </div>
      )}
    </>
  );
}
