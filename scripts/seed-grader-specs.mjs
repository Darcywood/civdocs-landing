#!/usr/bin/env node
/**
 * Seed the grader_specs table using Firecrawl.
 * Run: npm run seed:grader-specs
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

const MODELS_TO_SEED = [
  'Komatsu GD955-7',
  'Caterpillar 120M',
  'Caterpillar 140M',
  'Caterpillar 140M3',
  'Caterpillar 160M',
  'Caterpillar 12M',
  'Caterpillar 14M',
  'Caterpillar 16M',
  'Caterpillar 24M',
  'Komatsu GD655-5',
  'Komatsu GD655-7',
  'Komatsu GD825',
  'Komatsu GD955-5',
  'John Deere 672GP',
  'John Deere 772GP',
  'John Deere 872GP',
  'Volvo G726',
  'Volvo G730',
  'Volvo G736',
  'Champion 730',
  'Champion 740',
];

const SPEC_SCHEMA = `{
  "noise_mfr_dba": "string | null",
  "blade_height_mm": "string | null",
  "blade_length_mm": "string | null",
  "blade_lift_mm": "string | null",
  "blade_thickness_mm": "string | null",
  "blade_tilt": "string | null — format 'X deg / Y deg'",
  "body_type": "string | null — 'Articulated' or 'Rigid'",
  "articulation_deg": "string | null",
  "fuel_capacity_l": "string | null",
  "hydraulic_oil_capacity_l": "string | null",
  "height_cab_mm": "string | null",
  "length_mm": "string | null",
  "operating_weight_kg": "string | null",
  "turn_circle_mm": "string | null",
  "width_no_blade_mm": "string | null",
  "drive": "string | null",
  "engine_make_model": "string | null",
  "engine_displacement": "string | null",
  "engine_cylinders": "string | null",
  "engine_power": "string | null",
  "engine_torque": "string | null",
  "hydraulic_flow": "string | null",
  "hydraulic_pressure": "string | null",
  "plant_class": "string | null — 'MOTOR GRADER'",
  "plant_year": "string | null",
  "rops_compliance": "string | null",
  "fops_compliance": "string | null",
  "max_speed": "string | null",
  "speeds_fr": "string | null",
  "transmission": "string | null",
  "tyre_size": "string | null"
}`;

async function main() {
  const firecrawlKey = process.env.FIRECRAWL_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (!firecrawlKey) {
    console.error('Missing FIRECRAWL_API_KEY in .env.local');
    process.exit(1);
  }
  if (!openaiKey) {
    console.error('Missing OPENAI_API_KEY in .env.local');
    process.exit(1);
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const fc = new FirecrawlApp({ apiKey: firecrawlKey });
  const openai = new OpenAI({ apiKey: openaiKey });

  let inserted = 0;

  for (const model of MODELS_TO_SEED) {
    let make, modelName;
    if (model.startsWith('John Deere ')) {
      make = 'John Deere';
      modelName = model.slice(11);
    } else {
      const parts = model.split(' ');
      make = parts[0];
      modelName = parts.slice(1).join(' ');
    }

    console.log(`\nFetching ${model}...`);

    let webContext = '';
    const sources = [];

    try {
      const searchQueries = [
        `"${model}" specifications technical data`,
        `"${model}" site:komatsu.com OR site:cat.com OR site:deere.com OR site:volvo.com specifications`,
      ];

      for (const q of searchQueries) {
        const result = await fc.search(q, {
          limit: 3,
          scrapeOptions: { formats: [{ type: 'markdown' }] },
        });
        // Firecrawl v2 returns { web: [...] }; v1/raw API may use { data: [...] } or { data: { web: [...] } }
        const rawData = result?.data;
        const items =
          Array.isArray(result?.web)
            ? result.web
            : Array.isArray(rawData)
              ? rawData
              : Array.isArray(rawData?.web)
                ? rawData.web
                : [];
        for (const item of items) {
          const url = item.url ?? '';
          const content =
            item.markdown ??
            item.description ??
            item.metadata?.description ??
            (typeof item.content === 'string' ? item.content : '') ??
            '';
          if (content && content.length > 300) {
            webContext += `\n--- Source: ${url} ---\n${content.slice(0, 5000)}`;
            sources.push(url);
          }
        }
      }

      if (!webContext) {
        console.log(`  No web content found for ${model}, skipping`);
        continue;
      }

      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
        temperature: 0,
        messages: [
          {
            role: 'system',
            content: `Extract technical specifications for the EXACT machine from the scraped web content. Only include values explicitly stated. Use null for missing fields. Return JSON matching: ${SPEC_SCHEMA}`,
          },
          {
            role: 'user',
            content: `Extract specs for: ${model}\n\nWeb content:\n${webContext}`,
          },
        ],
      });

      const raw = response.choices[0]?.message?.content;
      if (!raw) return;

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

      const makeShort = make.toLowerCase().startsWith('caterpillar') ? 'cat' : make.toLowerCase().startsWith('john') ? 'deere' : make.toLowerCase();
      const keys = [
        modelName.toLowerCase().replace(/\s+/g, ''),
        model.toLowerCase().replace(/\s+/g, ' '),
        `${make.toLowerCase()} ${modelName}`.replace(/\s+/g, ' ').trim(),
        `${makeShort} ${modelName}`.replace(/\s+/g, ' ').trim().toLowerCase(),
      ].filter(Boolean);

      const { error } = await supabase.from('grader_specs').upsert(
        {
          make,
          model: modelName,
          name: model,
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
        console.log(`  ✓ Extracted ${Object.keys(specs).length} specs → saved to grader_specs`);
      }
    } catch (err) {
      console.error(`  ✗ Error for ${model}:`, err.message);
    }

    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log(`\n✓ Saved ${inserted} records to grader_specs table. Auto-fill will use these — no scrape per lookup.`);
}

main().catch(console.error);
