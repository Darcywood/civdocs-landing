import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  FOUNDER_COMPANIES,
  FOUNDER_GRADER_PHOTO,
  FOUNDER_HEADSHOT,
  FOUNDER_ID,
  FOUNDER_LINKS,
  FOUNDER_PAGE_URL,
  FOUNDER_SUMMARY,
  founderGraph,
} from '@/lib/founder';

const SITE = 'https://www.civdocs.com.au';
const TITLE = 'Darcy Wood — Founder of CivDocs, CivLeads and Rollout';
const DESCRIPTION =
  'Darcy Wood is a former grader operator from the Yarra Valley, Victoria, and the founder of CivDocs, CivLeads and Rollout.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: FOUNDER_PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: FOUNDER_PAGE_URL,
    siteName: 'CivDocs',
    type: 'profile',
    firstName: 'Darcy',
    lastName: 'Wood',
    locale: 'en_AU',
    images: [{ url: FOUNDER_HEADSHOT, width: 800, height: 800, alt: 'Darcy Wood' }],
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
    images: [FOUNDER_HEADSHOT],
  },
  robots: { index: true, follow: true },
};

const QUICK_FACTS = [
  { label: 'Based in', value: 'Yarra Valley, Victoria, Australia' },
  { label: 'School', value: 'Eltham High School (Year 12, 2019)' },
  { label: 'Background', value: 'Labourer, plant operator and final-trim grader operator' },
  { label: 'Founder of', value: 'CivDocs (2025), CivLeads (2021), Rollout (2026)' },
  { label: 'Previously', value: 'Founded Aus Construction Apparel (2023), exited 2025' },
];

