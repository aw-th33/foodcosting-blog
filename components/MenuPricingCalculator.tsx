'use client'

import { useState, useMemo } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function MenuPricingCalculator() {
  const [costPerPortion, setCostPerPortion] = useState<number | ''>('')
  const [targetFcPct, setTargetFcPct] = useState(30)
  const [laborPct, setLaborPct] = useState<number | ''>('')
  const [overheadPct, setOverheadPct] = useState<number | ''>('')

  const foodCostPrice = useMemo(() => {
    if (!costPerPortion || targetFcPct === 0) return null
    return costPerPortion / (targetFcPct / 100)
  }, [costPerPortion, targetFcPct])

  const primeCostPrice = useMemo(() => {
    if (!costPerPortion || !laborPct) return null
    const totalPct = (targetFcPct + laborPct) / 100
    if (totalPct === 0) return null
    return costPerPortion / totalPct
  }, [costPerPortion, targetFcPct, laborPct])

  const allInPrice = useMemo(() => {
    if (!costPerPortion || !laborPct || !overheadPct) return null
    const totalPct = (targetFcPct + laborPct + overheadPct) / 100
    if (totalPct === 0) return null
    return costPerPortion / totalPct
  }, [costPerPortion, targetFcPct, laborPct, overheadPct])

  return (
    <CalculatorLayout
      title="Free Menu Pricing Calculator"
      description="Set the right price for every dish. Enter your portion cost and target margins, and get three pricing methods — food cost, prime cost, and all-in pricing."
      result={
        costPerPortion ? (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-[var(--font-mono)] uppercase tracking-widest" style={{ color: 'var(--faded)' }}>
                Cost Per Portion
              </p>
              <p className="text-lg font-bold" style={{ color: 'var(--ink)' }}>
                ${fmt(costPerPortion as number)}
              </p>
            </div>

            {foodCostPrice && (
              <div className="p-3" style={{ background: '#d8f3dc', borderRadius: 4 }}>
                <p className="text-[10px] font-[var(--font-mono)] uppercase tracking-widest mb-0.5" style={{ color: '#2d6a4f' }}>
                  Food Cost Method
                </p>
                <p className="text-xl font-bold" style={{ color: '#2d6a4f' }}>
                  ${fmt(foodCostPrice)}
                </p>
                <p className="text-[11px]" style={{ color: '#40916c' }}>
                  Covers food cost at {targetFcPct}%
                </p>
              </div>
            )}

            {primeCostPrice && (
              <div className="p-3" style={{ background: '#d8f3dc', borderRadius: 4 }}>
                <p className="text-[10px] font-[var(--font-mono)] uppercase tracking-widest mb-0.5" style={{ color: '#2d6a4f' }}>
                  Prime Cost Method
                </p>
                <p className="text-xl font-bold" style={{ color: '#2d6a4f' }}>
                  ${fmt(primeCostPrice)}
                </p>
                <p className="text-[11px]" style={{ color: '#40916c' }}>
                  Covers food ({targetFcPct}%) + labor ({laborPct}%)
                </p>
              </div>
            )}

            {allInPrice && (
              <div className="p-3" style={{ background: '#d8f3dc', borderRadius: 4 }}>
                <p className="text-[10px] font-[var(--font-mono)] uppercase tracking-widest mb-0.5" style={{ color: '#2d6a4f' }}>
                  All-In Method
                </p>
                <p className="text-xl font-bold" style={{ color: '#2d6a4f' }}>
                  ${fmt(allInPrice)}
                </p>
                <p className="text-[11px]" style={{ color: '#40916c' }}>
                  Covers food + labor + overhead ({overheadPct}%)
                </p>
              </div>
            )}
          </div>
        ) : undefined
      }
    >
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--ink)' }}>
            Cost Per Portion ($)
          </label>
          <p className="text-[11px] mb-2" style={{ color: 'var(--faded)' }}>
            What it costs to make one serving of this dish
          </p>
          <div className="relative max-w-[200px]">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--faded)' }}>$</span>
            <input
              type="number"
              min={0}
              step="0.01"
              placeholder="0.00"
              value={costPerPortion}
              onChange={(e) => setCostPerPortion(e.target.value ? parseFloat(e.target.value) : '')}
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
            Target Food Cost: {targetFcPct}%
          </label>
          <input
            type="range"
            min={15}
            max={45}
            value={targetFcPct}
            onChange={(e) => setTargetFcPct(parseInt(e.target.value))}
            className="w-full max-w-[280px]"
          />
          <div className="flex justify-between text-[10px] font-[var(--font-mono)] max-w-[280px]" style={{ color: 'var(--faded)' }}>
            <span>15%</span>
            <span>45%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--ink)' }}>
            Labor Cost % (optional)
          </label>
          <p className="text-[11px] mb-2" style={{ color: 'var(--faded)' }}>
            Typical range: 25–35%
          </p>
          <div className="flex items-center gap-2 max-w-[200px]">
            <input
              type="number"
              min={0}
              max={60}
              step="1"
              placeholder="30"
              value={laborPct}
              onChange={(e) => setLaborPct(e.target.value ? parseFloat(e.target.value) : '')}
              className="w-20 px-3 py-2.5 text-sm"
              style={{
                border: '1px solid var(--divider)',
                borderRadius: 4,
                fontFamily: 'var(--font-mono)',
                color: 'var(--ink)',
                background: 'var(--receipt)',
              }}
            />
            <span className="text-sm" style={{ color: 'var(--faded)' }}>%</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--ink)' }}>
            Overhead % (optional)
          </label>
          <p className="text-[11px] mb-2" style={{ color: 'var(--faded)' }}>
            Rent, utilities, insurance, marketing, etc. Typical: 15–25%
          </p>
          <div className="flex items-center gap-2 max-w-[200px]">
            <input
              type="number"
              min={0}
              max={50}
              step="1"
              placeholder="20"
              value={overheadPct}
              onChange={(e) => setOverheadPct(e.target.value ? parseFloat(e.target.value) : '')}
              className="w-20 px-3 py-2.5 text-sm"
              style={{
                border: '1px solid var(--divider)',
                borderRadius: 4,
                fontFamily: 'var(--font-mono)',
                color: 'var(--ink)',
                background: 'var(--receipt)',
              }}
            />
            <span className="text-sm" style={{ color: 'var(--faded)' }}>%</span>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  )
}
