import type { Metadata } from 'next'
import FoodCostPercentageCalculator from '@/components/FoodCostPercentageCalculator'

export const metadata: Metadata = {
  title: 'Free Food Cost Percentage Calculator | foodcosting.app',
  description: 'Calculate your food cost percentage instantly. Enter food costs and revenue to see where you stand against industry benchmarks.',
  alternates: { canonical: 'https://blog.foodcosting.app/resources/calculators/food-cost-percentage' },
}

export default function Page() {
  return <FoodCostPercentageCalculator />
}
