import type { Metadata } from 'next';

const SITE = 'https://www.civdocs.com.au';

export const metadata: Metadata = {
  title: 'Blog | CivDocs — Civil construction & plant hire',
  description:
    'Guides on timesheets, pre-starts, logbooks, job cost tracking, and construction software for civil contractors in Australia. Practical advice for earthworks and plant hire.',
  openGraph: {
    title: 'CivDocs Blog — Civil contractors & plant hire',
    description:
      'Guides for Australian civil contractors: timesheets, pre-starts, logbooks, cost tracking, and software comparisons.',
    url: `${SITE}/blog`,
    siteName: 'CivDocs',
    type: 'website',
    locale: 'en_AU',
  },
  robots: { index: true, follow: true },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
