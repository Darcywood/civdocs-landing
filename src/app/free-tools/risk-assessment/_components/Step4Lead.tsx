'use client';

import { useState, useRef } from 'react';
import type { RiskAssessmentLead } from '@/lib/risk-assessment/types';

const MAX_IMAGES = 2;
const MAX_SIZE_KB = 500;

interface Props {
  onSubmit: (lead: RiskAssessmentLead) => void;
  onBack: () => void;
  initial?: Partial<RiskAssessmentLead>;
  isSubmitting?: boolean;
  onMachineImagesChange?: (images: string[]) => void;
}

export default function Step4Lead({ onSubmit, onBack, initial, isSubmitting, onMachineImagesChange }: Props) {
  const [form, setForm] = useState<RiskAssessmentLead>({
    firstName: initial?.firstName || '',
    email: initial?.email || '',
    companyName: initial?.companyName || '',
    phone: initial?.phone || '',
    marketingConsent: initial?.marketingConsent ?? false,
    machineImages: initial?.machineImages ?? [],
  });
  const [imageError, setImageError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof RiskAssessmentLead, string>>>({});
  const [_gotcha, setGotcha] = useState('');

  function set<K extends keyof RiskAssessmentLead>(key: K, value: RiskAssessmentLead[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImageError(null);
    const files = e.target.files;
    if (!files?.length) return;
    const current = form.machineImages ?? [];
    if (current.length >= MAX_IMAGES) {
      setImageError(`Maximum ${MAX_IMAGES} images allowed.`);
      return;
    }
    const toAdd = Math.min(files.length, MAX_IMAGES - current.length);
    const added: string[] = [];
    for (let i = 0; i < toAdd; i++) {
      const file = files[i];
      if (file.size > MAX_SIZE_KB * 1024) {
        setImageError(`Image "${file.name}" is too large. Max ${MAX_SIZE_KB}KB per image.`);
        return;
      }
      try {
        const dataUrl = await fileToDataUrl(file);
        added.push(dataUrl);
      } catch {
        setImageError(`Could not read "${file.name}".`);
        return;
      }
    }
    const next = [...current, ...added];
    set('machineImages', next);
    onMachineImagesChange?.(next);
    e.target.value = '';
  }

  function removeImage(index: number) {
    const next = (form.machineImages ?? []).filter((_, i) => i !== index);
    set('machineImages', next.length ? next : undefined);
    onMachineImagesChange?.(next);
  }

  function validate(): boolean {
    const errs: Partial<Record<keyof RiskAssessmentLead, string>> = {};
    if (!form.firstName.trim()) errs.firstName = 'First name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.companyName.trim()) errs.companyName = 'Company name is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (_gotcha) return; // honeypot
    if (validate()) onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Upload image of machine */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Upload image of machine</h2>
        <p className="text-sm text-gray-500 mb-4">Add photos of the machine to include in your report. Optional.</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageChange}
        />
        <div className="flex flex-wrap gap-3">
          {(form.machineImages ?? []).map((dataUrl, i) => (
            <div key={i} className="relative">
              <img
                src={dataUrl}
                alt={`Machine ${i + 1}`}
                className="w-24 h-24 object-cover rounded-lg border border-gray-200"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600 shadow"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
          {((form.machineImages ?? []).length < MAX_IMAGES) && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
              className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:border-[#FF8C32] hover:text-[#FF8C32] transition disabled:opacity-50"
            >
              <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-xs">Add</span>
            </button>
          )}
        </div>
        {imageError && <p className="mt-2 text-xs text-red-600">{imageError}</p>}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Your Details</h2>
        <p className="text-sm text-gray-500">We'll email your Risk Management Report PDF as soon as it's generated.</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
            <input
              className={inp(errors.firstName)}
              value={form.firstName}
              onChange={(e) => set('firstName', e.target.value)}
              placeholder="e.g. Darcy"
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
            <input
              className={inp(errors.companyName)}
              value={form.companyName}
              onChange={(e) => set('companyName', e.target.value)}
              placeholder="e.g. Blade Earthmoving"
            />
            {errors.companyName && <p className="mt-1 text-xs text-red-600">{errors.companyName}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input
              type="email"
              className={inp(errors.email)}
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              placeholder="e.g. darcy@company.com.au"
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
            <input
              className={inp()}
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              placeholder="e.g. 0400 123 456"
            />
          </div>
        </div>

        {/* Honeypot */}
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          style={{ display: 'none' }}
          value={_gotcha}
          onChange={(e) => setGotcha(e.target.value)}
        />
      </div>

      {/* What you get */}
      <div className="rounded-xl border border-orange-100 bg-orange-50 p-5">
        <p className="text-sm font-semibold text-[#CC5500] mb-3">What you'll receive:</p>
        <ul className="space-y-2">
          {[
            'Professional Risk Management Report PDF',
            'Section 5 — risk treatments recorded/observed during inspection',
            'Section 4 — any risk treatments required (based on your answers)',
            'Operator Acknowledgement page',
            'Download link via email (valid 7 days)',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-[#FF8C32] mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="w-full sm:w-auto sm:min-w-[100px] rounded-full border border-gray-300 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition disabled:opacity-50"
        >
          ← Back
        </button>
        <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 cursor-pointer shrink-0">
          <input
            type="checkbox"
            className="w-4 h-4 accent-[#FF8C32]"
            checked={form.marketingConsent}
            onChange={(e) => set('marketingConsent', e.target.checked)}
          />
          <span className="text-sm text-gray-600 whitespace-nowrap">
            I'd like to receive tips and updates from CivDocs. You can unsubscribe at any time.
          </span>
        </label>
        <button
          type="submit"
          disabled={isSubmitting || !form.marketingConsent}
          className={`flex-[2] min-w-[180px] rounded-full py-3 font-semibold text-white shadow-md transition-all ${
            form.marketingConsent
              ? 'bg-gradient-to-r from-[#FF8C32] to-[#F5B041] hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating Report…
            </span>
          ) : (
            'Generate My Risk Assessment →'
          )}
        </button>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400">Free. No credit card. No obligation.</p>
    </form>
  );
}

function inp(error?: string) {
  return `w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8C32] transition ${error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Read failed'));
    reader.readAsDataURL(file);
  });
}
