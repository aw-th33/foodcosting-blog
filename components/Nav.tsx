import Link from 'next/link'

export default function Nav() {
  return (
    <nav
      className="border-b px-4 py-4"
      style={{ borderColor: 'var(--divider)', backgroundColor: 'var(--receipt)' }}
    >
      <div className="mx-auto max-w-[680px] flex items-center justify-between">
        <Link
          href="https://foodcosting.app"
          className="flex items-center gap-2 no-underline"
          style={{ color: 'var(--ink)' }}
        >
          <span
            className="font-[var(--font-mono)] font-bold text-sm border-2 px-1"
            style={{ borderColor: 'var(--ink)', borderRadius: '3px' }}
          >
            f
          </span>
          <span className="font-[var(--font-mono)] font-bold tracking-wide text-sm">
            foodcosting
            <span style={{ color: 'var(--faded)', fontSize: '0.85em' }}>.app</span>
          </span>
        </Link>
        <Link
          href="/"
          className="font-[var(--font-mono)] text-xs tracking-widest uppercase"
          style={{ color: 'var(--faded)' }}
        >
          Blog
        </Link>
      </div>
    </nav>
  )
}
