/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // 🚫 Skip all ESLint checks during builds (Vercel, CI)
    ignoreDuringBuilds: true,
    dirs: [], // Don't lint any directories
  },
  typescript: {
    // Also ignore TypeScript errors if needed
    ignoreBuildErrors: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    unoptimized: false,
    minimumCacheTTL: 60,
    domains: [
      'localhost',
      'civdocs.com.au',
      'kmzmpiuopwsaptfecdnh.supabase.co'
    ],
  },
};

module.exports = nextConfig;

