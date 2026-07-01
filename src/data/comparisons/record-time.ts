// MAINTENANCE: Review quarterly. Last updated: 2026-06-27.
// Source dossier: public/competitorresearch/civdocs-vs-record-time.md
// NOTE: Record TIME's website does not prominently display pricing and is difficult to navigate.
// Verify their pricing directly before publishing any specific figures.
// Record TIME does not appear to have plant-hire-specific workflows.
import type { ComparisonData } from './types';

const recordTime: ComparisonData = {
  slug: 'civdocs-vs-record-time',
  competitor: 'Record TIME',
  competitorShort: 'Record TIME',
  titleTag: 'CivDocs vs Record TIME (2026): Honest Comparison for Civil Contractors',
  metaDescription:
    'CivDocs vs Record TIME: an honest 2026 comparison for Australian civil contractors. Record TIME is a flexible digital docketing tool; CivDocs is the full operational platform for civil and plant hire. See which fits your business.',
  h1: 'CivDocs vs Record TIME: Digital Docketing Tool or Full Civil Operations Platform?',
  summary:
    'Record TIME is an Australian digital docketing and paperless forms system — an excellent, affordable way to replace paper dockets with digital capture across any industry. CivDocs is a civil-native all-in-one operations platform built specifically for civil contractors and plant hire businesses: EBA payroll, plant hire logbooks, machine-hour costing, Crank AI estimating, job costing, invoicing, scheduling, and deep accounting integration, alongside digital dockets, timesheets, and pre-starts. If your primary problem is paper dockets and you want a fast, flexible tool to go paperless, Record TIME is a strong choice. If you need a platform that runs your whole civil business — not just digitises your paperwork — CivDocs is purpose-built for that.',
  tableRows: [
    {
      dimension: 'Built for Australian civil',
      civdocs: { value: '✓', note: 'Civil-native; built by a civil operator' },
      competitor: { value: 'Partial', note: 'Australian-based; markets to construction and earthmoving, but also healthcare, transport, cranes — cross-industry, not civil-native' },
    },
    {
      dimension: 'Free trial',
      civdocs: { value: '✓' },
      competitor: { value: '✓', note: '14-day go-paperless guarantee; self-serve' },
    },
    {
      dimension: 'Transparent pricing',
      civdocs: { value: '✓', note: '✓ Transparent flat pricing' },
      competitor: { value: 'Not found' },

    },
    {
      dimension: 'Digital dockets / custom forms engine',
      civdocs: { value: '✓' },
      competitor: { value: '✓', note: 'Flagship strength — no-code replication of any paper form; fully customisable' },
    },
    {
      dimension: 'Timesheets',
      civdocs: { value: '✓' },
      competitor: { value: '✓', note: 'Daily construction timesheet as a docket type; job timers' },
    },
    {
      dimension: 'Pre-starts / SWMS / JSA',
      civdocs: { value: '✓', note: 'Supervisor sign-off; digital signatures; SMS alert to designated mechanic' },
      competitor: { value: '✓', note: 'Templating engine for compliance docs; pre-start checklists' },
    },
    {
      dimension: 'Digital signatures / supervisor sign-off',
      civdocs: { value: '✓', note: 'Supervisor sign-off and signatures on timesheets and pre-starts' },
      competitor: { value: '✓', note: 'Digital signatures and proof of work/delivery' },
    },
    {
      dimension: 'Scheduling (crew + plant)',
      civdocs: { value: '✓', note: 'Mature, mobile-first scheduling; crews love it' },
      competitor: { value: '✓', note: 'Job scheduling; assign employees and plant; on-the-fly changes' },
    },
    {
      dimension: 'Plant hire logbooks',
      civdocs: { value: '✓', note: 'First-class feature' },
      competitor: { value: '✗', note: 'No plant-hire-specific logbook workflows' },
    },
    {
      dimension: 'Job costing',
      civdocs: { value: '✓', note: 'Full civil job costing; cost-code-level tracking' },
      competitor: { value: 'Limited', note: 'Docket-level tracking; not full cost-code civil job costing' },
    },
    {
      dimension: 'Machine-hour costing',
      civdocs: { value: '✓' },
      competitor: { value: '✗' },
    },
    {
      dimension: 'EBA payroll (site/crib/meal allowances)',
      civdocs: { value: '✓', note: 'Site allowance, crib allowance, meal allowance auto-calculated' },
      competitor: { value: '✗' },
    },
    {
      dimension: 'AI-powered estimating',
      civdocs: { value: '✓', note: 'Crank AI — live' },
      competitor: { value: '✗' },
    },
    {
      dimension: 'Material delivery tracking',
      civdocs: { value: '✓' },
      competitor: { value: 'Partial', note: 'Delivery dockets and proof of delivery; not full material delivery tracking' },
    },
    {
      dimension: 'Invoicing',
      civdocs: { value: '✓', note: 'Civil-shaped; tied to job structure' },
      competitor: { value: '✓', note: 'Turn dockets into invoices; basic invoicing from docket data' },
    },
    {
      dimension: 'Xero integration',
      civdocs: { value: '✓' },
      competitor: { value: '✓' },
    },
    {
      dimension: 'Civil-specific design',
      civdocs: { value: '✓', note: 'Built specifically for civil contractors and plant hire' },
      competitor: { value: '✗', note: 'General-purpose across industries; not civil-native' },
    },
    {
      dimension: 'Dev team location & responsiveness',
      civdocs: { value: '✓', note: 'In-house Melbourne team; feature requests shipped within 24 hours' },
      competitor: { value: 'Australia (ACT)', note: 'Australian company; standard release cycle' },
    },
  ],
  differentiationThesis: {
    heading: 'CivDocs vs Record TIME: paperwork tool vs full civil operations platform',
    intro:
      'Record TIME solves a specific, well-defined problem: replacing paper dockets with digital capture. It does it well, at an accessible price point, across many industries. CivDocs solves a broader problem: running a civil construction or plant hire business — from first pre-start of the day to end-of-month invoice — in one civil-native platform.',
    sections: [
      {
        h3: 'Scope: what each platform is built to do',
        body:
          'Record TIME is a digital docketing and paperless forms engine. It is excellent at replicating any paper document — earthmoving dockets, delivery dockets, timesheets, pre-start checklists, SWMS — in a no-code digital format. What it does not do is run your civil business\'s financial operations: full job costing against cost codes, EBA payroll with site/crib/meal allowances, plant hire logbook management, machine-hour costing, Crank AI estimating, or deep accounting integration. CivDocs does all of these. A contractor on Record TIME may still need separate tools for job costing and financial management; CivDocs consolidates everything into one civil-native system.',
      },
      {
        h3: 'Civil-native vs general-purpose',
        body:
          'Record TIME markets to construction, earthmoving, cranes, transport, and healthcare — flexibility is its strength. But general-purpose flexibility means it is not architected around the specific workflows of a civil contractor or plant hire operator: plant logbooks, machine-hour costing, civil job cost codes, EBA allowance calculations. CivDocs is built specifically for civil and plant hire, which means the workflows, terminology, and costing structures match how you actually run your business.',
      },
      {
        h3: 'One system vs forms layer plus separate tools',
        body:
          'Record TIME is a strong forms and docket layer — but it is typically one component in a stack that still requires separate job-costing, invoicing, or accounting tools. CivDocs is the complete operational system: dockets, timesheets with digital signatures, pre-starts with mechanic SMS alerts, plant logbooks, EBA payroll, Crank AI estimating, job costing, invoicing, and Xero/MYOB integration in one place. Fewer systems means less data re-entry, fewer gaps, and clearer visibility.',
      },
    ],
  },
  featureDeepDive: {
    heading: 'Feature by feature: CivDocs vs Record TIME',
    sections: [
      {
        h3: 'Digital dockets and custom forms',
        body:
          'Record TIME\'s no-code forms engine is a genuine strength — replicate any paper docket with custom fields, rules, and validations. It is fast to set up and flexible. CivDocs includes digital dockets as a core feature built around civil workflows (earthmoving dockets, delivery dockets, plant dockets). Record TIME has an edge in forms flexibility; CivDocs has an edge in civil-specific workflow integration and the downstream data that flows into job costing and payroll.',
      },
      {
        h3: 'Pre-starts, signatures, and the mechanic SMS alert',
        body:
          'Both platforms handle pre-starts with digital signatures. CivDocs adds a specific workflow that Record TIME does not have: when a pre-start is submitted, an SMS alert is automatically sent to the designated mechanic in your company. This closes the maintenance loop between field crews and your workshop without any phone calls or manual follow-up.',
      },
      {
        h3: 'Job costing',
        body:
          'This is the most significant functional gap. Record TIME captures docket-level data that can feed basic invoicing. It does not provide full cost-code civil job costing: tracking labour, plant hours, and materials against a civil job budget, producing a job-level P&L, and syncing to Xero or MYOB. CivDocs does all of this as a core feature.',
      },
      {
        h3: 'Plant hire logbooks and machine-hour costing',
        body:
          'Record TIME does not have plant hire logbook workflows or machine-hour costing. CivDocs includes both as first-class features, built for plant hire operators and civil businesses with significant fleet. If plant hire is a core part of your business, this is the single most important feature gap to evaluate.',
      },
      {
        h3: 'EBA payroll and allowances',
        body:
          'CivDocs auto-calculates site allowance, crib allowance, and meal allowance as part of EBA-compliant payroll — the specific civil-award entitlements that matter for Australian civil crews. Record TIME is a docketing tool and does not include EBA payroll processing.',
      },
      {
        h3: 'Crank AI estimating',
        body:
          'CivDocs includes Crank AI — AI-powered estimating for civil work, live and built into the platform. Record TIME does not have an estimating tool.',
      },
      {
        h3: 'Invoicing and accounting',
        body:
          'Both platforms can generate invoices. Record TIME\'s invoicing is docket-driven — turn a completed docket into an invoice. CivDocs\' invoicing is tied to the full job structure: cost codes, plant hours, materials, and labour pulled through from the job to the invoice, with Xero/MYOB sync. CivDocs integrates with both Xero and MYOB. Record TIME integrates with Xero; MYOB integration is unconfirmed.',
      },
    ],
  },
  pricing: {
    heading: 'CivDocs vs Record TIME: pricing comparison',
    body:
      'Record TIME\'s pricing is not prominently published on their website. A free 14-day trial is available and the platform is positioned as an affordable, SMB-friendly tool. Verify their current pricing directly with Record TIME.\n\nCivDocs publishes transparent flat tiers: transparent, flat pricing with no lock-in. A free trial is available today. The right comparison is not just price — it is what each platform covers at that price. A contractor using Record TIME for dockets but still needing separate job-costing, EBA payroll, and accounting tools will have total software costs and admin overhead that may exceed CivDocs\' all-in-one price.',
  },
  whenCompetitorWins: {
    heading: 'When Record TIME is the better choice',
    bullets: [
      'Your primary pain point is paper dockets — chasing signatures, proof of delivery, and approval workflows — and you want a fast, affordable, no-code solution to go digital quickly.',
      'You work across multiple industries (not just civil) and need a flexible forms engine that is not opinionated about your specific workflow.',
      'You are a small operator who needs basic docketing and timesheets without full job costing, plant hire management, or EBA payroll features.',
      'You want a very simple digital forms tool that your team can adopt in days without any configuration of civil job structures.',
    ],
  },
  whyCivdocsWins: {
    heading: 'Why civil contractors and plant hire businesses choose CivDocs over Record TIME',
    body:
      'Contractors who graduate from Record TIME typically do so when they realise they still need job costing, plant hire management, EBA payroll, or proper accounting integration — and are tired of running multiple tools. CivDocs consolidates that into one civil-native platform.',
    bullets: [
      'Full civil job costing against cost codes — not just docket-level data capture.',
      'Plant hire logbooks and machine-hour costing as first-class, built-in features.',
      'EBA payroll with site/crib/meal allowances automatically calculated.',
      'Crank AI estimating — live and built in.',
      'Xero and MYOB integration at the job-costing level, not just docket-to-invoice.',
      'Pre-start SMS alerts to your designated mechanic — automatic, no follow-up phone calls.',
      'Civil-native design: built specifically for civil contractors and plant hire operators.',
      'In-house Melbourne dev team — feature requests shipped within 24 hours.',
      '75+ Australian civil and plant hire companies already running CivDocs.',
    ],
  },
  faq: [
    {
      question: 'Is Record TIME good for civil contractors?',
      answer:
        'Record TIME is a solid digital docketing tool that many civil and earthmoving operators use to replace paper dockets. It is flexible, affordable, and fast to adopt. Where it falls short for civil contractors is job costing, plant hire logbooks, machine-hour costing, and EBA payroll — it is a forms/docket layer, not a full civil operations platform.',
    },
    {
      question: 'Does Record TIME have plant hire logbooks?',
      answer:
        'No. Record TIME does not have plant hire logbook workflows. It is a general-purpose docketing tool, not a plant-hire-specific operations platform. CivDocs includes plant hire logbooks as a first-class feature.',
    },
    {
      question: 'Does Record TIME do job costing?',
      answer:
        'Record TIME captures docket-level data that can be used for basic invoicing. It does not provide full cost-code civil job costing — tracking labour, plant hours, and materials against a job budget and syncing to accounting software. CivDocs provides full civil job costing as a core feature.',
    },
    {
      question: 'Does Record TIME integrate with Xero and MYOB?',
      answer:
        'Record TIME integrates with Xero. MYOB integration is unconfirmed — verify directly with Record TIME. CivDocs integrates with both Xero and MYOB as core features.',
    },
    {
      question: 'Can I try both CivDocs and Record TIME before buying?',
      answer:
        'Yes, both offer free trials. Record TIME offers a 14-day go-paperless trial. CivDocs offers a free trial you can start today from the pricing page, with monthly or annual billing (no lock-in) and no lock-in.',
    },
    {
      question: 'What is Record TIME used for?',
      answer:
        'Record TIME is primarily a digital docketing and paperless forms tool — replacing paper dockets, delivery records, timesheets, pre-start checklists, and safety forms with digital capture and proof of work/delivery. It is used across construction, earthmoving, transport, cranes, and other industries.',
    },
  ],
  datePublished: '2026-06-27',
  dateModified: '2026-06-27',
};

export default recordTime;

