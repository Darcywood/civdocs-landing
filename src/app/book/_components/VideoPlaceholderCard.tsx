const BULLETS = [
  'Log plant hours',
  'Auto-send day dockets',
  'Generate invoices in minutes',
];

export default function VideoPlaceholderCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-200/30 overflow-hidden">
      {/* 16:9 placeholder area */}
      <div className="relative aspect-video bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-white/90 shadow-md flex items-center justify-center ring-2 ring-[#FF8C32]/30">
            <svg
              className="w-8 h-8 text-[#FF8C32] ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="text-sm font-medium text-gray-500">Video placeholder</span>
        </div>
      </div>
      <div className="px-6 py-5 border-t border-gray-100">
        <p className="text-sm text-gray-600">
          Your CivDocs walkthrough video will go here.
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
          {BULLETS.map((b) => (
            <li key={b} className="flex items-center gap-1.5">
              <span className="text-[#FF8C32]">•</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
