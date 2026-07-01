import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Civil Contractor Setup Guide | CivDocs',
  description:
    'How to set up CivDocs for your civil contracting business. Configure jobs, crew, plant, cost codes, and EBA payroll — be live in minutes.',
  alternates: { canonical: 'https://www.civdocs.com.au/guides/civil-contractor' },
  openGraph: {
    title: 'Civil Contractor Setup Guide | CivDocs',
    description: 'Configure CivDocs for civil contracting — jobs, crew, plant, cost codes, EBA payroll.',
    url: 'https://www.civdocs.com.au/guides/civil-contractor',
    type: 'article',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Civil Contractor Setup Guide | CivDocs',
    description: 'Configure CivDocs for civil contracting — get live in minutes.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
