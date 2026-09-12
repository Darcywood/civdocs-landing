import Image from 'next/image';
import { DraggableMarquee } from '@/components/ui/DraggableMarquee';
import { TestimonialCard } from '@/app/capability-statement/_components/TestimonialCard';
import CallbackFAQ from './CallbackFAQ';

type Card = {
  name: string;
  company: string;
  quote: string;
  logoSrc: string;
};

const ALL_TESTIMONIALS: Card[] = [
  {
    name: 'Harry',
    company: 'HLM Earthworks',
    quote: 'End of month invoicing takes 20 minutes, not half a day.',
    logoSrc: '/logos-testomonials/hlm.png',
  },
  {
    name: 'Jacko',
    company: 'Elev8 Earthworks',
    quote: 'My bookkeeper loves it.',
    logoSrc: '/homepage_logos/2.png',
  },
  {
    name: 'Nikola',
    company: 'Jovex Group',
    quote: 'I can actually see how many loads my trucks are doing, and invoicing off it is straightforward now.',
    logoSrc: '/logos-testomonials/10.png',
  },
  {
    name: 'Cirsty',
    company: "Bono's Excavations",
    quote: "Out of everything we've tried, CivDocs is the best system out there.",
    logoSrc: '/logos-testomonials/9.png',
  },
  {
    name: 'Reece',
    company: 'Glade Civil',
    quote: 'Perfect for tracking UTS/GPS and float movements.',
    logoSrc: '/logos-testomonials/gladelogo.png',
  },
  {
    name: 'John Lynch',
    company: 'JAL Civil Earthworks',
    quote: 'Day dockets are perfect for what we do. The supervisor and the office get a copy at the end of each day, so everyone is on the same page.',
    logoSrc: '/capability-statement/Jal.png',
  },
  {
    name: 'Colby',
    company: 'Ali Excavations',
    quote: "We used to copy old Word docs and hope they were right. Now every machine gets its own proper assessment.",
    logoSrc: '/capability-statement/ali.png',
  },
  {
    name: 'Riley',
    company: 'RJ Piling',
    quote: "Dead simple to use. Answer a few questions and the report's done. No mucking around.",
    logoSrc: '/capability-statement/rj.png',
  },
  {
    name: 'John',
    company: 'Jal Civil',
    quote: "Used to be scrambling the night before mobilisation trying to piece a risk assessment together. Now it takes a few minutes and it's done properly.",
    logoSrc: '/capability-statement/Jal.png',
  },
  {
    name: 'Reece',
    company: 'Glade Civil',
    quote: "Being able to be certain we aren't missing float fees or attachments is game-changing.",
    logoSrc: '/logos-testomonials/gladelogo.png',
  },
  {
    name: 'Riley',
    company: 'RMF Earthworx',
    quote: 'Took about five minutes the first time. Saved us paying a consultant a few hundred bucks.',
    logoSrc: '/capability-statement/rmf.png',
  },
  {
    name: 'Jacko',
    company: 'Elev8 Earthworks',
    quote: "I don't have time to figure out complicated systems between jobs. CivDocs is the one that stuck — dead simple, and it's stayed that way.",
    logoSrc: '/homepage_logos/2.png',
  },
  {
    name: 'Colby',
    company: 'Ali Excavations',
    quote: "We're a small crew and don't have admin staff. This took care of something we always put off.",
    logoSrc: '/capability-statement/ali.png',
  },
  {
    name: 'John',
    company: 'Jal Civil',
    quote: 'Feels built by someone who actually understands civil jobs and tenders.',
    logoSrc: '/capability-statement/Jal.png',
  },
  {
    name: 'Riley',
    company: 'Rj Piling',
    quote: 'No logins, no fluff. Just answered the questions and got the PDF. Exactly what we needed.',
    logoSrc: '/capability-statement/rj.png',
  },
  {
    name: 'Riley',
    company: 'RMF Earthworx',
    quote: 'This is the first time our plant, projects and compliance were actually laid out properly in one document.',
    logoSrc: '/capability-statement/rmf.png',
  },
  {
    name: 'Harry',
    company: 'HLM Earthworks',
    quote: "End of month used to take me half a day — pulling hours from the logbook, typing it all up, checking it twice. Now the approved hours flow straight into the invoice and it syncs to Xero. I'm done in 20 minutes and I know it's right.",
    logoSrc: '/logos-testomonials/hlm.png',
  },
  {
    name: 'Reece',
    company: 'Glade Civil',
    quote: "We're running graders across Tier One infrastructure — night shifts, live rail corridors, multiple machines on multiple sites. Every hour and UTS attachment needs to be logged correctly or the invoice to the head contractor is wrong. CivDocs captures it on site, supervisor signs it off, and it goes straight to billing. No more chasing operators at the end of the week.",
    logoSrc: '/logos-testomonials/gladelogo.png',
  },
];

