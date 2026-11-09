'use client';

import { useState, useEffect, useRef } from 'react';
import type { TruckSpecs } from '@/lib/risk-assessment/types';
import { TRUCK_CONFIGURATIONS } from '@/lib/risk-assessment/types';

interface Props {
  onSubmit: (data: TruckSpecs) => void;
  onBack: () => void;
  initial?: Partial<TruckSpecs>;
  onSpecsChange?: (specs: TruckSpecs) => void;
  lookupQueryDefault?: string;
}

type SpecField = { key: keyof TruckSpecs; label: string; placeholder?: string };

const SPEC_SECTIONS: { title: string; fields: SpecField[] }[] = [
  {
    title: 'Mass',
    fields: [
      { key: 'gvm_kg', label: 'GVM (kg)', placeholder: 'e.g. 26500' },
      { key: 'gcm_kg', label: 'GCM (kg)', placeholder: 'e.g. 42500 — combinations only' },
      { key: 'tare_kg', label: 'Tare (kg)', placeholder: 'e.g. 9800' },
      { key: 'payload_kg', label: 'Payload (kg)', placeholder: 'e.g. 16000' },
      { key: 'axle_configuration', label: 'Axle configuration', placeholder: 'e.g. 8x4' },
    ],
  },
  {
    title: 'Body',
    fields: [
      { key: 'body_capacity_m3', label: 'Body or tank capacity (m³)', placeholder: 'e.g. 14' },
      { key: 'hoist_type', label: 'Hoist type', placeholder: 'e.g. Front mount, underbody, none' },
      { key: 'raised_body_height_mm', label: 'Raised body height (mm)', placeholder: 'e.g. 6800' },
      { key: 'travel_height_mm', label: 'Travel height (mm)', placeholder: 'e.g. 3200' },
    ],
  },
  {
    title: 'Dimensions',
    fields: [
      { key: 'overall_length_mm', label: 'Overall length (mm)', placeholder: 'e.g. 8900' },
      { key: 'overall_width_mm', label: 'Overall width (mm)', placeholder: 'e.g. 2500' },
    ],
  },
  {
    title: 'Engine',
    fields: [
      { key: 'engine_make_model', label: 'Engine make and model', placeholder: 'e.g. Cummins X15' },
      { key: 'engine_power', label: 'Engine power (kW)', placeholder: 'e.g. 410 kW' },
      { key: 'engine_hours', label: 'Engine hours or odometer', placeholder: 'e.g. 420,000 km' },
      { key: 'transmission', label: 'Transmission', placeholder: 'e.g. Allison 4500' },
      { key: 'fuel_capacity_l', label: 'Fuel tank capacity (L)', placeholder: 'e.g. 400' },
      { key: 'noise_mfr_dba', label: "Manufacturer noise level dB(A)", placeholder: 'e.g. 84' },
    ],
  },
  {
    title: 'Plant',
    fields: [
      { key: 'plant_year', label: 'Year', placeholder: 'e.g. 2019' },
    ],
  },
];

const EXTRAS: { key: keyof TruckSpecs; label: string }[] = [
  { key: 'extras_air_conditioning', label: 'Air conditioning' },
  { key: 'extras_reversing_camera', label: 'Reversing camera' },
  { key: 'extras_reversing_alarm', label: 'Reversing alarm' },
  { key: 'extras_beacon', label: 'Amber beacon' },
  { key: 'extras_uhf', label: 'UHF radio' },
  { key: 'extras_wheel_chocks', label: 'Wheel chocks' },
  { key: 'extras_tarp', label: 'Load tarp' },
  { key: 'extras_scales', label: 'On-board scales' },
  { key: 'extras_fire_extinguisher', label: 'Fire extinguisher' },
  { key: 'extras_spill_kit', label: 'Spill kit' },
  { key: 'extras_body_prop', label: 'Body prop / safety bar' },
  { key: 'extras_rops_cabin', label: 'ROPS cabin' },
  { key: 'extras_fops', label: 'FOPS' },
];

type LookupState = 'idle' | 'loading' | 'done' | 'error';

export default function Step2TruckSpecs({ onSubmit, onBack, initial, onSpecsChange, lookupQueryDefault }: Props) {
  const [specs, setSpecs] = useState<TruckSpecs>(initial as TruckSpecs ?? {});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ Mass: true, Body: true });
  const [lookupQuery, setLookupQuery] = useState(lookupQueryDefault ?? '');
  const [lookupState, setLookupState] = useState<LookupState>('idle');
  const [filledCount, setFilledCount] = useState(0);
  const [lookupError, setLookupError] = useState('');
  const [lookupSource, setLookupSource] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function setField(key: keyof TruckSpecs, value: string | boolean) {
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
        body: JSON.stringify({ machineDescription: lookupQuery, machineType: 'Truck' }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? 'Lookup failed');
      setSpecs((current) => ({ ...current, ...(data.specs as TruckSpecs) }));
      setFilledCount(data.filledCount ?? 0);
      setLookupSource(data.source ?? '');
      setLookupState('done');
      setOpenSections({ Mass: true, Body: true, Dimensions: true, Engine: true, Plant: true });
    } catch (err) {
      setLookupError(err instanceof Error ? err.message : 'Something went wrong');
      setLookupState('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Section 1 — Truck Specs</h2>
        <p className="text-sm text-gray-500">
          Pick the setup first. Tipper questions can be marked N/A on a water cart or service truck, and trailer questions can be marked N/A if nothing is towed. All measurements are optional.
        </p>
      </div>

      <div className="rounded-xl border border-[#FF8C32]/30 bg-gradient-to-br from-[#FFF5ED] to-white p-4 space-y-3">
        <div>
          <p className="text-sm font-semibold text-gray-800">Auto-fill specs with our Crank.ai</p>
          <p className="text-xs text-gray-500 mt-0.5">A Mack search uses the Granite chassis sheet. Body size and raised height still have to be entered for the actual body. Review everything before proceeding.</p>
        </div>
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={lookupQuery}
            onChange={(e) => { setLookupQuery(e.target.value); setLookupState('idle'); }}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleLookup(); } }}
            placeholder="e.g. Mack Granite"
            className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF8C32] transition"
            disabled={lookupState === 'loading'}
          />
          <button
            type="button"
            onClick={handleLookup}
            disabled={lookupState === 'loading'}
            className="rounded-lg bg-[#FF8C32] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#e07a20] transition disabled:opacity-60 whitespace-nowrap"
          >
            {lookupState === 'loading' ? 'Looking up…' : 'Auto-fill'}
          </button>
        </div>
        {lookupState === 'done' && (
          <p className="text-xs font-medium text-green-800 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            Found {filledCount} spec{filledCount !== 1 ? 's' : ''}. {lookupSource ? `Source: ${lookupSource}.` : ''} Check the plated weights on the truck.
          </p>
        )}
        {lookupState === 'error' && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
            {lookupError || 'Could not look up specs. Please fill in manually.'}
          </p>
        )}
      </div>

      <div className="border border-gray-200 rounded-xl p-5">
        <label className="block text-sm font-medium text-gray-700 mb-1">Truck setup</label>
        <select
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF8C32]"
          value={specs.truck_configuration ?? ''}
          onChange={(e) => setField('truck_configuration', e.target.value)}
        >
          <option value="">Select a setup</option>
          {TRUCK_CONFIGURATIONS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
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
