'use client';

// Set NEXT_PUBLIC_WISTIA_VIDEO_ID in .env to use Wistia instead of the local video.
// Upload your video at wistia.com, then copy the video ID from the embed code.
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
          <video
            src="/Bookacall/finish.mp4"
            controls
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
}
