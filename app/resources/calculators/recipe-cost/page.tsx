import type { Metadata } from 'next'
import RecipeCostCalculator from '@/components/RecipeCostCalculator'

export const metadata: Metadata = {
  title: 'Free Recipe Cost Calculator — Cost Any Recipe | foodcosting.app',
  description: 'Cost any recipe down to the penny. Enter ingredients with pack costs, sizes, and quantities. Accounts for waste and yield.',
  alternates: { canonical: 'https://blog.foodcosting.app/resources/calculators/recipe-cost' },
  openGraph: {
    title: 'Free Recipe Cost Calculator — Cost Any Recipe | foodcosting.app',
    description: 'Cost any recipe down to the penny. Enter ingredients with pack costs, sizes, and quantities.',
    url: 'https://blog.foodcosting.app/resources/calculators/recipe-cost',
    siteName: 'foodcosting.app',
    type: 'website',
  },
}

export default function Page() {
  return <RecipeCostCalculator />
}
