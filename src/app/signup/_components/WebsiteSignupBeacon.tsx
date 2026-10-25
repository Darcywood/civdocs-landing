'use client'

import { useEffect } from 'react'
import { trackWebsiteSignup } from '@/lib/trialExperimentClient'

export default function WebsiteSignupBeacon() {
  useEffect(() => {
    trackWebsiteSignup('page_view')
  }, [])
  return null
}
