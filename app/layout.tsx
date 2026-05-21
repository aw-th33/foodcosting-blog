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
  title: 'Food Cost & Menu Pricing Blog | foodcosting.app',
  description: 'Practical guides on food cost, menu pricing, and running a profitable food business.',
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
