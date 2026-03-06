'use client';

import { useState, useEffect, useCallback } from 'react';
import type {
  MachineBasics,
  GraderSpecs,
  ExcavatorSpecs,
  PosiTrackSpecs,
  RollerSpecs,
  Section2Answers,
  RiskAssessmentLead,
} from '@/lib/risk-assessment/types';
import { EXCAVATOR_QUESTIONS, EXCAVATOR_SURVEY_GROUPS } from '@/lib/risk-assessment/excavatorQuestions';
import { POSI_TRACK_QUESTIONS, POSI_TRACK_SURVEY_GROUPS } from '@/lib/risk-assessment/posiTrackQuestions';
import { ROLLER_QUESTIONS, ROLLER_SURVEY_GROUPS } from '@/lib/risk-assessment/rollerQuestions';
import RiskAssessmentGenerationModal from './RiskAssessmentGenerationModal';
import RiskAssessmentPdfViewerModal from './RiskAssessmentPdfViewerModal';
import Step1Basics from './Step1Basics';
import Step2Specs from './Step2Specs';
import Step2ExcavatorSpecs from './Step2ExcavatorSpecs';
import Step2PosiTrackSpecs from './Step2PosiTrackSpecs';
import Step2RollerSpecs from './Step2RollerSpecs';
import Step3Questions from './Step3Questions';
import Step4Lead from './Step4Lead';

const STORAGE_KEY = 'risk-assessment-draft';

interface Draft {
  step: number;
  basics?: MachineBasics;
  specs?: GraderSpecs | ExcavatorSpecs | PosiTrackSpecs | RollerSpecs;
  answers?: Section2Answers;
  lead?: Partial<RiskAssessmentLead>;
}

interface RiskAssessmentWizardProps {
  onStepChange?: (step: number) => void;
}

const STEPS = [
  { label: 'Machine ID', short: '1' },
  { label: 'Specs', short: '2' },
  { label: 'Questions', short: '3' },
  { label: 'Your Details', short: '4' },
];

export default function RiskAssessmentWizard({ onStepChange }: RiskAssessmentWizardProps = {}) {
  const [step, setStep] = useState(1);
  const [basics, setBasics] = useState<MachineBasics | null>(null);
  const [specs, setSpecs] = useState<GraderSpecs | ExcavatorSpecs | PosiTrackSpecs | RollerSpecs | null>(null);
  const [answers, setAnswers] = useState<Section2Answers>({});
  const [lead, setLead] = useState<Partial<RiskAssessmentLead>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    pdfUrl: string;
    reportNumber: string;
    treatmentsInPlace: number;
    treatmentsRequired: number;
    publicReportUrl?: string;
    qrCodeDataUrl?: string;
  } | null>(null);
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
  useEffect(() => { onStepChange?.(step); }, [step, onStepChange]);

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
        publicReportUrl: data.publicReportUrl,
        qrCodeDataUrl: data.qrCodeDataUrl,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const machineLabel = basics ? `${basics.make} ${basics.model} ${basics.machineType}` : 'Machine';

  return (
    <>
      {result && (
        <RiskAssessmentPdfViewerModal
          pdfUrl={result.pdfUrl}
          reportNumber={result.reportNumber}
          machineLabel={machineLabel}
          treatmentsInPlace={result.treatmentsInPlace}
          treatmentsRequired={result.treatmentsRequired}
          publicReportUrl={result.publicReportUrl}
          qrCodeDataUrl={result.qrCodeDataUrl}
          onClose={() => setResult(null)}
        />
      )}
      <div className="max-w-2xl mx-auto">
        {isSubmitting && <RiskAssessmentGenerationModal isOpen={true} />}
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
      {step === 2 && basics?.machineType === 'Excavator' && (
        <Step2ExcavatorSpecs
          initial={(specs as ExcavatorSpecs) ?? {}}
          onSubmit={(data) => { setSpecs(data); setStep(3); window.scrollTo(0, 0); }}
          onBack={() => { setStep(1); window.scrollTo(0, 0); }}
          onSpecsChange={(data) => setSpecs(data)}
        />
      )}
      {step === 2 && basics?.machineType === 'Posi Track' && (
        <Step2PosiTrackSpecs
          initial={(specs as PosiTrackSpecs) ?? {}}
          onSubmit={(data) => { setSpecs(data); setStep(3); window.scrollTo(0, 0); }}
          onBack={() => { setStep(1); window.scrollTo(0, 0); }}
          onSpecsChange={(data) => setSpecs(data)}
        />
      )}
      {step === 2 && basics?.machineType === 'Roller' && (
        <Step2RollerSpecs
          initial={(specs as RollerSpecs) ?? {}}
          onSubmit={(data) => { setSpecs(data); setStep(3); window.scrollTo(0, 0); }}
          onBack={() => { setStep(1); window.scrollTo(0, 0); }}
          onSpecsChange={(data) => setSpecs(data)}
        />
      )}
      {step === 2 && basics?.machineType !== 'Excavator' && basics?.machineType !== 'Posi Track' && basics?.machineType !== 'Roller' && (
        <Step2Specs
          initial={(specs as GraderSpecs) ?? {}}
          onSubmit={(data) => { setSpecs(data); setStep(3); window.scrollTo(0, 0); }}
          onBack={() => { setStep(1); window.scrollTo(0, 0); }}
          onSpecsChange={(data) => setSpecs(data)}
        />
      )}
      {step === 3 && basics?.machineType === 'Excavator' && (
        <Step3Questions
          initial={answers}
          questions={EXCAVATOR_QUESTIONS}
          surveyGroups={[...EXCAVATOR_SURVEY_GROUPS]}
          onSubmit={(data) => { setAnswers(data); setStep(4); window.scrollTo(0, 0); }}
          onBack={() => { setStep(2); window.scrollTo(0, 0); }}
        />
      )}
      {step === 3 && basics?.machineType === 'Posi Track' && (
        <Step3Questions
          initial={answers}
          questions={POSI_TRACK_QUESTIONS}
          surveyGroups={[...POSI_TRACK_SURVEY_GROUPS]}
          onSubmit={(data) => { setAnswers(data); setStep(4); window.scrollTo(0, 0); }}
          onBack={() => { setStep(2); window.scrollTo(0, 0); }}
        />
      )}
      {step === 3 && basics?.machineType === 'Roller' && (
        <Step3Questions
          initial={answers}
          questions={ROLLER_QUESTIONS}
          surveyGroups={[...ROLLER_SURVEY_GROUPS]}
          onSubmit={(data) => { setAnswers(data); setStep(4); window.scrollTo(0, 0); }}
          onBack={() => { setStep(2); window.scrollTo(0, 0); }}
        />
      )}
      {step === 3 && basics?.machineType !== 'Excavator' && basics?.machineType !== 'Posi Track' && basics?.machineType !== 'Roller' && (
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
          onMachineImagesChange={(images) => setLead((l) => ({ ...l, machineImages: images }))}
        />
      )}
      </div>
    </>
  );
}

