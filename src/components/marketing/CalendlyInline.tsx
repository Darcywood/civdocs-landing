'use client';

import Script from 'next/script';

interface CalendlyInlineProps {
  url: string;
  height?: number;
}

export default function CalendlyInline({ url, height = 720 }: CalendlyInlineProps) {
  return (
    <>
      <div
        className="calendly-inline-widget w-full"
        data-url={url}
        style={{ minWidth: 320, height }}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
