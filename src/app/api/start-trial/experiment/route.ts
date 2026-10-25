import { NextResponse } from 'next/server'
import { recordTrialExperimentEvent } from '@/lib/recordTrialExperiment'
import { isTrialExperimentEvent } from '@/lib/trialExperiment'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  let event = ''
  try {
    const body = (await req.json()) as { event?: unknown }
    if (typeof body.event === 'string') event = body.event
  } catch {
    event = ''
  }

  if (!isTrialExperimentEvent(event) || event === 'trial_signup') {
    return new NextResponse(null, { status: 204 })
  }

  await recordTrialExperimentEvent(event)
  return new NextResponse(null, { status: 204 })
}
