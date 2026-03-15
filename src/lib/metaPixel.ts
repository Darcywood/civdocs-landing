const LEAD_FIRED_KEY = 'capability_lead_fired';
const RISK_ASSESSMENT_FIRED_KEY = 'risk_assessment_generated_fired';
const CAPABILITY_LEAD_KEY = 'capability_lead_fired';
const CAPABILITY_COMPLETE_REG_KEY = 'capability_complete_registration_fired';

type MetaStandardEvent =
  | 'Lead'
  | 'CompleteRegistration'
  | 'ViewContent'
  | 'AddToCart'
  | 'Purchase'
  | string;

function fireMetaEvent(
  eventName: MetaStandardEvent,
  params?: Record<string, unknown>
): boolean {
  if (typeof window === 'undefined') return false;
  if (typeof window.fbq !== 'function') return false;
  try {
    if (params && Object.keys(params).length > 0) {
      window.fbq('track', eventName, params);
    } else {
      window.fbq('track', eventName);
    }
    if (process.env.NODE_ENV === 'development') {
      console.log('[Meta Pixel]', eventName, params ?? '');
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Fire a Meta Pixel standard event with optional params and deduplication.
 * Retries once after 150ms if fbq isn't ready.
 */
export function trackMetaEvent(
  eventName: MetaStandardEvent,
  params?: Record<string, unknown>,
  dedupeKey?: string
): void {
  if (typeof window === 'undefined') return;

  const guardKey = dedupeKey;
  if (guardKey) {
    try {
      if (sessionStorage.getItem(guardKey)) return;
    } catch {
      /* sessionStorage can throw in private browsing */
    }
  }

  const fire = (): boolean => fireMetaEvent(eventName, params);

  if (fire()) {
    try {
      if (guardKey) sessionStorage.setItem(guardKey, '1');
    } catch {
      /* ignore */
    }
    return;
  }

  setTimeout(() => {
    try {
      if (guardKey && sessionStorage.getItem(guardKey)) return;
      if (fire()) {
        if (guardKey) sessionStorage.setItem(guardKey, '1');
      }
    } catch {
      /* fail silently */
    }
  }, 150);
}

/**
 * Fire Meta Pixel Lead event. Fails silently if fbq not loaded.
 * Uses sessionStorage to prevent duplicate fires for the same submission.
 */
export function trackLead(submissionId?: string): void {
  const guardKey = submissionId ? `${LEAD_FIRED_KEY}_${submissionId}` : LEAD_FIRED_KEY;
  trackMetaEvent('Lead', undefined, guardKey);
}

const CAPABILITY_PARAMS = { content_name: 'Capability Statement Generated' } as const;

/**
 * Fire Lead + CompleteRegistration for capability statement success.
 * Each event has its own dedupe key so both fire once per submission.
 */
export function trackCapabilityStatementGenerated(submissionId?: string): void {
  if (typeof window === 'undefined') return;

  const base = submissionId ?? 'anon';
  const leadKey = `${CAPABILITY_LEAD_KEY}_${base}`;
  const regKey = `${CAPABILITY_COMPLETE_REG_KEY}_${base}`;

  // Fire Lead with content_name
  let skipLead = false;
  try {
    if (sessionStorage.getItem(leadKey)) skipLead = true;
  } catch {
    /* ignore */
  }
  if (!skipLead) {
    const fireLead = (): boolean => fireMetaEvent('Lead', CAPABILITY_PARAMS);
    if (fireLead()) {
      try { sessionStorage.setItem(leadKey, '1'); } catch { /* ignore */ }
    } else {
      setTimeout(() => {
        try {
          if (sessionStorage.getItem(leadKey)) return;
          if (fireMetaEvent('Lead', CAPABILITY_PARAMS)) sessionStorage.setItem(leadKey, '1');
        } catch { /* ignore */ }
      }, 150);
    }
  }

  // Fire CompleteRegistration with content_name
  let skipReg = false;
  try {
    if (sessionStorage.getItem(regKey)) skipReg = true;
  } catch {
    /* ignore */
  }
  if (!skipReg) {
    const fireReg = (): boolean => fireMetaEvent('CompleteRegistration', CAPABILITY_PARAMS);
    if (fireReg()) {
      try { sessionStorage.setItem(regKey, '1'); } catch { /* ignore */ }
    } else {
      setTimeout(() => {
        try {
          if (sessionStorage.getItem(regKey)) return;
          if (fireMetaEvent('CompleteRegistration', CAPABILITY_PARAMS)) sessionStorage.setItem(regKey, '1');
        } catch { /* ignore */ }
      }, 150);
    }
  }
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
