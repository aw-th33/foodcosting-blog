'use client'

import { useState, useMemo } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

interface CostItem {
  id: number
  label: string
  low: number
  high: number
  value: number
}

const CATEGORIES: { label: string; items: Omit<CostItem, 'value'>[] }[] = [
  {
    label: 'Pre-Opening',
    items: [
      { id: 1, label: 'Lease deposit & first month', low: 3000, high: 15000 },
      { id: 2, label: 'Legal & permits', low: 2000, high: 10000 },
      { id: 3, label: 'Architect & design', low: 3000, high: 25000 },
      { id: 4, label: 'Marketing (pre-opening)', low: 1000, high: 8000 },
    ],
  },
  {
    label: 'Equipment & Build-Out',
    items: [
      { id: 5, label: 'Kitchen equipment', low: 15000, high: 100000 },
      { id: 6, label: 'Furniture & fixtures', low: 5000, high: 40000 },
      { id: 7, label: 'POS system', low: 1500, high: 8000 },
      { id: 8, label: 'Signage & branding', low: 1000, high: 10000 },
    ],
  },
  {
    label: 'Initial Inventory & Working Capital',
    items: [
      { id: 9, label: 'Opening food inventory', low: 2000, high: 10000 },
      { id: 10, label: 'Bar inventory', low: 1000, high: 8000 },
      { id: 11, label: 'Smallwares & supplies', low: 2000, high: 15000 },
      { id: 12, label: 'Working capital (3 months)', low: 10000, high: 60000 },
    ],
  },
]

export default function StartupCostCalculator() {
  const initialValues: Record<number, number> = {}
  CATEGORIES.forEach((cat) => cat.items.forEach((item) => { initialValues[item.id] = item.low }))

  const [values, setValues] = useState<Record<number, number>>(initialValues)

  const total = useMemo(() => Object.values(values).reduce((s, v) => s + v, 0), [values])

  return (
    <CalculatorLayout
      title="Free Restaurant Startup Cost Calculator"
      description="Estimate what it'll cost to open your restaurant. Adjust each line item with our pre-filled estimates based on US averages, then see your total."
      result={
        <div className="space-y-4">
          <div className="p-4" style={{ background: '#d8f3dc', borderRadius: 4 }}>
            <p className="text-[10px] font-[var(--font-mono)] uppercase tracking-widest mb-0.5" style={{ color: '#2d6a4f' }}>
              Estimated Total Startup Cost
            </p>
            <p className="text-3xl font-bold" style={{ color: '#2d6a4f' }}>
              ${total.toLocaleString('en-US')}
            </p>
          </div>

          {CATEGORIES.map((cat) => {
            const catTotal = cat.items.reduce((s, item) => s + (values[item.id] || 0), 0)
            return (
              <div key={cat.label}>
                <p className="text-[10px] font-[var(--font-mono)] uppercase tracking-widest" style={{ color: 'var(--faded)' }}>
                  {cat.label}
                </p>
                <p className="text-lg font-bold" style={{ color: 'var(--ink)' }}>
                  ${catTotal.toLocaleString('en-US')}
                </p>
              </div>
            )
          })}

          <div className="text-[10px] mt-2" style={{ color: 'var(--faded)' }}>
            <p>Based on US averages. Actual costs vary by city, concept, and scale.</p>
            <p className="mt-1">
              Suggested buffer: <strong style={{ color: 'var(--ink)' }}>${fmt(total * 0.2)}</strong> (20% contingency)
            </p>
          </div>
        </div>
      }
    >
      <div className="space-y-8">
        {CATEGORIES.map((cat) => (
          <div key={cat.label}>
            <p className="text-sm font-semibold mb-3 pb-2" style={{ color: 'var(--ink)', borderBottom: '1px solid var(--divider)' }}>
              {cat.label}
            </p>
            <div className="space-y-3">
              {cat.items.map((item) => (
                <div key={item.id}>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium" style={{ color: 'var(--ink)' }}>
                      {item.label}
                    </label>
                    <span className="text-[10px] font-[var(--font-mono)]" style={{ color: 'var(--faded)' }}>
                      ${item.low.toLocaleString()} – ${item.high.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={item.low}
                      max={item.high}
                      step={100}
                      value={values[item.id]}
                      onChange={(e) => setValues({ ...values, [item.id]: parseInt(e.target.value) })}
                      className="flex-1"
                    />
                    <span className="font-[var(--font-mono)] text-sm font-bold w-20 text-right" style={{ color: 'var(--ink)' }}>
                      ${values[item.id].toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </CalculatorLayout>
  )
}
