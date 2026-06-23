import Image from 'next/image';

const PROOF_POINTS = [
  {
    label: 'Keep track of revenue on every job',
    iconSrc: '/machinehomepageattachements/1.png',
    iconAlt: 'Revenue tracking',
  },
  {
    label: 'No more missing attachments on jobs',
    iconSrc: '/machinehomepageattachements/2.png',
    iconAlt: 'Job attachments',
  },
  {
    label: 'See individual machine earnings',
    iconSrc: '/machinehomepageattachements/3.png',
    iconAlt: 'Machine earnings',
  },
];

function ProofCard() {
  return (
    <div
      className="rounded-[2rem] p-[2px] lg:rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, #FF8C32 0%, #F5B041 28%, #FFB347 52%, #FF8C32 78%, #F5B041 100%)',
      }}
    >
      <div className="rounded-[calc(2rem-2px)] bg-white px-8 py-12 sm:px-12 sm:py-16 lg:rounded-2xl lg:px-10 lg:py-8 xl:px-12 xl:py-9">
        <ul className="space-y-10 sm:space-y-12 lg:space-y-6 xl:space-y-7">
          {PROOF_POINTS.map((point) => (
            <li key={point.label} className="lg:flex lg:items-start lg:gap-4">
              <div className="mb-4 h-10 w-10 shrink-0 sm:h-12 sm:w-12 lg:mb-0 lg:h-9 lg:w-9">
                <Image
                  src={point.iconSrc}
                  alt={point.iconAlt}
                  width={48}
                  height={48}
                  className="h-full w-full object-contain object-left"
                />
              </div>
              <span className="block text-[1.375rem] font-bold leading-snug text-gray-900 sm:text-2xl lg:pt-0.5 lg:text-base lg:leading-snug xl:text-lg">
                {point.label}
              </span>
            </li>
          ))}
        </ul>

        <div className="my-10 border-t border-gray-200 sm:my-12 lg:my-6 xl:my-7" />

        <div className="flex items-center gap-4 sm:gap-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white p-1.5 sm:h-14 sm:w-14 lg:h-12 lg:w-12">
            <Image
              src="/CivDocs 500x500.svg"
              alt="CivDocs"
              width={44}
              height={44}
              className="h-full w-full object-contain"
            />
          </div>
          <p className="text-base leading-snug text-gray-900 sm:text-lg lg:text-sm xl:text-base">
            <span className="font-semibold">No spreadsheets. No paper.</span>
            <br />
            Set up in a day.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HeroProofSection() {
  return (
    <section className="mt-10 w-full lg:mt-0 lg:pt-[275px]">
      {/* Mobile — headline above card */}
      <div className="lg:hidden">
        <h2 className="mx-auto max-w-[20rem] text-center font-serif text-[2.125rem] leading-[1.15] tracking-tight text-[#1E1E1E] sm:max-w-2xl sm:text-[2.75rem]">
          Proven to save 30 hours of admin a week
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-lg font-medium leading-relaxed text-gray-600 sm:mt-5 sm:text-xl">
          More time at home, or on site.
        </p>
        <div className="mt-8 sm:mt-10">
          <ProofCard />
        </div>
      </div>

      {/* Desktop — Hyros-style: headline left, card right */}
      <div className="hidden lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)] lg:items-center lg:gap-10 xl:gap-14">
        <div className="text-left">
          <h2 className="font-serif text-[2.75rem] leading-[1.12] tracking-tight text-[#1E1E1E] xl:text-[3.25rem]">
            Proven to save 30 hours of admin a week
          </h2>
          <p className="mt-5 max-w-md text-xl font-medium leading-relaxed text-gray-600 xl:text-2xl">
            More time at home, or on site.
          </p>
        </div>
        <ProofCard />
      </div>
    </section>
  );
}
