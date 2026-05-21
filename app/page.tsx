import type { Metadata } from 'next'
import { getPosts } from '@/lib/notion'
import HeroCard from '@/components/HeroCard'
import GridCard from '@/components/GridCard'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Food Cost & Menu Pricing Blog | foodcosting.app',
  description: 'Practical guides on food cost, menu pricing, and running a profitable food business.',
  alternates: { canonical: 'https://blog.foodcosting.app' },
  openGraph: {
    title: 'Food Cost & Menu Pricing Blog | foodcosting.app',
    description: 'Practical guides on food cost, menu pricing, and running a profitable food business.',
    url: 'https://blog.foodcosting.app',
    siteName: 'foodcosting.app',
    type: 'website',
  },
}

export default async function BlogIndex() {
  const posts = await getPosts()
  const [hero, ...rest] = posts

  return (
    <div className="mx-auto max-w-[960px] px-4 py-10">
      <header className="mb-8">
        <h1
          className="font-bold text-3xl tracking-tight mb-2"
          style={{ color: 'var(--ink)' }}
        >
          Food Cost & Menu Pricing
        </h1>
        <p
          className="font-[var(--font-mono)] text-xs tracking-widest uppercase"
          style={{ color: 'var(--faded)' }}
        >
          Practical guides for food business owners
        </p>
      </header>

      {hero && <HeroCard post={hero} />}

      {rest.length > 0 && (
        <>
          <p
            className="font-[var(--font-mono)] text-xs tracking-widest uppercase mt-10 mb-4 pb-3"
            style={{
              color: 'var(--faded)',
              borderBottom: '1px solid var(--divider)',
            }}
          >
            More Articles
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <GridCard key={post.id} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
