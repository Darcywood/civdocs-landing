import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SIGNUP_ATTRIBUTION_COOKIE_NAME,
  attributionParamsPresent,
  mergeSearchParamsIntoAttributionRecord,
  parseAttributionCookie,
  stringifyAttributionForCookie,
} from "@/lib/marketingAttribution";

/**
 * Capture first-touch attribution into a first-party cookie so /api/start-trial
 * can classify the org even if localStorage is empty or the signup path never
 * ran the client capture script.
 *
 * Runs on every non-asset path. Two write conditions:
 *  - URL has ad/UTM params -> always merge them into cookie (preserve first-touch)
 *  - No cookie yet -> write a "first visit" record with landing path + referrer host
 */
export function middleware(request: NextRequest) {
  const { nextUrl, headers, cookies } = request;
  const sp = nextUrl.searchParams;
  const existingRaw = cookies.get(SIGNUP_ATTRIBUTION_COOKIE_NAME)?.value;
  const existing = parseAttributionCookie(existingRaw);
  const hasParams = attributionParamsPresent(sp);
  const isFirstVisit = !existingRaw || Object.keys(existing).length === 0;

  if (!hasParams && !isFirstVisit) {
    return NextResponse.next();
  }

  const landingPath = `${nextUrl.pathname}${nextUrl.search}`;
  const merged = mergeSearchParamsIntoAttributionRecord(
    existing,
    sp,
    landingPath,
    headers.get("referer")
  );

  const encoded = stringifyAttributionForCookie(merged);

  const res = NextResponse.next();
  res.cookies.set(SIGNUP_ATTRIBUTION_COOKIE_NAME, encoded, {
    path: "/",
    maxAge: 60 * 60 * 24 * 90,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets and images.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|gif|svg|webp|woff2?|ttf|txt|xml|webmanifest|pdf|mp4|webm)$).*)",
  ],
};
