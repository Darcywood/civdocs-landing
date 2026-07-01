import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Video Tutorials | CivDocs',
  description:
    'Step-by-step video tutorials for CivDocs — learn how to manage pre-starts, timesheets, plant logbooks, job costing, scheduling, and invoicing.',
  alternates: { canonical: 'https://www.civdocs.com.au/video-tutorials' },
  openGraph: {
    title: 'Video Tutorials | CivDocs',
    description: 'Step-by-step video tutorials for CivDocs — pre-starts, timesheets, plant logbooks, and more.',
    url: 'https://www.civdocs.com.au/video-tutorials',
    type: 'website',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Video Tutorials | CivDocs',
    description: 'Step-by-step video tutorials for CivDocs.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
