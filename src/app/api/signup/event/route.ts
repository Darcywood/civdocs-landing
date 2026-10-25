import { NextResponse } from 'next/server'
import { recordWebsiteSignupEvent } from '@/lib/recordTrialExperiment'
import { isWebsiteSignupEvent } from '@/lib/trialExperiment'

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

  if (!isWebsiteSignupEvent(event) || event === 'trial_signup') {
    return new NextResponse(null, { status: 204 })
  }

  await recordWebsiteSignupEvent(event)
  return new NextResponse(null, { status: 204 })
}
