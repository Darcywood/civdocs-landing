import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import {
  SIGNUP_ATTRIBUTION_COOKIE_NAME,
  parseAttributionCookie,
  sanitizeAttributionBody,
} from '@/lib/marketingAttribution'
import {
  TRIAL_EXPERIMENT_ID,
  TRIAL_PREVIEW_COOKIE,
  TRIAL_SESSION_COOKIE,
  TRIAL_VARIANT_COOKIE,
  TRIAL_VISITOR_COOKIE,
  WEBSITE_SIGNUP_EXPERIMENT_ID,
  WEBSITE_SIGNUP_SESSION_COOKIE,
  WEBSITE_SIGNUP_VISITOR_COOKIE,
  type TrialExperimentEventName,
  type WebsiteSignupEventName,
  isTrialVariant,
} from '@/lib/trialExperiment'

/** Writes one row to trial_experiment_events. Never throws. Preview visits are skipped. */
export async function recordTrialExperimentEvent(
  event: TrialExperimentEventName,
  organizationId?: string | null
) {
  try {
    const cookieStore = await cookies()
    if (cookieStore.get(TRIAL_PREVIEW_COOKIE)?.value === '1') return

    const variant = cookieStore.get(TRIAL_VARIANT_COOKIE)?.value
    const visitorId = cookieStore.get(TRIAL_VISITOR_COOKIE)?.value
    if (!isTrialVariant(variant) || !visitorId) return

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return

    const attribution = sanitizeAttributionBody(
      parseAttributionCookie(cookieStore.get(SIGNUP_ATTRIBUTION_COOKIE_NAME)?.value)
    )
    const sessionId = cookieStore.get(TRIAL_SESSION_COOKIE)?.value || null

    const supabase = createClient(url, key)
    const { error } = await supabase.from('trial_experiment_events').insert({
      experiment: TRIAL_EXPERIMENT_ID,
      variant,
      event,
      visitor_id: visitorId,
      session_id: sessionId,
      organization_id: organizationId || null,
      path: '/start-trial',
      attribution,
    })
    if (error) console.error('[trial-experiment]', error.message)
  } catch (error) {
    console.error('[trial-experiment]', error)
  }
}

/** /signup only. Uses its own visitor cookie and does not read the ad-test cookies. */
export async function recordWebsiteSignupEvent(
  event: WebsiteSignupEventName,
  organizationId?: string | null
) {
  try {
    const cookieStore = await cookies()
    const visitorId = cookieStore.get(WEBSITE_SIGNUP_VISITOR_COOKIE)?.value
    if (!visitorId) return

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    if (!url || !key) return

    const attribution = sanitizeAttributionBody(
      parseAttributionCookie(cookieStore.get(SIGNUP_ATTRIBUTION_COOKIE_NAME)?.value)
    )
    const sessionId = cookieStore.get(WEBSITE_SIGNUP_SESSION_COOKIE)?.value || null

    const supabase = createClient(url, key)
    const { error } = await supabase.from('trial_experiment_events').insert({
      experiment: WEBSITE_SIGNUP_EXPERIMENT_ID,
      variant: 'a',
      event,
      visitor_id: visitorId,
      session_id: sessionId,
      organization_id: organizationId || null,
      path: '/signup',
      attribution,
    })
    if (error) console.error('[website-signup]', error.message)
  } catch (error) {
    console.error('[website-signup]', error)
  }
}
