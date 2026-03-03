import type { Metadata } from 'next';
import Header from '@/components/Header';
import BuildPageContent from './_components/BuildPageContent';

export const metadata: Metadata = {
  title: 'Build Risk Assessment — CivDocs',
  description: 'Build your machine risk management report. Enter machine details, specs, and answer compliance questions.',
};

export default function RiskAssessmentBuildPage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <BuildPageContent />
    </div>
  );
}
