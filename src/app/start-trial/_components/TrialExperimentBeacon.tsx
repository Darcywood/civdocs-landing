'use client'

import { useEffect } from 'react'
import { trackTrialExperiment } from '@/lib/trialExperimentClient'

/** Records one page view for this visit. Mount on both variants. */
export default function TrialExperimentBeacon() {
  useEffect(() => {
    trackTrialExperiment('page_view')
  }, [])
  return null
}
