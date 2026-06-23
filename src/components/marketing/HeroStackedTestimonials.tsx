import Image from 'next/image';

type StackedTestimonial = {
  quote: string;
  name: string;
  company?: string;
  logoSrc: string;
  logoAlt: string;
  logoBg?: string;
  logoContain?: boolean;
};

export type { StackedTestimonial };

const TESTIMONIALS: StackedTestimonial[] = [
  {
    quote:
      'CivDocs saves us around 30 hours of admin every week — I can spend that time on site instead of stuck behind a desk.',
    name: 'Ryan',
    company: 'Campbell Earthmoving',
    logoSrc: '/homepage_logos/6.png',
    logoAlt: 'Campbell Earthmoving',
    logoBg: '#ffffff',
    logoContain: true,
  },
  {
    quote:
      'Being able to track costs between the earthworks and concrete sides of a project — so I can see exactly where we\'re making money.',
    name: 'Riley',
    company: 'RMF Concreting',
    logoSrc: '/capability-statement/rmf.png',
    logoAlt: 'RMF Concreting',
    logoBg: '#ffffff',
  },
  {
    quote:
      'Makes it easy to keep track of where I\'ve been working — and makes sure I never forget to invoice hours or attachments.',
    name: 'Morgan',
    company: 'Fogarty Earthmoving',
    logoSrc: '/homepage_logos/5.png',
    logoAlt: 'Fogarty Earthmoving',
    logoBg: '#ffffff',
    logoContain: true,
  },
];

function TestimonialAvatar({
  item,
  className = 'h-14 w-14',
}: {
  item: StackedTestimonial;
  className?: string;
}) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg ${className}`}
      style={{ backgroundColor: item.logoBg ?? '#f3f4f6' }}
    >
      <Image
        src={item.logoSrc}
        alt={item.logoAlt}
        width={64}
        height={64}
        className={`h-full w-full ${item.logoContain ? 'object-contain p-1' : 'object-cover'}`}
      />
    </div>
  );
}

export default function HeroStackedTestimonials({
  testimonials = TESTIMONIALS,
  showTopBorder = true,
  sectionClassName = 'mt-12 w-full sm:mt-16 lg:mt-0 lg:pt-[100px]',
}: {
  testimonials?: StackedTestimonial[];
  showTopBorder?: boolean;
  sectionClassName?: string;
}) {
  return (
    <section className={sectionClassName}>
      {showTopBorder && <div className="border-t border-gray-200" aria-hidden="true" />}
      <div className="mt-8 space-y-12 sm:space-y-14 sm:mt-10 lg:mt-12 lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-8 lg:space-y-0 xl:mt-14 xl:gap-12">
        {testimonials.map((item) => (
          <article key={`${item.name}-${item.company}`} className="lg:flex lg:h-full lg:flex-col">
            <p className="font-sans text-[1.375rem] font-semibold leading-[1.35] tracking-[-0.01em] text-gray-900 sm:text-2xl lg:text-lg lg:font-normal lg:leading-relaxed lg:text-gray-800 xl:text-xl">
              &ldquo;{item.quote}&rdquo;
            </p>

            {/* Mobile — quote then logo + name side by side */}
            <div className="mt-6 flex items-center gap-4 pb-8 sm:pb-10 lg:hidden">
              <TestimonialAvatar item={item} />
              <div>
                <p className="text-lg font-bold leading-tight text-gray-900">{item.name}</p>
                {item.company && (
                  <p className="mt-1 text-base leading-tight text-gray-500">{item.company}</p>
                )}
              </div>
            </div>

            {/* Desktop — Hyros-style: quote, logo, then name stacked; bottom-aligned across row */}
            <div className="mt-8 hidden flex-col items-start lg:mt-auto lg:flex lg:pt-10">
              <TestimonialAvatar item={item} className="h-12 w-12 xl:h-14 xl:w-14" />
              <p className="mt-3 text-base font-bold leading-tight text-gray-900 xl:mt-4 xl:text-lg">
                {item.name}
              </p>
              {item.company && (
                <p className="mt-0.5 text-sm leading-tight text-gray-500 xl:text-base">{item.company}</p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
