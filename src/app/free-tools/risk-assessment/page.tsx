import type { Metadata } from 'next';
import RiskAssessmentPageContent from './_components/RiskAssessmentPageContent';

const PAGE_URL = 'https://www.civdocs.com.au/free-tools/risk-assessment';

export const metadata: Metadata = {
  title: 'Free Machine Risk Assessment Generator — CivDocs',
  description:
    'Free machine risk assessment generator for Australian civil contractors. Create a compliant plant risk assessment in minutes — covers excavators, graders, rollers and more.',
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Free Machine Risk Assessment Generator — CivDocs',
    description:
      'Free machine risk assessment generator for Australian civil contractors. Create a compliant plant risk assessment in minutes — covers excavators, graders, rollers and more.',
    url: PAGE_URL,
    type: 'website',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Machine Risk Assessment Generator — CivDocs',
    description:
      'Free machine risk assessment generator for Australian civil contractors. Create a compliant plant risk assessment in minutes.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a machine risk assessment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A machine risk assessment is a structured document that identifies hazards associated with operating a specific piece of plant, evaluates the level of risk, and sets out control measures to reduce that risk to an acceptable level. For civil contractors, this typically covers items like excavators, graders, rollers, and posi tracks. Principal contractors and safety auditors commonly request a plant risk assessment before a machine mobilises to site. CivDocs generates a full machine risk assessment template in minutes — hazard identification, risk matrix, control measures, and standards references included.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need a risk assessment for every machine on site?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In practice, yes — each machine on a civil or earthmoving site should have its own plant risk assessment. Hazards, operating context, and control measures differ between machine types and even between individual units. A principal contractor or safety auditor will typically ask to see a separate assessment per machine, not a generic document copied from another job. CivDocs lets you generate a compliant, machine-specific risk assessment for each unit in your fleet, free of charge.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is this different from a SWMS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A SWMS (Safe Work Method Statement) describes how a specific high-risk construction task will be carried out safely — it is task-focused. A machine risk assessment is plant-focused: it documents the hazards inherent to operating that machine, regardless of which task it is performing on any given day. On most civil sites you need both. CivDocs generates the machine risk assessment; your SWMS covers the task-specific safe work method for each job.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a professional risk assessment normally cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WHS consultants typically charge $250 to $400 per machine for a professional plant risk assessment in Australia. For a contractor running five or more machines, that adds up quickly — and assessments need to be updated when machines change or controls are revised. CivDocs offers a free machine risk assessment generator that produces a structured, audit-ready PDF in under five minutes, with no consultant fees.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to generate a free machine risk assessment with CivDocs',
  description:
    'Create a compliant plant risk assessment for Australian civil contractors in minutes using the CivDocs free generator.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Enter Machine Details',
      text: 'Enter your machine identification details — type, make, model, and operating context.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Answer Compliance Questions',
      text: 'Answer compliance questions about your machine specs and safety controls.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'System Generates the Report',
      text: 'CivDocs generates a structured risk management report with hazard identification, risk matrix, and control measures.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Download Your PDF',
      text: 'Download your completed plant risk assessment PDF, ready for site audits and principal contractors.',
    },
  ],
};

export default function RiskAssessmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <RiskAssessmentPageContent />
    </>
  );
}
