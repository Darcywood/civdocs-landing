'use client';

import { useSearchParams } from 'next/navigation';
import CalendlyInline from './CalendlyInline';

const BASE_URL = 'https://calendly.com/darcy-civdocs/15min-catchup';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

interface CalendlyWithUtmProps {
  height?: number;
}

export default function CalendlyWithUtm({ height }: CalendlyWithUtmProps) {
  const searchParams = useSearchParams();

  const utmParams = UTM_KEYS.reduce<Record<string, string>>((acc, key) => {
    const val = searchParams.get(key);
    if (val) acc[key] = val;
    return acc;
  }, {});

  const finalUrl =
    Object.keys(utmParams).length > 0
      ? `${BASE_URL}?${new URLSearchParams(utmParams).toString()}`
      : BASE_URL;

  return <CalendlyInline url={finalUrl} height={height} />;
}
