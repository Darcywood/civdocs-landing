// @ts-nocheck
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { step3LeadSchema, type Step3Data } from '@/lib/capability-statement/schema';
import FormField from './FormField';
import UploadDropzone from './UploadDropzone';
import ColourPicker from './ColourPicker';

export interface Step3Uploads {
  logo: File | null;
  coverPhoto: File | null;
  finishingPhoto: File | null;
  projectPhotos: (File | null)[];
}

interface Step3UploadsAndLeadProps {
  defaultValues?: Partial<Pick<Step3Data, 'firstName' | 'email' | 'marketingConsent' | 'accentColour'>>;
  defaultUploads?: Step3Uploads;
  projectNames?: string[];
  onSubmit: (data: Pick<Step3Data, 'firstName' | 'email' | 'marketingConsent' | 'accentColour'>, uploads: Step3Uploads) => void;
  isGenerating?: boolean;
}

export default function Step3UploadsAndLead({
  defaultValues,
  defaultUploads,
  projectNames = [],
  onSubmit,
  isGenerating = false,
}: Step3UploadsAndLeadProps) {
  const projectCount = Math.max(projectNames.length, 2);
  const [uploads, setUploads] = useState<Step3Uploads>(
    defaultUploads ?? {
      logo: null,
      coverPhoto: null,
      finishingPhoto: null,
      projectPhotos: Array(projectCount).fill(null),
    }
  );

  type Step3LeadForm = z.infer<typeof step3LeadSchema>;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step3LeadForm>({
    resolver: zodResolver(step3LeadSchema),
    defaultValues: {
      firstName: '',
      email: '',
      marketingConsent: false,
      accentColour: '',
      ...defaultValues,
    },
  });

  const handleFormSubmit = (data: Pick<Step3Data, 'firstName' | 'email' | 'marketingConsent' | 'accentColour'>) => {
    onSubmit(data, uploads);
  };

  const marketingConsent = watch('marketingConsent');

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">Uploads & generate</h2>
        <p className="mt-1 text-sm text-gray-600">Add your logo and photos, then we&apos;ll create your PDF.</p>
      </div>

      {/* Logo + Cover + Finishing */}
      <div className="grid gap-6 sm:grid-cols-2">
        <UploadDropzone
          category="logo"
          maxFiles={1}
          value={uploads.logo ? [uploads.logo] : []}
          onChange={(files) => setUploads((u) => ({ ...u, logo: files[0] ?? null }))}
        />
        <UploadDropzone
          category="cover"
          maxFiles={1}
          value={uploads.coverPhoto ? [uploads.coverPhoto] : []}
          onChange={(files) => setUploads((u) => ({ ...u, coverPhoto: files[0] ?? null }))}
        />
        <UploadDropzone
          category="finishing"
          maxFiles={1}
          value={uploads.finishingPhoto ? [uploads.finishingPhoto] : []}
          onChange={(files) => setUploads((u) => ({ ...u, finishingPhoto: files[0] ?? null }))}
        />
      </div>

      {/* One photo dropzone per project */}
      <div>
        <h3 className="mb-1 text-sm font-semibold text-gray-800">Project photos</h3>
        <p className="mb-4 text-xs text-gray-500">Upload one photo per project — it will fill the left side of each project page.</p>
        <div className="grid gap-6 sm:grid-cols-2">
          {Array.from({ length: projectCount }, (_, i) => {
            const projectName = projectNames[i] || `Project ${i + 1}`;
            const file = uploads.projectPhotos[i] ?? null;
            return (
              <UploadDropzone
                key={i}
                category="projects"
                maxFiles={1}
                value={file ? [file] : []}
                labelOverride={projectName || `Project ${i + 1}`}
                hintOverride="1 photo, JPG/PNG, max 10MB — use a high-quality site photo"
                onChange={(files) =>
                  setUploads((u) => {
                    const next = [...u.projectPhotos];
                    next[i] = files[0] ?? null;
                    return { ...u, projectPhotos: next };
                  })
                }
              />
            );
          })}
        </div>
      </div>

      <ColourPicker
        logoFile={uploads.logo}
        value={watch('accentColour') || ''}
        onChange={(colour) => setValue('accentColour', colour)}
      />

      <div className="rounded-xl border border-gray-200 bg-gray-50/30 p-6">
        <h3 className="mb-4 text-base font-semibold text-gray-900">Your details</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="First name"
            {...register('firstName')}
            placeholder="John"
            error={errors.firstName?.message}
          />
          <FormField
            label="Email"
            type="email"
            {...register('email')}
            placeholder="john@company.com"
            error={errors.email?.message}
          />
        </div>
        <label className="mt-4 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            {...register('marketingConsent')}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-[#FF8C32] focus:ring-[#FF8C32]"
          />
          <span className="text-sm text-gray-600">
            I&apos;d like to receive tips and updates from CivDocs
          </span>
        </label>
      </div>

      {/* Honeypot - hidden from users */}
      <div className="absolute -left-[9999px] opacity-0" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register('_gotcha')} />
      </div>

      <button
        type="submit"
        disabled={isGenerating}
        className={`w-full rounded-full px-6 py-3 font-semibold text-white shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 ${
          marketingConsent
            ? 'bg-gradient-to-r from-[#FF8C32] to-[#F5B041] hover:shadow-lg focus:ring-[#FF8C32]'
            : 'focus:ring-gray-400 bg-gray-300 text-gray-600 hover:bg-gray-400'
        }`}
      >
        {isGenerating ? 'Generating your capability statement…' : 'Generate capability statement'}
      </button>
    </form>
  );
}
