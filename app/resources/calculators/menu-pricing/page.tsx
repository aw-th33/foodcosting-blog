import type { Metadata } from 'next'
import MenuPricingCalculator from '@/components/MenuPricingCalculator'

export const metadata: Metadata = {
  title: 'Free Menu Pricing Calculator — Price Dishes Profitably | foodcosting.app',
  description: 'Set the right price for every dish. Three pricing methods: food cost, prime cost, and all-in. Free, no signup.',
  alternates: { canonical: 'https://blog.foodcosting.app/resources/calculators/menu-pricing' },
}

export default function Page() {
  return <MenuPricingCalculator />
}
