'use client';

// Cloudflare Stream: set NEXT_PUBLIC_CLOUDFLARE_STREAM_VIDEO_ID in .env.local
// Customer code from your Stream dashboard (or use default below)
const STREAM_CUSTOMER_CODE =
  process.env.NEXT_PUBLIC_CLOUDFLARE_STREAM_CUSTOMER_CODE ?? 'pgevv70mb5bh7ghh';
const STREAM_VIDEO_ID =
  process.env.NEXT_PUBLIC_CLOUDFLARE_STREAM_VIDEO_ID ?? '22b55457672bbc566062828b63be405a';

const posterUrl = `https://customer-${STREAM_CUSTOMER_CODE}.cloudflarestream.com/${STREAM_VIDEO_ID}/thumbnails/thumbnail.jpg?time=&height=600`;

export default function BookVideoPlayer() {
  const iframeSrc = `https://customer-${STREAM_CUSTOMER_CODE}.cloudflarestream.com/${STREAM_VIDEO_ID}/iframe?poster=${encodeURIComponent(posterUrl)}&preload=auto`;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-200/30 overflow-hidden">
      <div className="relative aspect-video bg-gray-100">
        <iframe
          src={iframeSrc}
          loading="lazy"
          title="CivDocs walkthrough"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    </div>
  );
}
