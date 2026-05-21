import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getPosts, getPost } from '@/lib/notion'
import ArticleBody from '@/components/ArticleBody'

export const revalidate = 3600

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.map((post) => ({
    slug: post.slug.replace(/^\//, ''),
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost('/' + params.slug)
  if (!post) return {}

  const url = `https://blog.foodcosting.app/${params.slug}`

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: 'foodcosting.app',
      type: 'article',
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
      publishedTime: post.publishedDate,
    },
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const post = await getPost('/' + params.slug)
  if (!post) notFound()

  const url = `https://blog.foodcosting.app/${params.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage || undefined,
    datePublished: post.publishedDate,
    author: { '@type': 'Organization', name: 'foodcosting.app', url: 'https://foodcosting.app' },
    publisher: { '@type': 'Organization', name: 'foodcosting.app', url: 'https://foodcosting.app' },
    url,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <header className="mb-8">
          {post.publishedDate && (
            <p
              className="font-[var(--font-mono)] text-xs tracking-widest uppercase mb-3"
              style={{ color: 'var(--faded)' }}
            >
              {new Date(post.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </p>
          )}
          <h1 className="font-bold text-3xl leading-tight tracking-tight mb-4" style={{ color: 'var(--ink)' }}>
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-base leading-relaxed" style={{ color: 'var(--faded)' }}>
              {post.excerpt}
            </p>
          )}
          {post.featuredImage && (
            <div className="relative w-full h-64 mt-6 rounded-sm overflow-hidden">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 680px) 100vw, 680px"
                priority
              />
            </div>
          )}
        </header>
        <hr style={{ borderColor: 'var(--divider)', marginBottom: '2rem' }} />
        <ArticleBody html={post.bodyHtml} />
      </article>
    </>
  )
}
