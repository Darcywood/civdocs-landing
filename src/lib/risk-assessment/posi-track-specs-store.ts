/**
 * Posi Track specs store — Supabase table.
 * Populated by: npm run seed:posi-track-specs
 * Lookup uses stored data first to avoid Firecrawl/GPT cost on every Auto-fill.
 */

import { createClient } from '@supabase/supabase-js';
import { POSI_TRACK_SPEC_CATALOG } from './posi-track-specs-catalog';

export interface PosiTrackSpecsRecord {
  id: string;
  make: string;
  model: string;
  name: string;
  search_keys: string[];
  specs: Record<string, string>;
  source?: string;
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

function normalizeQuery(q: string): string {
  return q
    .toLowerCase()
    .replace(/\b(19|20)\d{2}\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractYearFromQuery(query: string): string | null {
  const m = query.match(/\b(19|20)\d{2}\b/);
  return m ? m[0] : null;
}

export function parseMakeModelFromQuery(query: string): { make: string; model: string } | null {
  const q = query.trim().replace(/\b(19|20)\d{2}\b/g, '').replace(/\s+/g, ' ').trim();
  if (!q || q.length < 4) return null;

  const lower = q.toLowerCase();

  if (lower.startsWith('john deere ')) {
    return { make: 'John Deere', model: q.slice(11).trim() };
  }

  const makeMap: Record<string, string> = {
    cat: 'Caterpillar',
    caterpillar: 'Caterpillar',
    bobcat: 'Bobcat',
    kubota: 'Kubota',
    deere: 'John Deere',
    takeuchi: 'Takeuchi',
    asv: 'ASV',
    case: 'Case',
    jcb: 'JCB',
    yanmar: 'Yanmar',
    mustang: 'Mustang',
    gehl: 'Gehl',
    wacker: 'Wacker Neuson',
  };

  // SVL compact track loaders are Kubota (SVL75-2, SVL75-3, SVL97-2). Not Takeuchi.
  if (/\bsvl[\s-]*\d/i.test(q)) {
    const model = q.replace(/^(kubota|takeuchi)\s+/i, '').trim();
    return { make: 'Kubota', model };
  }

  const parts = q.split(' ');
  const first = parts[0]?.toLowerCase() ?? '';
  const make = makeMap[first] ?? (parts[0] ?? '');
  const model = parts.slice(1).join(' ').trim();

  void lower;
  if (!make || !model) return null;
  return { make, model };
}

export async function savePosiTrackSpecs(params: {
  make: string;
  model: string;
  name: string;
  search_keys: string[];
  specs: Record<string, string>;
  source?: string;
}): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  const { error } = await supabase.from('posi_track_specs').upsert(
    {
      make: params.make,
      model: params.model,
      name: params.name,
      search_keys: params.search_keys,
      specs: params.specs,
      source: params.source ?? null,
    },
    { onConflict: 'make,model' }
  );

  return !error;
}

function compactModel(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** Published spec sheets shipped with the app. Checked before the Supabase cache. */
function lookupCatalogSpecs(query: string): PosiTrackSpecsRecord | null {
  const q = compactModel(query);
  if (q.length < 6) return null;
  return (
    POSI_TRACK_SPEC_CATALOG.find((record) =>
      record.search_keys.some((key) => {
        const compactKey = compactModel(key);
        return compactKey.length >= 6 && q.includes(compactKey);
      })
    ) ?? null
  );
}

export async function lookupPosiTrackSpecs(query: string): Promise<PosiTrackSpecsRecord | null> {
  const catalogMatch = lookupCatalogSpecs(query);
  if (catalogMatch) return catalogMatch;

  const supabase = getSupabase();
  if (!supabase) return null;

  const { data: rows, error } = await supabase
    .from('posi_track_specs')
    .select('id, make, model, name, search_keys, specs, source');

  if (error || !rows?.length) return null;

  const normalized = normalizeQuery(query);
  if (!normalized) return null;

  const best = rows.find((r) => {
    const keys = (r.search_keys as string[]) ?? [];
    return keys.some((key) => {
      const nk = normalizeQuery(key);
      return normalized.includes(nk) || nk.includes(normalized);
    });
  });

  if (!best) return null;

  return {
    id: best.id,
    make: best.make,
    model: best.model,
    name: best.name,
    search_keys: (best.search_keys as string[]) ?? [],
    specs: (best.specs as Record<string, string>) ?? {},
    source: best.source ?? undefined,
  };
}
