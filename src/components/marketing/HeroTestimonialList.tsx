import Image from 'next/image';

type Testimonial = {
  quote: string;
  name: string;
  company: string;
  logoSrc: string;
  logoAlt: string;
  logoBg?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Perfect for tracking UTS/GPS and float movements.',
    name: 'Reece',
    company: 'Glade Civil',
    logoSrc: '/homepage_logos/4.png',
    logoAlt: 'Glade Civil',
    logoBg: '#ffffff',
  },
  {
    quote: 'End of month invoicing takes 20 minutes, not half a day.',
    name: 'Harry',
    company: 'HLM Earthworks',
    logoSrc: '/homepage_logos/3.png',
    logoAlt: 'HLM Earthworks',
    logoBg: '#ffffff',
  },
  {
    quote: 'Perfect user friendly scheduling and day docket system.',
    name: 'Matt',
    company: 'Roughans Haulage',
    logoSrc: '/homepage_logos/1.png',
    logoAlt: 'Roughans Haulage',
    logoBg: '#1d355e',
  },
  {
    quote: 'My bookkeeper loves it.',
    name: 'Jacko',
    company: 'Elev8 Earthworks',
    logoSrc: '/homepage_logos/2.png',
    logoAlt: 'Elev8 Earthworks',
    logoBg: '#111827',
  },
];

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div
      className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg lg:h-16 lg:w-16"
      style={{ backgroundColor: testimonial.logoBg ?? '#f3f4f6' }}
    >
      <Image
        src={testimonial.logoSrc}
        alt={testimonial.logoAlt}
        width={64}
        height={64}
        className={`h-full w-full ${testimonial.logoSrc.includes('4.png') ? 'object-contain p-1' : 'object-cover'}`}
      />
    </div>
  );
}

function TestimonialItem({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  return (
    <div
      className={[
        'px-8 py-8',
        'lg:flex lg:h-full lg:flex-col lg:px-6 lg:py-8 xl:px-7',
        index > 0 ? 'border-t border-gray-200 lg:mx-0 lg:border-t-0 lg:border-l' : '',
      ].join(' ')}
    >
      <p className="font-sans text-[1.375rem] font-semibold leading-[1.35] tracking-[-0.01em] text-gray-900 sm:text-2xl lg:text-lg lg:leading-snug xl:text-xl">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-4 lg:mt-auto lg:pt-10 lg:gap-5">
        <Avatar testimonial={testimonial} />
        <div>
          <p className="text-lg font-bold leading-tight text-gray-900 lg:text-lg">{testimonial.name}</p>
          <p className="mt-1 text-base leading-tight text-gray-500 lg:mt-0.5 lg:text-base">{testimonial.company}</p>
        </div>
      </div>
    </div>
  );
}

export default function HeroTestimonialList() {
  return (
    <div className="mt-10 w-full overflow-hidden rounded-[2rem] border border-gray-200/80 bg-white shadow-sm lg:mt-0 lg:mb-0">
      <div className="flex flex-col lg:grid lg:grid-cols-4 lg:items-stretch">
        {TESTIMONIALS.map((testimonial, index) => (
          <TestimonialItem
            key={`${testimonial.name}-${testimonial.company}`}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
