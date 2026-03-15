'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Step1Data, Step2Data } from '@/lib/capability-statement/schema';
import type { Step3Uploads } from './Step3UploadsAndLead';
import WizardProgress from './WizardProgress';
import Step1Basics from './Step1Basics';
import Step2Proof from './Step2Proof';
import Step3UploadsAndLead from './Step3UploadsAndLead';
import GenerationLoadingModal from './GenerationLoadingModal';
import PdfViewerModal from './PdfViewerModal';
import { trackCapabilityStatementGenerated } from '@/lib/metaPixel';

const STORAGE_KEY = 'capability-statement-draft';

interface StoredDraft {
  step: number;
  step1?: Step1Data;
  step2?: Step2Data;
  step3?: { firstName: string; email: string; marketingConsent: boolean };
}

export default function CapabilityWizard() {
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState<Step1Data | null>(null);
  const [step2Data, setStep2Data] = useState<Step2Data | null>(null);
  const [step3Data, setStep3Data] = useState<{ firstName: string; email: string; marketingConsent: boolean } | null>(null);
  const [step3Uploads, setStep3Uploads] = useState<Step3Uploads | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const loadFromStorage = useCallback(() => {
    try {
      const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (!raw) return;
      const draft: StoredDraft = JSON.parse(raw);
      if (draft.step) setStep(draft.step);
      if (draft.step1) setStep1Data(draft.step1);
      if (draft.step2) setStep2Data(draft.step2);
      if (draft.step3) setStep3Data(draft.step3);
    } catch {
      // ignore
    }
  }, []);

  const saveToStorage = useCallback(() => {
    try {
      const draft: StoredDraft = {
        step,
        step1: step1Data ?? undefined,
        step2: step2Data ?? undefined,
        step3: step3Data ?? undefined,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // ignore
    }
  }, [step, step1Data, step2Data, step3Data]);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  useEffect(() => {
    saveToStorage();
  }, [saveToStorage]);

  const clearStorage = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const handleStep1Submit = (data: Step1Data) => {
    setStep1Data(data);
    setStep(2);
  };

  const handleStep2Submit = (data: Step2Data) => {
    setStep2Data(data);
    setStep(3);
  };

  const handleStep3Submit = async (
    data: { firstName: string; email: string; marketingConsent: boolean; accentColour?: string },
    uploads: Step3Uploads
  ) => {
    if (!step1Data || !step2Data) {
      alert('Missing form data. Please go back and complete all steps.');
      return;
    }

    setStep3Data(data);
    setStep3Uploads(uploads);
    setIsGenerating(true);

    try {
      let submissionId: string | undefined;
      let uploadManifest: string[] = [];

      const files: { category: string; filename: string; contentType: string }[] = [];
      if (uploads.logo) {
        files.push({ category: 'logo', filename: uploads.logo.name, contentType: uploads.logo.type });
      }
      if (uploads.coverPhoto) {
        files.push({ category: 'cover', filename: uploads.coverPhoto.name, contentType: uploads.coverPhoto.type });
      }
      if (uploads.finishingPhoto) {
        files.push({ category: 'finishing', filename: uploads.finishingPhoto.name, contentType: uploads.finishingPhoto.type });
      }

      // Track which project indices have photos for the PDF to match correctly
      const projectPhotoMap: number[] = [];
      uploads.projectPhotos.forEach((f, idx) => {
        if (f) {
          files.push({ category: 'projects', filename: f.name, contentType: f.type });
          projectPhotoMap.push(idx);
        }
      });
      if (files.length > 0) {
        const urlRes = await fetch('/api/capability-statement/create-upload-urls', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ files }),
        });

        if (!urlRes.ok) {
          const err = await urlRes.json().catch(() => ({}));
          throw new Error(err.error || urlRes.statusText);
        }

        const { submissionId: sid, paths, signedUploadUrls } = await urlRes.json();
        submissionId = sid;
        uploadManifest = paths;

        const fileList: File[] = [
          ...(uploads.logo ? [uploads.logo] : []),
          ...(uploads.coverPhoto ? [uploads.coverPhoto] : []),
          ...(uploads.finishingPhoto ? [uploads.finishingPhoto] : []),
          ...uploads.projectPhotos.filter((f): f is File => f !== null),
        ];

        for (let i = 0; i < signedUploadUrls.length; i++) {
          const { signedUrl } = signedUploadUrls[i];
          const file = fileList[i];
          const uploadRes = await fetch(signedUrl, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type },
          });
          if (!uploadRes.ok) {
            throw new Error(`Failed to upload ${file.name}`);
          }
        }
      }

      const genRes = await fetch('/api/capability-statement/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId,
          answers: { step1: step1Data, step2: step2Data },
          lead: {
            firstName: data.firstName,
            email: data.email,
            marketingConsent: data.marketingConsent,
            accentColour: data.accentColour,
          },
          uploadManifest: uploadManifest.length > 0 ? uploadManifest : undefined,
          projectPhotoMap: projectPhotoMap.length > 0 ? projectPhotoMap : undefined,
        }),
      });

      const genData = await genRes.json().catch(() => ({}));

      if (!genRes.ok) {
        throw new Error(genData.error || genRes.statusText);
      }

      trackCapabilityStatementGenerated(genData.submissionId);

      setGenerationComplete(true);
      await new Promise((r) => setTimeout(r, 600));

      clearStorage();
      setPdfUrl(genData.pdfUrl || null);
      setIsGenerating(false);
      setGenerationComplete(false);
    } catch (err) {
      console.error('[CapabilityWizard] Error:', err);
      setIsGenerating(false);
      alert(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <>
      <GenerationLoadingModal isOpen={isGenerating} isComplete={generationComplete} />
      <PdfViewerModal
        pdfUrl={pdfUrl}
        businessName={step1Data?.businessName || 'Capability-Statement'}
        onClose={() => setPdfUrl(null)}
      />
      <div className="mx-auto max-w-2xl">
      <WizardProgress currentStep={step} />
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Step1Basics defaultValues={step1Data ?? undefined} onSubmit={handleStep1Submit} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Step2Proof defaultValues={step2Data ?? undefined} onSubmit={handleStep2Submit} />
            <button
              type="button"
              onClick={goBack}
              className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to basics
            </button>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <Step3UploadsAndLead
              defaultValues={step3Data ?? undefined}
              defaultUploads={step3Uploads ?? undefined}
              projectNames={step2Data?.projects.map((p) => p.name) ?? []}
              onSubmit={handleStep3Submit}
              isGenerating={isGenerating}
            />
            <button
              type="button"
              onClick={goBack}
              className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to portfolio
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
}
