/**
 * First-touch marketing attribution for trial signups (Meta, Google Ads, organic, other).
 * Captured on the marketing site and stored on `organizations` via /api/start-trial.
 *
 * Detection signals (best -> worst):
 *  1. URL click IDs: gclid/gbraid/wbraid (Google), fbclid (Meta), msclkid (Bing), ttclid (TikTok)
 *  2. Meta Pixel cookie `_fbc` (set by Pixel when it sees fbclid) and `_fbp`
 *  3. Google gtag cookie `_gcl_aw` (set when gtag sees gclid)
 *  4. UTM params (utm_source / utm_medium)
 *  5. HTTP referrer host (facebook.com, instagram.com, fb.com, etc.)
 */

export const SIGNUP_ATTRIBUTION_STORAGE_KEY = "civdocs_signup_attribution_v1";
export const SIGNUP_ATTRIBUTION_COOKIE_NAME = SIGNUP_ATTRIBUTION_STORAGE_KEY;

export const META_PIXEL_CLICK_COOKIE = "_fbc";
export const META_PIXEL_BROWSER_COOKIE = "_fbp";
export const GOOGLE_ADS_COOKIE = "_gcl_aw";

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
  "referrer_first_host",
  "_fbc",
  "_fbp",
  "_gcl_aw",
  "ts",
]);

export type SignupAcquisitionSource = "google_ads" | "meta_ads" | "organic" | "other";

function truncate(s: string, max: number): string {
  return s.length <= max ? s : s.slice(0, max);
}

export function extractHostFromUrl(url: string | null | undefined): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
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
  if (!next.referrer_first_host && referrer) {
    const host = extractHostFromUrl(referrer);
    if (host) next.referrer_first_host = truncate(host, 200);
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

function readCookieValueClient(name: string): string {
  if (typeof document === "undefined") return "";
  const prefix = `${name}=`;
  for (const part of document.cookie.split(";")) {
    const p = part.trim();
    if (p.startsWith(prefix)) {
      const raw = p.slice(prefix.length);
      try {
        return decodeURIComponent(raw);
      } catch {
        return raw;
      }
    }
  }
  return "";
}

/** Pull Meta Pixel + Google gtag tracking cookies into the attribution record (client only). */
export function mergePixelCookiesIntoRecord(rec: Record<string, string>): Record<string, string> {
  if (typeof document === "undefined") return rec;
  const next = { ...rec };
  const fbc = readCookieValueClient(META_PIXEL_CLICK_COOKIE);
  if (fbc && !next._fbc) next._fbc = truncate(fbc, 500);
  const fbp = readCookieValueClient(META_PIXEL_BROWSER_COOKIE);
  if (fbp && !next._fbp) next._fbp = truncate(fbp, 500);
  const gclAw = readCookieValueClient(GOOGLE_ADS_COOKIE);
  if (gclAw && !next._gcl_aw) next._gcl_aw = truncate(gclAw, 500);
  return next;
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
    let next = mergeSearchParamsIntoAttributionRecord(
      existing,
      u.searchParams,
      `${u.pathname}${u.search || ""}`,
      document.referrer || null
    );
    next = mergePixelCookiesIntoRecord(next);

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

/** Merge localStorage + first-party cookie + Pixel cookies for the trial POST body. */
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
  let merged = sanitizeAttributionBody({ ...fromCookie, ...fromLs });
  merged = mergePixelCookiesIntoRecord(merged);
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
      const limit = k === "landing_path_first" || k === "referrer_first" ? 1000 : 500;
      out[k] = truncate(v, limit);
    }
  }
  return out;
}

const META_HOST_PATTERNS = [
  "facebook.com",
  "facebook.net",
  "fb.com",
  "fb.me",
  "fbcdn.net",
  "instagram.com",
  "l.instagram.com",
  "messenger.com",
  "l.facebook.com",
  "lm.facebook.com",
  "m.facebook.com",
];

const GOOGLE_HOST_PATTERNS = [
  "google.com",
  "google.com.au",
  "googleadservices.com",
  "doubleclick.net",
  "googlesyndication.com",
];

function hostMatchesAny(host: string, patterns: string[]): boolean {
  if (!host) return false;
  for (const p of patterns) {
    if (host === p || host.endsWith(`.${p}`) || host.includes(p)) return true;
  }
  return false;
}

export function classifySignupAcquisitionSource(att: Record<string, string>): SignupAcquisitionSource {
  // 1. Explicit Google click ids
  const g = (att.gclid || "").trim();
  const gb = (att.gbraid || "").trim();
  const wb = (att.wbraid || "").trim();
  if (g || gb || wb) return "google_ads";

  // 2. Explicit Meta click id
  const fb = (att.fbclid || "").trim();
  if (fb) return "meta_ads";

  // 3. Pixel / gtag cookies (set by ad clicks earlier in this browser)
  if ((att._fbc || "").trim()) return "meta_ads";
  if ((att._gcl_aw || "").trim()) return "google_ads";

  // 4. UTM tagging
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

  // 5. Referrer host fallback (most users come without UTMs from Meta ads)
  const referrerHost = (att.referrer_first_host || extractHostFromUrl(att.referrer_first || "")).toLowerCase();
  if (referrerHost) {
    if (hostMatchesAny(referrerHost, META_HOST_PATTERNS)) return "meta_ads";
    if (hostMatchesAny(referrerHost, GOOGLE_HOST_PATTERNS)) {
      // Google referrer without gclid = organic Google search, not ads
      return "organic";
    }
  }

  // 6. Other paid networks
  if ((att.msclkid || "").trim() || (att.ttclid || "").trim()) {
    return "other";
  }

  return "organic";
}
