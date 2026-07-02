'use client'

import { useState, useMemo } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function FoodCostPercentageCalculator() {
  const [foodCost, setFoodCost] = useState<number | ''>('')
  const [revenue, setRevenue] = useState<number | ''>('')
  const [period, setPeriod] = useState('week')

  const pct = useMemo(() => {
    if (!foodCost || !revenue || revenue === 0) return null
    return (foodCost / revenue) * 100
  }, [foodCost, revenue])

  const status = useMemo(() => {
    if (pct === null) return null
    if (pct <= 28) return { label: 'Excellent', color: '#2d6a4f', bg: '#d8f3dc' }
    if (pct <= 35) return { label: 'Good', color: '#2d6a4f', bg: '#d8f3dc' }
    if (pct <= 40) return { label: 'Watch It', color: '#e07b39', bg: '#fce1cf' }
    return { label: 'Too High', color: '#c73e3e', bg: '#fce4e4' }
  }, [pct])

  return (
    <CalculatorLayout
      title="Free Food Cost Percentage Calculator"
      description="Find your food cost percentage in seconds. Enter your total food costs and revenue for any period, and see where you stand against industry benchmarks."
      result={
        pct !== null && status ? (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-[var(--font-mono)] uppercase tracking-widest" style={{ color: 'var(--faded)' }}>
                Food Cost Percentage
              </p>
              <p className="text-3xl font-bold" style={{ color: 'var(--ink)' }}>
                {fmt(pct)}%
              </p>
            </div>

            <div className="p-3" style={{ background: status.bg, borderRadius: 4 }}>
              <p className="text-sm font-bold" style={{ color: status.color }}>{status.label}</p>
              <p className="text-[11px] mt-0.5" style={{ color: status.color, opacity: 0.8 }}>
                {pct <= 28
                  ? 'Well below the 30% benchmark. Your margins are strong.'
                  : pct <= 35
                  ? 'Within the typical 28-35% target range for most restaurants.'
                  : pct <= 40
                  ? 'Above the recommended range. Review your portion sizes and supplier costs.'
                  : 'Significantly above target. Immediate action recommended — audit your menu, suppliers, and waste.'}
              </p>
            </div>

            <div className="text-xs space-y-1.5" style={{ color: 'var(--faded)' }}>
              <p><strong style={{ color: 'var(--ink)' }}>Total Food Cost:</strong> ${fmt(foodCost as number)}</p>
              <p><strong style={{ color: 'var(--ink)' }}>Total Revenue:</strong> ${fmt(revenue as number)}</p>
              <p><strong style={{ color: 'var(--ink)' }}>Gross Profit:</strong> ${fmt((revenue as number) - (foodCost as number))}</p>
            </div>
          </div>
        ) : undefined
      }
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--ink)' }}>
            Time Period
          </label>
          <div className="flex gap-2">
            {['day', 'week', 'month', 'year'].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="px-4 py-2 text-sm capitalize"
                style={{
                  border: `1.5px solid ${period === p ? 'var(--ink)' : 'var(--divider)'}`,
                  borderRadius: 4,
                  color: period === p ? 'var(--receipt)' : 'var(--ink)',
                  background: period === p ? 'var(--ink)' : 'var(--receipt)',
                  cursor: 'pointer',
                  fontWeight: period === p ? 600 : 400,
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--ink)' }}>
            Total Food Cost ($)
          </label>
          <p className="text-[11px] mb-2" style={{ color: 'var(--faded)' }}>
            Sum of all food and beverage purchases for the {period}
          </p>
          <div className="relative max-w-[220px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--faded)' }}>$</span>
            <input
              type="number"
              min={0}
              step="0.01"
              placeholder="0.00"
              value={foodCost}
              onChange={(e) => setFoodCost(e.target.value ? parseFloat(e.target.value) : '')}
              className="w-full pl-7 pr-3 py-2.5 text-sm"
              style={{
                border: '1px solid var(--divider)',
                borderRadius: 4,
                fontFamily: 'var(--font-mono)',
                color: 'var(--ink)',
                background: 'var(--receipt)',
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--ink)' }}>
            Total Revenue ($)
          </label>
          <p className="text-[11px] mb-2" style={{ color: 'var(--faded)' }}>
            Gross sales (before tax) for the same {period}
          </p>
          <div className="relative max-w-[220px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--faded)' }}>$</span>
            <input
              type="number"
              min={0}
              step="0.01"
              placeholder="0.00"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value ? parseFloat(e.target.value) : '')}
              className="w-full pl-7 pr-3 py-2.5 text-sm"
              style={{
                border: '1px solid var(--divider)',
                borderRadius: 4,
                fontFamily: 'var(--font-mono)',
                color: 'var(--ink)',
                background: 'var(--receipt)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Benchmarks */}
      <div className="mt-8 p-4" style={{ background: 'var(--paper)', borderRadius: 4 }}>
        <p className="text-xs font-semibold mb-2" style={{ color: 'var(--ink)' }}>Industry Benchmarks</p>
        <div className="space-y-1 text-xs" style={{ color: 'var(--faded)' }}>
          <p>🍕 Full-Service: <strong style={{ color: 'var(--ink)' }}>28–35%</strong></p>
          <p>🍔 Quick Service: <strong style={{ color: 'var(--ink)' }}>28–32%</strong></p>
          <p>☕ Café: <strong style={{ color: 'var(--ink)' }}>15–25%</strong></p>
          <p>🍸 Bar: <strong style={{ color: 'var(--ink)' }}>18–24%</strong></p>
        </div>
      </div>
    </CalculatorLayout>
  )
}
