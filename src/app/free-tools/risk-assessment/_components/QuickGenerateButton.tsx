'use client';

import { useState } from 'react';
import { GRADER_QUESTIONS } from '@/lib/risk-assessment/graderQuestions';
import RiskAssessmentPdfViewerModal from './RiskAssessmentPdfViewerModal';

const DEFAULT_PAYLOAD = {
  basics: {
    reportNumber: '',
    date: new Date().toISOString().slice(0, 10),
    assessmentPurpose: '',
    state: 'NSW',
    owner: 'Demo Company',
    assessorName: 'Demo Assessor',
    make: 'Caterpillar',
    model: '140M Grader',
    machineType: 'Grader',
    assetNumber: 'DEMO-001',
    registration: '',
  },
  specs: {
    noise_mfr_dba: '85',
    blade_height_mm: '610',
    blade_length_mm: '3658',
    blade_lift_mm: '610',
    blade_thickness_mm: '32',
    blade_tilt: '40 deg / 5 deg',
    body_type: 'Articulated',
    articulation_deg: '20',
    fuel_capacity_l: '265',
    hydraulic_oil_capacity_l: '95',
    speeds_fr: '8 Fwd / 6 Rev',
    max_speed: '46 km/h',
    transmission: 'Power Shift',
    drive: '4WD',
    engine_make_model: 'Cat C9.3',
    engine_hours: '5000',
    plant_year: '2016',
    extras_air_conditioning: true,
    extras_fops: true,
    extras_rops_cabin: true,
  },
  answers: Object.fromEntries(
    GRADER_QUESTIONS.map((q) => [q.id, 'yes' as const])
  ),
  lead: {
    firstName: 'Demo',
    email: 'demo@civdocs.com.au',
    companyName: 'Demo Company',
    marketingConsent: false,
  },
  _gotcha: '',
};

export default function QuickGenerateButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [result, setResult] = useState<{
    reportNumber: string;
    machineLabel: string;
    treatmentsInPlace: number;
    treatmentsRequired: number;
  } | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    setPdfUrl(null);
    setResult(null);
    try {
      const res = await fetch('/api/risk-assessment/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(DEFAULT_PAYLOAD),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.details || 'Generation failed');
      }
      setPdfUrl(data.pdfUrl);
      setResult({
        reportNumber: data.reportNumber,
        machineLabel: `${DEFAULT_PAYLOAD.basics.make} ${DEFAULT_PAYLOAD.basics.model} ${DEFAULT_PAYLOAD.basics.machineType}`,
        treatmentsInPlace: data.treatmentsInPlace ?? 0,
        treatmentsRequired: data.treatmentsRequired ?? 0,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mb-4">
        <button
          type="button"
          onClick={handleClick}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full border-2 border-dashed border-[#FF8C32]/40 bg-[#FF8C32]/5 px-6 py-2.5 text-sm font-medium text-[#CC5500] hover:border-[#FF8C32]/60 hover:bg-[#FF8C32]/10 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#FF8C32] border-t-transparent" />
              Generating…
            </>
          ) : (
            <>
              <span className="text-base">⚡</span>
              Quick Generate Sample PDF
            </>
          )}
        </button>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      {pdfUrl && result && (
        <RiskAssessmentPdfViewerModal
          pdfUrl={pdfUrl}
          reportNumber={result.reportNumber}
          machineLabel={result.machineLabel}
          treatmentsInPlace={result.treatmentsInPlace}
          treatmentsRequired={result.treatmentsRequired}
          onClose={() => {
            setPdfUrl(null);
            setResult(null);
          }}
        />
      )}
    </>
  );
}
