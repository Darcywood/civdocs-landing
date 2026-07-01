import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support & Help Centre | CivDocs',
  description:
    'Get help with CivDocs — browse FAQs, contact our support team, or book a call. Australian-based support team in Melbourne.',
  alternates: { canonical: 'https://www.civdocs.com.au/support' },
  openGraph: {
    title: 'Support & Help Centre | CivDocs',
    description: 'Browse FAQs, contact our Australian support team, or book a call with CivDocs.',
    url: 'https://www.civdocs.com.au/support',
    type: 'website',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Support & Help Centre | CivDocs',
    description: 'Browse FAQs or contact the CivDocs support team.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
