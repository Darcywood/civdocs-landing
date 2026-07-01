import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Switching Between Civil Contractor and Plant Hire Views | CivDocs',
  description:
    'How to switch your CivDocs account between civil contractor mode and plant hire company mode.',
  alternates: { canonical: 'https://www.civdocs.com.au/guides/view-switching' },
  openGraph: {
    title: 'Switching Between Civil Contractor and Plant Hire Views | CivDocs',
    description: 'How to switch your CivDocs account between civil contractor and plant hire modes.',
    url: 'https://www.civdocs.com.au/guides/view-switching',
    type: 'article',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Switching Between Views | CivDocs',
    description: 'Switch CivDocs between civil contractor and plant hire modes.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
