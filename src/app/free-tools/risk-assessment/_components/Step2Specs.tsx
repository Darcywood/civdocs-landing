'use client';

import { useState } from 'react';
import type { GraderSpecs } from '@/lib/risk-assessment/types';

interface Props {
  onSubmit: (data: GraderSpecs) => void;
  onBack: () => void;
  initial?: Partial<GraderSpecs>;
}

type SpecField = { key: keyof GraderSpecs; label: string; placeholder?: string };

const SPEC_SECTIONS: { title: string; fields: SpecField[] }[] = [
  {
    title: 'Noise Test Results',
    fields: [
      { key: 'noise_mfr_dba', label: "Manufacturer's specified noise level dBA", placeholder: 'e.g. 74dB(A) Operator, 106dB(A) Outside' },
      { key: 'noise_ambient_dba', label: 'Ambient noise level dBA', placeholder: 'e.g. As per OEM' },
      { key: 'noise_operator_high', label: 'Noise level – Operator position (high idle) dBA', placeholder: 'e.g. 74' },
      { key: 'noise_operator_low', label: 'Noise level – Operator position (low idle) dBA', placeholder: 'e.g. As per OEM' },
      { key: 'noise_lhs', label: 'Noise level LHS dBA @ m (high idle)', placeholder: 'e.g. As per OEM' },
      { key: 'noise_front', label: 'Noise level Front dBA @ m (high idle)', placeholder: 'e.g. As per OEM' },
      { key: 'noise_rhs', label: 'Noise level RHS dBA @ m (high idle)', placeholder: 'e.g. As per OEM' },
      { key: 'noise_rear', label: 'Noise level Rear dBA @ m (high idle)', placeholder: 'e.g. As per OEM' },
    ],
  },
  {
    title: 'Blade',
    fields: [
      { key: 'blade_height_mm', label: 'Blade height (mm)', placeholder: 'e.g. 610' },
      { key: 'blade_length_mm', label: 'Blade length (mm)', placeholder: 'e.g. 3700' },
      { key: 'blade_lift_mm', label: 'Blade lift (mm)', placeholder: 'e.g. 480' },
      { key: 'blade_thickness_mm', label: 'Blade thickness (mm)', placeholder: 'e.g. 25' },
      { key: 'blade_tilt', label: 'Blade tilt Fwd/Back (deg)', placeholder: 'e.g. 40 / 5' },
    ],
  },
  {
    title: 'Body Type',
    fields: [
      { key: 'body_type', label: 'Articulated/Rigid', placeholder: 'e.g. Articulated' },
      { key: 'articulation_deg', label: 'Articulation, either side (deg)', placeholder: 'e.g. 20' },
    ],
  },
  {
    title: 'Capacities',
    fields: [
      { key: 'fuel_capacity_l', label: 'Fuel Tank Capacity (L)', placeholder: 'e.g. 416' },
      { key: 'hydraulic_oil_capacity_l', label: 'Hydraulic Oil Tank Capacity (L)', placeholder: 'e.g. 64' },
    ],
  },
  {
    title: 'Dimensions / Weights',
    fields: [
      { key: 'front_axle_oscillation', label: 'Front axle total oscillation (deg)', placeholder: 'e.g. 32°' },
      { key: 'height_cab_mm', label: 'Height to top of cab (mm)', placeholder: 'e.g. 3308' },
      { key: 'length_mm', label: 'Length (mm)', placeholder: 'e.g. 10136' },
      { key: 'operating_weight_kg', label: 'Operating weight (kg)', placeholder: 'e.g. 18991' },
      { key: 'shoulder_reach', label: 'Shoulder reach L/R (mm)', placeholder: 'e.g. 1790/1978' },
      { key: 'turn_circle_mm', label: 'Turn circle diameter (mm)', placeholder: 'e.g. 7600' },
      { key: 'width_no_blade_mm', label: 'Width without blade (mm)', placeholder: 'e.g. 2511' },
    ],
  },
  {
    title: 'Drives',
    fields: [{ key: 'drive', label: 'Drive', placeholder: 'e.g. 6x6' }],
  },
  {
    title: 'Engine',
    fields: [
      { key: 'engine_make_model', label: 'Engine Make & Model', placeholder: 'e.g. Cat® C7' },
      { key: 'engine_number', label: 'Engine Number', placeholder: 'e.g. TX715144' },
      { key: 'engine_displacement', label: 'Engine Displacement', placeholder: 'e.g. 439.0 in³' },
      { key: 'engine_hours', label: 'Engine Hours', placeholder: 'e.g. 9000' },
      { key: 'engine_cylinders', label: 'Number of Cylinders', placeholder: 'e.g. 6' },
      { key: 'engine_power', label: 'Net engine power, 1st gear (kW @ rpm)', placeholder: 'e.g. 136kW @ 2000 rpm' },
      { key: 'engine_torque', label: 'Torque (Nm@rpm)', placeholder: 'e.g. 941 @ 1450 rpm' },
      { key: 'engine_torque_rise', label: 'Torque rise (%)', placeholder: 'e.g. 44' },
      { key: 'engine_variable_power', label: 'Variable power, net, max (kW@rpm)', placeholder: 'e.g. 136-174 kW 2,000rpm' },
    ],
  },
  {
    title: 'Hydraulics',
    fields: [
      { key: 'hydraulic_flow', label: 'Hydraulic Oil Flow (l/min)', placeholder: 'e.g. 210' },
      { key: 'hydraulic_pressure', label: 'Hydraulic Oil Pressure (Bar)', placeholder: 'e.g. 241.5' },
      { key: 'hydraulic_system', label: 'Hydraulic System (L)', placeholder: 'e.g. 55' },
    ],
  },
  {
    title: 'Plant Classification',
    fields: [
      { key: 'plant_class', label: 'Class', placeholder: 'e.g. MOTOR GRADER' },
      { key: 'plant_year', label: 'Year', placeholder: 'e.g. 2024' },
    ],
  },
  {
    title: 'Safety Structures',
    fields: [
      { key: 'rops_compliance', label: 'ROPS Compliance No.', placeholder: 'e.g. ISO 3471:2008' },
      { key: 'rops_serial', label: 'ROPS Serial No.', placeholder: 'e.g. N/A' },
      { key: 'fops_compliance', label: 'FOPS Compliance No.', placeholder: 'e.g. ISO 3449:2005 Level II' },
      { key: 'fops_serial', label: 'FOPS Serial No.', placeholder: 'e.g. N/A' },
    ],
  },
  {
    title: 'Steering',
    fields: [{ key: 'front_wheel_lean', label: 'Front wheel lean, L/R (deg)', placeholder: 'e.g. 18°' }],
  },
  {
    title: 'Transmission',
    fields: [
      { key: 'max_speed', label: 'Maximum speed, Fwd/Rev (km/h)', placeholder: 'e.g. 46.6/36.8' },
      { key: 'speeds_fr', label: 'Speeds F/R', placeholder: 'e.g. 46.6 km/h - 36.8 km/h' },
      { key: 'transmission', label: 'Transmission', placeholder: 'e.g. Full Power Shift' },
    ],
  },
  {
    title: 'Tyres',
    fields: [{ key: 'tyre_size', label: 'Tyre Size', placeholder: 'e.g. 17.5R25' }],
  },
];

