'use client'

import { useState, useMemo } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function ProfitMarginCalculator() {
  const [revenue, setRevenue] = useState<number | ''>('')
  const [cogs, setCogs] = useState<number | ''>('')
  const [labor, setLabor] = useState<number | ''>('')
  const [rent, setRent] = useState<number | ''>('')
  const [other, setOther] = useState<number | ''>('')

  const totalExpenses = useMemo(() =>
    (cogs || 0) + (labor || 0) + (rent || 0) + (other || 0),
    [cogs, labor, rent, other]
  )

  const grossProfit = useMemo(() =>
    revenue ? (revenue as number) - (cogs || 0) : null,
    [revenue, cogs]
  )

  const netProfit = useMemo(() =>
    revenue ? (revenue as number) - totalExpenses : null,
    [revenue, totalExpenses]
  )

  const grossMargin = useMemo(() =>
    revenue && grossProfit !== null ? (grossProfit / (revenue as number)) * 100 : null,
    [revenue, grossProfit]
  )

  const netMargin = useMemo(() =>
    revenue && netProfit !== null ? (netProfit / (revenue as number)) * 100 : null,
    [revenue, netProfit]
  )

  const foodCostPct = useMemo(() =>
    revenue && cogs ? (cogs / (revenue as number)) * 100 : null,
    [revenue, cogs]
  )

  const laborPct = useMemo(() =>
    revenue && labor ? (labor / (revenue as number)) * 100 : null,
    [revenue, labor]
  )

  return (
    <CalculatorLayout
      title="Free Restaurant Profit Margin Calculator"
      description="See exactly where your money goes. Enter your monthly revenue and costs to calculate gross profit, net profit, and key ratios."
      result={
        revenue ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3" style={{ background: '#d8f3dc', borderRadius: 4 }}>
                <p className="text-[10px] font-[var(--font-mono)] uppercase tracking-widest" style={{ color: '#2d6a4f' }}>Gross Profit</p>
                <p className="text-lg font-bold" style={{ color: '#2d6a4f' }}>
                  ${fmt(grossProfit || 0)}
                </p>
                <p className="text-[11px]" style={{ color: '#40916c' }}>{fmt(grossMargin || 0)}% margin</p>
              </div>
              <div className="p-3" style={{ background: netProfit !== null && netProfit > 0 ? '#d8f3dc' : '#fce1cf', borderRadius: 4 }}>
                <p className="text-[10px] font-[var(--font-mono)] uppercase tracking-widest" style={{ color: netProfit !== null && netProfit > 0 ? '#2d6a4f' : '#e07b39' }}>Net Profit</p>
                <p className="text-lg font-bold" style={{ color: netProfit !== null && netProfit > 0 ? '#2d6a4f' : '#e07b39' }}>
                  ${fmt(netProfit || 0)}
                </p>
                <p className="text-[11px]" style={{ color: netProfit !== null && netProfit > 0 ? '#40916c' : '#d97706' }}>
                  {fmt(netMargin || 0)}% margin
                </p>
              </div>
            </div>

            <div className="text-xs space-y-1.5" style={{ color: 'var(--faded)' }}>
              <p><strong style={{ color: 'var(--ink)' }}>Revenue:</strong> ${fmt(revenue as number)}</p>
              <p><strong style={{ color: 'var(--ink)' }}>Total Expenses:</strong> ${fmt(totalExpenses)}</p>
              <hr style={{ borderColor: 'var(--divider)' }} />
              {foodCostPct && <p>Food Cost: {fmt(foodCostPct)}% of revenue</p>}
              {laborPct && <p>Labor: {fmt(laborPct)}% of revenue</p>}
            </div>
          </div>
        ) : undefined
      }
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--ink)' }}>
            Monthly Revenue ($)
          </label>
          <div className="relative max-w-[220px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--faded)' }}>$</span>
            <input type="number" min={0} step="0.01" placeholder="0.00" value={revenue}
              onChange={(e) => setRevenue(e.target.value ? parseFloat(e.target.value) : '')}
              className="w-full pl-7 pr-3 py-2.5 text-sm"
              style={{ border: '1px solid var(--divider)', borderRadius: 4, fontFamily: 'var(--font-mono)', color: 'var(--ink)', background: 'var(--receipt)' }}
            />
          </div>
        </div>

        {[
          { label: 'COGS (Food & Beverage Cost)', key: setCogs, val: cogs, hint: 'Ingredients, beverages, and supplies' },
          { label: 'Labor Cost', key: setLabor, val: labor, hint: 'Wages, payroll taxes, benefits' },
          { label: 'Rent & Occupancy', key: setRent, val: rent, hint: 'Rent, utilities, insurance, property tax' },
          { label: 'Other Expenses', key: setOther, val: other, hint: 'Marketing, repairs, supplies, admin, loan payments' },
        ].map(({ label, key, val, hint }) => (
          <div key={label}>
            <label className="block text-sm font-semibold mb-1" style={{ color: 'var(--ink)' }}>{label}</label>
            <p className="text-[11px] mb-1.5" style={{ color: 'var(--faded)' }}>{hint}</p>
            <div className="relative max-w-[200px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--faded)' }}>$</span>
              <input type="number" min={0} step="0.01" placeholder="0.00" value={val}
                onChange={(e) => key(e.target.value ? parseFloat(e.target.value) : '')}
                className="w-full pl-7 pr-3 py-2.5 text-sm"
                style={{ border: '1px solid var(--divider)', borderRadius: 4, fontFamily: 'var(--font-mono)', color: 'var(--ink)', background: 'var(--receipt)' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4" style={{ background: 'var(--paper)', borderRadius: 4 }}>
        <p className="text-xs font-semibold mb-2" style={{ color: 'var(--ink)' }}>Healthy Restaurant Margins</p>
        <div className="space-y-1 text-xs" style={{ color: 'var(--faded)' }}>
          <p>Gross profit: <strong style={{ color: 'var(--ink)' }}>60–70%</strong></p>
          <p>Net profit: <strong style={{ color: 'var(--ink)' }}>5–15%</strong> (3–5% is common)</p>
          <p>Food cost: <strong style={{ color: 'var(--ink)' }}>28–35%</strong> of revenue</p>
          <p>Labor: <strong style={{ color: 'var(--ink)' }}>25–35%</strong> of revenue</p>
        </div>
      </div>
    </CalculatorLayout>
  )
}
