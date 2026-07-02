'use client'

import { type ReactNode } from 'react'

interface Props {
  title: string
  description: string
  children: ReactNode
  result?: ReactNode
}

export default function CalculatorLayout({ title, description, children, result }: Props) {
  return (
    <div className="mx-auto max-w-[960px] px-4 py-10">
      {/* Breadcrumb */}
      <p className="font-[var(--font-mono)] text-[11px] tracking-[0.08em] uppercase mb-4" style={{ color: 'var(--faded)' }}>
        <a href="/resources" style={{ color: 'var(--faded)', textDecoration: 'none' }}>Resources</a>
        {' '}/{' '}
        <span style={{ color: 'var(--ink)' }}>{title}</span>
      </p>

      <h1 className="font-bold text-3xl tracking-tight mb-2" style={{ color: 'var(--ink)' }}>
        {title}
      </h1>
      <p className="mb-8 max-w-[600px]" style={{ color: 'var(--faded)', fontSize: '1rem' }}>
        {description}
      </p>

      {/* Calculator body */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        {/* Inputs */}
        <div
          className="p-6"
          style={{
            background: 'var(--receipt)',
            border: '1px solid var(--divider)',
            borderRadius: 6,
          }}
        >
          <h2
            className="font-[var(--font-mono)] text-[11px] tracking-[0.12em] uppercase mb-5 pb-3"
            style={{ color: 'var(--faded)', borderBottom: '1px solid var(--divider)' }}
          >
            Inputs
          </h2>
          {children}
        </div>

        {/* Results */}
        <div
          className="p-6 self-start lg:sticky lg:top-20"
          style={{
            background: 'var(--receipt)',
            border: '1px solid var(--divider)',
            borderRadius: 6,
          }}
        >
          <h2
            className="font-[var(--font-mono)] text-[11px] tracking-[0.12em] uppercase mb-5 pb-3"
            style={{ color: 'var(--faded)', borderBottom: '1px solid var(--divider)' }}
          >
            Results
          </h2>
          {result ? (
            result
          ) : (
            <p className="text-sm" style={{ color: 'var(--faded)' }}>
              Enter your numbers to see results.
            </p>
          )}
        </div>
      </div>

      {/* Upsell */}
      <div
        className="mt-8 p-5 text-sm"
        style={{
          background: 'var(--receipt)',
          border: '1px solid var(--divider)',
          borderRadius: 6,
        }}
      >
        <strong style={{ color: 'var(--ink)' }}>When spreadsheets hit their limit.</strong>{' '}
        <span style={{ color: 'var(--faded)' }}>
          This calculator handles the basics, but if you manage many recipes, update prices across
          dozens of dishes, or need your team on one shared source of truth —{' '}
          <a href="https://foodcosting.app" style={{ color: 'var(--ink)', textDecoration: 'underline' }}>
            foodcosting.app
          </a>{' '}
          keeps your ingredients, recipes, and pricing in one place with automatic updates.
        </span>
      </div>
    </div>
  )
}
