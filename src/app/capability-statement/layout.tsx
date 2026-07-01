import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CivDocs Capability Statement — Civil Contractor Software',
  description:
    'Generate a professional capability statement for your civil contracting or plant hire business using CivDocs. Impress clients and head contractors.',
  alternates: { canonical: 'https://www.civdocs.com.au/capability-statement' },
  openGraph: {
    title: 'CivDocs Capability Statement — Civil Contractor Software',
    description: 'Generate a professional capability statement for your civil contracting business.',
    url: 'https://www.civdocs.com.au/capability-statement',
    type: 'website',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CivDocs Capability Statement',
    description: 'Generate a professional capability statement for your civil contracting business.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
