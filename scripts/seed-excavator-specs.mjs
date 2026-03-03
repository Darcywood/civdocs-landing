#!/usr/bin/env node
/**
 * Seed the excavator_specs table using Firecrawl.
 * Run: npm run seed:excavator-specs
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
// Format: 'Make ModelNumber'  (one or two word makes handled below)
const MODELS_TO_SEED = [
  // ── Caterpillar: mini (1.7T – 6T) ──
  'Caterpillar 301.7',
  'Caterpillar 302',
  'Caterpillar 302.4',
  'Caterpillar 303',
  'Caterpillar 303.5',
  'Caterpillar 304',
  'Caterpillar 304.5',
  'Caterpillar 305',
  'Caterpillar 305.5',
  'Caterpillar 306',
  // ── Caterpillar: small (7T – 12T) ──
  'Caterpillar 307.5',
  'Caterpillar 308',
  'Caterpillar 308.5',
  'Caterpillar 309',
  'Caterpillar 310',
  // ── Caterpillar: medium (13T – 25T) ──
  'Caterpillar 312',
  'Caterpillar 313',
  'Caterpillar 314',
  'Caterpillar 315',
  'Caterpillar 316',
  'Caterpillar 317',
  'Caterpillar 318',
  'Caterpillar 319',
  'Caterpillar 320',
  'Caterpillar 323',
  // ── Caterpillar: large (25T – 50T) ──
  'Caterpillar 325',
  'Caterpillar 326',
  'Caterpillar 330',
  'Caterpillar 336',
  'Caterpillar 340',
  'Caterpillar 349',

  // ── Kobelco ──
  'Kobelco SK17SR',
  'Kobelco SK20SR',
  'Kobelco SK25SR',
  'Kobelco SK30SR',
  'Kobelco SK35SR',
  'Kobelco SK45SR',
  'Kobelco SK55SRX',
  'Kobelco SK85CS',
  'Kobelco SK100',
  'Kobelco SK130',
  'Kobelco SK140SR',
  'Kobelco SK170',
  'Kobelco SK200',
  'Kobelco SK210',
  'Kobelco SK260',
  'Kobelco SK300',
  'Kobelco SK350',
  'Kobelco SK380',
  'Kobelco SK500',

  // ── Hitachi ──
  'Hitachi ZX17U',
  'Hitachi ZX26U',
  'Hitachi ZX35U',
  'Hitachi ZX55U',
  'Hitachi ZX85US',
  'Hitachi ZX135US',
  'Hitachi ZX180',
  'Hitachi ZX200',
  'Hitachi ZX210',
  'Hitachi ZX225US',
  'Hitachi ZX250',
  'Hitachi ZX270',
  'Hitachi ZX300',
  'Hitachi ZX350',
  'Hitachi ZX400',
  'Hitachi ZX450',

  // ── Komatsu ──
  'Komatsu PC18MR',
  'Komatsu PC26MR',
  'Komatsu PC35MR',
  'Komatsu PC45MR',
  'Komatsu PC55MR',
  'Komatsu PC78US',
  'Komatsu PC88MR',
  'Komatsu PC130',
  'Komatsu PC138',
  'Komatsu PC160',
  'Komatsu PC200',
  'Komatsu PC210',
  'Komatsu PC228',
  'Komatsu PC240',
  'Komatsu PC290',
  'Komatsu PC300',
  'Komatsu PC360',
  'Komatsu PC400',
  'Komatsu PC450',

  // ── Yanmar ──
  'Yanmar SV08',
  'Yanmar SV17',
  'Yanmar SV22',
  'Yanmar SV26',
  'Yanmar SV40',
  'Yanmar SV100',
];

const SPEC_SCHEMA = `{
  "operating_weight_kg": "string | null — operating/service weight in kg",
  "bucket_capacity_m3": "string | null — standard bucket capacity in m³",
  "engine_make_model": "string | null — engine brand and model. MUST match machine manufacturer (e.g. Cat engine for Cat, Komatsu engine for Komatsu). NEVER cross manufacturers.",
  "engine_displacement": "string | null — engine displacement in litres e.g. '3.8 L'",
  "engine_cylinders": "string | null — number of cylinders",
  "engine_power": "string | null — net power e.g. '55.4 kW @ 2000 rpm'",
  "engine_torque": "string | null — max torque e.g. '310 Nm @ 1500 rpm'",
  "max_dig_depth_mm": "string | null — maximum digging/dig depth in mm",
  "max_reach_mm": "string | null — maximum reach at ground level in mm",
  "max_cutting_height_mm": "string | null — maximum cutting height in mm",
  "max_dump_height_mm": "string | null — maximum dump/loading height in mm",
  "swing_speed_rpm": "string | null — upper structure swing speed in rpm",
  "travel_speed_kmh": "string | null — travel speed (high/low) in km/h",
  "track_width_mm": "string | null — track shoe/pad width in mm",
  "undercarriage_length_mm": "string | null — overall length on ground (undercarriage) in mm",
  "overall_length_mm": "string | null — overall transport length in mm",
  "overall_width_mm": "string | null — overall width in mm",
  "overall_height_mm": "string | null — overall height (cab) in mm",
  "tail_swing_radius_mm": "string | null — tail swing (counterweight) radius in mm. For zero/reduced-tail-swing note 'ZTS' or 'RTS'.",
  "fuel_capacity_l": "string | null — fuel tank capacity in litres",
  "hydraulic_flow_lpm": "string | null — main pump flow in L/min",
  "hydraulic_pressure_bar": "string | null — main relief pressure in bar. Convert MPa to bar (1 MPa = 10 bar).",
  "noise_mfr_dba": "string | null — operator/exterior sound level e.g. '73 dB(A) operator, 101 dB(A) exterior'",
  "rops_compliance": "string | null — ROPS/TOPS standard e.g. 'ISO 12117-2'",
  "fops_compliance": "string | null — FOPS standard e.g. 'ISO 10262 Level I'",
  "plant_class": "string | null — always 'EXCAVATOR' for excavators",
  "plant_year": "string | null — year of manufacture. ONLY set if year was in the search query.",
  "zero_tail_swing": "string | null — 'Yes' if zero or reduced tail swing, null otherwise",
  "tyre_size": "string | null — for wheeled excavators only"
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

  // Optional: skip models already in the table
  const { data: existing } = await supabase.from('excavator_specs').select('make, model');
  const existingSet = new Set((existing ?? []).map((r) => `${r.make}|${r.model}`));

  let inserted = 0;

  for (const fullName of MODELS_TO_SEED) {
    const parts = fullName.split(' ');
    const make = parts[0];
    const modelName = parts.slice(1).join(' ');

    if (existingSet.has(`${make}|${modelName}`)) {
      console.log(`  ↩ Skipping ${fullName} (already in table)`);
      continue;
    }

    console.log(`\nFetching ${fullName}...`);

    let webContext = '';
    const sources = [];

    try {
      const searchQueries = [
        `"${fullName}" excavator specifications technical data weight`,
        `"${fullName}" dig depth reach hydraulic specifications`,
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
            content: `Extract technical specifications for the EXACT excavator from the scraped web content. Only include values explicitly stated. Use null for missing fields. engine_make_model MUST match the machine brand — never cross manufacturers. Return JSON matching: ${SPEC_SCHEMA}`,
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

      const makeShort = make.toLowerCase().startsWith('caterpillar') ? 'cat' : make.toLowerCase();
      const keys = [
        modelName.toLowerCase().replace(/\s+/g, ''),
        fullName.toLowerCase().replace(/\s+/g, ' '),
        `${make.toLowerCase()} ${modelName}`.replace(/\s+/g, ' ').trim(),
        `${makeShort} ${modelName}`.replace(/\s+/g, ' ').trim().toLowerCase(),
      ].filter(Boolean);

      const { error } = await supabase.from('excavator_specs').upsert(
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
        console.log(`  ✓ Extracted ${Object.keys(specs).length} specs → saved to excavator_specs`);
      }
    } catch (err) {
      console.error(`  ✗ Error for ${fullName}:`, err.message);
    }

    // Rate-limit pause
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log(`\n✓ Saved ${inserted} records to excavator_specs table. Auto-fill will use these — no scrape per lookup.`);
}

main().catch(console.error);
