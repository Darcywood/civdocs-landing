'use client';

import Script from 'next/script';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

const BASE_URL = 'https://calendly.com/darcy-civdocs/30min';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

interface CalendlyPopupButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function CalendlyPopupButton({ children, className }: CalendlyPopupButtonProps) {
  const searchParams = useSearchParams();

  const utmParams = UTM_KEYS.reduce<Record<string, string>>((acc, key) => {
    const val = searchParams.get(key);
    if (val) acc[key] = val;
    return acc;
  }, {});

  const params = new URLSearchParams({ primary_color: 'FF8C32', ...utmParams });
  const finalUrl = `${BASE_URL}?${params.toString()}`;

  const handleClick = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: finalUrl });
    } else {
      window.open(finalUrl, '_blank', 'noopener,noreferrer');
    }
  }, [finalUrl]);

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
      <button
        type="button"
        onClick={handleClick}
        className={className}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {children}
      </button>
    </>
  );
}
