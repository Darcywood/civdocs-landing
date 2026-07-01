import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | CivDocs',
  description:
    'CivDocs Terms and Conditions of Service for civil contractors and plant hire companies using the CivDocs platform.',
  alternates: { canonical: 'https://www.civdocs.com.au/terms' },
  openGraph: {
    title: 'Terms & Conditions | CivDocs',
    description: 'CivDocs Terms and Conditions of Service.',
    url: 'https://www.civdocs.com.au/terms',
    type: 'website',
    siteName: 'CivDocs',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
