import type { Metadata } from 'next';
import Script from 'next/script';

const TITLE = 'Get a Call Back — Civil Contractor Software | CivDocs';
const DESCRIPTION =
  'Request a call back from CivDocs. We will ring you about cutting civil admin — timesheets, plant logbooks, dockets and invoicing. No demo script, no slide deck.';
const URL = 'https://www.civdocs.com.au/get-a-callback';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: 'website',
    siteName: 'CivDocs',
    locale: 'en_AU',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const faqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is there a free trial?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. 14 days, no credit card required. Add your projects, machines and crew — then start with one live job. No complex onboarding. Just mirror how you already run work.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens after I request a call back?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Darcy calls you. That is it. No demo script and no slide deck. A straight conversation about how you are doing admin now and whether CivDocs would save you time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I test this without involving the whole team?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Trial it with one job or a small group first — no full rollout required. Test it properly, then decide.',
      },
    },
    {
      '@type': 'Question',
      name: 'Who can see the data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There are three access levels. Employees log their own hours and pre-starts only. Supervisors approve submissions and see their projects. Admins have full visibility and control. Operators cannot see sensitive rates or business-wide data.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can we cancel anytime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. There are no lock-in contracts. Cancel during the trial and you will not be charged. Not happy? We will refund you — no questions asked.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do older operators struggle with the app?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CivDocs is built for site use — big buttons, minimal steps, no clutter. If someone can use basic apps on their phone, they can use this. Most crews pick it up in minutes because it mirrors how they already think about their day.',
      },
    },
  ],
});

const pageSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: TITLE,
  description: DESCRIPTION,
  url: URL,
  isPartOf: {
    '@type': 'WebSite',
    name: 'CivDocs',
    url: 'https://www.civdocs.com.au',
  },
});

export default function GetACallbackLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="get-a-callback-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: pageSchema }}
      />
      <Script
        id="get-a-callback-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
      {children}
    </>
  );
}
