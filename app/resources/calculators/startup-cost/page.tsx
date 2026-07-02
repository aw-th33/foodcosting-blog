import type { Metadata } from 'next'
import StartupCostCalculator from '@/components/StartupCostCalculator'

export const metadata: Metadata = {
  title: 'Free Restaurant Startup Cost Calculator | foodcosting.app',
  description: 'Estimate your total restaurant startup costs. Pre-filled US averages for equipment, permits, inventory, and working capital.',
  alternates: { canonical: 'https://blog.foodcosting.app/resources/calculators/startup-cost' },
  openGraph: {
    title: 'Free Restaurant Startup Cost Calculator | foodcosting.app',
    description: 'Estimate your total restaurant startup costs with pre-filled US averages you can adjust.',
    url: 'https://blog.foodcosting.app/resources/calculators/startup-cost',
    siteName: 'foodcosting.app',
    type: 'website',
  },
}

export default function Page() {
  return <StartupCostCalculator />
}
