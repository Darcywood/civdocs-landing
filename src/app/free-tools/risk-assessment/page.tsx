import type { Metadata } from 'next';
import RiskAssessmentPageContent from './_components/RiskAssessmentPageContent';

export const metadata: Metadata = {
  title: 'Free Machine Risk Assessment Generator — CivDocs',
  description: 'Generate a professional machine risk management report in minutes. Free for Australian civil contractors and plant operators. Covers graders, excavators, and more.',
};

export default function RiskAssessmentPage() {
  return <RiskAssessmentPageContent />;
}