const FAQS = [
  {
    q: 'Who is Darcy Wood?',
    a: FOUNDER_SUMMARY,
  },
  {
    q: 'What companies has Darcy Wood founded?',
    a: 'CivDocs (2025), construction management software for civil contractors and plant hire; CivLeads (2021), marketing, websites and lead generation for small home-service and trade businesses; and Rollout (2026), a peer-to-peer plant hire marketplace. He also founded Aus Construction Apparel in 2023 and exited it in 2025.',
  },
  {
    q: 'What did Darcy Wood do before CivDocs?',
    a: 'He worked in civil construction after finishing Year 12 at Eltham High School in 2019: labouring and operating at Diamond Valley Excavations (later part of Joslyn Group, now Victorian Sports Group), plant operating at Wamarra, then final-trim grader operating with UTS survey equipment at Symal Group.',
  },
  {
    q: 'What is Rollout?',
    a: 'Rollout is a peer-to-peer plant hire marketplace, similar to Airbnb for machinery. Owners list their plant and other people hire it. It is in pre-launch at rollout.net.au, with hiring opening once 100 machines are listed.',
  },
  {
    q: 'Where is Darcy Wood from?',
    a: 'The Yarra Valley in Victoria, Australia.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': FOUNDER_PAGE_URL,
      url: FOUNDER_PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'en-AU',
      mainEntity: { '@id': FOUNDER_ID },
      isPartOf: { '@type': 'WebSite', url: SITE, name: 'CivDocs' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'CivDocs', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE}/about` },
          { '@type': 'ListItem', position: 3, name: 'Darcy Wood', item: FOUNDER_PAGE_URL },
        ],
      },
    },
    ...founderGraph(),
    {
      '@type': 'FAQPage',
      '@id': `${FOUNDER_PAGE_URL}#faq`,
      mainEntity: FAQS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
};

function LinkedInIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function DarcyWoodPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main className="pt-20">

        {/* Hero */}
        <section className="bg-gradient-to-b from-white to-[#FFF5ED] pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left gap-8 sm:gap-12">
            <div className="relative h-40 w-40 sm:h-52 sm:w-52 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-xl">
              <Image src={FOUNDER_HEADSHOT} alt="Darcy Wood" fill priority sizes="208px" className="object-cover" />
            </div>
            <div>
              <span className="text-sm font-semibold text-[#F97316] uppercase tracking-widest">About the founder</span>
              <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">Darcy Wood</h1>
              <p className="mt-3 text-lg text-gray-700 font-medium">Founder of CivDocs, CivLeads and Rollout</p>
              <p className="mt-1 text-gray-500">Yarra Valley, Victoria, Australia</p>
              <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-3">
                <a
                  href={FOUNDER_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-[#F97316] hover:text-[#F97316] transition-colors"
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <a
                  href={FOUNDER_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-[#F97316] hover:text-[#F97316] transition-colors"
                >
                  <InstagramIcon />
                  @_darcywood
                </a>
                <a
                  href="mailto:darcy@civdocs.com.au"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-[#F97316] hover:text-[#F97316] transition-colors"
                >
                  darcy@civdocs.com.au
                </a>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-6 lg:px-8 mt-12">
            <p className="text-[17px] text-gray-700 leading-relaxed">{FOUNDER_SUMMARY}</p>
            <dl className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 rounded-2xl border border-gray-200 bg-white p-6">
              {QUICK_FACTS.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">{fact.label}</dt>
                  <dd className="mt-1 text-sm text-gray-900">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <span className="text-sm font-semibold text-[#F97316] uppercase tracking-widest">His story</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-8">From the grader seat to software</h2>

            <div className="space-y-5 text-[17px] text-gray-700 leading-relaxed">
              <p>
                Darcy grew up in the Yarra Valley and finished Year 12 at Eltham High School in 2019. He had already
                started teaching himself to code in high school, but he went straight onto the tools.
              </p>
              <p>
                His first job was labouring at Diamond Valley Excavations, where he moved onto excavators, laser
                buckets and, mostly, graders. He specialised in final trim for sports fields, as well as bulk
                earthworks. The business merged into Joslyn Group in 2020, which is now Victorian Sports Group.
              </p>
              <p>
                He then worked as a plant operator at Wamarra before moving to Symal Group as a final-trim grader
                operator, specialising in UTS survey equipment.
              </p>
            </div>

            <figure className="my-12">
              <Image
                src={FOUNDER_GRADER_PHOTO}
                alt="Darcy Wood on a civil site with a Symal motor grader"
                width={1600}
                height={1200}
                sizes="(max-width: 768px) 100vw, 768px"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
              <figcaption className="mt-3 text-center text-sm text-gray-500">Darcy on site with a Symal grader.</figcaption>
            </figure>

            <div className="space-y-5 text-[17px] text-gray-700 leading-relaxed">
              <h3 className="text-xl font-semibold text-gray-900">Building on the side</h3>
              <p>
                Alongside his operator jobs, Darcy kept coding and learning marketing. He built websites and ran lead
                generation for small businesses, which became CivLeads in 2021. In 2023 he started Aus Construction
                Apparel, a workwear and apparel brand for the construction industry, and exited it in 2025.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 pt-4">CivDocs</h3>
              <p>
                In 2025 Darcy left the grader to build CivDocs full time. It started as a simple pre-start and
                timesheet app for civil crews. It now runs the whole civil side of a business: cost tracking, progress
                claims, custom forms, bill and docket matching, survey software, site diary, plant logbooks and service
                and maintenance history.
              </p>
              <p>
                He wrote more about why in{' '}
                <Link href="/blog/why-i-built-civdocs" className="text-[#F97316] font-medium hover:underline">
                  Why I Built CivDocs
                </Link>
                .
              </p>

              <h3 className="text-xl font-semibold text-gray-900 pt-4">Rollout</h3>
              <p>
                In 2026 he started Rollout, a peer-to-peer plant hire marketplace that works like Airbnb for machinery.
                Owners list their plant and other people hire it. Rollout is in pre-launch: owners are listing machines
                now, and hiring opens once 100 machines are listed.
              </p>
            </div>
          </div>
        </section>

        {/* Companies */}
        <section className="py-20 sm:py-24 bg-gradient-to-b from-white via-[#FFF5ED] to-white">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <span className="text-sm font-semibold text-[#F97316] uppercase tracking-widest">Companies</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-10">What Darcy has built</h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {FOUNDER_COMPANIES.map((company) => (
                <a
                  key={company.name}
                  href={company.url}
                  target={company.name === 'CivDocs' ? undefined : '_blank'}
                  rel={company.name === 'CivDocs' ? undefined : 'noopener noreferrer'}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-[#F97316] hover:shadow-md"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#F97316]">{company.name}</h3>
                    <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                      {company.founded} · {company.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">{company.description}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 sm:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-8">Questions about Darcy Wood</h2>
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {FAQS.map((item) => (
                <div key={item.q} className="py-6">
                  <h3 className="font-semibold text-gray-900">{item.q}</h3>
                  <p className="mt-2 text-gray-700 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:darcy@civdocs.com.au"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-white shadow-lg transition-all hover:opacity-95"
                style={{ backgroundColor: '#F97316' }}
              >
                Email Darcy
              </a>
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold border-2 border-gray-200 text-gray-900 hover:border-[#F97316] hover:text-[#F97316] transition-all"
              >
                About CivDocs
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