const EXTRAS: { key: keyof GraderSpecs; label: string }[] = [
  { key: 'extras_air_conditioning', label: 'Air Conditioning' },
  { key: 'extras_drawbar', label: 'Drawbar' },
  { key: 'extras_final_trim', label: 'Final Trim Equipment' },
  { key: 'extras_fops', label: 'FOPS' },
  { key: 'extras_front_grader_blade', label: 'Front Grader Blade' },
  { key: 'extras_grader_blade', label: 'Grader Blade' },
  { key: 'extras_rippers_centre', label: 'Rippers – Centre' },
  { key: 'extras_rippers_rear', label: 'Rippers – Rear' },
  { key: 'extras_roller_attachment', label: 'Roller Attachment' },
  { key: 'extras_rops_cabin', label: 'ROPS – Cabin' },
  { key: 'extras_wheel_chocks', label: 'Wheel Chocks' },
];

export default function Step2Specs({ onSubmit, onBack, initial }: Props) {
  const [specs, setSpecs] = useState<GraderSpecs>(initial as GraderSpecs ?? {});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ 'Machine Classification': true });

  function setField(key: keyof GraderSpecs, value: string | boolean) {
    setSpecs((s) => ({ ...s, [key]: value }));
  }

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
        <p className="text-sm text-gray-500">Fill in the machine specifications. All fields are optional — only filled fields appear in the PDF.</p>
      </div>

      {/* Spec groups */}
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
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF8C32] transition"
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

      {/* Extras checklist */}
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
