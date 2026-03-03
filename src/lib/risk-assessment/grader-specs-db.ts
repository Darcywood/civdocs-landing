/**
 * Grader specifications database.
 * Populated by running: npm run seed:grader-specs
 * Uses Firecrawl to scrape manufacturer sites for 100% accurate data.
 */

import dbData from './grader-specs-db.json';

export interface GraderSpecsRecord {
  /** Search keys: model identifiers that match this record (e.g. "120m", "cat 120m", "caterpillar 120m") */
  keys: string[];
  /** Display name for the model */
  name: string;
  /** Manufacturer */
  make: string;
  /** Source URL(s) the data was scraped from */
  source?: string;
  specs: Record<string, string>;
}

/** Database of grader specs — populated by seed script using Firecrawl */
export const GRADER_SPECS_DB: GraderSpecsRecord[] = dbData as GraderSpecsRecord[];

/**
 * Normalize a query for matching: lowercase, remove extra spaces, strip year
 */
function normalizeQuery(q: string): string {
  return q
    .toLowerCase()
    .replace(/\b(19|20)\d{2}\b/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract year from query if present (e.g. "cat 120m 2025" → "2025")
 */
export function extractYearFromQuery(query: string): string | null {
  const m = query.match(/\b(19|20)\d{2}\b/);
  return m ? m[0] : null;
}

/**
 * Find a matching grader in the database by query string.
 * Returns the specs record or null if no match.
 */
export function lookupGraderSpecs(query: string): GraderSpecsRecord | null {
  const normalized = normalizeQuery(query);
  if (!normalized) return null;

  const best = GRADER_SPECS_DB.find((record) => {
    return record.keys.some((key) => {
      const nk = normalizeQuery(key);
      return normalized.includes(nk) || nk.includes(normalized);
    });
  });

  return best ?? null;
}
