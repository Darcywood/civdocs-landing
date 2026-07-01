import type { ComparisonData } from '@/data/comparisons/types';

interface JsonLdProps {
  data: ComparisonData;
  pageUrl: string;
}

export function buildComparisonJsonLd({ data, pageUrl }: JsonLdProps): string {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': 'https://www.civdocs.com.au/#organization',
      name: 'CivDocs',
      url: 'https://www.civdocs.com.au',
      logo: 'https://www.civdocs.com.au/icon.svg',
      description:
        'Australian all-in-one SaaS platform for civil contractors and plant hire companies — timesheets, pre-starts, plant hire logbooks, invoicing, job costing, scheduling, and Xero/MYOB integrations.',
      sameAs: [
        'https://www.facebook.com/civdocs',
        'https://www.linkedin.com/company/civdocs',
        'https://apps.apple.com/au/app/civ-docs/id6756803850',
        'https://play.google.com/store/apps/details?id=com.civdocs.app',
      ],
      knowsAbout: [
        'civil construction management software',
        'plant hire logbooks',
        'construction timesheets',
        'job costing for civil contractors',
        'pre-start checklists',
        'Australian civil contractor software',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+611300071577',
        contactType: 'customer support',
        areaServed: 'AU',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: data.titleTag,
      description: data.metaDescription,
      isPartOf: { '@id': 'https://www.civdocs.com.au/#website' },
      datePublished: data.datePublished,
      dateModified: data.dateModified,
      about: {
        '@id': 'https://www.civdocs.com.au/#organization',
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'CivDocs',
            item: 'https://www.civdocs.com.au',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Compare',
            item: 'https://www.civdocs.com.au/compare',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: `CivDocs vs ${data.competitor}`,
            item: pageUrl,
          },
        ],
      },
    },
    {
      '@type': 'Article',
      '@id': `${pageUrl}#article`,
      headline: data.h1,
      description: data.summary,
      url: pageUrl,
      datePublished: data.datePublished,
      dateModified: data.dateModified,
      author: {
        '@id': 'https://www.civdocs.com.au/#organization',
      },
      publisher: {
        '@id': 'https://www.civdocs.com.au/#organization',
      },
      mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
    },
    {
      // FAQPage schema — no longer produces Google SERP chips (retired May 2026),
      // but AI engines (ChatGPT/Perplexity/Gemini) still parse Q&A structure for citation.
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: data.faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ];

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  });
}
