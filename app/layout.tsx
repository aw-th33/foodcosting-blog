import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: 'Food Costing App: Free Guides, Calculators & Menu Pricing for Restaurants | foodcosting.app',
  description: 'Stop guessing your food costs. Free food costing guides, calculators, and menu pricing tools built for US restaurant owners, caterers, and food trucks.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="font-[var(--font-inter)] min-h-screen" style={{ backgroundColor: 'var(--paper)' }}>
        <Nav />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
