import Link from 'next/link'

export default function CtaBanner() {
  return (
    <div
      className="mt-12 p-6 border text-center"
      style={{
        borderColor: 'var(--divider)',
        backgroundColor: 'var(--receipt)',
        borderRadius: '3px',
      }}
    >
      <p
        className="font-bold text-lg mb-3"
        style={{ color: 'var(--ink)' }}
      >
        Stop guessing your food costs.
      </p>
      <p
        className="text-sm mb-5 leading-relaxed"
        style={{ color: 'var(--faded)' }}
      >
        Join restaurant owners using foodcosting.app to price menus, cost
        recipes, and protect their margins — in minutes, not spreadsheets.
      </p>
      <Link
        href="https://foodcosting.app"
        className="inline-block font-[var(--font-mono)] text-xs tracking-widest uppercase px-6 py-3 border font-bold"
        style={{
          color: 'var(--receipt)',
          backgroundColor: 'var(--ink)',
          borderColor: 'var(--ink)',
          borderRadius: '3px',
        }}
      >
        Try it free
      </Link>
      <p
        className="font-[var(--font-mono)] text-xs mt-3"
        style={{ color: 'var(--faded)' }}
      >
        No credit card required
      </p>
    </div>
  )
}