const FEATURED = [
  {
    name: 'Ryan',
    company: 'Campbell Earthmoving',
    quote: 'CivDocs saves us around 30 hours of admin every week — I can spend that time on site instead of stuck behind a desk.',
    logoSrc: '/homepage_logos/6.png',
    logoClass: 'h-16 w-16 rounded-lg bg-white',
    imageClass: 'object-contain object-left p-1',
  },
  {
    name: 'Riley',
    company: 'RMF Concreting',
    quote: "Being able to track costs between the earthworks and concrete sides of a project — so I can see exactly where we're making money.",
    logoSrc: '/capability-statement/rmf.png',
    logoClass: 'h-16 w-16 rounded-xl bg-[#0b1220]',
    imageClass: 'object-cover',
  },
  {
    name: 'Morgan',
    company: 'Fogarty Earthmoving',
    quote: "Makes it easy to keep track of where I've been working — and makes sure I never forget to invoice hours or attachments.",
    logoSrc: '/homepage_logos/5.png',
    logoClass: 'h-16 w-16 rounded-lg bg-white',
    imageClass: 'object-contain',
  },
];

function personKey(card: { name: string; company: string }): string {
  const first = card.name.split(' ')[0].toLowerCase();
  const company = card.company.toLowerCase().replace(/[^a-z]/g, '');
  const firm = company.includes('jal')
    ? 'jal'
    : company.includes('rmf')
      ? 'rmf'
      : company.includes('piling') || company.startsWith('rj')
        ? 'rjpiling'
        : company.includes('glade')
          ? 'glade'
          : company.includes('elev')
            ? 'elev8'
            : company.includes('ali')
              ? 'ali'
              : company.includes('hlm')
                ? 'hlm'
                : company.includes('jovex')
                  ? 'jovex'
                  : company.includes('bono')
                    ? 'bono'
                    : company.includes('campbell')
                      ? 'campbell'
                      : company.includes('fogarty')
                        ? 'fogarty'
                        : company;
  return `${first}-${firm}`;
}

const FEATURED_KEYS = new Set(FEATURED.map(personKey));

const UNIQUE_CAROUSEL = (() => {
  const seen = new Set<string>();
  return ALL_TESTIMONIALS.filter((card) => {
    const key = personKey(card);
    if (FEATURED_KEYS.has(key) || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
})();

const TOP_ROW = UNIQUE_CAROUSEL.filter((_, i) => i % 2 === 0);
const BOTTOM_ROW = UNIQUE_CAROUSEL.filter((_, i) => i % 2 === 1);

export default function CallbackTestimonials() {
  return (
    <section className="py-16 sm:py-20">
      <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Trusted by civil contractors
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-base text-slate-600 sm:text-lg">
        Simple enough for crews to use. Powerful enough to save serious admin time.
      </p>

      <div className="mt-8 space-y-5 overflow-hidden">
        <DraggableMarquee duration={70} gap={1.25}>
          {TOP_ROW.map((card) => (
            <TestimonialCard
              key={`${card.name}-${card.company}-${card.quote.slice(0, 24)}`}
              {...card}
              size="lg"
              className="mx-0 h-[260px] w-[min(300px,82vw)] min-w-[min(300px,82vw)] sm:h-[280px] sm:w-[340px] sm:min-w-[340px]"
            />
          ))}
        </DraggableMarquee>
        <DraggableMarquee duration={70} gap={1.25} reverse>
          {BOTTOM_ROW.map((card) => (
            <TestimonialCard
              key={`${card.name}-${card.company}-${card.quote.slice(0, 24)}`}
              {...card}
              size="lg"
              className="mx-0 h-[260px] w-[min(300px,82vw)] min-w-[min(300px,82vw)] sm:h-[280px] sm:w-[340px] sm:min-w-[340px]"
            />
          ))}
        </DraggableMarquee>
      </div>

      <CallbackFAQ />

      <div className="mx-auto mt-4 grid max-w-5xl grid-cols-1 gap-5 sm:mt-6 md:grid-cols-3">
        {FEATURED.map((card) => (
          <article
            key={`${card.name}-${card.company}`}
            className="flex h-full flex-col rounded-[1.75rem] border border-gray-200 bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.06)] sm:p-7"
          >
            <p className="text-3xl font-serif leading-none text-[#FF8C32]/35" aria-hidden="true">
              &ldquo;
            </p>
            <p className="mt-1 flex-1 text-xl font-semibold leading-snug tracking-tight text-gray-900 sm:text-2xl">
              {card.quote}
            </p>
            <div className="mt-6 flex items-center gap-3.5 border-t border-[#FF8C32]/20 pt-5">
              <div className={`relative shrink-0 overflow-hidden ${card.logoClass}`}>
                <Image
                  src={card.logoSrc}
                  alt={`${card.name} - ${card.company}`}
                  width={64}
                  height={64}
                  className={`h-full w-full ${card.imageClass}`}
                />
              </div>
              <div>
                <p className="text-lg font-bold leading-tight text-gray-900">{card.name}</p>
                <p className="mt-0.5 text-base font-medium text-[#FF8C32]">{card.company}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 flex justify-center pb-4 sm:mt-16">
        <a
          href="#callback-form"
          className="inline-flex items-center justify-center rounded-xl bg-[#FF8C32] px-14 py-5 text-xl font-bold text-white shadow-lg transition-colors hover:bg-[#E67E22] hover:shadow-xl sm:px-16 sm:py-6"
        >
          Get a Call Back
        </a>
      </div>
    </section>
  );
}
