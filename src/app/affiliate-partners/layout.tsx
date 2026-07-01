import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate & Partner Program | CivDocs',
  description:
    'Refer Australian civil contractors and plant hire companies to CivDocs and earn commission. Join the CivDocs affiliate partner program.',
  alternates: { canonical: 'https://www.civdocs.com.au/affiliate-partners' },
  openGraph: {
    title: 'Affiliate & Partner Program | CivDocs',
    description: 'Refer Australian civil contractors and plant hire companies to CivDocs and earn commission.',
    url: 'https://www.civdocs.com.au/affiliate-partners',
    type: 'website',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Affiliate & Partner Program | CivDocs',
    description: 'Refer civil contractors to CivDocs and earn commission.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
