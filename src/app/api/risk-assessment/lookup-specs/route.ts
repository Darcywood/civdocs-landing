import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import FirecrawlApp from '@mendable/firecrawl-js';
import {
  lookupGraderSpecs,
  extractYearFromQuery,
  parseMakeModelFromQuery,
  saveGraderSpecs,
} from '@/lib/risk-assessment/grader-specs-store';
import {
  lookupExcavatorSpecs,
  saveExcavatorSpecs,
  parseMakeModelFromQuery as parseExcavatorMakeModel,
} from '@/lib/risk-assessment/excavator-specs-store';
import {
  lookupPosiTrackSpecs,
  savePosiTrackSpecs,
  parseMakeModelFromQuery as parsePosiTrackMakeModel,
} from '@/lib/risk-assessment/posi-track-specs-store';

export const runtime = 'nodejs';
export const maxDuration = 60;

const SPEC_FIELDS = `{
  "_source": "string | null — page titles or URLs used",
  "noise_mfr_dba": "string | null — manufacturer sound/noise level. Look for: 'sound level', 'noise level', 'dB(A)', 'LpA', 'LwA', operator sound pressure. Format: 'XX dB(A) Operator, XXX dB(A) Outside' or 'XX dB(A) at operator, XXX dB(A) at 15 m'",
  "blade_height_mm": "string | null — blade/moldboard height in mm. Look for: 'blade height', 'moldboard height', 'cutting edge height'. Include unit e.g. '610 mm'",
  "blade_length_mm": "string | null — blade/moldboard length in mm. Look for: 'blade length', 'moldboard length', 'cutting edge length'",
  "blade_lift_mm": "string | null — maximum blade lift above ground in mm. Look for: 'blade lift', 'moldboard lift', 'maximum lift'",
  "blade_thickness_mm": "string | null — blade/cutting edge thickness in mm",
  "blade_tilt": "string | null — blade tilt angles, format 'X deg / Y deg' forward/back ONLY e.g. '40 deg / 5 deg'",
  "body_type": "string | null — MUST be 'Articulated' or 'Rigid' ONLY. Motor graders are almost always Articulated unless explicitly stated otherwise.",
  "articulation_deg": "string | null — articulation angle each side in degrees",
  "fuel_capacity_l": "string | null — fuel tank capacity in litres. Look for: 'fuel tank', 'fuel capacity'",
  "hydraulic_oil_capacity_l": "string | null — hydraulic oil TANK capacity in litres. Look for: 'hydraulic tank', 'hydraulic oil capacity', 'hydraulic system capacity'. NOT the same as flow rate.",
  "front_axle_oscillation": "string | null — front axle total oscillation in degrees",
  "height_cab_mm": "string | null — overall height to top of cab in mm",
  "length_mm": "string | null — overall machine length in mm",
  "operating_weight_kg": "string | null — operating/service weight in kg",
  "shoulder_reach": "string | null — blade shoulder reach, left and right in mm",
  "turn_circle_mm": "string | null — turning circle diameter in mm",
  "width_no_blade_mm": "string | null — overall width without blade in mm",
  "drive": "string | null — drive configuration e.g. '6x4', '6x6', 'AWD', 'tandems'",
  "engine_make_model": "string | null — engine brand and model. For Komatsu machines use Komatsu SAA engine. For Cat machines use Cat engine. NEVER cross manufacturers.",
  "engine_displacement": "string | null — engine displacement e.g. '11.04 L'",
  "engine_cylinders": "string | null — number of cylinders",
  "engine_power": "string | null — net/gross power e.g. '194 kW @ 2200 rpm'",
  "engine_torque": "string | null — max torque e.g. '1100 Nm @ 1400 rpm'",
  "front_wheel_drive": "string | null — front wheel drive option if available",
  "hydraulic_flow": "string | null — hydraulic pump flow rate in L/min. Look for: 'pump flow', 'hydraulic flow', 'implement pump'",
  "hydraulic_pressure": "string | null — hydraulic system pressure in bar or MPa. Convert MPa to bar if needed (1 MPa = 10 bar)",
  "plant_class": "string | null — always 'MOTOR GRADER' for graders",
  "plant_year": "string | null — year of manufacture. ONLY set this if the year was included in the search query.",
  "rops_compliance": "string | null — ROPS standard e.g. 'ISO 3471:2008'",
  "fops_compliance": "string | null — FOPS standard e.g. 'ISO 3449:2005 Level II'",
  "max_speed": "string | null — maximum speed e.g. '42 km/h'",
  "speeds_fr": "string | null — number of forward/reverse speeds e.g. '8 forwards / 6 reverse'",
  "transmission": "string | null — transmission type e.g. 'Full Power Shift', 'Direct Drive'",
  "tyre_size": "string | null — tyre size e.g. '17.5R25'"
}`;

