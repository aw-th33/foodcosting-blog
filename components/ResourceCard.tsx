import Link from 'next/link'
import type { PostMeta } from '@/lib/types'

interface ResourceCardProps {
  post: PostMeta
  isWorkbook?: boolean
  downloadUrl?: string
  fileInfo?: string
}

export default function ResourceCard({
  post,
  isWorkbook = false,
  downloadUrl,
  fileInfo,
}: ResourceCardProps) {
  return (
    <article
      className="flex flex-col gap-3 p-5"
      style={{
        background: 'var(--receipt)',
        border: '1px solid var(--divider)',
        borderRadius: 6,
      }}
    >
      {/* Type badge */}
      <div className="flex items-center gap-2 flex-wrap">
        {isWorkbook ? (
          <span
            className="font-[var(--font-mono)] text-[10px] tracking-[0.08em] uppercase px-2 py-0.5"
            style={{
              background: '#fce1cf',
              color: '#e07b39',
              borderRadius: 3,
              fontWeight: 600,
            }}
          >
            Workbook
          </span>
        ) : (
          <span
            className="font-[var(--font-mono)] text-[10px] tracking-[0.08em] uppercase px-2 py-0.5"
            style={{
              background: 'var(--divider)',
              color: 'var(--faded)',
              borderRadius: 3,
              fontWeight: 600,
            }}
          >
            Guide
          </span>
        )}

        {isWorkbook && (
          <span
            className="font-[var(--font-mono)] text-[10px] tracking-[0.08em] uppercase px-2 py-0.5"
            style={{
              background: '#d8f3dc',
              color: '#2d6a4f',
              borderRadius: 3,
              fontWeight: 600,
            }}
          >
            Free
          </span>
        )}
      </div>

      {/* Title */}
      <h2
        className="font-bold leading-tight"
        style={{ fontSize: '1rem', color: 'var(--ink)', letterSpacing: '-0.01em' }}
      >
        {post.title}
      </h2>

      {/* Excerpt */}
      <p className="text-sm flex-1" style={{ color: 'var(--faded)', lineHeight: 1.55 }}>
        {post.excerpt}
      </p>

      {/* Meta / file info */}
      {fileInfo && (
        <p
          className="font-[var(--font-mono)] text-[11px]"
          style={{ color: 'var(--faded)' }}
        >
          {fileInfo}
        </p>
      )}

      {/* CTA */}
      {isWorkbook ? (
        <Link
          href={post.slug}
          className="inline-flex items-center gap-1.5 font-semibold text-sm w-fit mt-1 px-4 py-2"
          style={{
            background: 'var(--ink)',
            color: 'var(--receipt)',
            borderRadius: 4,
            textDecoration: 'none',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Get Free Workbook
        </Link>
      ) : (
        <Link
          href={`/${post.slug.replace(/^\//, '')}`}
          className="inline-flex items-center gap-1.5 font-semibold text-sm w-fit mt-1 px-4 py-2"
          style={{
            border: '1.5px solid var(--ink)',
            color: 'var(--ink)',
            borderRadius: 4,
            textDecoration: 'none',
          }}
        >
          Read Guide
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </Link>
      )}
    </article>
  )
}
