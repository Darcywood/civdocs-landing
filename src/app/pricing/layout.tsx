import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CivDocs Pricing — Civil Contractor & Plant Hire Software | 14-Day Free Trial',
  description:
    'Simple, flat pricing for Australian civil contractors and plant hire companies. Pre-starts, timesheets, plant logbooks, job costing, and invoicing in one system. 14-day free trial — no credit card required.',
  alternates: { canonical: 'https://www.civdocs.com.au/pricing' },
  openGraph: {
    title: 'CivDocs Pricing — Civil Contractor & Plant Hire Software',
    description:
      'Simple, flat pricing for Australian civil contractors and plant hire companies. 14-day free trial, no credit card required.',
    url: 'https://www.civdocs.com.au/pricing',
    type: 'website',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CivDocs Pricing — Civil Contractor & Plant Hire Software',
    description: 'Simple, flat pricing for Australian civil contractors. 14-day free trial — no credit card required.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
