import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Book a Quick CivDocs Fit Check',
  description:
    'Book a 15-minute chat to see if CivDocs is a fit for your civil contracting or plant hire business.',
  alternates: { canonical: 'https://www.civdocs.com.au/book' },
  openGraph: {
    title: 'Book a Quick CivDocs Fit Check',
    description: 'Book a 15-minute chat to see if CivDocs fits your civil contracting or plant hire business.',
    url: 'https://www.civdocs.com.au/book',
    type: 'website',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book a Quick CivDocs Fit Check',
    description: 'Book a 15-minute chat to see if CivDocs fits your business.',
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
      name: 'Can I test this without involving the whole team?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can trial it with one job or a small group first. No full rollout required. Test it properly, then decide.',
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

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="book-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
      {children}
    </>
  );
}
