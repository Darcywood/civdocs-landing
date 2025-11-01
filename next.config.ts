import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // ignore ESLint during production builds so Vercel doesn't block deploys
    ignoreDuringBuilds: true
  },
  images: {
    // add domains used by the site or third-party storage (add more if needed)
    domains: [
      'localhost',
      'civdocs.com.au',
      'kmzmpiuopwsaptfecdnh.supabase.co' // replace with your real supabase storage host if different
    ],
  },
};

export default nextConfig;
