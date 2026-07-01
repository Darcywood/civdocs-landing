import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | CivDocs',
  description:
    'CivDocs Privacy Policy — how we collect, store, use, and protect your data in line with Australian privacy law.',
  alternates: { canonical: 'https://www.civdocs.com.au/privacy' },
  openGraph: {
    title: 'Privacy Policy | CivDocs',
    description: 'CivDocs Privacy Policy — data collection, use, and protection.',
    url: 'https://www.civdocs.com.au/privacy',
    type: 'website',
    siteName: 'CivDocs',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
