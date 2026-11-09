import type { PosiTrackSpecsRecord } from './posi-track-specs-store';

/**
 * Kubota SVL75-3, from the Kubota spec page:
 * https://assets.kubotacore.com/documents/SVL75-3_Spec_Page.pdf
 *
 * Metric figures are the ones printed beside the US units. Dump clearance
 * height, engine torque and operator noise are not on that sheet, so they
 * are left blank rather than estimated. Operating weight includes a 75 kg operator.
 */
const SVL75_3_SOURCE = 'Kubota SVL75-3 spec page (kubotausa.com)';

export const POSI_TRACK_SPEC_CATALOG: PosiTrackSpecsRecord[] = [
  {
    id: 'catalog-kubota-svl75-3',
    make: 'Kubota',
    model: 'SVL75-3',
    name: 'Kubota SVL75-3',
    search_keys: ['svl75-3', 'svl 75-3', 'svl753', 'kubota svl75-3', 'kubota svl 75-3'],
    source: SVL75_3_SOURCE,
    specs: {
      plant_class: 'COMPACT TRACK LOADER',
      engine_make_model: 'Kubota V3307-TE5A',
      engine_displacement: '3.331 L',
      engine_cylinders: '4',
      engine_power: '53.4 kW gross / 52.6 kW net @ 2400 rpm',
      operating_weight_kg: '4273 kg closed cab / 4169 kg open cab',
      rated_operating_capacity_kg: '1129 kg at 35% / 1613 kg at 50% of tipping load',
      breakout_force_kn: '27.5 kN bucket / 21.0 kN lift arm',
      lift_height_mm: '3117 mm hinge pin',
      dump_reach_mm: '1007 mm',
      travel_speed_kmh: '9.0 km/h low / 13.7 km/h high',
      track_width_mm: '320 mm standard / 400 mm wide',
      overall_length_mm: '3609 mm with bucket on ground',
      overall_width_mm: '1675 mm standard track / 1755 mm wide track',
      overall_height_mm: '2078 mm to top of cab',
      fuel_capacity_l: '94.6 L',
      hydraulic_flow_lpm: '72.7 L/min standard / 112.8 L/min high flow',
      hydraulic_pressure_bar: '220 bar (3185 psi)',
    },
  },
];
