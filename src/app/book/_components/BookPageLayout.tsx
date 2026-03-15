'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import Header from '@/components/Header';

const AD_SOURCES = ['facebook', 'fb', 'google', 'googleads'];
const SITE_DOMAIN = 'civdocs.com.au';

function useShowHeader() {
  const searchParams = useSearchParams();
  const [referrer, setReferrer] = useState('');

  useEffect(() => {
    setReferrer(document.referrer || '');
  }, []);

  return useMemo(() => {
    const utmSource = searchParams.get('utm_source')?.toLowerCase() ?? '';
    const isFromAds = AD_SOURCES.some((s) => utmSource.includes(s));
    const isFromSite = referrer.includes(SITE_DOMAIN);

    // Show header if they came from our site, or if traffic isn't from ads
    return isFromSite || !isFromAds;
  }, [searchParams, referrer]);
}

interface BookPageLayoutProps {
  children: React.ReactNode;
}

export default function BookPageLayout({ children }: BookPageLayoutProps) {
  const showHeader = useShowHeader();

  return (
    <>
      {showHeader && <Header />}
      <main
        className={`bg-[#F8F9FA] min-h-screen pb-16 sm:pb-24 ${showHeader ? 'pt-[130px]' : 'pt-8 sm:pt-12'}`}
      >
        {children}
      </main>
    </>
  );
}
