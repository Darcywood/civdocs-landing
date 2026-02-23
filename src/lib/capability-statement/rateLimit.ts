/**
 * IP-based rate limit for capability statement generator.
 * 3 requests per hour per IP to protect OpenAI costs from bots.
 */

import type { SupabaseClient } from '@supabase/supabase-js';

const LIMIT_PER_HOUR = 10;

function getHourBucket(): string {
  const now = new Date();
  return now.toISOString().slice(0, 13); // "2025-02-24T14"
}

export function getClientIp(req: Request): string | null {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() ?? null;
  }
  return req.headers.get('x-real-ip') ?? null;
}

/**
 * Check and increment rate limit. Returns true if request is allowed, false if over limit.
 * Calls Postgres function for atomic increment.
 */
export async function checkAndIncrementRateLimit(
  supabase: SupabaseClient,
  ip: string
): Promise<{ allowed: boolean }> {
  const hourBucket = getHourBucket();

  const { data, error } = await supabase.rpc('check_and_increment_capability_rate_limit', {
    p_ip: ip,
    p_hour_bucket: hourBucket,
    p_limit: LIMIT_PER_HOUR,
  });

  if (error) {
    console.error('[rateLimit] RPC error:', error);
    // Fail open: allow request if DB error (don't block real users)
    return { allowed: true };
  }

  const count = typeof data === 'number' ? data : 0;
  return { allowed: count <= LIMIT_PER_HOUR };
}
