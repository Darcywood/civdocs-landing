import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Tools for Civil Contractors | CivDocs',
  description:
    'Free tools built for Australian civil contractors — machine risk assessment generator, CSV to KML converter, and more. No account required.',
  alternates: { canonical: 'https://www.civdocs.com.au/free-tools' },
  openGraph: {
    title: 'Free Tools for Civil Contractors | CivDocs',
    description:
      'Free machine risk assessment generator, CSV to KML converter, and more — built for Australian civil contractors.',
    url: 'https://www.civdocs.com.au/free-tools',
    type: 'website',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Tools for Civil Contractors | CivDocs',
    description: 'Free machine risk assessment generator, CSV to KML converter, and more.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
