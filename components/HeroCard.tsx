import Link from 'next/link'
import Image from 'next/image'
import type { PostMeta } from '@/lib/types'

export default function HeroCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={post.slug}
      className="group block no-underline"
      style={{ color: 'inherit' }}
    >
      <article
        className="grid overflow-hidden rounded-sm"
        style={{
          border: '1px solid var(--divider)',
          backgroundColor: 'var(--receipt)',
          gridTemplateColumns: '1fr 1fr',
        }}
      >
        {post.featuredImage && (
          <div className="relative" style={{ minHeight: '280px' }}>
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 960px) 100vw, 480px"
              priority
            />
          </div>
        )}
        <div
          className="flex flex-col justify-center"
          style={{ padding: '32px 28px' }}
        >
          <p
            className="font-[var(--font-mono)] text-xs tracking-widest uppercase mb-3 flex items-center gap-2"
            style={{ color: 'var(--faded)' }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '16px',
                height: '1px',
                background: 'var(--faded)',
                flexShrink: 0,
              }}
            />
            {post.publishedDate
              ? new Date(post.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Latest Post'}
          </p>
          <h2
            className="font-bold leading-tight tracking-tight mb-3"
            style={{ fontSize: '1.45rem', color: 'var(--ink)' }}
          >
            {post.title}
          </h2>
          {post.excerpt && (
            <p
              className="text-sm leading-relaxed mb-5"
              style={{ color: 'var(--faded)' }}
            >
              {post.excerpt}
            </p>
          )}
          <span
            className="font-[var(--font-mono)] text-xs tracking-widest uppercase inline-flex items-center gap-2"
            style={{ color: 'var(--ink)' }}
          >
            Read article
            <span
              className="transition-transform duration-150 group-hover:translate-x-1"
              style={{ display: 'inline-block' }}
            >
              →
            </span>
          </span>
        </div>
      </article>
    </Link>
  )
}
