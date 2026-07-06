import type { Metadata } from 'next'
import { getPosts } from '@/lib/notion'
import HeroCard from '@/components/HeroCard'
import GridCard from '@/components/GridCard'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Food Costing App: Guides, Calculators & Menu Pricing Tools | foodcosting.app',
  description: 'Learn how to calculate food costs, price your menu, and protect your margins with the food costing app built for US restaurants, caterers, and food trucks.',
  alternates: { canonical: 'https://blog.foodcosting.app' },
  openGraph: {
    title: 'Food Costing App: Guides, Calculators & Menu Pricing Tools',
    description: 'Learn how to calculate food costs, price your menu, and protect your margins with the food costing app built for US food businesses.',
    url: 'https://blog.foodcosting.app',
    siteName: 'foodcosting.app',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'foodcosting.app',
  url: 'https://blog.foodcosting.app',
  description: 'Food costing app with practical guides on food cost, menu pricing, and running a profitable food business.',
  publisher: {
    '@type': 'Organization',
    name: 'foodcosting.app',
    url: 'https://foodcosting.app',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://blog.foodcosting.app/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

export default async function BlogIndex() {
  const posts = await getPosts()
  const [hero, ...rest] = posts

  return (
    <div className="mx-auto max-w-[960px] px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="mb-8">
        <h1
          className="font-bold text-3xl tracking-tight mb-2"
          style={{ color: 'var(--ink)' }}
        >
          Food Costing App Guides & Menu Pricing
        </h1>
        <p
          className="font-[var(--font-mono)] text-xs tracking-widest uppercase"
          style={{ color: 'var(--faded)' }}
        >
          Practical guides for food business owners
        </p>
      </header>

      {/* CTA banner linking to main app */}
      <div
        className="mb-8 p-5 rounded-sm flex items-center justify-between gap-4 flex-wrap"
        style={{ backgroundColor: 'var(--receipt)', border: '1px solid var(--divider)' }}
      >
        <div>
          <p
            className="font-[var(--font-mono)] text-xs tracking-widest uppercase mb-1"
            style={{ color: 'var(--faded)' }}
          >
            Free Food Costing Tool
          </p>
          <p
            className="font-bold text-lg tracking-tight"
            style={{ color: 'var(--ink)' }}
          >
            Calculate recipe costs in minutes
          </p>
        </div>
        <a
          href="https://foodcosting.app"
          className="font-[var(--font-mono)] text-sm font-bold tracking-wide px-5 py-3 rounded-sm no-underline"
          style={{ backgroundColor: 'var(--ink)', color: 'var(--paper)' }}
        >
          Try the food costing app
        </a>
      </div>

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