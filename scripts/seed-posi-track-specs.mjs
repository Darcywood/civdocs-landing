#!/usr/bin/env node
/**
 * Seed the posi_track_specs table using Firecrawl.
 * Run: npm run seed:posi-track-specs
 * Requires: FIRECRAWL_API_KEY, OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 *
 * Scrapes manufacturer spec pages once, stores in Supabase. Auto-fill uses table — no scrape per lookup.
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import FirecrawlApp from '@mendable/firecrawl-js';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local
try {
  const envLocal = readFileSync(join(process.cwd(), '.env.local'), 'utf8');
  for (const line of envLocal.split('\n')) {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  }
} catch {}

// ─── Models to seed ──────────────────────────────────────────────────────────
// Posi-Track = compact track loaders (CTL). Bobcat Posi-Track + Cat/Kubota/John Deere CTLs
const MODELS_TO_SEED = [
  // ── Bobcat Posi-Track (compact track loaders) ──
  'Bobcat MT55',
  'Bobcat MT85',
  'Bobcat MT100',
  'Bobcat MT225',
  'Bobcat MT237',
  'Bobcat MT240',
  'Bobcat MT340',
  'Bobcat MT440',
  'Bobcat MT452',
  'Bobcat MT540',
  'Bobcat MT552',
  'Bobcat MT555',
  'Bobcat MT625',
  'Bobcat MT642',
  'Bobcat MT742',
  'Bobcat MT765',
  'Bobcat MT825',
  'Bobcat MT842',
  'Bobcat MT965',

  // ── Caterpillar compact track loaders ──
  'Caterpillar 259D3',
  'Caterpillar 279D3',
  'Caterpillar 289D3',
  'Caterpillar 299D3',
  'Caterpillar 289D',
  'Caterpillar 299D',

  // ── Kubota compact track loaders ──
  'Kubota SVL65-2',
  'Kubota SVL75-2',
  'Kubota SVL90-2',
  'Kubota SVL95-2',

  // ── John Deere compact track loaders ──
  'John Deere 317G',
  'John Deere 325G',
  'John Deere 333G',
];

const SPEC_SCHEMA = `{
  "operating_weight_kg": "string | null — operating weight in kg",
  "rated_operating_capacity_kg": "string | null — ROC / rated operating capacity in kg",
  "breakout_force_kn": "string | null — breakout force in kN",
  "lift_height_mm": "string | null — lift height to hinge pin in mm",
  "dump_height_mm": "string | null — dump/clearance height in mm",
  "dump_reach_mm": "string | null — dump reach at full height in mm",
  "bucket_capacity_m3": "string | null — bucket capacity in m³",
  "engine_make_model": "string | null — engine brand and model. MUST match machine manufacturer.",
  "engine_displacement": "string | null — engine displacement e.g. '2.4 L'",
  "engine_power": "string | null — net power e.g. '55 kW @ 2700 rpm'",
  "engine_torque": "string | null — max torque e.g. '220 Nm @ 1600 rpm'",
  "travel_speed_kmh": "string | null — travel speed in km/h",
  "track_width_mm": "string | null — track width in mm",
  "overall_length_mm": "string | null — overall length in mm",
  "overall_width_mm": "string | null — overall width in mm",
  "overall_height_mm": "string | null — overall height in mm",
  "fuel_capacity_l": "string | null — fuel tank capacity in litres",
  "hydraulic_flow_lpm": "string | null — hydraulic flow in L/min",
  "hydraulic_pressure_bar": "string | null — hydraulic pressure in bar",
  "noise_mfr_dba": "string | null — operator/exterior sound level e.g. '75 dB(A) operator'",
  "rops_compliance": "string | null — ROPS standard e.g. 'ISO 12117-2'",
  "fops_compliance": "string | null — FOPS standard e.g. 'ISO 3449'",
  "plant_class": "string | null — 'COMPACT TRACK LOADER' or 'POSI-TRACK'",
  "plant_year": "string | null — year of manufacture. ONLY set if year was in the search query."
}`;

async function main() {
  const firecrawlKey = process.env.FIRECRAWL_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!firecrawlKey) { console.error('Missing FIRECRAWL_API_KEY in .env.local'); process.exit(1); }
  if (!openaiKey)    { console.error('Missing OPENAI_API_KEY in .env.local'); process.exit(1); }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const fc = new FirecrawlApp({ apiKey: firecrawlKey });
  const openai = new OpenAI({ apiKey: openaiKey });

  const { data: existing } = await supabase.from('posi_track_specs').select('make, model');
  const existingSet = new Set((existing ?? []).map((r) => `${r.make}|${r.model}`));

  let inserted = 0;

  for (const fullName of MODELS_TO_SEED) {
    const parts = fullName.split(' ');
    const make = parts.length >= 2 && parts[0] === 'John' ? 'John Deere' : parts[0];
    const modelName = make === 'John Deere' ? parts.slice(2).join(' ') : parts.slice(1).join(' ');

    if (existingSet.has(`${make}|${modelName}`)) {
      console.log(`  ↩ Skipping ${fullName} (already in table)`);
      continue;
    }

    console.log(`\nFetching ${fullName}...`);

    let webContext = '';
    const sources = [];

    try {
      const searchQueries = [
        `"${fullName}" compact track loader specifications ROC weight`,
        `"${fullName}" Posi-Track specifications lift height breakout force`,
      ];

      for (const q of searchQueries) {
        const result = await fc.search(q, {
          limit: 3,
          scrapeOptions: { formats: [{ type: 'markdown' }] },
        });
        const items =
          Array.isArray(result?.web)
            ? result.web
            : Array.isArray(result?.data)
              ? result.data
              : [];
        for (const item of items) {
          const url = item.url ?? item.metadata?.url ?? '';
          const content = item.markdown ?? item.description ?? item.metadata?.description ?? '';
          if (content && content.length > 300) {
            webContext += `\n--- Source: ${url} ---\n${content.slice(0, 5000)}`;
            sources.push(url);
          }
        }
      }

      if (!webContext) {
        console.log(`  No web content found for ${fullName}, skipping`);
        continue;
      }

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
        temperature: 0,
        messages: [
          {
            role: 'system',
            content: `Extract technical specifications for the EXACT compact track loader / Posi-Track from the scraped web content. Only include values explicitly stated. Use null for missing fields. engine_make_model MUST match the machine brand — never cross manufacturers. Return JSON matching: ${SPEC_SCHEMA}`,
          },
          {
            role: 'user',
            content: `Extract specs for: ${fullName}\n\nWeb content:\n${webContext}`,
          },
        ],
      });

      const raw = response.choices[0]?.message?.content;
      if (!raw) continue;

      const parsed = JSON.parse(raw);
      const NULL_STRINGS = new Set(['null', 'n/a', 'na', 'unknown', 'none', '-', '—', '']);
      const specs = {};

      for (const [k, v] of Object.entries(parsed)) {
        if (k.startsWith('_')) continue;
        if (v == null) continue;
        if (typeof v !== 'string') continue;
        const t = v.trim();
        if (t && !NULL_STRINGS.has(t.toLowerCase())) specs[k] = t;
      }

      const makeShort = make.toLowerCase().startsWith('caterpillar') ? 'cat' : make.toLowerCase().replace(/\s+/g, '');
      const keys = [
        modelName.toLowerCase().replace(/\s+/g, ''),
        fullName.toLowerCase().replace(/\s+/g, ' '),
        `${make.toLowerCase()} ${modelName}`.replace(/\s+/g, ' ').trim(),
        `posi track ${modelName}`.toLowerCase().replace(/\s+/g, ' '),
      ].filter(Boolean);

      const { error } = await supabase.from('posi_track_specs').upsert(
        {
          make,
          model: modelName,
          name: fullName,
          search_keys: [...new Set(keys)],
          specs,
          source: sources[0] ?? null,
        },
        { onConflict: 'make,model' }
      );

      if (error) {
        console.error(`  ✗ DB insert error:`, error.message);
      } else {
        inserted++;
        existingSet.add(`${make}|${modelName}`);
        console.log(`  ✓ Extracted ${Object.keys(specs).length} specs → saved to posi_track_specs`);
      }
    } catch (err) {
      console.error(`  ✗ Error for ${fullName}:`, err.message);
    }

    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log(`\n✓ Saved ${inserted} records to posi_track_specs table. Auto-fill will use these — no scrape per lookup.`);
}

main().catch(console.error);
