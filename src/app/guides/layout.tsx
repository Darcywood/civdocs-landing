import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Getting Started Guides | CivDocs',
  description:
    'Step-by-step guides to set up CivDocs for your civil contracting or plant hire business. Get your team up and running fast.',
  alternates: { canonical: 'https://www.civdocs.com.au/guides' },
  openGraph: {
    title: 'Getting Started Guides | CivDocs',
    description: 'Set up CivDocs for civil contracting or plant hire — step-by-step guides.',
    url: 'https://www.civdocs.com.au/guides',
    type: 'website',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Getting Started Guides | CivDocs',
    description: 'Set up CivDocs for civil contracting or plant hire — step-by-step guides.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
