import { cookies, headers } from 'next/headers';
import { TRIAL_VARIANT_COOKIE, TRIAL_VARIANT_HEADER } from '@/lib/trialExperiment';
import StartTrialVariantA from './_components/StartTrialVariantA';
import StartTrialVariantB from './_components/StartTrialVariantB';

export default async function StartTrialPage() {
  const headerStore = await headers();
  const cookieStore = await cookies();
  const variant = headerStore.get(TRIAL_VARIANT_HEADER) || cookieStore.get(TRIAL_VARIANT_COOKIE)?.value;
  if (variant === 'b') return <StartTrialVariantB />;
  return <StartTrialVariantA />;
}
