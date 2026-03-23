import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllPosts } from '@/lib/blog';

const SITE = 'https://www.civdocs.com.au';

export const metadata: Metadata = {
  alternates: { canonical: `${SITE}/blog` },
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'CivDocs Blog',
    description:
      'Articles for civil contractors and plant hire in Australia: timesheets, pre-starts, logbooks, job costing, and software.',
    url: `${SITE}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'CivDocs',
      url: SITE,
    },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      url: `${SITE}/blog/${p.slug}`,
    })),
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <Header />
      <div className="pt-20">
        <article className="max-w-3xl mx-auto px-6 py-16 lg:px-8">
          <header className="mb-12">
            <p className="text-sm font-medium text-[#F97316] mb-2">Resources</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4">Blog</h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Practical guides for civil contractors and plant hire in Australia — timesheets, pre-starts, logbooks, job
              costing, and choosing the right software.
            </p>
          </header>
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl border border-gray-200 bg-gray-50/80 p-6 transition hover:border-[#F97316]/40 hover:bg-[#FFF5ED]/50"
                >
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-[#EA580C] mb-2">{post.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{post.description}</p>
                  <span className="mt-3 inline-block text-sm font-medium text-[#F97316]">Read article →</span>
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </div>
      <Footer />
    </div>
  );
}
