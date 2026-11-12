const SITE = 'https://www.civdocs.com.au';

export const FOUNDER_PAGE_URL = `${SITE}/darcy-wood`;
export const FOUNDER_ID = `${FOUNDER_PAGE_URL}#person`;
export const ORGANIZATION_ID = `${SITE}/#organization`;

export const FOUNDER_HEADSHOT = '/founder/darcy-wood.jpg';
export const FOUNDER_GRADER_PHOTO = '/founder/darcy-wood-symal.jpg';

export const FOUNDER_LINKS = {
  linkedin: 'https://www.linkedin.com/in/-darcywood',
  instagram: 'https://www.instagram.com/_darcywood',
};

export const CIVDOCS_SAME_AS = [
  'https://www.linkedin.com/company/civdocs',
  'https://www.instagram.com/civdocs',
  'https://www.facebook.com/p/Civ-Docs-61585458002959/',
  'https://apps.apple.com/au/app/civ-docs/id6756803850',
  'https://play.google.com/store/apps/details?id=com.civdocs.app',
];

export const FOUNDER_SUMMARY =
  'Darcy Wood is an Australian founder from the Yarra Valley, Victoria. A former grader operator in civil construction, he founded CivDocs (civil construction management software), CivLeads (marketing, websites and lead generation for small businesses) and Rollout (a peer-to-peer plant hire marketplace).';

export const FOUNDER_COMPANIES = [
  {
    id: ORGANIZATION_ID,
    name: 'CivDocs',
    founded: '2025',
    role: 'Founder',
    status: 'Current',
    url: SITE,
    sameAs: CIVDOCS_SAME_AS,
    description:
      'Construction management software for Australian civil contractors and plant hire businesses: pre-starts, timesheets, plant logbooks, dockets, cost tracking, progress claims, custom forms, bill and docket matching, survey software, site diary and service and maintenance history.',
  },
  {
    id: `${FOUNDER_PAGE_URL}#civleads`,
    name: 'CivLeads',
    founded: '2021',
    role: 'Founder',
    status: 'Current',
    url: 'https://www.instagram.com/civleads',
    sameAs: ['https://www.instagram.com/civleads'],
    description:
      'Marketing, website design and lead generation for small home-service and trade businesses.',
  },
  {
    id: `${FOUNDER_PAGE_URL}#rollout`,
    name: 'Rollout',
    founded: '2026',
    role: 'Founder',
    status: 'Pre-launch',
    url: 'https://rollout.net.au',
    sameAs: ['https://rollout.net.au', 'https://www.instagram.com/rollout.au'],
    description:
      'A peer-to-peer plant hire marketplace, like Airbnb for machinery. Owners list their plant and other people hire it.',
  },
  {
    id: `${FOUNDER_PAGE_URL}#aus-construction-apparel`,
    name: 'Aus Construction Apparel',
    founded: '2023',
    role: 'Founder (exited 2025)',
    status: 'Exited 2025',
    url: 'https://www.instagram.com/ausconapparel',
    sameAs: ['https://www.instagram.com/ausconapparel'],
    description: 'A workwear and apparel brand for the Australian construction industry.',
  },
] as const;

const founderPerson = {
  '@type': 'Person',
  '@id': FOUNDER_ID,
  name: 'Darcy Wood',
  givenName: 'Darcy',
  familyName: 'Wood',
  jobTitle: 'Founder of CivDocs, CivLeads and Rollout',
  description: FOUNDER_SUMMARY,
  url: FOUNDER_PAGE_URL,
  image: `${SITE}${FOUNDER_HEADSHOT}`,
  email: 'darcy@civdocs.com.au',
  sameAs: [FOUNDER_LINKS.linkedin, FOUNDER_LINKS.instagram],
  nationality: { '@type': 'Country', name: 'Australia' },
  homeLocation: {
    '@type': 'Place',
    name: 'Yarra Valley, Victoria, Australia',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'VIC',
      addressCountry: 'AU',
    },
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Eltham High School',
    address: { '@type': 'PostalAddress', addressLocality: 'Eltham', addressRegion: 'VIC', addressCountry: 'AU' },
  },
  worksFor: [
    { '@id': ORGANIZATION_ID },
    { '@id': `${FOUNDER_PAGE_URL}#civleads` },
    { '@id': `${FOUNDER_PAGE_URL}#rollout` },
  ],
  knowsAbout: [
    'Civil construction',
    'Earthmoving',
    'Motor grader operation',
    'Final trim',
    'UTS survey equipment',
    'Plant hire',
    'Construction management software',
    'Software development',
    'Digital marketing',
    'Lead generation',
  ],
};

/** Person plus the companies Darcy founded, for the founder page and anywhere else that names him. */
export function founderGraph() {
  return [
    founderPerson,
    ...FOUNDER_COMPANIES.map((company) => ({
      '@type': 'Organization',
      '@id': company.id,
      name: company.name,
      url: company.url,
      description: company.description,
      foundingDate: company.founded,
      founder: { '@id': FOUNDER_ID },
      sameAs: company.sameAs,
    })),
  ];
}
