'use client'

import { useState, useMemo } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'

interface Ingredient {
  id: number
  name: string
  cost: number
  unit: string
}

const INITIAL_INGREDIENTS: Ingredient[] = [
  { id: 1, name: '', cost: 0, unit: 'total' },
  { id: 2, name: '', cost: 0, unit: 'total' },
  { id: 3, name: '', cost: 0, unit: 'total' },
]

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export default function FoodCostCalculator() {
  const [ingredients, setIngredients] = useState<Ingredient[]>(INITIAL_INGREDIENTS)
  const [portions, setPortions] = useState(1)
  const [targetFcPct, setTargetFcPct] = useState(30)
  const [sellingPrice, setSellingPrice] = useState<number | ''>('')

  const totalCost = useMemo(() => ingredients.reduce((sum, i) => sum + (i.cost || 0), 0), [ingredients])
  const costPerPortion = portions > 0 ? totalCost / portions : 0
  const suggestedPrice = targetFcPct > 0 ? costPerPortion / (targetFcPct / 100) : 0
  const actualFcPct = sellingPrice && sellingPrice > 0 ? (costPerPortion / sellingPrice) * 100 : null
  const profitPerPortion = typeof sellingPrice === 'number' && sellingPrice > 0 ? sellingPrice - costPerPortion : null
  const marginPct = profitPerPortion !== null && sellingPrice && sellingPrice > 0 ? (profitPerPortion / sellingPrice) * 100 : null

  const addIngredient = () => {
    const maxId = ingredients.reduce((m, i) => Math.max(m, i.id), 0)
    setIngredients([...ingredients, { id: maxId + 1, name: '', cost: 0, unit: 'total' }])
  }

  const removeIngredient = (id: number) => {
    if (ingredients.length <= 1) return
    setIngredients(ingredients.filter((i) => i.id !== id))
  }

  const updateIngredient = (id: number, field: keyof Ingredient, value: string | number) => {
    setIngredients(ingredients.map((i) => (i.id === id ? { ...i, [field]: value } : i)))
  }

  return (
    <CalculatorLayout
      title="Free Food Cost Calculator"
      description="Calculate the true cost of any dish. Add your ingredients, set your portion count and target food cost percentage, and get your ideal selling price instantly."
      result={
        totalCost > 0 ? (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-[var(--font-mono)] uppercase tracking-widest" style={{ color: 'var(--faded)' }}>
                Total Recipe Cost
              </p>
              <p className="text-2xl font-bold" style={{ color: 'var(--ink)' }}>
                ${fmt(totalCost)}
              </p>
            </div>

            <div>
              <p className="text-xs font-[var(--font-mono)] uppercase tracking-widest" style={{ color: 'var(--faded)' }}>
                Cost Per Portion
              </p>
              <p className="text-xl font-bold" style={{ color: 'var(--ink)' }}>
                ${fmt(costPerPortion)}
                <span className="text-sm font-normal ml-1" style={{ color: 'var(--faded)' }}>
                  / portion
                </span>
              </p>
            </div>

            <div
              className="p-3"
              style={{ background: '#d8f3dc', borderRadius: 4 }}
            >
              <p className="text-xs font-[var(--font-mono)] uppercase tracking-widest mb-0.5" style={{ color: '#2d6a4f' }}>
                Suggested Selling Price
              </p>
              <p className="text-2xl font-bold" style={{ color: '#2d6a4f' }}>
                ${fmt(suggestedPrice)}
              </p>
              <p className="text-[11px]" style={{ color: '#40916c' }}>
                at {targetFcPct}% target food cost
              </p>
            </div>

            {actualFcPct !== null && (
              <div
                className="p-3"
                style={{
                  background: actualFcPct <= targetFcPct ? '#d8f3dc' : '#fce1cf',
                  borderRadius: 4,
                }}
              >
                <p className="text-xs font-[var(--font-mono)] uppercase tracking-widest mb-0.5"
                  style={{ color: actualFcPct <= targetFcPct ? '#2d6a4f' : '#e07b39' }}>
                  Actual Food Cost %
                </p>
                <p className="text-xl font-bold"
                  style={{ color: actualFcPct <= targetFcPct ? '#2d6a4f' : '#e07b39' }}>
                  {fmt(actualFcPct)}%
                </p>
                {profitPerPortion !== null && (
                  <p className="text-[11px]" style={{ color: actualFcPct <= targetFcPct ? '#40916c' : '#d97706' }}>
                    Profit: ${fmt(profitPerPortion)}/portion ({fmt(marginPct!)}% margin)
                  </p>
                )}
              </div>
            )}
          </div>
        ) : undefined
      }
    >
      {/* Portions */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--ink)' }}>
          Number of Portions
        </label>
        <input
          type="number"
          min={1}
          value={portions}
          onChange={(e) => setPortions(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-28 px-3 py-2 text-sm"
          style={{
            border: '1px solid var(--divider)',
            borderRadius: 4,
            fontFamily: 'var(--font-mono)',
            color: 'var(--ink)',
            background: 'var(--receipt)',
          }}
        />
      </div>

      {/* Ingredients */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>Ingredients</p>
          <button
            onClick={addIngredient}
            className="text-xs font-semibold px-3 py-1.5"
            style={{
              border: '1px solid var(--divider)',
              borderRadius: 4,
              color: 'var(--ink)',
              background: 'var(--receipt)',
              cursor: 'pointer',
            }}
          >
            + Add Ingredient
          </button>
        </div>

        <div className="space-y-2">
          {ingredients.map((ing) => (
            <div key={ing.id} className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Ingredient name"
                value={ing.name}
                onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)}
                className="flex-1 px-3 py-2 text-sm"
                style={{
                  border: '1px solid var(--divider)',
                  borderRadius: 4,
                  color: 'var(--ink)',
                  background: 'var(--receipt)',
                }}
              />
              <div className="relative flex-1 max-w-[140px]">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--faded)' }}>
                  $
                </span>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="0.00"
                  value={ing.cost || ''}
                  onChange={(e) => updateIngredient(ing.id, 'cost', parseFloat(e.target.value) || 0)}
                  className="w-full pl-6 pr-3 py-2 text-sm"
                  style={{
                    border: '1px solid var(--divider)',
                    borderRadius: 4,
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--ink)',
                    background: 'var(--receipt)',
                  }}
                />
              </div>
              {ingredients.length > 1 && (
                <button
                  onClick={() => removeIngredient(ing.id)}
                  className="px-2 py-2 text-sm"
                  style={{ color: 'var(--faded)', cursor: 'pointer', background: 'none', border: 'none' }}
                  aria-label="Remove ingredient"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        {totalCost > 0 && (
          <p className="mt-3 text-sm font-[var(--font-mono)]" style={{ color: 'var(--faded)' }}>
            Total ingredient cost: <strong style={{ color: 'var(--ink)' }}>${fmt(totalCost)}</strong>
          </p>
        )}
      </div>

      {/* Target food cost */}
      <div className="mt-6">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--ink)' }}>
          Target Food Cost %
        </label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={15}
            max={50}
            value={targetFcPct}
            onChange={(e) => setTargetFcPct(parseInt(e.target.value))}
            className="flex-1"
          />
          <span className="font-[var(--font-mono)] text-sm font-bold w-10 text-right" style={{ color: 'var(--ink)' }}>
            {targetFcPct}%
          </span>
        </div>
        <div className="flex justify-between text-[10px] font-[var(--font-mono)] mt-0.5" style={{ color: 'var(--faded)' }}>
          <span>15%</span>
          <span>50%</span>
        </div>
      </div>

      {/* Optional: current selling price */}
      <div className="mt-6">
        <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--ink)' }}>
          Current Selling Price (optional)
        </label>
        <div className="relative max-w-[160px]">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm" style={{ color: 'var(--faded)' }}>$</span>
          <input
            type="number"
            min={0}
            step="0.01"
            placeholder="0.00"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(e.target.value ? parseFloat(e.target.value) : '')}
            className="w-full pl-7 pr-3 py-2 text-sm"
            style={{
              border: '1px solid var(--divider)',
              borderRadius: 4,
              fontFamily: 'var(--font-mono)',
              color: 'var(--ink)',
              background: 'var(--receipt)',
            }}
          />
        </div>
        <p className="text-[11px] mt-1" style={{ color: 'var(--faded)' }}>
          Enter your current price to see how it compares to the suggested price.
        </p>
      </div>
    </CalculatorLayout>
  )
}
