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
 * When a visitor hits any URL with ad/UTM query params, persist them in a first-party cookie
 * so /api/start-trial can classify the org even if localStorage is empty or the signup path
 * never ran the client capture script.
 */
export function middleware(request: NextRequest) {
  const { nextUrl, headers, cookies } = request;
  const sp = nextUrl.searchParams;

  if (!attributionParamsPresent(sp)) {
    return NextResponse.next();
  }

  const existing = parseAttributionCookie(cookies.get(SIGNUP_ATTRIBUTION_COOKIE_NAME)?.value);
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
