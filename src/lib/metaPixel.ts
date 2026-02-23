const LEAD_FIRED_KEY = 'capability_lead_fired';

function fireLead(): boolean {
  if (typeof window === 'undefined') return false;
  if (typeof window.fbq !== 'function') return false;
  try {
    window.fbq('track', 'Lead');
    if (process.env.NODE_ENV === 'development') {
      console.log('[Meta Pixel] Lead event fired');
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Fire Meta Pixel Lead event. Fails silently if fbq not loaded.
 * Uses sessionStorage to prevent duplicate fires for the same submission.
 * Retries once after 150ms if fbq isn't ready (handles script load race).
 */
export function trackLead(submissionId?: string): void {
  if (typeof window === 'undefined') return;

  const guardKey = submissionId ? `${LEAD_FIRED_KEY}_${submissionId}` : LEAD_FIRED_KEY;

  let shouldSkip = false;
  try {
    if (sessionStorage.getItem(guardKey)) shouldSkip = true;
  } catch {
    // sessionStorage can throw in private browsing
  }
  if (shouldSkip) return;

  if (fireLead()) {
    try {
      if (guardKey !== LEAD_FIRED_KEY) sessionStorage.setItem(guardKey, '1');
    } catch {
      // ignore
    }
    return;
  }

  // fbq may not be loaded yet; retry once after a short delay
  setTimeout(() => {
    try {
      if (sessionStorage.getItem(guardKey)) return;
      if (fireLead()) {
        if (guardKey !== LEAD_FIRED_KEY) sessionStorage.setItem(guardKey, '1');
      }
    } catch {
      // fail silently
    }
  }, 150);
}
