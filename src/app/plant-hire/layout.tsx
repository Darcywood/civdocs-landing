import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plant Hire Software Australia — Logbooks, Machine Hours & Invoicing | CivDocs',
  description:
    'CivDocs manages plant hire logbooks, machine-hour costing, day dockets, and invoicing for Australian plant hire companies. No missed charges, no paperwork. Free 14-day trial.',
  alternates: { canonical: 'https://www.civdocs.com.au/plant-hire' },
  openGraph: {
    title: 'Plant Hire Software Australia — Logbooks, Machine Hours & Invoicing | CivDocs',
    description:
      'Manage plant hire logbooks, machine-hour costing, day dockets, and invoicing in one system. Built for Australian plant hire companies.',
    url: 'https://www.civdocs.com.au/plant-hire',
    type: 'website',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plant Hire Software Australia | CivDocs',
    description: 'Plant hire logbooks, machine-hour costing, day dockets, and invoicing. Built for Australian plant hire companies.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
