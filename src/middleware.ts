import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SIGNUP_ATTRIBUTION_COOKIE_NAME,
  attributionParamsPresent,
  mergeSearchParamsIntoAttributionRecord,
  parseAttributionCookie,
  stringifyAttributionForCookie,
} from "@/lib/marketingAttribution";
import {
  TRIAL_PREVIEW_COOKIE,
  TRIAL_SESSION_COOKIE,
  TRIAL_VARIANT_COOKIE,
  TRIAL_VARIANT_HEADER,
  TRIAL_VISITOR_COOKIE,
  WEBSITE_SIGNUP_SESSION_COOKIE,
  WEBSITE_SIGNUP_VISITOR_COOKIE,
  isTrialExperimentBot,
  isTrialVariant,
  trialExperimentCookieMaxAge,
  type TrialVariant,
} from "@/lib/trialExperiment";

/**
 * Capture first-touch attribution into a first-party cookie so /api/start-trial
 * can classify the org even if localStorage is empty or the signup path never
 * ran the client capture script.
 *
 * On /start-trial, also lock the visitor to page A or B for 90 days.
 * The chosen page is passed on this request via a header, because the cookie
 * is not visible until the next request.
 */

function cookieFlags() {
  return {
    path: "/",
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}

function resolveVariant(request: NextRequest): TrialVariant | null {
  if (request.nextUrl.pathname !== "/start-trial") return null;
  const userAgent = request.headers.get("user-agent") || "";
  if (isTrialExperimentBot(userAgent)) return null;

  const forced = request.nextUrl.searchParams.get("variant");
  if (forced === "a" || forced === "b") return forced;

  const existing = request.cookies.get(TRIAL_VARIANT_COOKIE)?.value;
  if (isTrialVariant(existing)) return existing;

  return Math.random() < 0.5 ? "a" : "b";
}

export function middleware(request: NextRequest) {
  const variant = resolveVariant(request);
  const requestHeaders = new Headers(request.headers);
  if (variant) requestHeaders.set(TRIAL_VARIANT_HEADER, variant);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  const { nextUrl, headers, cookies } = request;
  const existingRaw = cookies.get(SIGNUP_ATTRIBUTION_COOKIE_NAME)?.value;
  const existing = parseAttributionCookie(existingRaw);
  const hasParams = attributionParamsPresent(nextUrl.searchParams);
  const isFirstVisit = !existingRaw || Object.keys(existing).length === 0;

  if (hasParams || isFirstVisit) {
    const merged = mergeSearchParamsIntoAttributionRecord(
      existing,
      nextUrl.searchParams,
      `${nextUrl.pathname}${nextUrl.search}`,
      headers.get("referer")
    );
    response.cookies.set(SIGNUP_ATTRIBUTION_COOKIE_NAME, stringifyAttributionForCookie(merged), {
      path: "/",
      maxAge: trialExperimentCookieMaxAge(),
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  if (nextUrl.pathname === "/signup" && !isTrialExperimentBot(headers.get("user-agent") || "")) {
    const flags = cookieFlags();
    if (!cookies.get(WEBSITE_SIGNUP_VISITOR_COOKIE)?.value) {
      response.cookies.set(WEBSITE_SIGNUP_VISITOR_COOKIE, crypto.randomUUID(), {
        ...flags,
        maxAge: trialExperimentCookieMaxAge(),
      });
    }
    if (!cookies.get(WEBSITE_SIGNUP_SESSION_COOKIE)?.value) {
      response.cookies.set(WEBSITE_SIGNUP_SESSION_COOKIE, crypto.randomUUID(), flags);
    }
  }

  if (!variant) return response;

  const flags = cookieFlags();
  const preview = nextUrl.searchParams.get("preview");
  if (preview === "0") {
    response.cookies.set(TRIAL_PREVIEW_COOKIE, "", { ...flags, maxAge: 0 });
  } else if (preview === "1") {
    response.cookies.set(TRIAL_PREVIEW_COOKIE, "1", { ...flags, maxAge: 60 * 60 * 12 });
  }

  response.cookies.set(TRIAL_VARIANT_COOKIE, variant, {
    ...flags,
    maxAge: trialExperimentCookieMaxAge(),
  });

  if (!cookies.get(TRIAL_VISITOR_COOKIE)?.value) {
    response.cookies.set(TRIAL_VISITOR_COOKIE, crypto.randomUUID(), {
      ...flags,
      maxAge: trialExperimentCookieMaxAge(),
    });
  }
  if (!cookies.get(TRIAL_SESSION_COOKIE)?.value) {
    response.cookies.set(TRIAL_SESSION_COOKIE, crypto.randomUUID(), flags);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets and images.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|woff2?|ttf|txt|xml|webmanifest|pdf|mp4|webm)$).*)",
  ],
};
