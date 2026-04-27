'use client';

const BULLETS = [
  'See every control point on satellite imagery before you get on site',
  'Works with Trimble, Topcon, Leica, and any total station CSV export',
  'GDA2020 and GDA94 — MGA Zones 46–56',
  'Free, no account required',
];

export default function CsvToKmlHero() {
  return (
    <section
      className="relative flex flex-col px-4 pt-16 pb-2 sm:pt-20 sm:pb-2 lg:pt-24 lg:pb-2"
      style={{ background: '#F7F3EC' }}
    >
      <div className="mx-auto w-full max-w-[1200px] flex-1 flex flex-col">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF8C32]/20 bg-[#FF8C32]/5 px-3 py-1 mb-6">
            <span className="text-xs font-semibold text-[#CC5500]">FREE TOOL</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-[#1E1E1E] sm:text-4xl lg:text-[2.75rem] xl:text-5xl leading-[1.15]">
            CSV to KML Converter
          </h1>
          <p className="mt-5 text-lg text-gray-600 leading-relaxed max-w-xl">
            Upload your control point CSV and get a KML file you can open straight in Google Earth. See where every
            control point is before you get to site — so you&apos;re not shooting retros one by one trying to figure out
            which one&apos;s which.
          </p>
          <ul className="mt-8 space-y-4">
            {BULLETS.map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-700">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#FF8C32]/25 bg-[#FF8C32]/10 text-[#FF8C32]">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <button
              type="button"
              onClick={() =>
                document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] px-8 py-4 font-semibold text-white shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              Convert My Points →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
