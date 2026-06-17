import { cookies } from 'next/headers'
import OnboardingGateClient from './OnboardingGateClient'

export default async function OnboardingGate({ children }: { children: React.ReactNode }) {
  const jar = await cookies()
  const done = !!jar.get('colab_onboarded')?.value

  return (
    <OnboardingGateClient alreadyOnboarded={done}>
      {children}
    </OnboardingGateClient>
  )
}
