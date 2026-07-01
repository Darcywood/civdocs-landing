import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Script from 'next/script';
import { comparisons, comparisonsBySlug } from '@/data/comparisons/index';
import ComparisonPage from '@/components/compare/ComparisonPage';
import { buildComparisonJsonLd } from '@/components/compare/ComparisonJsonLd';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = comparisonsBySlug[slug];
  if (!data) return {};

  const url = `https://civdocs.com.au/compare/${slug}`;
  return {
    title: data.titleTag,
    description: data.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: data.titleTag,
      description: data.metaDescription,
      url,
      type: 'article',
      siteName: 'CivDocs',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.titleTag,
      description: data.metaDescription,
    },
  };
}

export default async function ComparisonSlugPage({ params }: Props) {
  const { slug } = await params;
  const data = comparisonsBySlug[slug];
  if (!data) notFound();

  const pageUrl = `https://civdocs.com.au/compare/${slug}`;
  const jsonLd = buildComparisonJsonLd({ data, pageUrl });

  return (
    <>
      <Script
        id={`jsonld-${slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <ComparisonPage data={data} />
    </>
  );
}
