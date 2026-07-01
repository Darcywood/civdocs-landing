import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Civil Contractor Software Australia — Job Costing, Timesheets & Pre-Starts | CivDocs',
  description:
    'CivDocs is built for Australian civil contractors. Track machine hours, manage EBA payroll, run pre-start checks, and see real-time job costs. Free 14-day trial — no credit card required.',
  alternates: { canonical: 'https://www.civdocs.com.au/civil-contractors' },
  openGraph: {
    title: 'Civil Contractor Software Australia — Job Costing, Timesheets & Pre-Starts | CivDocs',
    description:
      'Track machine hours, manage EBA payroll, run pre-start checks, and see real-time job costs. Built for Australian civil contractors.',
    url: 'https://www.civdocs.com.au/civil-contractors',
    type: 'website',
    siteName: 'CivDocs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Civil Contractor Software Australia | CivDocs',
    description: 'Track machine hours, EBA payroll, pre-starts, and real-time job costs. Built for Australian civil contractors.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
