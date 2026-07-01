import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crank AI Cheat Sheet — Civil Estimating Quick Reference | CivDocs',
  description:
    'Quick reference guide for getting the most out of Crank AI — the civil construction estimating tool built into CivDocs. Prompts, tips, and best practices.',
  alternates: { canonical: 'https://www.civdocs.com.au/crank-ai-cheat-sheet' },
  openGraph: {
    title: 'Crank AI Cheat Sheet — Civil Estimating Quick Reference | CivDocs',
    description: 'Prompts, tips, and best practices for Crank AI civil estimating.',
    url: 'https://www.civdocs.com.au/crank-ai-cheat-sheet',
    type: 'website',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crank AI Cheat Sheet | CivDocs',
    description: 'Prompts, tips, and best practices for Crank AI civil estimating.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
