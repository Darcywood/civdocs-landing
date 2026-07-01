import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/blog';
import { comparisons } from '@/data/comparisons/index';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://www.civdocs.com.au';

/** Public marketing routes we want discoverable in search (no auth, tokens, redirects, or tool wizard steps). */
const STATIC_PATHS: { path: string; priority?: number; freq?: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1.0, freq: 'weekly' },
  { path: '/civil-contractors', priority: 0.95 },
  { path: '/plant-hire', priority: 0.95 },
  { path: '/pricing', priority: 0.9 },
  { path: '/start-trial', priority: 0.9 },
  { path: '/book', priority: 0.85 },
  { path: '/about', priority: 0.8 },
  { path: '/crank-ai', priority: 0.85 },
  { path: '/crank-ai-cheat-sheet', priority: 0.75 },
  { path: '/free-tools', priority: 0.8 },
  { path: '/free-tools/csv-to-kml', priority: 0.75 },
  { path: '/free-tools/risk-assessment', priority: 0.75 },
  { path: '/guides', priority: 0.75 },
  { path: '/guides/civil-contractor', priority: 0.7 },
  { path: '/guides/plant-hire', priority: 0.7 },
  { path: '/guides/view-switching', priority: 0.65 },
  { path: '/affiliate-partners', priority: 0.7 },
  { path: '/capability-statement', priority: 0.7 },
  { path: '/video-tutorials', priority: 0.7 },
  { path: '/support', priority: 0.7 },
  { path: '/blog', priority: 0.85, freq: 'weekly' },
  { path: '/privacy', priority: 0.5 },
  { path: '/terms', priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(({ path, priority = 0.8, freq = 'monthly' }) => ({
    url: `${SITE}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllSlugs();
    blogEntries = slugs.map((slug) => ({
      url: `${SITE}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    }));
  } catch {
    // If blog dir is missing in an edge environment, still serve static URLs
  }

  const compareEntries: MetadataRoute.Sitemap = [
    {
      url: `${SITE}/compare`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    ...comparisons.map((c) => ({
      url: `${SITE}/compare/${c.slug}`,
      lastModified: new Date(c.dateModified),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ];

  return [...staticEntries, ...compareEntries, ...blogEntries];
}
