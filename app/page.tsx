import type { Metadata } from 'next'
import { getPosts } from '@/lib/notion'
import PostCard from '@/components/PostCard'

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

  return (
    <>
      <header className="mb-10">
        <h1 className="font-bold text-3xl tracking-tight mb-2" style={{ color: 'var(--ink)' }}>
          Food Cost & Menu Pricing Blog
        </h1>
        <p className="text-sm" style={{ color: 'var(--faded)' }}>
          Practical guides for food business owners
        </p>
      </header>
      <div className="flex flex-col gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}
