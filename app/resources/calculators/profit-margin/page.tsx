import type { Metadata } from 'next'
import ProfitMarginCalculator from '@/components/ProfitMarginCalculator'

export const metadata: Metadata = {
  title: 'Free Restaurant Profit Margin Calculator | foodcosting.app',
  description: 'See exactly where your money goes. Calculate gross profit, net profit, and key ratios from your monthly P&L.',
  alternates: { canonical: 'https://blog.foodcosting.app/resources/calculators/profit-margin' },
  openGraph: {
    title: 'Free Restaurant Profit Margin Calculator | foodcosting.app',
    description: 'See exactly where your money goes. Calculate gross profit, net profit, and key ratios from your monthly P&L.',
    url: 'https://blog.foodcosting.app/resources/calculators/profit-margin',
    siteName: 'foodcosting.app',
    type: 'website',
  },
}

export default function Page() {
  return <ProfitMarginCalculator />
}
