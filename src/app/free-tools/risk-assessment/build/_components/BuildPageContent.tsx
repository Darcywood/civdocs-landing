'use client';

import Link from 'next/link';
import RiskAssessmentWizard from '../../_components/RiskAssessmentWizard';

export default function BuildPageContent() {
  return (
    <>
      <div className="pt-20 px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <Link href="/free-tools/risk-assessment" className="text-sm text-gray-500 hover:text-[#FF8C32] mb-6 inline-block">
            ← Back to overview
          </Link>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Build Your Risk Assessment</h2>
            <p className="text-gray-500 text-sm">Your progress is saved automatically as you go.</p>
          </div>
          <RiskAssessmentWizard />
        </div>
      </div>
    </>
  );
}
