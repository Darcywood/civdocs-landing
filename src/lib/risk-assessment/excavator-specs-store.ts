/**
 * Excavator specs store — Supabase table.
 * Populated by: npm run seed:excavator-specs
 * Lookup uses stored data first to avoid Firecrawl/GPT cost on every Auto-fill.
 */

import { createClient } from '@supabase/supabase-js';

export interface ExcavatorSpecsRecord {
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

  const makeMap: Record<string, string> = {
    cat: 'Caterpillar',
    caterpillar: 'Caterpillar',
    komatsu: 'Komatsu',
    kobelco: 'Kobelco',
    hitachi: 'Hitachi',
    yanmar: 'Yanmar',
    volvo: 'Volvo',
    liebherr: 'Liebherr',
    hyundai: 'Hyundai',
    doosan: 'Doosan',
    jcb: 'JCB',
  };

  const parts = q.split(' ');
  const first = parts[0]?.toLowerCase() ?? '';
  const make = makeMap[first] ?? (parts[0] ?? '');
  const model = parts.slice(1).join(' ').trim();

  void lower;
  if (!make || !model) return null;
  return { make, model };
}

export async function saveExcavatorSpecs(params: {
  make: string;
  model: string;
  name: string;
  search_keys: string[];
  specs: Record<string, string>;
  source?: string;
}): Promise<boolean> {
  const supabase = getSupabase();
  if (!supabase) return false;

  const { error } = await supabase.from('excavator_specs').upsert(
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

export async function lookupExcavatorSpecs(query: string): Promise<ExcavatorSpecsRecord | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data: rows, error } = await supabase
    .from('excavator_specs')
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
