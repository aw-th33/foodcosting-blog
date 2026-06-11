import type { Metadata } from 'next'
import { getResources } from '@/lib/notion'
import ResourceCard from '@/components/ResourceCard'
import type { PostMeta } from '@/lib/types'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Free Tools & Resources for Food Businesses | foodcosting.app',
  description:
    'Free food costing calculators, pricing templates, workbooks, and guides for restaurant owners, caterers, and food businesses.',
  alternates: { canonical: 'https://blog.foodcosting.app/resources' },
  openGraph: {
    title: 'Free Tools & Resources for Food Businesses | foodcosting.app',
    description:
      'Free food costing calculators, pricing templates, workbooks, and guides for restaurant owners, caterers, and food businesses.',
    url: 'https://blog.foodcosting.app/resources',
    siteName: 'foodcosting.app',
    type: 'website',
  },
}

// Duplicate workbook slugs in Notion — skip these since the hardcoded card covers them
const SKIP_SLUGS = new Set([
  '/free-recipe-costing-workbook',
  '/recipe-costing-menu-pricing-workbook',
])

const WORKBOOK: PostMeta & { isWorkbook: boolean; fileInfo: string } = {
  id: 'workbook',
  title: 'Recipe Costing & Menu Pricing Workbook',
  slug: '/workbook',
  excerpt:
    'A free 7-tab workbook for Google Sheets and Excel. Calculate portion costs, build an ingredient library, and set menu prices that protect your margin.',
  featuredImage: '',
  publishedDate: '2025-05-01',
  targetKeyword: 'recipe costing workbook',
  isWorkbook: true,
  fileInfo: 'Excel / Google Sheets · 66 KB · No signup required',
}

export default async function ResourcesPage() {
  const notionResources = (await getResources()).filter(
    (post) => !SKIP_SLUGS.has(post.slug)
  )

  return (
    <div className="mx-auto max-w-[960px] px-4 py-10">
      {/* ── Hero ── */}
      <header className="mb-10">
        <p
          className="inline-block font-[var(--font-mono)] text-[10px] tracking-[0.15em] uppercase px-2 py-1 mb-4"
          style={{
            background: '#d8f3dc',
            color: '#2d6a4f',
            fontWeight: 600,
            borderRadius: 3,
          }}
        >
          Free Tools &amp; Templates
        </p>
        <h1
          className="font-bold text-3xl tracking-tight mb-3"
          style={{ color: 'var(--ink)' }}
        >
          Resources for food business owners
        </h1>
        <p className="max-w-[520px]" style={{ color: 'var(--faded)', fontSize: '1rem' }}>
          Calculators, templates, and guides built by operators who&apos;ve been in your
          shoes. Grab what you need — most are free, no signup required.
        </p>
      </header>

      {/* ── Grid ── */}
      {notionResources.length === 0 ? (
        <p style={{ color: 'var(--faded)' }}>Loading resources...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Workbook always first */}
          <ResourceCard
            key="workbook"
            post={WORKBOOK}
            isWorkbook
            fileInfo={WORKBOOK.fileInfo}
          />

          {/* Notion resources */}
          {notionResources.map((post) => (
            <ResourceCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* ── Footer note ── */}
      <p
        className="mt-12 pt-6 text-center text-sm"
        style={{ color: 'var(--faded)', borderTop: '1px solid var(--divider)' }}
      >
        More resources coming soon. Have a request?{' '}
        <a
          href="https://foodcosting.app"
          style={{ color: 'var(--ink)', textDecoration: 'underline' }}
        >
          Let us know
        </a>
        .
      </p>
    </div>
  )
}
