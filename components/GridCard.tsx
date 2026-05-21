import Link from 'next/link'
import Image from 'next/image'
import type { PostMeta } from '@/lib/types'

export default function GridCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={post.slug}
      className="group block no-underline"
      style={{ color: 'inherit' }}
    >
      <article
        className="overflow-hidden rounded-sm h-full flex flex-col"
        style={{
          border: '1px solid var(--divider)',
          backgroundColor: 'var(--receipt)',
        }}
      >
        {post.featuredImage && (
          <div className="relative w-full" style={{ height: '160px', flexShrink: 0 }}>
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, 320px"
            />
          </div>
        )}
        <div className="flex flex-col flex-1" style={{ padding: '16px 18px 20px' }}>
          {post.publishedDate && (
            <p
              className="font-[var(--font-mono)] text-xs tracking-widest uppercase mb-2"
              style={{ color: 'var(--faded)' }}
            >
              {new Date(post.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </p>
          )}
          <h3
            className="font-bold leading-snug tracking-tight flex-1"
            style={{ fontSize: '0.95rem', color: 'var(--ink)' }}
          >
            {post.title}
          </h3>
          <span
            className="font-[var(--font-mono)] text-xs tracking-widest uppercase mt-3 inline-flex items-center gap-1"
            style={{ color: 'var(--faded)' }}
          >
            Read
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
