import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crank AI — AI-Powered Civil Estimating Built Into CivDocs',
  description:
    'Crank AI is the built-in AI estimating tool for civil contractors in CivDocs. Build accurate project estimates faster using AI trained on civil construction data. Included with CivDocs.',
  alternates: { canonical: 'https://www.civdocs.com.au/crank-ai' },
  openGraph: {
    title: 'Crank AI — AI-Powered Civil Estimating Built Into CivDocs',
    description: 'Build accurate civil project estimates faster with Crank AI — built into CivDocs, no extra tools required.',
    url: 'https://www.civdocs.com.au/crank-ai',
    type: 'website',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crank AI — AI Civil Estimating | CivDocs',
    description: 'Build accurate civil project estimates faster with AI. Built into CivDocs.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
