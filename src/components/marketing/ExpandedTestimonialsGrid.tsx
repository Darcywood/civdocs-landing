import Image from 'next/image';

type TestimonialCard = {
  headline: string;
  subtitle: string;
  quote: string;
  name: string;
  company: string;
  logoSrc: string;
  logoAlt: string;
  logoBg?: string;
  logoContain?: boolean;
  wide?: boolean;
};

const TESTIMONIALS: TestimonialCard[] = [
  {
    headline: '30 Hours',
    subtitle: 'saved weekly',
    quote:
      'CivDocs saves us around 30 hours of admin every week — I can spend that time on site instead of stuck behind a desk.',
    name: 'Ryan',
    company: 'Campbell Earthmoving',
    logoSrc: '/homepage_logos/6.png',
    logoAlt: 'Campbell Earthmoving',
    logoBg: '#ffffff',
    logoContain: true,
    wide: true,
  },
  {
    headline: '20 Minutes',
    subtitle: 'not half a day',
    quote: 'End of month invoicing takes 20 minutes, not half a day.',
    name: 'Harry',
    company: 'HLM Earthworks',
    logoSrc: '/logos-testomonials/hlm.png',
    logoAlt: 'HLM Earthworks',
    logoBg: '#ffffff',
  },
  {
    headline: 'Profitable',
    subtitle: 'job cost clarity',
    quote:
      'Being able to track costs between the earthworks and concrete sides of a project — so I can see exactly where we\'re making money.',
    name: 'Riley',
    company: 'RMF Concreting',
    logoSrc: '/capability-statement/rmf.png',
    logoAlt: 'RMF Concreting',
    logoBg: '#ffffff',
  },
  {
    headline: 'Nothing Missed',
    subtitle: 'invoicing accuracy',
    quote:
      'Makes it easy to keep track of where I\'ve been working — and makes sure I never forget to invoice hours or attachments.',
    name: 'Morgan',
    company: 'Fogarty Earthmoving',
    logoSrc: '/homepage_logos/5.png',
    logoAlt: 'Fogarty Earthmoving',
    logoBg: '#ffffff',
    logoContain: true,
    wide: true,
  },
  {
    headline: 'Dead Simple',
    subtitle: 'and it stayed that way',
    quote:
      "I don't have time to figure out complicated systems between jobs. CivDocs is the one that stuck — dead simple, and it's stayed that way.",
    name: 'Jacko',
    company: 'Elev8 Earthworks',
    logoSrc: '/homepage_logos/2.png',
    logoAlt: 'Elev8 Earthworks',
    logoBg: '#111827',
    logoContain: true,
  },
];

function CardDivider() {
  return <div className="my-5 h-px w-full bg-[#F97316]/25 sm:my-6" aria-hidden="true" />;
}

function CardHeadline({ headline, subtitle }: { headline: string; subtitle: string }) {
  return (
    <div>
      <p className="font-serif text-[2.5rem] font-normal leading-none tracking-tight text-[#111827] sm:text-[2.75rem] lg:text-[3rem]">
        {headline}
      </p>
      <p className="mt-2 text-sm font-medium text-gray-500 sm:text-base">{subtitle}</p>
    </div>
  );
}

function CardAttribution({
  name,
  company,
  logoSrc,
  logoAlt,
  logoBg,
  logoContain,
}: {
  name: string;
  company: string;
  logoSrc: string;
  logoAlt: string;
  logoBg?: string;
  logoContain?: boolean;
}) {
  return (
    <div className="mt-auto flex items-center gap-3 pt-6 sm:gap-4 sm:pt-8">
      <div
        className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg sm:h-14 sm:w-14"
        style={{ backgroundColor: logoBg ?? '#f3f4f6' }}
      >
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={56}
          height={56}
          className={`h-full w-full ${logoContain ? 'object-contain p-1' : 'object-cover'}`}
        />
      </div>
      <div className="min-w-0">
        <p className="text-base font-bold leading-tight text-[#111827] sm:text-lg">{name}</p>
        <p className="mt-0.5 text-sm font-medium text-[#F97316] sm:text-base">{company}</p>
      </div>
    </div>
  );
}

function WideTestimonialCard({ card, spanWide = false }: { card: TestimonialCard; spanWide?: boolean }) {
  return (
    <article
      className={`flex h-full flex-col rounded-[1.75rem] border border-gray-200 bg-[#f8f9fa] p-6 shadow-sm sm:p-8 lg:p-9 ${spanWide ? 'lg:col-span-2' : ''}`}
    >
      <div className="grid grid-cols-[1fr_auto] items-start gap-5 sm:gap-8 lg:gap-12 xl:gap-16">
        <div className="min-w-0">
          <CardHeadline headline={card.headline} subtitle={card.subtitle} />
          <CardDivider />
          <p className="text-lg font-normal leading-relaxed text-[#111827] sm:text-xl lg:text-[1.25rem] lg:leading-relaxed">
            &ldquo;{card.quote}&rdquo;
          </p>
        </div>

        <div className="flex w-[7.5rem] shrink-0 flex-col items-end sm:w-[10rem] lg:w-[14rem] xl:w-[16rem]">
          <div
            className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl"
            style={{ backgroundColor: card.logoBg ?? '#f3f4f6' }}
          >
            <Image
              src={card.logoSrc}
              alt={card.logoAlt}
              width={256}
              height={256}
              className={`h-full w-full ${card.logoContain ? 'object-contain p-2 sm:p-3 lg:p-4' : 'object-cover'}`}
            />
          </div>
          <div className="mt-3 w-full text-right sm:mt-4">
            <p className="text-sm font-bold leading-tight text-[#111827] sm:text-base lg:text-lg">{card.name}</p>
            <p className="mt-0.5 text-xs font-medium text-[#F97316] sm:text-sm lg:text-base">{card.company}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function StandardTestimonialCard({ card }: { card: TestimonialCard }) {
  return (
    <article className="flex h-full flex-col rounded-[1.75rem] border border-gray-200 bg-[#f8f9fa] p-6 shadow-sm sm:p-8 lg:p-9">
      <CardHeadline headline={card.headline} subtitle={card.subtitle} />
      <CardDivider />
      <p className="text-lg font-normal leading-relaxed text-[#111827] sm:text-xl lg:text-[1.25rem] lg:leading-relaxed">
        &ldquo;{card.quote}&rdquo;
      </p>
      <CardAttribution
        name={card.name}
        company={card.company}
        logoSrc={card.logoSrc}
        logoAlt={card.logoAlt}
        logoBg={card.logoBg}
        logoContain={card.logoContain}
      />
    </article>
  );
}

export default function ExpandedTestimonialsGrid() {
  return (
    <section className="mx-auto mt-12 w-full max-w-5xl sm:mt-16 lg:mt-20">
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {TESTIMONIALS.map((card, index) =>
          card.wide ? (
            <WideTestimonialCard key={`${card.name}-${card.company}`} card={card} spanWide={index === 0} />
          ) : (
            <StandardTestimonialCard key={`${card.name}-${card.company}`} card={card} />
          ),
        )}
      </div>
    </section>
  );
}
