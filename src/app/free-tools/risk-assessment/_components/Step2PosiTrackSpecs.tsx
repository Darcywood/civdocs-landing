'use client';

import { useState, useEffect, useRef } from 'react';
import type { PosiTrackSpecs } from '@/lib/risk-assessment/types';

interface Props {
  onSubmit: (data: PosiTrackSpecs) => void;
  onBack: () => void;
  initial?: Partial<PosiTrackSpecs>;
  onSpecsChange?: (specs: PosiTrackSpecs) => void;
  /** Make and model from step 1, so Auto-fill can start from "Kubota SVL75-3". */
  lookupQueryDefault?: string;
}

type SpecField = { key: keyof PosiTrackSpecs; label: string; placeholder?: string };

const SPEC_SECTIONS: { title: string; fields: SpecField[] }[] = [
  {
    title: 'Noise Test Results',
    fields: [
      { key: 'noise_mfr_dba', label: "Manufacturer's specified noise level dBA", placeholder: 'e.g. 75 dB(A) Operator' },
    ],
  },
  {
    title: 'Engine',
    fields: [
      { key: 'engine_make_model', label: 'Engine Make & Model', placeholder: 'e.g. Kubota V2403' },
      { key: 'engine_number', label: 'Engine Number', placeholder: 'e.g. KUB12345' },
      { key: 'engine_displacement', label: 'Engine Displacement', placeholder: 'e.g. 2.4 L' },
      { key: 'engine_hours', label: 'Engine Hours', placeholder: 'e.g. 2500' },
      { key: 'engine_cylinders', label: 'Number of Cylinders', placeholder: 'e.g. 4' },
      { key: 'engine_power', label: 'Net engine power (kW @ rpm)', placeholder: 'e.g. 55 kW @ 2700 rpm' },
      { key: 'engine_torque', label: 'Torque (Nm @ rpm)', placeholder: 'e.g. 220 Nm @ 1600 rpm' },
    ],
  },
  {
    title: 'Loader Performance',
    fields: [
      { key: 'rated_operating_capacity_kg', label: 'Rated operating capacity ROC (kg)', placeholder: 'e.g. 1235' },
      { key: 'breakout_force_kn', label: 'Breakout force (kN)', placeholder: 'e.g. 42.5' },
      { key: 'lift_height_mm', label: 'Lift height to hinge pin (mm)', placeholder: 'e.g. 3050' },
      { key: 'dump_height_mm', label: 'Dump/clearance height (mm)', placeholder: 'e.g. 2340' },
      { key: 'dump_reach_mm', label: 'Dump reach at full height (mm)', placeholder: 'e.g. 760' },
      { key: 'bucket_capacity_m3', label: 'Bucket capacity (m³)', placeholder: 'e.g. 0.52' },
    ],
  },
  {
    title: 'Travel',
    fields: [
      { key: 'travel_speed_kmh', label: 'Travel speed (km/h)', placeholder: 'e.g. 11.7' },
    ],
  },
  {
    title: 'Capacities',
    fields: [
      { key: 'fuel_capacity_l', label: 'Fuel tank capacity (L)', placeholder: 'e.g. 95' },
    ],
  },
  {
    title: 'Dimensions / Weights',
    fields: [
      { key: 'operating_weight_kg', label: 'Operating weight (kg)', placeholder: 'e.g. 4520' },
      { key: 'overall_length_mm', label: 'Overall length (mm)', placeholder: 'e.g. 4450' },
      { key: 'overall_width_mm', label: 'Overall width (mm)', placeholder: 'e.g. 1850' },
      { key: 'overall_height_mm', label: 'Overall height to cab (mm)', placeholder: 'e.g. 1995' },
      { key: 'track_width_mm', label: 'Track pad width (mm)', placeholder: 'e.g. 380' },
    ],
  },
  {
    title: 'Hydraulics',
    fields: [
      { key: 'hydraulic_flow_lpm', label: 'Hydraulic pump flow (L/min)', placeholder: 'e.g. 68 L/min' },
      { key: 'hydraulic_pressure_bar', label: 'Main relief pressure (bar)', placeholder: 'e.g. 275 bar' },
    ],
  },
  {
    title: 'Plant Classification',
    fields: [
      { key: 'plant_class', label: 'Class', placeholder: 'e.g. COMPACT TRACK LOADER' },
      { key: 'plant_year', label: 'Year', placeholder: 'e.g. 2022' },
    ],
  },
  {
    title: 'Safety Structures',
    fields: [
      { key: 'rops_compliance', label: 'ROPS Compliance No.', placeholder: 'e.g. ISO 12117-2' },
      { key: 'rops_serial', label: 'ROPS Serial No.', placeholder: 'e.g. N/A' },
      { key: 'fops_compliance', label: 'FOPS Compliance No.', placeholder: 'e.g. ISO 3449' },
      { key: 'fops_serial', label: 'FOPS Serial No.', placeholder: 'e.g. N/A' },
    ],
  },
];

