import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Start Your Free Trial | CivDocs',
  description:
    'Know your job costs before the job finishes. CivDocs captures daily site data — hours, plant, progress. 14 days free, no credit card required.',
  alternates: { canonical: 'https://www.civdocs.com.au/start-trial' },
  openGraph: {
    title: 'Start Your Free Trial | CivDocs',
    description:
      'CivDocs captures daily site data — hours, plant, progress. 14 days free, no credit card required.',
    url: 'https://www.civdocs.com.au/start-trial',
    type: 'website',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Start Your Free Trial | CivDocs',
    description: '14 days free, no credit card required. Built for civil contractors.',
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
      name: 'Will my operators actually use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CivDocs is built for site use — big buttons, minimal steps, no clutter. If someone can use basic apps on their phone, they can use this. Most crews pick it up in minutes because it mirrors how they already think about their day.',
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
        text: 'Yes. No lock-in contracts. Cancel during the trial and you will not be charged. Not happy? We will refund you — no questions asked.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I test it without the whole team?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Start with just yourself or one supervisor. Get comfortable with the system before rolling it out to crew.',
      },
    },
  ],
});

export default function StartTrialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script id="strip-signup-hash" strategy="beforeInteractive">
        {`if(location.hash==='#signup-form'){history.replaceState(null,'',location.pathname+location.search)}`}
      </Script>
      <Script
        id="start-trial-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
      {children}
    </>
  );
}
