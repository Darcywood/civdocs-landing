/**
 * Mack Granite vocational chassis, the construction spec Mack Australia
 * publishes for tipper and truck-and-dog work.
 * https://tcwa.com.au/wp-content/uploads/2019/12/mack_granite_voc_spec.pdf
 *
 * GVM and GCM are the published range maximums, not the plated weights of
 * one truck. Body capacity, hoist and raised-body height are set by the
 * body builder, so those fields are left blank.
 */
export interface TruckSpecsRecord {
  id: string;
  make: string;
  model: string;
  name: string;
  search_keys: string[];
  specs: Record<string, string>;
  source?: string;
}

const GRANITE_SOURCE = 'Mack Granite vocational spec (Australia), chassis only';

export const TRUCK_SPEC_CATALOG: TruckSpecsRecord[] = [
  {
    id: 'catalog-mack-granite',
    make: 'Mack',
    model: 'Granite',
    name: 'Mack Granite',
    search_keys: ['mack granite', 'mack truck', 'mack tipper'],
    source: GRANITE_SOURCE,
    specs: {
      truck_configuration: '6x4 or 8x4 day cab. Confirm the plated build.',
      axle_configuration: '6x4 or 8x4',
      gvm_kg: 'Up to 33000 kg. Confirm the plated GVM.',
      gcm_kg: 'Up to 110000 kg. Confirm the plated GCM.',
      engine_make_model: 'Mack MP8 12.8 L',
      engine_power: '435 hp (324 kW) or 500 hp (373 kW)',
      transmission: 'mDRIVE AT2612D automated, or manual',
    },
  },
];

/** Mack Granite, or a plain "Mack truck" / "Mack tipper". Other Mack models are left for a live lookup. */
export function lookupTruckCatalog(query: string): TruckSpecsRecord | null {
  const q = query.toLowerCase();
  if (!q.includes('mack')) return null;
  if (/anthem|super-?\s*liner|trident|metro-?\s*liner|terrpro/.test(q)) return null;
  if (/granite/.test(q) || /mack(\s+truck|\s+tipper)?\s*$/.test(q.trim()) || /mack\s+(tipper|truck|rigid)/.test(q)) {
    return TRUCK_SPEC_CATALOG[0];
  }
  return null;
}
