import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BlogMarkdown } from '@/components/blog/BlogMarkdown';
import { getAllSlugs, getPostBySlug, stripMarkdownTitle } from '@/lib/blog';

const SITE = 'https://www.civdocs.com.au';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Not found' };
  const url = `${SITE}/blog/${slug}`;
  return {
    title: `${post.title} | CivDocs`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: 'CivDocs',
      type: 'article',
      locale: 'en_AU',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const body = stripMarkdownTitle(post.content);
  const url = `${SITE}/blog/${slug}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: 'CivDocs' },
    publisher: {
      '@type': 'Organization',
      name: 'CivDocs',
      url: SITE,
    },
    inLanguage: 'en-AU',
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Header />
      <div className="pt-20">
        <article className="max-w-3xl mx-auto px-6 py-12 lg:px-8 pb-20" itemScope itemType="https://schema.org/Article">
          <meta itemProp="headline" content={post.title} />
          <meta itemProp="description" content={post.description} />
          <nav className="mb-8">
            <Link href="/blog" className="text-sm text-gray-500 hover:text-[#F97316] transition-colors">
              ← Blog
            </Link>
          </nav>
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight leading-tight mb-4">{post.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{post.description}</p>
          </header>
          <div className="prose-flow" itemProp="articleBody">
            <BlogMarkdown content={body} />
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
}
