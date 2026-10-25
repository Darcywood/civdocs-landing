import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import StartTrialForm from '@/app/start-trial/_components/StartTrialForm'
import WebsiteSignupBeacon from './_components/WebsiteSignupBeacon'

export const metadata: Metadata = {
  title: 'Start your free trial | CivDocs',
  description: '14 days free. No credit card required.',
  alternates: { canonical: 'https://www.civdocs.com.au/signup' },
  openGraph: {
    title: 'Start your free trial | CivDocs',
    description: '14 days free. No credit card required.',
    url: 'https://www.civdocs.com.au/signup',
    type: 'website',
    siteName: 'CivDocs',
  },
}

export default function SignupPage() {
  return (
    <div className="min-h-[100dvh] bg-[#F9FAFB] px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-12">
      <WebsiteSignupBeacon />
      <div className="mx-auto w-full max-w-[640px]">
        <div className="mb-8 flex justify-center">
          <Link href="/" aria-label="CivDocs">
            <Image src="/CivDocs 500x500.svg" alt="CivDocs" width={56} height={56} priority />
          </Link>
        </div>
        <StartTrialForm surface="website" />
      </div>
    </div>
  )
}
