'use client';

import { useState } from 'react';
import type { MachineBasics, OperatingContext, SiteType, SiteCondition } from '@/lib/risk-assessment/types';
import { SITE_TYPES, SITE_CONDITIONS } from '@/lib/risk-assessment/types';

const MACHINE_TYPES = ['Grader', 'Excavator', 'Posi Track', 'Roller'];
const AU_STATES = ['VIC', 'NSW', 'QLD', 'WA', 'SA', 'TAS', 'NT', 'ACT'];

function defaultOperatingContext(initial?: Partial<OperatingContext>): OperatingContext {
  const siteConditions = {} as Record<SiteCondition, boolean>;
  SITE_CONDITIONS.forEach((c) => {
    siteConditions[c] = initial?.siteConditions?.[c] ?? false;
  });
  return {
    siteTypes: initial?.siteTypes ?? [],
    siteConditions,
  };
}

function generateReportNumber(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const time = now.toTimeString().slice(0, 5).replace(':', '');
  return `RA-${date}-${time}`;
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
    assessmentPurpose: 'Plant in use',
    state: initial?.state || 'VIC',
    owner: initial?.owner || '',
    assessorName: initial?.assessorName || '',
    make: initial?.make || '',
    model: initial?.model || '',
    machineType: initial?.machineType || 'Grader',
    assetNumber: initial?.assetNumber || '',
    registration: initial?.registration || '',
    operatingContext: initial?.operatingContext
      ? defaultOperatingContext(initial.operatingContext)
      : defaultOperatingContext(),
  });
  const [errors, setErrors] = useState<Partial<Record<keyof MachineBasics, string>>>({});

  function set(key: keyof MachineBasics, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function toggleSiteType(st: SiteType) {
    setForm((f) => {
      const ctx = f.operatingContext ?? defaultOperatingContext();
      const siteTypes = ctx.siteTypes.includes(st)
        ? ctx.siteTypes.filter((t) => t !== st)
        : [...ctx.siteTypes, st];
      return { ...f, operatingContext: { ...ctx, siteTypes } };
    });
  }

  function toggleSiteCondition(sc: SiteCondition) {
    setForm((f) => {
      const ctx = f.operatingContext ?? defaultOperatingContext();
      const siteConditions = { ...ctx.siteConditions, [sc]: !ctx.siteConditions[sc] };
      return { ...f, operatingContext: { ...ctx, siteConditions } };
    });
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof MachineBasics, string>> = {};
    if (!form.make.trim()) newErrors.make = 'Make is required';
    if (!form.model.trim()) newErrors.model = 'Model is required';
    if (!form.machineType) newErrors.machineType = 'Machine type is required';
    if (!form.assessorName.trim()) newErrors.assessorName = 'Assessor name is required';
    if (!form.owner.trim()) newErrors.owner = 'Company is required';
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
            <input className={input(errors.model)} value={form.model} onChange={(e) => set('model', e.target.value)} placeholder={form.machineType === 'Excavator' ? 'e.g. 320' : form.machineType === 'Posi Track' ? 'e.g. MT555' : form.machineType === 'Roller' ? 'e.g. DD-90' : 'e.g. 150'} />
          </Field>
          <Field label="Machine Type *" error={errors.machineType}>
            <select className={input(errors.machineType)} value={form.machineType} onChange={(e) => set('machineType', e.target.value)}>
              {MACHINE_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="Asset Number">
            <input className={input()} value={form.assetNumber} onChange={(e) => set('assetNumber', e.target.value)} placeholder="e.g. GRD-007" />
          </Field>
          <Field label="Registration (optional)">
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
          <Field label="Company *" error={errors.owner}>
            <input className={input(errors.owner)} value={form.owner} onChange={(e) => set('owner', e.target.value)} placeholder="e.g. Blade Earthmoving" />
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
            <input className={input()} value={form.reportNumber} onChange={(e) => set('reportNumber', e.target.value)} placeholder="e.g. RA-20260301-1642" />
          </Field>
        </div>
      </div>

      {/* Operating Context */}
      <OperatingContextSection
        ctx={form.operatingContext ?? defaultOperatingContext()}
        onToggleSiteType={toggleSiteType}
        onToggleSiteCondition={toggleSiteCondition}
      />

      <button type="submit" className="w-full rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] py-3 font-semibold text-white shadow-md hover:shadow-lg transition-all">
        Next: Machine Specs →
      </button>
    </form>
  );
}

function OperatingContextSection({
  ctx,
  onToggleSiteType,
  onToggleSiteCondition,
}: {
  ctx: OperatingContext;
  onToggleSiteType: (st: SiteType) => void;
  onToggleSiteCondition: (sc: SiteCondition) => void;
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 space-y-5">
      <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Operating Context</h3>
      <p className="text-sm text-gray-500">Select the site types and conditions that apply.</p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Site type (multi-select)</label>
        <div className="flex flex-wrap gap-2">
          {SITE_TYPES.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => onToggleSiteType(st)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
                ctx.siteTypes.includes(st)
                  ? 'border-[#FF8C32] bg-[#FFF5ED] text-[#FF8C32]'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Site conditions (tick boxes)</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SITE_CONDITIONS.map((sc) => (
            <label key={sc} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={ctx.siteConditions[sc]}
                onChange={() => onToggleSiteCondition(sc)}
                className="h-4 w-4 rounded border-gray-300 text-[#FF8C32] focus:ring-[#FF8C32]"
              />
              <span className="text-sm text-gray-700">{sc}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
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
  return `w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8C32] transition ${error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`;
}
