// Comparison page data types
// MAINTENANCE: Review and update all comparison pages quarterly — competitor pricing,
// features, and CivDocs claims drift. Update dateModified when refreshed.

export type CellValue = '✓' | '✗' | 'Limited' | 'Add-on' | string;

export interface ComparisonCell {
  value: CellValue;
  note?: string;
}

export interface ComparisonRow {
  dimension: string;
  civdocs: ComparisonCell;
  competitor: ComparisonCell;
}

export interface DiffSection {
  h3: string;
  body: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ComparisonData {
  slug: string;
  competitor: string;
  /** Short competitor name used in prose (may differ from full product name) */
  competitorShort: string;
  titleTag: string;
  metaDescription: string;
  /** Exact H1, must include exact target query */
  h1: string;
  /** 2–4 sentence standalone capsule — factual, no fluff, AI-liftable */
  summary: string;
  tableRows: ComparisonRow[];
  differentiationThesis: {
    heading: string;
    intro: string;
    sections: DiffSection[];
  };
  featureDeepDive: {
    heading: string;
    sections: DiffSection[];
  };
  pricing: {
    heading: string;
    body: string;
  };
  whenCompetitorWins: {
    heading: string;
    bullets: string[];
  };
  whyCivdocsWins: {
    heading: string;
    body: string;
    bullets: string[];
  };
  faq: FaqItem[];
  /** ISO date strings for schema */
  datePublished: string;
  dateModified: string;
}
