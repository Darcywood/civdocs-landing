/**
 * First-touch marketing attribution for trial signups (Meta, Google Ads, organic, other).
 * Captured on the marketing site and stored on `organizations` via /api/start-trial.
 */

export const SIGNUP_ATTRIBUTION_STORAGE_KEY = "civdocs_signup_attribution_v1";

/** Same value as localStorage key; used for first-party cookie (middleware + API). */
export const SIGNUP_ATTRIBUTION_COOKIE_NAME = SIGNUP_ATTRIBUTION_STORAGE_KEY;

export const ATTRIBUTION_SEARCH_PARAM_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
  "ttclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const BODY_ALLOWED_KEYS = new Set<string>([
  ...ATTRIBUTION_SEARCH_PARAM_KEYS,
  "landing_path_first",
  "referrer_first",
  "ts",
]);

export type SignupAcquisitionSource = "google_ads" | "meta_ads" | "organic" | "other";

function truncate(s: string, max: number): string {
  return s.length <= max ? s : s.slice(0, max);
}

/** True if the request URL carries any attribution query we care about. */
export function attributionParamsPresent(searchParams: URLSearchParams): boolean {
  for (const k of ATTRIBUTION_SEARCH_PARAM_KEYS) {
    if (searchParams.get(k)) return true;
  }
  return false;
}

/** Merge URL search params + first path/referrer into an attribution record (Edge + browser safe). */
export function mergeSearchParamsIntoAttributionRecord(
  existing: Record<string, string>,
  searchParams: URLSearchParams,
  landingPath: string,
  referrer: string | null
): Record<string, string> {
  const next: Record<string, string> = { ...existing };
  for (const k of ATTRIBUTION_SEARCH_PARAM_KEYS) {
    const v = searchParams.get(k);
    if (v) next[k] = truncate(v.trim(), 500);
  }
  next.ts = new Date().toISOString();
  if (!next.landing_path_first) {
    next.landing_path_first = truncate(landingPath, 1000);
  }
  if (!next.referrer_first && referrer) {
    next.referrer_first = truncate(referrer, 1000);
  }
  return next;
}

export function parseAttributionCookie(raw: string | undefined): Record<string, string> {
  if (!raw) return {};
  try {
    let s = raw;
    try {
      s = decodeURIComponent(raw);
    } catch {
      /* already decoded */
    }
    const parsed = JSON.parse(s) as unknown;
    return sanitizeAttributionBody(parsed);
  } catch {
    return {};
  }
}

export function stringifyAttributionForCookie(data: Record<string, string>): string {
  return encodeURIComponent(JSON.stringify(data));
}

function writeAttributionCookieClient(data: Record<string, string>): void {
  if (typeof document === "undefined") return;
  const secure =
    typeof location !== "undefined" && location.protocol === "https:" ? ";Secure" : "";
  const maxAge = 60 * 60 * 24 * 90;
  document.cookie = `${SIGNUP_ATTRIBUTION_COOKIE_NAME}=${stringifyAttributionForCookie(data)};path=/;max-age=${maxAge};SameSite=Lax${secure}`;
}

/** Merge current URL + first landing path/referrer into localStorage (client only). */
export function mergeAttributionFromCurrentUrl(): void {
  if (typeof window === "undefined") return;
  try {
    let existing: Record<string, string> = {};
    const raw = localStorage.getItem(SIGNUP_ATTRIBUTION_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        existing = sanitizeAttributionBody(parsed);
      }
    }

    const u = new URL(window.location.href);
    const next = mergeSearchParamsIntoAttributionRecord(
      existing,
      u.searchParams,
      `${u.pathname}${u.search || ""}`,
      document.referrer || null
    );

    localStorage.setItem(SIGNUP_ATTRIBUTION_STORAGE_KEY, JSON.stringify(next));
    writeAttributionCookieClient(next);
  } catch {
    /* ignore */
  }
}

function readAttributionCookieFromDocument(): Record<string, string> {
  if (typeof document === "undefined") return {};
  const prefix = `${SIGNUP_ATTRIBUTION_COOKIE_NAME}=`;
  for (const part of document.cookie.split(";")) {
    const p = part.trim();
    if (p.startsWith(prefix)) {
      return parseAttributionCookie(p.slice(prefix.length));
    }
  }
  return {};
}

/** Merge localStorage + first-party cookie for the trial POST body. */
export function getStoredAttributionForSignup(): Record<string, string> | null {
  if (typeof window === "undefined") return null;
  let fromLs: Record<string, string> = {};
  try {
    const raw = localStorage.getItem(SIGNUP_ATTRIBUTION_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        fromLs = sanitizeAttributionBody(parsed);
      }
    }
  } catch {
    /* ignore */
  }
  const fromCookie = readAttributionCookieFromDocument();
  const merged = sanitizeAttributionBody({ ...fromCookie, ...fromLs });
  if (Object.keys(merged).length === 0) return null;
  return merged;
}

/** Strip unknown keys and lengths (API / server). */
export function sanitizeAttributionBody(input: unknown): Record<string, string> {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(input as Record<string, unknown>)) {
    if (!BODY_ALLOWED_KEYS.has(k)) continue;
    if (typeof v === "string") {
      out[k] = truncate(v, k === "landing_path_first" || k === "referrer_first" ? 1000 : 500);
    }
  }
  return out;
}

export function classifySignupAcquisitionSource(att: Record<string, string>): SignupAcquisitionSource {
  const g = (att.gclid || "").trim();
  const gb = (att.gbraid || "").trim();
  const wb = (att.wbraid || "").trim();
  if (g || gb || wb) return "google_ads";

  const fb = (att.fbclid || "").trim();
  if (fb) return "meta_ads";

  const utmSource = (att.utm_source || "").toLowerCase();
  const utmMedium = (att.utm_medium || "").toLowerCase();

  const metaSource =
    utmSource.includes("facebook") ||
    utmSource === "fb" ||
    utmSource === "meta" ||
    utmSource.includes("instagram") ||
    utmSource === "ig";
  if (metaSource) return "meta_ads";

  const googleSource =
    utmSource.includes("google") || utmSource.includes("adwords") || utmSource === "dv360";
  if (googleSource && (utmMedium.includes("cpc") || utmMedium.includes("ppc") || utmMedium.includes("paid"))) {
    return "google_ads";
  }

  if (utmMedium.includes("cpc") || utmMedium === "ppc" || utmMedium.includes("paid")) {
    return "other";
  }

  if ((att.msclkid || "").trim() || (att.ttclid || "").trim()) {
    return "other";
  }

  return "organic";
}
