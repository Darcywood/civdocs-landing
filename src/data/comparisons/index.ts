// MAINTENANCE: Update this index when adding new comparison pages.
// Review all comparison data quarterly — competitor pricing, features, and CivDocs claims drift.
import type { ComparisonData } from './types';
import procore from './procore';
import simpro from './simpro';
import varicon from './varicon';
import assignar from './assignar';
import hammertech from './hammertech';
import recordTime from './record-time';

// CivDocs presented first in the hub; ordered by differentiation clarity / search volume
export const comparisons: ComparisonData[] = [
  procore,
  simpro,
  varicon,
  assignar,
  hammertech,
  recordTime,
];

export const comparisonsBySlug: Record<string, ComparisonData> = Object.fromEntries(
  comparisons.map((c) => [c.slug, c])
);

export { procore, simpro, varicon, assignar, hammertech, recordTime };
export type { ComparisonData };
