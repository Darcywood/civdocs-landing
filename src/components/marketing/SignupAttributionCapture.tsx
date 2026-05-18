"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { mergeAttributionFromCurrentUrl } from "@/lib/marketingAttribution";

/**
 * Persists first-touch / campaign params from the URL into localStorage so /api/start-trial can store them on the organisation row.
 */
export default function SignupAttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    mergeAttributionFromCurrentUrl();
  }, [pathname]);

  return null;
}
