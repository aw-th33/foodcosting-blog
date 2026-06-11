import type { Metadata } from 'next'
import StartupCostCalculator from '@/components/StartupCostCalculator'

export const metadata: Metadata = {
  title: 'Free Restaurant Startup Cost Calculator | foodcosting.app',
  description: 'Estimate your total restaurant startup costs. Pre-filled US averages for equipment, permits, inventory, and working capital.',
  alternates: { canonical: 'https://blog.foodcosting.app/resources/calculators/startup-cost' },
}

export default function Page() {
  return <StartupCostCalculator />
}
