'use client'

export type TrialClientEvent = 'page_view' | 'cta_click' | 'form_start'

let pageViewSent = false
let formStartSent = false

export function trackTrialExperiment(event: TrialClientEvent) {
  if (typeof window === 'undefined') return
  if (new URLSearchParams(window.location.search).get('preview') === '1') return
  if (event === 'page_view') {
    if (pageViewSent) return
    pageViewSent = true
  }
  if (event === 'form_start') {
    if (formStartSent) return
    formStartSent = true
  }

  const body = JSON.stringify({ event })
  fetch('/api/start-trial/experiment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
    keepalive: true,
  }).catch(() => {})
}

let websitePageViewSent = false
let websiteFormStartSent = false

export function trackWebsiteSignup(event: 'page_view' | 'form_start') {
  if (typeof window === 'undefined') return
  if (event === 'page_view') {
    if (websitePageViewSent) return
    websitePageViewSent = true
  }
  if (event === 'form_start') {
    if (websiteFormStartSent) return
    websiteFormStartSent = true
  }

  fetch('/api/signup/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event }),
    keepalive: true,
  }).catch(() => {})
}
