import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Tools for Civil Contractors | CivDocs',
  description:
    'Free utilities for Australian civil contractors and plant hire. Open a tool to start — each one lives on its own page.',
  alternates: { canonical: 'https://www.civdocs.com.au/free-tools' },
  openGraph: {
    title: 'Free Tools for Civil Contractors | CivDocs',
    description:
      'A short list of free utilities for Australian civil contractors and plant hire. Each tool opens on its own page.',
    type: 'website',
    url: 'https://www.civdocs.com.au/free-tools',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Tools for Civil Contractors | CivDocs',
    description: 'Free utilities for Australian civil contractors and plant hire. Each tool opens on its own page.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
