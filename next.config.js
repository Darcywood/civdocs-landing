/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // 🚫 Skip all ESLint checks during builds (Vercel, CI)
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'localhost',
      'civdocs.com.au',
      'kmzmpiuopwsaptfecdnh.supabase.co'
    ],
  },
};

module.exports = nextConfig;

