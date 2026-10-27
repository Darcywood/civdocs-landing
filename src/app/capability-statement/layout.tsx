import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Capability Statement Generator | CivDocs',
  description:
    'Free capability statement generator for Australian civil contractors and plant hire. Create a tender-ready PDF in minutes.',
  alternates: { canonical: 'https://www.civdocs.com.au/capability-statement' },
  openGraph: {
    title: 'Free Capability Statement Generator | CivDocs',
    description: 'Free capability statement generator for Australian civil contractors and plant hire. Tender-ready PDF in minutes.',
    url: 'https://www.civdocs.com.au/capability-statement',
    type: 'website',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Capability Statement Generator | CivDocs',
    description: 'Free capability statement generator for Australian civil contractors and plant hire.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
