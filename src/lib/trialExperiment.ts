/** Sticky 50/50 split for /start-trial. Safe to import from middleware. */

export const TRIAL_EXPERIMENT_ID = 'start_trial_v1'

export const TRIAL_VARIANT_COOKIE = 'civdocs_trial_variant'
export const TRIAL_VARIANT_HEADER = 'x-civdocs-trial-variant'
export const TRIAL_VISITOR_COOKIE = 'civdocs_trial_visitor'
export const TRIAL_SESSION_COOKIE = 'civdocs_trial_session'
export const TRIAL_PREVIEW_COOKIE = 'civdocs_trial_preview'

/** Website form at /signup. Not part of the ad split. Never read the A/B cookies. */
export const WEBSITE_SIGNUP_EXPERIMENT_ID = 'website_signup_v1'
export const WEBSITE_SIGNUP_VISITOR_COOKIE = 'civdocs_website_signup_visitor'
export const WEBSITE_SIGNUP_SESSION_COOKIE = 'civdocs_website_signup_session'

export const TRIAL_EXPERIMENT_EVENTS = ['page_view', 'cta_click', 'form_start', 'trial_signup'] as const
export const WEBSITE_SIGNUP_EVENTS = ['page_view', 'form_start', 'trial_signup'] as const

export type TrialExperimentEventName = (typeof TRIAL_EXPERIMENT_EVENTS)[number]
export type WebsiteSignupEventName = (typeof WEBSITE_SIGNUP_EVENTS)[number]
export type TrialVariant = 'a' | 'b'

const NINETY_DAYS = 60 * 60 * 24 * 90

export function trialExperimentCookieMaxAge() {
  return NINETY_DAYS
}

export function isTrialExperimentBot(userAgent: string) {
  return /bot|crawl|spider|slurp|facebookexternalhit|headless|preview|wget|curl|lighthouse/i.test(userAgent)
}

export function isTrialVariant(value: string | undefined | null): value is TrialVariant {
  return value === 'a' || value === 'b'
}

export function isTrialExperimentEvent(value: string): value is TrialExperimentEventName {
  return (TRIAL_EXPERIMENT_EVENTS as readonly string[]).includes(value)
}

export function isWebsiteSignupEvent(value: string): value is WebsiteSignupEventName {
  return (WEBSITE_SIGNUP_EVENTS as readonly string[]).includes(value)
}
