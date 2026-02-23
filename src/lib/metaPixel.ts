const LEAD_FIRED_KEY = 'capability_lead_fired';

/**
 * Fire Meta Pixel Lead event. Fails silently if fbq not loaded.
 * Uses sessionStorage to prevent duplicate fires for the same submission.
 */
export function trackLead(submissionId?: string): void {
  if (typeof window === 'undefined') return;

  const guardKey = submissionId ? `${LEAD_FIRED_KEY}_${submissionId}` : LEAD_FIRED_KEY;
  try {
    if (sessionStorage.getItem(guardKey)) return;
    if (!window.fbq) return;
    window.fbq('track', 'Lead');
    if (guardKey !== LEAD_FIRED_KEY) {
      sessionStorage.setItem(guardKey, '1');
    }
  } catch {
    // Fail silently
  }
}
