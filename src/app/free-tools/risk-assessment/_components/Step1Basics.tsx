'use client';

import { useState } from 'react';
import type { MachineBasics } from '@/lib/risk-assessment/types';

const MACHINE_TYPES = ['Grader'];
const ASSESSMENT_PURPOSES = ['Plant in use', 'Pre-purchase', 'Pre-hire', 'Return from hire', 'Return from service'];
const AU_STATES = ['VIC', 'NSW', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT'];

function generateReportNumber(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const time = now.toTimeString().slice(0, 5).replace(':', '');
  const rand = Math.floor(Math.random() * 90000 + 10000);
  return `${rand} ${date}-${time}`;
}

interface Props {
  onSubmit: (data: MachineBasics) => void;
  initial?: Partial<MachineBasics>;
}

export default function Step1Basics({ onSubmit, initial }: Props) {
  const today = new Date().toISOString().slice(0, 10);
  const [form, setForm] = useState<MachineBasics>({
    reportNumber: initial?.reportNumber || generateReportNumber(),
    date: initial?.date || today,
    assessmentPurpose: initial?.assessmentPurpose || 'Plant in use',
    state: initial?.state || 'VIC',
    owner: initial?.owner || '',
    assessorName: initial?.assessorName || '',
    make: initial?.make || '',
    model: initial?.model || '',
    machineType: initial?.machineType || 'Grader',
    assetNumber: initial?.assetNumber || '',
    registration: initial?.registration || '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof MachineBasics, string>>>({});

  function set(key: keyof MachineBasics, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof MachineBasics, string>> = {};
    if (!form.make.trim()) newErrors.make = 'Make is required';
    if (!form.model.trim()) newErrors.model = 'Model is required';
    if (!form.machineType) newErrors.machineType = 'Machine type is required';
    if (!form.assessorName.trim()) newErrors.assessorName = 'Assessor name is required';
    if (!form.owner.trim()) newErrors.owner = 'Owner is required';
    if (!form.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Machine Identification</h2>
        <p className="text-sm text-gray-500">Basic details about the machine and assessment.</p>
      </div>

      {/* Machine Details */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Machine Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Make *" error={errors.make}>
            <input className={input(errors.make)} value={form.make} onChange={(e) => set('make', e.target.value)} placeholder="e.g. Caterpillar" />
          </Field>
          <Field label="Model *" error={errors.model}>
            <input className={input(errors.model)} value={form.model} onChange={(e) => set('model', e.target.value)} placeholder="e.g. 150" />
          </Field>
          <Field label="Machine Type *" error={errors.machineType}>
            <select className={input(errors.machineType)} value={form.machineType} onChange={(e) => set('machineType', e.target.value)}>
              {MACHINE_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Asset Number">
            <input className={input()} value={form.assetNumber} onChange={(e) => set('assetNumber', e.target.value)} placeholder="e.g. GRD-007" />
          </Field>
          <Field label="Registration">
            <input className={input()} value={form.registration} onChange={(e) => set('registration', e.target.value)} placeholder="e.g. 1QS432" />
          </Field>
        </div>
      </div>

      {/* Assessment Details */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-5">
        <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Assessment Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Assessor Name *" error={errors.assessorName}>
            <input className={input(errors.assessorName)} value={form.assessorName} onChange={(e) => set('assessorName', e.target.value)} placeholder="Your name" />
          </Field>
          <Field label="Owner *" error={errors.owner}>
            <input className={input(errors.owner)} value={form.owner} onChange={(e) => set('owner', e.target.value)} placeholder="Owner name or company" />
          </Field>
          <Field label="Assessment Purpose">
            <select className={input()} value={form.assessmentPurpose} onChange={(e) => set('assessmentPurpose', e.target.value)}>
              {ASSESSMENT_PURPOSES.map((p) => <option key={p}>{p}</option>)}
            </select>
          </Field>
          <Field label="State">
            <select className={input()} value={form.state} onChange={(e) => set('state', e.target.value)}>
              {AU_STATES.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Date *" error={errors.date}>
            <input type="date" className={input(errors.date)} value={form.date} onChange={(e) => set('date', e.target.value)} />
          </Field>
          <Field label="Report Number">
            <input className={input()} value={form.reportNumber} onChange={(e) => set('reportNumber', e.target.value)} />
          </Field>
        </div>
      </div>

      <button type="submit" className="w-full rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] py-3 font-semibold text-white shadow-md hover:shadow-lg transition-all">
        Next: Machine Specs →
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}

function input(error?: string) {
  return `w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8C32] transition ${error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`;
}
