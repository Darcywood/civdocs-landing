import type { ExcavatorSpecsRecord } from './excavator-specs-store';

/**
 * Hitachi 5.5 tonne Zaxis mini excavators.
 * ZX55U-6 figures are from the ZAXIS-6 brochure.
 * ZX55U-5A figures are from the Australian ZAXIS-5A brochure (KS-EN239S).
 * "ZU55-5A" is the same machine. Ranges are the brochure's arm and cab options, not estimates.
 * https://www.hitachicm.com/gb/en/machinery/excavators/mini-excavators/product.zx55u-6/
 * https://hitachicm.com.au/wp-content/uploads/2021/05/ZX55U-5A_16_KS-EN239S-small.pdf
 */
const ZX55U6_SOURCE = 'Hitachi ZX55U-6 brochure (ZAXIS-6)';
const ZX55U5A_SOURCE = 'Hitachi ZX55U-5A brochure (ZAXIS-5A, Australia)';

export const EXCAVATOR_SPEC_CATALOG: ExcavatorSpecsRecord[] = [
  {
    id: 'catalog-hitachi-zx55u-6',
    make: 'Hitachi',
    model: 'ZX55U-6',
    name: 'Hitachi ZX55U-6 (5.5 tonne)',
    search_keys: ['zx55u-6', '5.5t hitachi', '5.5 tonne hitachi'],
    source: ZX55U6_SOURCE,
    specs: {
      plant_class: 'EXCAVATOR',
      engine_make_model: 'Yanmar 4TNV88C',
      engine_displacement: '2.189 L',
      engine_cylinders: '4',
      engine_power: '29.1 kW ISO 14396 / 27.1 kW net @ 2400 rpm',
      engine_torque: '135.8 Nm @ 1560 rpm',
      operating_weight_kg: '4920–5310 kg cab / 4790–5180 kg canopy',
      bucket_capacity_m3: '0.10–0.17 m³',
      max_dig_depth_mm: '3530 mm (1.38 m arm) / 3830 mm (1.69 m arm)',
      max_reach_mm: '5820 mm (1.38 m arm) / 6130 mm (1.69 m arm) on ground',
      max_cutting_height_mm: '5750 mm (1.38 m arm) / 6000 mm (1.69 m arm)',
      max_dump_height_mm: '4070 mm (1.38 m arm) / 4310 mm (1.69 m arm)',
      swing_speed_rpm: '9.0 rpm',
      travel_speed_kmh: '2.5 km/h low / 4.2 km/h high',
      tail_swing_radius_mm: '1000 mm (1100 mm with additional counterweight)',
      zero_tail_swing: 'Reduced tail swing, not zero tail swing',
      track_width_mm: '400 mm',
      undercarriage_length_mm: '2500 mm',
      overall_length_mm: '5470 mm (1.38 m arm) / 5520 mm (1.69 m arm)',
      overall_width_mm: '2000 mm',
      overall_height_mm: '2530 mm cab',
      fuel_capacity_l: '70 L',
      hydraulic_flow_lpm: '120 L/min',
      hydraulic_pressure_bar: '245 bar implement and travel',
      noise_mfr_dba: '75 dB(A) in cab, 96 dB(A) outside',
    },
  },
  {
    id: 'catalog-hitachi-zx55u-5a',
    make: 'Hitachi',
    model: 'ZX55U-5A',
    name: 'Hitachi ZX55U-5A (5.5 tonne)',
    search_keys: ['zx55u-5a', 'zu55-5a', 'zu55-5', 'hitachi zu55'],
    source: ZX55U5A_SOURCE,
    specs: {
      plant_class: 'EXCAVATOR',
      engine_make_model: 'Yanmar 4TNV88',
      engine_displacement: '2.189 L',
      engine_cylinders: '4',
      engine_power: '28.2 kW net ISO 9249 @ 2400 rpm',
      engine_torque: '139.6 Nm @ 1100 rpm',
      operating_weight_kg: '4790–4960 kg canopy / 4920–5090 kg cab',
      bucket_capacity_m3: '0.15 m³ ISO heaped',
      max_dig_depth_mm: '3530 mm (1.38 m arm) / 3830 mm (1.69 m arm)',
      max_reach_mm: '5820 mm (1.38 m arm) / 6130 mm (1.69 m arm) on ground',
      max_cutting_height_mm: '5750 mm (1.38 m arm) / 6000 mm (1.69 m arm)',
      max_dump_height_mm: '4070 mm (1.38 m arm) / 4310 mm (1.69 m arm)',
      swing_speed_rpm: '9.0 rpm',
      travel_speed_kmh: '2.5 km/h low / 4.2 km/h high',
      tail_swing_radius_mm: '1000 mm (1100 mm with additional counterweight)',
      zero_tail_swing: 'Reduced tail swing, not zero tail swing',
      track_width_mm: '400 mm',
      undercarriage_length_mm: '2500 mm',
      overall_length_mm: '5470 mm (1.38 m arm) / 5520 mm (1.69 m arm)',
      overall_width_mm: '2000 mm',
      overall_height_mm: '2530 mm cab',
      fuel_capacity_l: '70 L',
      hydraulic_flow_lpm: '120 L/min',
      hydraulic_pressure_bar: '245 bar implement and travel',
    },
  },
];

/** ZX55U-5A, including ZU55-5A and ZU55-5. ZX55U-6 is a different machine. */
function isZx55u5a(q: string): boolean {
  return (
    /z[ux]\s*55\s*u?\s*-?\s*5\s*-?\s*a\b/.test(q) ||
    /zaxis\s*55\s*u?\s*-?\s*5\s*-?\s*a\b/.test(q) ||
    /zu\s*55\s*-?\s*5\b/.test(q)
  );
}

/** True for a stored Hitachi sheet. A plain ZX55U-5, without the A, is left unmatched. */
export function lookupExcavatorCatalog(query: string): ExcavatorSpecsRecord | null {
  const q = query.toLowerCase();
  if (isZx55u5a(q)) {
    return EXCAVATOR_SPEC_CATALOG.find((record) => record.id === 'catalog-hitachi-zx55u-5a') ?? null;
  }
  if (/zx\s*55\s*u?\s*-?\s*5\b/.test(q)) return null;

  const isZx55u6 = /zx\s*55\s*u?\s*-?\s*6\b/.test(q) || /zaxis\s*55/.test(q);
  const is55TonneHitachi = /hitachi/.test(q) && /5[\s.]*5\s*(t|tonne|ton)\b/.test(q);
  const isZx55 = /hitachi/.test(q) && /zx\s*55\b/.test(q) && !/zx\s*55\s*u?\s*-?\s*5\b/.test(q);

  if (!isZx55u6 && !is55TonneHitachi && !isZx55) return null;
  return EXCAVATOR_SPEC_CATALOG.find((record) => record.id === 'catalog-hitachi-zx55u-6') ?? null;
}
