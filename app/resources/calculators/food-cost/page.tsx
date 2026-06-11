import type { Metadata } from 'next'
import FoodCostCalculator from '@/components/FoodCostCalculator'

export const metadata: Metadata = {
  title: 'Free Food Cost Calculator — Calculate Cost Per Plate | foodcosting.app',
  description:
    'Calculate the true cost of any dish. Add ingredients, set portions, and get your ideal selling price. Free, no signup required.',
  alternates: { canonical: 'https://blog.foodcosting.app/resources/calculators/food-cost' },
  openGraph: {
    title: 'Free Food Cost Calculator — Calculate Cost Per Plate | foodcosting.app',
    description:
      'Calculate the true cost of any dish. Add ingredients, set portions, and get your ideal selling price.',
    url: 'https://blog.foodcosting.app/resources/calculators/food-cost',
    siteName: 'foodcosting.app',
    type: 'website',
  },
}

export default function FoodCostPage() {
  return <FoodCostCalculator />
}
