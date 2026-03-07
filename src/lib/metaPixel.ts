const LEAD_FIRED_KEY = 'capability_lead_fired';
const RISK_ASSESSMENT_FIRED_KEY = 'risk_assessment_generated_fired';

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

/**
 * Fire a custom Meta Pixel event when a risk assessment is successfully generated.
 * Uses sessionStorage keyed on reportNumber to prevent duplicate fires.
 */
export function trackRiskAssessmentGenerated(params: {
  reportNumber: string;
  machineType?: string;
}): void {
  if (typeof window === 'undefined') return;

  const guardKey = `${RISK_ASSESSMENT_FIRED_KEY}_${params.reportNumber}`;

  try {
    if (sessionStorage.getItem(guardKey)) return;
  } catch {
    // ignore
  }

  const fire = (): boolean => {
    if (typeof window.fbq !== 'function') return false;
    try {
      window.fbq('trackCustom', 'RiskAssessmentGenerated', {
        report_number: params.reportNumber,
        machine_type: params.machineType ?? 'unknown',
      });
      if (process.env.NODE_ENV === 'development') {
        console.log('[Meta Pixel] RiskAssessmentGenerated event fired', params);
      }
      return true;
    } catch {
      return false;
    }
  };

  if (fire()) {
    try { sessionStorage.setItem(guardKey, '1'); } catch { /* ignore */ }
    return;
  }

  setTimeout(() => {
    try {
      if (sessionStorage.getItem(guardKey)) return;
      if (fire()) sessionStorage.setItem(guardKey, '1');
    } catch {
      // fail silently
    }
  }, 150);
}