const EXTRAS: { key: keyof PosiTrackSpecs; label: string }[] = [
  { key: 'extras_air_conditioning', label: 'Air Conditioning' },
  { key: 'extras_fops', label: 'FOPS' },
  { key: 'extras_rops_cabin', label: 'ROPS – Cabin' },
  { key: 'extras_rear_camera', label: 'Rear / 360° Camera' },
  { key: 'extras_proximity_detection', label: 'Proximity Detection System' },
  { key: 'extras_wheel_chocks', label: 'Wheel Chocks' },
];

type LookupState = 'idle' | 'loading' | 'done' | 'error';

export default function Step2PosiTrackSpecs({ onSubmit, onBack, initial, onSpecsChange, lookupQueryDefault }: Props) {
  const [specs, setSpecs] = useState<PosiTrackSpecs>(initial as PosiTrackSpecs ?? {});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [lookupQuery, setLookupQuery] = useState(lookupQueryDefault ?? '');
  const [lookupState, setLookupState] = useState<LookupState>('idle');
  const [filledCount, setFilledCount] = useState(0);
  const [lookupError, setLookupError] = useState('');
  const [lookupSource, setLookupSource] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function setField(key: keyof PosiTrackSpecs, value: string | boolean) {
    setSpecs((s) => ({ ...s, [key]: value }));
  }

  useEffect(() => {
    onSpecsChange?.(specs);
  }, [specs, onSpecsChange]);

  function toggleSection(title: string) {
    setOpenSections((s) => ({ ...s, [title]: !s[title] }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(specs);
  }

  function handleClearSpecs() {
    setSpecs({});
    setLookupState('idle');
    setLookupError('');
    setFilledCount(0);
    setLookupSource('');
    setOpenSections({});
  }

  async function handleLookup() {
    if (!lookupQuery.trim()) {
      inputRef.current?.focus();
      return;
    }
    setLookupState('loading');
    setLookupError('');
    try {
      const res = await fetch('/api/risk-assessment/lookup-specs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ machineDescription: lookupQuery, machineType: 'Posi Track' }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Lookup failed');
      if (!data.filledCount) {
        throw new Error('No spec sheet found. Try Kubota SVL75-3 or Kubota SVL-75.');
      }
      setSpecs(data.specs as PosiTrackSpecs);
      setFilledCount(data.filledCount ?? 0);
      setLookupSource(data.source ?? '');
      setLookupState('done');
      const allOpen: Record<string, boolean> = {};
      SPEC_SECTIONS.forEach((s) => { allOpen[s.title] = true; });
      allOpen['Extras Fitted'] = false;
      setOpenSections(allOpen);
    } catch (err) {
      setLookupError(err instanceof Error ? err.message : 'Something went wrong');
      setLookupState('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Section 1 — Standard Specs</h2>
        <p className="text-sm text-gray-500">Enter the machine specifications, or auto-fill them. All fields are optional.</p>
      </div>

      <div className="rounded-xl border border-[#FF8C32]/30 bg-gradient-to-br from-[#FFF5ED] to-white p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex-shrink-0 w-8 h-8 rounded-full bg-[#FF8C32]/10 flex items-center justify-center text-[#FF8C32]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M10 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 1ZM5.05 3.05a.75.75 0 0 1 1.06 0l1.062 1.06A.75.75 0 1 1 6.11 5.173L5.05 4.11a.75.75 0 0 1 0-1.06ZM14.95 3.05a.75.75 0 0 1 0 1.06l-1.06 1.062a.75.75 0 0 1-1.062-1.061l1.061-1.06a.75.75 0 0 1 1.06 0ZM3 8.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 3 8.25ZM14.75 7.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1 0-1.5h1.5ZM5.05 13.45a.75.75 0 0 1 0-1.06l1.06-1.062a.75.75 0 0 1 1.061 1.062l-1.06 1.06a.75.75 0 0 1-1.061 0ZM13.89 12.388a.75.75 0 0 1 1.061 1.061l-1.06 1.06a.75.75 0 1 1-1.062-1.06l1.061-1.061ZM10 14a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 14ZM6.25 10a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Auto-fill specs with our Crank.ai</p>
            <p className="text-xs text-gray-500 mt-0.5">Crank.ai will search for this posi track and fill in what it finds. An SVL75-3 is looked up as a Kubota. Review everything before proceeding.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={lookupQuery}
            onChange={(e) => { setLookupQuery(e.target.value); setLookupState('idle'); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleLookup(); } }}
            placeholder="e.g. Kubota SVL75-3"
            className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8C32] transition"
            disabled={lookupState === 'loading'}
          />
          <button
            type="button"
            onClick={handleLookup}
            disabled={lookupState === 'loading'}
            className="rounded-lg bg-[#FF8C32] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#e07a20] transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap"
          >
            {lookupState === 'loading' ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Looking up…
              </>
            ) : (
              'Auto-fill'
            )}
          </button>
        </div>
        {lookupState === 'done' && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2.5 space-y-1">
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs font-medium text-green-800">
                ✓ Found {filledCount} spec{filledCount !== 1 ? 's' : ''} — review carefully and correct anything that looks wrong.
              </p>
              <button type="button" onClick={handleClearSpecs} className="flex-shrink-0 text-xs text-gray-500 underline hover:text-gray-700 transition">
                Clear & start over
              </button>
            </div>
            {lookupSource && (
              <p className="text-xs text-green-700">
                <span className="font-medium">Source:</span> {lookupSource}
              </p>
            )}
          </div>
        )}
        {lookupState === 'error' && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {lookupError || 'Could not look up specs. Please fill in manually.'}
          </p>
        )}
      </div>

      {SPEC_SECTIONS.map((section) => (
        <div key={section.title} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection(section.title)}
            className="w-full flex items-center justify-between px-5 py-3.5 bg-gray-50 hover:bg-gray-100 transition text-left"
          >
            <span className="text-sm font-semibold text-gray-800">{section.title}</span>
            <span className="text-gray-400 text-lg">{openSections[section.title] ? '−' : '+'}</span>
          </button>
          {openSections[section.title] && (
            <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {section.fields.map(({ key, label, placeholder }) => (
                <div key={key}>
                  <label className="block text-sm text-gray-600 mb-1">{label}</label>
                  <input
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8C32] transition"
                    value={(specs[key] as string) ?? ''}
                    placeholder={placeholder}
                    onChange={(e) => setField(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => toggleSection('Extras Fitted')}
          className="w-full flex items-center justify-between px-5 py-3.5 bg-gray-50 hover:bg-gray-100 transition text-left"
        >
          <span className="text-sm font-semibold text-gray-800">Extras Fitted</span>
          <span className="text-gray-400 text-lg">{openSections['Extras Fitted'] ? '−' : '+'}</span>
        </button>
        {openSections['Extras Fitted'] && (
          <div className="px-5 py-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {EXTRAS.map(({ key, label }) => (
              <label key={key} className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-[#FF8C32]"
                  checked={Boolean(specs[key])}
                  onChange={(e) => setField(key, e.target.checked)}
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={onBack} className="flex-1 rounded-full border border-gray-300 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
          ← Back
        </button>
        <button type="submit" className="flex-[2] rounded-full bg-gradient-to-r from-[#FF8C32] to-[#F5B041] py-3 font-semibold text-white shadow-md hover:shadow-lg transition-all">
          Next: Compliance Questions →
        </button>
      </div>
    </form>
  );
}
