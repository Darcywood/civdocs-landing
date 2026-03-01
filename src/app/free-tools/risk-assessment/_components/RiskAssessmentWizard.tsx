'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  MachineBasics,
  GraderSpecs,
  Section2Answers,
  RiskAssessmentLead,
} from '@/lib/risk-assessment/types';
import Step1Basics from './Step1Basics';
import Step2Specs from './Step2Specs';
import Step3Questions from './Step3Questions';
import Step4Lead from './Step4Lead';

const STORAGE_KEY = 'risk-assessment-draft';

interface Draft {
  step: number;
  basics?: MachineBasics;
  specs?: GraderSpecs;
  answers?: Section2Answers;
  lead?: Partial<RiskAssessmentLead>;
}

const STEPS = [
  { label: 'Machine ID', short: '1' },
  { label: 'Specs', short: '2' },
  { label: 'Questions', short: '3' },
  { label: 'Your Details', short: '4' },
];

export default function RiskAssessmentWizard() {
  const [step, setStep] = useState(1);
  const [basics, setBasics] = useState<MachineBasics | null>(null);
  const [specs, setSpecs] = useState<GraderSpecs | null>(null);
  const [answers, setAnswers] = useState<Section2Answers>({});
  const [lead, setLead] = useState<Partial<RiskAssessmentLead>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ pdfUrl: string; reportNumber: string; treatmentsInPlace: number; treatmentsRequired: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadDraft = useCallback(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (!raw) return;
      const draft: Draft = JSON.parse(raw);
      if (draft.step) setStep(draft.step);
      if (draft.basics) setBasics(draft.basics);
      if (draft.specs) setSpecs(draft.specs);
      if (draft.answers) setAnswers(draft.answers);
      if (draft.lead) setLead(draft.lead);
    } catch { /* ignore */ }
  }, []);

  const saveDraft = useCallback(() => {
    try {
      const draft: Draft = { step, basics: basics ?? undefined, specs: specs ?? undefined, answers, lead };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch { /* ignore */ }
  }, [step, basics, specs, answers, lead]);

  useEffect(() => { loadDraft(); }, [loadDraft]);
  useEffect(() => { saveDraft(); }, [saveDraft]);

  const clearDraft = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }, []);

  async function handleFinalSubmit(leadData: RiskAssessmentLead) {
    if (!basics) return;
    setIsSubmitting(true);
    setError(null);
    setLead(leadData);

    try {
      const res = await fetch('/api/risk-assessment/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ basics, specs: specs ?? {}, answers, lead: leadData }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');

      clearDraft();
      setResult({
        pdfUrl: data.pdfUrl,
        reportNumber: data.reportNumber,
        treatmentsInPlace: data.treatmentsInPlace,
        treatmentsRequired: data.treatmentsRequired,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (result) {
    return <SuccessScreen result={result} machineLabel={basics ? `${basics.make} ${basics.model} ${basics.machineType}` : 'Machine'} email={lead.email ?? ''} />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200 z-0" />
          {STEPS.map((s, i) => {
            const stepNum = i + 1;
            const done = stepNum < step;
            const active = stepNum === step;
            return (
              <div key={s.label} className="flex flex-col items-center z-10 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  done ? 'bg-[#FF8C32] border-[#FF8C32] text-white' :
                  active ? 'bg-white border-[#FF8C32] text-[#FF8C32]' :
                  'bg-white border-gray-300 text-gray-400'
                }`}>
                  {done ? '✓' : stepNum}
                </div>
                <span className={`mt-1.5 text-xs font-medium hidden sm:block ${active ? 'text-[#FF8C32]' : done ? 'text-gray-600' : 'text-gray-400'}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {step === 1 && (
        <Step1Basics
          initial={basics ?? {}}
          onSubmit={(data) => { setBasics(data); setStep(2); window.scrollTo(0, 0); }}
        />
      )}
      {step === 2 && (
        <Step2Specs
          initial={specs ?? {}}
          onSubmit={(data) => { setSpecs(data); setStep(3); window.scrollTo(0, 0); }}
          onBack={() => { setStep(1); window.scrollTo(0, 0); }}
        />
      )}
      {step === 3 && (
        <Step3Questions
          initial={answers}
          onSubmit={(data) => { setAnswers(data); setStep(4); window.scrollTo(0, 0); }}
          onBack={() => { setStep(2); window.scrollTo(0, 0); }}
        />
      )}
      {step === 4 && (
        <Step4Lead
          initial={lead}
          isSubmitting={isSubmitting}
          onSubmit={handleFinalSubmit}
          onBack={() => { setStep(3); window.scrollTo(0, 0); }}
        />
      )}
    </div>
  );
}

function SuccessScreen({
  result,
  machineLabel,
  email,
}: {
  result: { pdfUrl: string; reportNumber: string; treatmentsInPlace: number; treatmentsRequired: number };
  machineLabel: string;
  email: string;
}) {
  return (
    <div className="max-w-lg mx-auto text-center space-y-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mx-auto">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Report is Ready</h2>
        <p className="text-gray-600">
          Your Risk Management Report for <strong>{machineLabel}</strong> has been generated.
          A download link has been sent to <strong>{email}</strong>.
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-5 text-left space-y-2">
        <p className="text-sm text-gray-500">Report Number: <span className="font-mono text-gray-700">{result.reportNumber}</span></p>
        <div className="flex gap-6 pt-1">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{result.treatmentsInPlace}</p>
            <p className="text-xs text-gray-500">Treatments In Place</p>
          </div>
          {result.treatmentsRequired > 0 && (
            <div className="text-center">
              <p className="text-2xl font-bold text-red-600">{result.treatmentsRequired}</p>
              <p className="text-xs text-gray-500">Treatments Required</p>
            </div>
          )}
        </div>
      </div>

      <a
        href={result.pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] py-3.5 font-semibold text-white shadow-md hover:shadow-lg transition-all text-center"
      >
        Download PDF Report
      </a>

      <p className="text-xs text-gray-400">Download link expires in 7 days. Check your email if you need it later.</p>
    </div>
  );
}
