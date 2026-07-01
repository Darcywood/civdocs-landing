import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Plant Hire Company Setup Guide | CivDocs',
  description:
    'How to set up CivDocs for your plant hire company. Configure machines, operators, logbooks, and invoicing — be live in minutes.',
  alternates: { canonical: 'https://www.civdocs.com.au/guides/plant-hire' },
  openGraph: {
    title: 'Plant Hire Company Setup Guide | CivDocs',
    description: 'Configure CivDocs for plant hire — machines, operators, logbooks, invoicing.',
    url: 'https://www.civdocs.com.au/guides/plant-hire',
    type: 'article',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plant Hire Company Setup Guide | CivDocs',
    description: 'Configure CivDocs for plant hire — get live in minutes.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
