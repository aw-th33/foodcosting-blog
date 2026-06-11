'use client'

import { useState, useMemo } from 'react'
import CalculatorLayout from '@/components/CalculatorLayout'

function fmt(n: number): string {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

interface Ingredient {
  id: number
  name: string
  packCost: number
  packSize: number
  packUnit: string
  recipeQty: number
  recipeUnit: string
}

const UNITS = ['g', 'kg', 'oz', 'lb', 'ml', 'L', 'cup', 'tbsp', 'tsp', 'each']

const INITIAL: Ingredient[] = [
  { id: 1, name: '', packCost: 0, packSize: 1, packUnit: 'kg', recipeQty: 0, recipeUnit: 'g' },
  { id: 2, name: '', packCost: 0, packSize: 1, packUnit: 'kg', recipeQty: 0, recipeUnit: 'g' },
]

export default function RecipeCostCalculator() {
  const [ingredients, setIngredients] = useState<Ingredient[]>(INITIAL)
  const [portions, setPortions] = useState(1)
  const [wastePct, setWastePct] = useState(5)
  const [targetFcPct, setTargetFcPct] = useState(30)

  const ingredientCosts = useMemo(() =>
    ingredients.map((i) => {
      if (!i.packCost || !i.packSize || !i.recipeQty) return 0
      return (i.packCost / i.packSize) * i.recipeQty
    }),
    [ingredients]
  )

  const subtotal = useMemo(() => ingredientCosts.reduce((s, c) => s + c, 0), [ingredientCosts])
  const wasteCost = wastePct > 0 ? subtotal * (wastePct / 100) : 0
  const totalCost = subtotal + wasteCost
  const costPerPortion = portions > 0 ? totalCost / portions : 0
  const suggestedPrice = targetFcPct > 0 ? costPerPortion / (targetFcPct / 100) : 0

  const add = () => {
    const maxId = ingredients.reduce((m, i) => Math.max(m, i.id), 0)
    setIngredients([...ingredients, { id: maxId + 1, name: '', packCost: 0, packSize: 1, packUnit: 'kg', recipeQty: 0, recipeUnit: 'g' }])
  }
  const remove = (id: number) => {
    if (ingredients.length <= 1) return
    setIngredients(ingredients.filter((i) => i.id !== id))
  }
  const update = (id: number, f: keyof Ingredient, v: string | number) => {
    setIngredients(ingredients.map((i) => (i.id === id ? { ...i, [f]: v } : i)))
  }

  return (
    <CalculatorLayout
      title="Free Recipe Cost Calculator"
      description="Cost any recipe down to the penny. Enter your ingredients with pack costs, sizes, and recipe quantities — plus yield and waste — to get an accurate cost per portion."
      result={
        subtotal > 0 ? (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-[var(--font-mono)] uppercase tracking-widest" style={{ color: 'var(--faded)' }}>
                Total Ingredient Cost
              </p>
              <p className="text-xl font-bold" style={{ color: 'var(--ink)' }}>
                ${fmt(subtotal)}
              </p>
            </div>
            {wasteCost > 0 && (
              <div>
                <p className="text-xs font-[var(--font-mono)] uppercase tracking-widest" style={{ color: 'var(--faded)' }}>
                  Waste Allowance ({wastePct}%)
                </p>
                <p className="text-sm font-bold" style={{ color: 'var(--faded)' }}>
                  +${fmt(wasteCost)}
                </p>
              </div>
            )}
            <div>
              <p className="text-xs font-[var(--font-mono)] uppercase tracking-widest" style={{ color: 'var(--faded)' }}>
                Total Recipe Cost
              </p>
              <p className="text-xl font-bold" style={{ color: 'var(--ink)' }}>
                ${fmt(totalCost)}
              </p>
            </div>
            <div className="p-3" style={{ background: '#d8f3dc', borderRadius: 4 }}>
              <p className="text-[10px] font-[var(--font-mono)] uppercase tracking-widest mb-0.5" style={{ color: '#2d6a4f' }}>
                Cost Per Portion
              </p>
              <p className="text-xl font-bold" style={{ color: '#2d6a4f' }}>
                ${fmt(costPerPortion)}
              </p>
              <p className="text-[11px]" style={{ color: '#40916c' }}>
                Suggested price: ${fmt(suggestedPrice)} at {targetFcPct}% food cost
              </p>
            </div>
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
          type="number" min={1} value={portions}
          onChange={(e) => setPortions(Math.max(1, parseInt(e.target.value) || 1))}
          className="w-24 px-3 py-2 text-sm"
          style={{ border: '1px solid var(--divider)', borderRadius: 4, fontFamily: 'var(--font-mono)', color: 'var(--ink)', background: 'var(--receipt)' }}
        />
      </div>

      {/* Ingredients table */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>Ingredients</p>
          <button onClick={add} className="text-xs font-semibold px-3 py-1.5" style={{ border: '1px solid var(--divider)', borderRadius: 4, color: 'var(--ink)', background: 'var(--receipt)', cursor: 'pointer' }}>
            + Add
          </button>
        </div>

        {/* Table header (hidden on mobile, visible on sm+) */}
        <div className="hidden sm:grid grid-cols-[1fr_90px_70px_90px_70px_30px] gap-1.5 mb-1 text-[10px] font-[var(--font-mono)] uppercase tracking-wider" style={{ color: 'var(--faded)' }}>
          <span>Ingredient</span>
          <span>Pack $</span>
          <span>Size</span>
          <span>Qty</span>
          <span>Unit</span>
          <span></span>
        </div>

        <div className="space-y-1.5">
          {ingredients.map((ing) => {
            const idx = ingredients.findIndex((i) => i.id === ing.id)
            const lineCost = ingredientCosts[idx] || 0
            return (
              <div key={ing.id} className="grid grid-cols-1 sm:grid-cols-[1fr_90px_70px_90px_70px_30px] gap-1.5 items-center">
                <input
                  type="text" placeholder="e.g. Chicken breast"
                  value={ing.name}
                  onChange={(e) => update(ing.id, 'name', e.target.value)}
                  className="px-2 py-1.5 text-xs w-full"
                  style={{ border: '1px solid var(--divider)', borderRadius: 3, color: 'var(--ink)', background: 'var(--receipt)' }}
                />
                <div className="flex gap-1">
                  <span className="text-xs self-center" style={{ color: 'var(--faded)' }}>$</span>
                  <input
                    type="number" min={0} step="0.01" placeholder="0.00"
                    value={ing.packCost || ''}
                    onChange={(e) => update(ing.id, 'packCost', parseFloat(e.target.value) || 0)}
                    className="flex-1 px-2 py-1.5 text-xs"
                    style={{ border: '1px solid var(--divider)', borderRadius: 3, fontFamily: 'var(--font-mono)', color: 'var(--ink)', background: 'var(--receipt)' }}
                  />
                </div>
                <div className="flex gap-1">
                  <input
                    type="number" min={0.001} step="0.01" placeholder="1"
                    value={ing.packSize || ''}
                    onChange={(e) => update(ing.id, 'packSize', parseFloat(e.target.value) || 1)}
                    className="flex-1 px-2 py-1.5 text-xs"
                    style={{ border: '1px solid var(--divider)', borderRadius: 3, fontFamily: 'var(--font-mono)', color: 'var(--ink)', background: 'var(--receipt)' }}
                  />
                </div>
                <input
                  type="number" min={0} step="0.1" placeholder="0"
                  value={ing.recipeQty || ''}
                  onChange={(e) => update(ing.id, 'recipeQty', parseFloat(e.target.value) || 0)}
                  className="px-2 py-1.5 text-xs"
                  style={{ border: '1px solid var(--divider)', borderRadius: 3, fontFamily: 'var(--font-mono)', color: 'var(--ink)', background: 'var(--receipt)' }}
                />
                <select
                  value={ing.recipeUnit}
                  onChange={(e) => update(ing.id, 'recipeUnit', e.target.value)}
                  className="px-1 py-1.5 text-xs"
                  style={{ border: '1px solid var(--divider)', borderRadius: 3, color: 'var(--ink)', background: 'var(--receipt)' }}
                >
                  {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
                <div className="flex items-center gap-1">
                  {ingredients.length > 1 && (
                    <button onClick={() => remove(ing.id)} style={{ color: 'var(--faded)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>×</button>
                  )}
                  {lineCost > 0 && (
                    <span className="text-[10px] font-[var(--font-mono)]" style={{ color: 'var(--faded)' }}>
                      ${fmt(lineCost)}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Waste + Target */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--ink)' }}>
            Waste %: {wastePct}%
          </label>
          <input type="range" min={0} max={20} value={wastePct} onChange={(e) => setWastePct(parseInt(e.target.value))} className="w-full" />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--ink)' }}>
            Target Food Cost: {targetFcPct}%
          </label>
          <input type="range" min={15} max={50} value={targetFcPct} onChange={(e) => setTargetFcPct(parseInt(e.target.value))} className="w-full" />
        </div>
      </div>
    </CalculatorLayout>
  )
}
