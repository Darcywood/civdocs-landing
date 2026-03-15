'use client';

// Set NEXT_PUBLIC_WISTIA_VIDEO_ID in .env.local — get the ID from your Wistia embed code
const WISTIA_VIDEO_ID = process.env.NEXT_PUBLIC_WISTIA_VIDEO_ID;

export default function BookVideoPlayer() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-200/30 overflow-hidden">
      <div className="relative aspect-video bg-gray-100">
        {WISTIA_VIDEO_ID ? (
          <iframe
            src={`https://fast.wistia.net/embed/iframe/${WISTIA_VIDEO_ID}?videoFoam=true`}
            title="CivDocs walkthrough"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-500">
            Add NEXT_PUBLIC_WISTIA_VIDEO_ID to .env.local
          </div>
        )}
      </div>
    </div>
  );
}
