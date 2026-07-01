import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/blog';
import { comparisons } from '@/data/comparisons/index';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://www.civdocs.com.au';

/** Public marketing routes we want discoverable in search (no auth, tokens, or test pages). */
const STATIC_PATHS: string[] = [
  '/',
  '/about',
  '/affiliate-partners',
  '/book',
  '/capability-statement',
  '/capability-statement/build',
  '/cost-tracking',
  '/crank-ai',
  '/crank-ai-cheat-sheet',
  '/free-tools',
  '/free-tools/csv-to-kml',
  '/free-tools/risk-assessment',
  '/free-tools/risk-assessment/build',
  '/guides',
  '/guides/civil-contractor',
  '/guides/plant-hire',
  '/guides/view-switching',
  '/logbook',
  '/prestarts',
  '/pricing',
  '/privacy',
  '/start-trial',
  '/support',
  '/terms',
  '/timesheets',
  '/video-tutorials',
  '/blog',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE}${path === '/' ? '' : path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/blog') ? 0.85 : 0.8,
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
