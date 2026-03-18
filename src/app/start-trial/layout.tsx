import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Start Your Free Trial | CivDocs',
  description:
    'Know your job costs before the job finishes. CivDocs captures daily site data — hours, plant, progress. 14 days free, no credit card required.',
};

export default function StartTrialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
