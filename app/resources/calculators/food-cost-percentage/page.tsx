import type { Metadata } from 'next'
import FoodCostPercentageCalculator from '@/components/FoodCostPercentageCalculator'

export const metadata: Metadata = {
  title: 'Free Food Cost Percentage Calculator | foodcosting.app',
  description: 'Calculate your food cost percentage instantly. Enter food costs and revenue to see where you stand against industry benchmarks.',
  alternates: { canonical: 'https://blog.foodcosting.app/resources/calculators/food-cost-percentage' },
  openGraph: {
    title: 'Free Food Cost Percentage Calculator | foodcosting.app',
    description: 'Calculate your food cost percentage instantly. See where you stand against industry benchmarks.',
    url: 'https://blog.foodcosting.app/resources/calculators/food-cost-percentage',
    siteName: 'foodcosting.app',
    type: 'website',
  },
}

export default function Page() {
  return <FoodCostPercentageCalculator />
}
