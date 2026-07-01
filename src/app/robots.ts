import type { MetadataRoute } from 'next';

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://www.civdocs.com.au';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/r/',
        '/test-trial',
        '/login',
        '/sign-in',
        '/forgot-password',
        '/reset-password',
        '/billing',
        '/success',
        '/trial-success',
        '/booking-confirmed',
        '/account-deletion',
        '/capability-statement/success',
        '/capability-statement/build',
      ],
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