const EXCAVATOR_SPEC_FIELDS = `{
  "_source": "string | null — page titles or URLs used",
  "noise_mfr_dba": "string | null — operator/exterior sound level e.g. '73 dB(A) Operator, 101 dB(A) Outside'",
  "operating_weight_kg": "string | null — operating/service weight in kg",
  "bucket_capacity_m3": "string | null — standard bucket capacity in m³",
  "engine_make_model": "string | null — engine brand and model. MUST match machine manufacturer. NEVER cross manufacturers.",
  "engine_displacement": "string | null — engine displacement e.g. '4.4 L'",
  "engine_cylinders": "string | null — number of cylinders",
  "engine_power": "string | null — net power e.g. '93 kW @ 2200 rpm'",
  "engine_torque": "string | null — max torque e.g. '480 Nm @ 1400 rpm'",
  "max_dig_depth_mm": "string | null — maximum dig depth in mm",
  "max_reach_mm": "string | null — maximum reach at ground level in mm",
  "max_cutting_height_mm": "string | null — maximum cutting height in mm",
  "max_dump_height_mm": "string | null — maximum dump/loading height in mm",
  "swing_speed_rpm": "string | null — upper structure swing speed in rpm",
  "travel_speed_kmh": "string | null — travel speed (high/low) in km/h",
  "track_width_mm": "string | null — track shoe/pad width in mm",
  "undercarriage_length_mm": "string | null — undercarriage ground contact length in mm",
  "overall_length_mm": "string | null — overall transport length in mm",
  "overall_width_mm": "string | null — overall width in mm",
  "overall_height_mm": "string | null — overall height (cab top) in mm",
  "tail_swing_radius_mm": "string | null — counterweight/tail swing radius in mm. Note 'ZTS' if zero tail swing.",
  "fuel_capacity_l": "string | null — fuel tank capacity in litres",
  "hydraulic_flow_lpm": "string | null — main pump flow in L/min",
  "hydraulic_pressure_bar": "string | null — main relief pressure in bar. Convert MPa×10 = bar.",
  "rops_compliance": "string | null — ROPS standard e.g. 'ISO 12117-2'",
  "fops_compliance": "string | null — FOPS standard e.g. 'ISO 10262 Level I'",
  "plant_class": "string | null — always 'EXCAVATOR'",
  "plant_year": "string | null — ONLY set if year was in the search query.",
  "tyre_size": "string | null — for wheeled excavators only"
}`;

const POSI_TRACK_SPEC_FIELDS = `{
  "_source": "string | null — page titles or URLs used",
  "noise_mfr_dba": "string | null — operator/exterior sound level e.g. '75 dB(A) Operator'",
  "operating_weight_kg": "string | null — operating/service weight in kg",
  "rated_operating_capacity_kg": "string | null — rated operating capacity ROC in kg",
  "breakout_force_kn": "string | null — breakout force in kN",
  "lift_height_mm": "string | null — lift height to hinge pin in mm",
  "dump_height_mm": "string | null — dump/clearance height in mm",
  "dump_reach_mm": "string | null — dump reach at full height in mm",
  "bucket_capacity_m3": "string | null — bucket capacity in m³",
  "engine_make_model": "string | null — engine brand and model. MUST match machine manufacturer.",
  "engine_displacement": "string | null — engine displacement e.g. '2.4 L'",
  "engine_cylinders": "string | null — number of cylinders",
  "engine_power": "string | null — net power e.g. '55 kW @ 2700 rpm'",
  "engine_torque": "string | null — max torque e.g. '220 Nm @ 1600 rpm'",
  "travel_speed_kmh": "string | null — travel speed in km/h",
  "track_width_mm": "string | null — track pad width in mm",
  "overall_length_mm": "string | null — overall length in mm",
  "overall_width_mm": "string | null — overall width in mm",
  "overall_height_mm": "string | null — overall height to cab in mm",
  "fuel_capacity_l": "string | null — fuel tank capacity in litres",
  "hydraulic_flow_lpm": "string | null — hydraulic pump flow in L/min",
  "hydraulic_pressure_bar": "string | null — main relief pressure in bar. Convert MPa×10 = bar.",
  "rops_compliance": "string | null — ROPS standard e.g. 'ISO 12117-2'",
  "fops_compliance": "string | null — FOPS standard e.g. 'ISO 3449'",
  "plant_class": "string | null — always 'COMPACT TRACK LOADER' or 'POSI TRACK'",
  "plant_year": "string | null — ONLY set if year was in the search query."
}`;

