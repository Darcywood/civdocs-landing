'use client';

import { useState, useEffect } from 'react';
import type { PosiTrackSpecs } from '@/lib/risk-assessment/types';

interface Props {
  onSubmit: (data: PosiTrackSpecs) => void;
  onBack: () => void;
  initial?: Partial<PosiTrackSpecs>;
  onSpecsChange?: (specs: PosiTrackSpecs) => void;
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

export default function Step2PosiTrackSpecs({ onSubmit, onBack, initial, onSpecsChange }: Props) {
  const [specs, setSpecs] = useState<PosiTrackSpecs>(initial as PosiTrackSpecs ?? {});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Section 1 — Standard Specs</h2>
        <p className="text-sm text-gray-500">Enter the machine specifications. All fields are optional.</p>
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