export async function POST(req: Request) {
  try {
    const { machineDescription, machineType } = await req.json();
    if (!machineDescription?.trim()) {
      return NextResponse.json({ error: 'machineDescription is required' }, { status: 400 });
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    const firecrawlKey = process.env.FIRECRAWL_API_KEY;

    const query = machineDescription.trim();
    const isExcavator = machineType === 'Excavator';
    const isPosiTrack = machineType === 'Posi Track';

    // Extract year from query if present (e.g. "cat 320 2022" → "2022")
    const yearInQuery = extractYearFromQuery(query);

    // ── Step 0: Check Supabase table (Firecrawl-scraped, no cost per lookup) ──
    if (isExcavator) {
      const dbMatch = await lookupExcavatorSpecs(query);
      if (dbMatch && Object.keys(dbMatch.specs).length > 0) {
        const specs = { ...dbMatch.specs };
        if (yearInQuery) specs.plant_year = yearInQuery;
        return NextResponse.json({
          ok: true,
          specs,
          filledCount: Object.keys(specs).length,
          source: dbMatch.source ?? 'CivDocs excavator database (Firecrawl-scraped)',
          webSearchUsed: false,
        });
      }
    } else if (isPosiTrack) {
      const dbMatch = await lookupPosiTrackSpecs(query);
      if (dbMatch && Object.keys(dbMatch.specs).length > 0) {
        const specs = { ...dbMatch.specs };
        if (yearInQuery) specs.plant_year = yearInQuery;
        return NextResponse.json({
          ok: true,
          specs,
          filledCount: Object.keys(specs).length,
          source: dbMatch.source ?? 'CivDocs posi track database (Firecrawl-scraped)',
          webSearchUsed: false,
        });
      }
    } else {
      const dbMatch = await lookupGraderSpecs(query);
      if (dbMatch && Object.keys(dbMatch.specs).length > 0) {
        const specs = { ...dbMatch.specs };
        if (yearInQuery) specs.plant_year = yearInQuery;
        return NextResponse.json({
          ok: true,
          specs,
          filledCount: Object.keys(specs).length,
          source: dbMatch.source ?? 'CivDocs grader database (Firecrawl-scraped)',
          webSearchUsed: false,
        });
      }
    }

    // ── Step 1: Fallback — Web search using Firecrawl ─────────────────────
    let webContext = '';
    const sources: string[] = [];

    if (firecrawlKey) {
      try {
        const fc = new FirecrawlApp({ apiKey: firecrawlKey });

        const searchQueries = isExcavator
          ? [
              `"${query}" excavator specifications weight dig depth reach`,
              `"${query}" excavator engine hydraulic specifications`,
              `"${query}" excavator sound noise level dB specifications`,
              `"${query}" excavator spec sheet data sheet`,
            ]
          : isPosiTrack
            ? [
                `"${query}" compact track loader specifications ROC breakout force`,
                `"${query}" posi track loader specifications lift height dump reach`,
                `"${query}" compact track loader engine hydraulic specifications`,
                `"${query}" compact track loader spec sheet data sheet`,
              ]
            : [
                `"${query}" specifications weight dimensions fuel capacity`,
                `"${query}" blade moldboard hydraulic specifications`,
                `"${query}" engine sound noise level dB specifications`,
                `"${query}" spec sheet data sheet filetype:pdf`,
              ];

        const searches = await Promise.allSettled(
          searchQueries.map((q) =>
            fc.search(q, {
              limit: 4,
              scrapeOptions: { formats: [{ type: 'markdown' }] },
            })
          )
        );

        const seen = new Set<string>();
        const snippets: string[] = [];

        for (const result of searches) {
          if (result.status !== 'fulfilled') continue;
          const res = result.value as { web?: unknown[]; data?: unknown[] | { web?: unknown[] } };
          const items =
            Array.isArray(res?.web)
              ? res.web
              : Array.isArray(res?.data)
                ? res.data
                : Array.isArray((res?.data as { web?: unknown[] })?.web)
                  ? (res.data as { web: unknown[] }).web
                  : [];
          for (const item of items as Array<{ url?: string; title?: string; markdown?: string; description?: string }>) {
            const url = item.url ?? '';
            if (seen.has(url)) continue;
            seen.add(url);
            const content = item.markdown ?? item.description ?? '';
            if (content.length > 200) {
              // 6000 chars per source to capture full spec tables
              snippets.push(`--- Source: ${url} ---\n${content.slice(0, 6000)}`);
              sources.push(url);
            }
          }
        }

        if (snippets.length > 0) {
          webContext = snippets.join('\n\n');
        }
      } catch (fcErr) {
        console.warn('[lookup-specs] Firecrawl search failed, falling back to GPT knowledge:', fcErr);
      }
    }

    // ── Step 2: GPT-4o extracts spec fields ──────────────────────────────
    if (!openaiKey) {
      return NextResponse.json({
        ok: true,
        specs: {},
        filledCount: 0,
        source: '',
        webSearchUsed: false,
        message: 'Auto-fill from web is not available. Please enter specs manually.',
      });
    }

    const openai = new OpenAI({ apiKey: openaiKey });

    const yearNote = yearInQuery
      ? `The user specified the year ${yearInQuery} — set plant_year to "${yearInQuery}".`
      : `plant_year should be null unless the year is explicitly mentioned in the query.`;

    const activeSpecFields = isExcavator
      ? EXCAVATOR_SPEC_FIELDS
      : isPosiTrack
        ? POSI_TRACK_SPEC_FIELDS
        : SPEC_FIELDS;

    const machineLabel = isExcavator ? 'excavator' : isPosiTrack ? 'compact track loader / posi track' : 'motor grader';

    const systemPrompt = webContext
      ? `You are a technical specifications expert for heavy earthmoving equipment. Extract ALL available specifications for the described ${machineLabel} from the web content below.

EXTRACTION RULES:
1. Scan every table, list, and paragraph in the web content for specification data.
2. For each field, look for ALTERNATIVE NAMES — spec sheets use varying terminology.
3. Units: convert if needed — mm, L, kW, Nm, km/h, bar. 1 MPa = 10 bar.
4. ${yearNote}
5. engine_make_model MUST match the machine's manufacturer — never cross manufacturers.
6. Return null only if genuinely not found — do not guess values not in the content.
${isExcavator ? '7. For hydraulic_pressure_bar: convert MPa to bar (×10). e.g. 35 MPa = 350 bar.' : isPosiTrack ? '7. For hydraulic_pressure_bar: convert MPa to bar (×10).' : '7. blade_tilt format MUST be "X deg / Y deg" only.\n8. For body_type: if the machine is a motor grader and no explicit mention of rigid, return "Articulated".'}

Return JSON matching exactly:
${activeSpecFields}`
      : `You are a heavy equipment specifications expert. Return specifications for this exact machine using your knowledge.

RULES:
- MANUFACTURER FIDELITY: Komatsu machines use Komatsu engines, Cat machines use Cat engines, Bobcat use Kubota/Doosan engines. NEVER mix manufacturers.
${isExcavator ? '- hydraulic_pressure_bar: convert MPa to bar (×10).' : isPosiTrack ? '- hydraulic_pressure_bar: convert MPa to bar (×10).' : '- body_type for motor graders is almost always "Articulated".\n- blade_tilt MUST be "X deg / Y deg" format.'}
- ${yearNote}
- Return actual JSON null for uncertain fields.

Return JSON:
${activeSpecFields}`;

    const userPrompt = webContext
      ? `Extract ALL specifications for: ${query}

${yearInQuery ? `Note: Year ${yearInQuery} was specified by the user.` : ''}

Web content (search across ALL of it for the spec fields):
${webContext}

Be thorough — check every table and list. Return JSON.`
      : `Return technical specifications for: ${query}
${yearInQuery ? `Year: ${yearInQuery}` : ''}

Return JSON.`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      response_format: { type: 'json_object' },
      temperature: 0.0,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    });

    const raw = response.choices[0]?.message?.content;
    if (!raw) throw new Error('Empty AI response');

    const parsed = JSON.parse(raw);

    // Extract source
    const sourceText =
      sources.length > 0
        ? sources.slice(0, 3).join(', ')
        : typeof parsed._source === 'string' && parsed._source.trim()
          ? parsed._source.trim()
          : '';

    // Strip nulls, meta fields, and null-equivalent strings
    const NULL_STRINGS = new Set(['null', 'n/a', 'na', 'n.a.', 'unknown', 'none', 'not available', '-', '—', '']);
    const filled: Record<string, string> = {};
    for (const [k, v] of Object.entries(parsed)) {
      if (k.startsWith('_')) continue;
      if (v === null || v === undefined) continue;
      if (typeof v !== 'string') continue;
      const trimmed = v.trim();
      if (!trimmed || NULL_STRINGS.has(trimmed.toLowerCase())) continue;
      filled[k] = trimmed;
    }

    // Cache to the appropriate table so next lookup skips Firecrawl/GPT
    if (isExcavator) {
      const parsedMakeModel = parseExcavatorMakeModel(query);
      if (parsedMakeModel && Object.keys(filled).length > 0) {
        const q = query.replace(/\b(19|20)\d{2}\b/g, '').trim().toLowerCase();
        const keys = [
          parsedMakeModel.model.toLowerCase().replace(/\s+/g, ''),
          q.replace(/\s+/g, ' '),
          `${parsedMakeModel.make} ${parsedMakeModel.model}`.toLowerCase().replace(/\s+/g, ' '),
        ].filter(Boolean);
        saveExcavatorSpecs({
          make: parsedMakeModel.make,
          model: parsedMakeModel.model,
          name: query.trim(),
          search_keys: [...new Set(keys)],
          specs: filled,
          source: sourceText || undefined,
        }).catch(() => {});
      }
    } else if (isPosiTrack) {
      const parsedMakeModel = parsePosiTrackMakeModel(query);
      if (parsedMakeModel && Object.keys(filled).length > 0) {
        const q = query.replace(/\b(19|20)\d{2}\b/g, '').trim().toLowerCase();
        const keys = [
          parsedMakeModel.model.toLowerCase().replace(/\s+/g, ''),
          q.replace(/\s+/g, ' '),
          `${parsedMakeModel.make} ${parsedMakeModel.model}`.toLowerCase().replace(/\s+/g, ' '),
        ].filter(Boolean);
        savePosiTrackSpecs({
          make: parsedMakeModel.make,
          model: parsedMakeModel.model,
          name: query.trim(),
          search_keys: [...new Set(keys)],
          specs: filled,
          source: sourceText || undefined,
        }).catch(() => {});
      }
    } else {
      const parsedMakeModel = parseMakeModelFromQuery(query);
      if (parsedMakeModel && Object.keys(filled).length > 0) {
        const q = query.replace(/\b(19|20)\d{2}\b/g, '').trim().toLowerCase();
        const keys = [
          parsedMakeModel.model.toLowerCase().replace(/\s+/g, ''),
          q.replace(/\s+/g, ' '),
          `${parsedMakeModel.make} ${parsedMakeModel.model}`.toLowerCase().replace(/\s+/g, ' '),
        ].filter(Boolean);
        saveGraderSpecs({
          make: parsedMakeModel.make,
          model: parsedMakeModel.model,
          name: query.trim(),
          search_keys: [...new Set(keys)],
          specs: filled,
          source: sourceText || undefined,
        }).catch(() => {});
      }
    }

    return NextResponse.json({
      ok: true,
      specs: filled,
      filledCount: Object.keys(filled).length,
      source: sourceText,
      webSearchUsed: webContext.length > 0,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[lookup-specs] Error:', message);
    return NextResponse.json({ error: 'Lookup failed', details: message }, { status: 500 });
  }
}
