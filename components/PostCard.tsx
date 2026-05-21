import Link from 'next/link'
import Image from 'next/image'
import type { PostMeta } from '@/lib/types'

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article
      className="border rounded-sm overflow-hidden"
      style={{ borderColor: 'var(--divider)', backgroundColor: 'var(--receipt)' }}
    >
      {post.featuredImage && (
        <div className="relative w-full h-48">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 680px) 100vw, 680px"
          />
        </div>
      )}
      <div className="p-5">
        {post.publishedDate && (
          <p
            className="font-[var(--font-mono)] text-xs tracking-widest uppercase mb-2"
            style={{ color: 'var(--faded)' }}
          >
            {new Date(post.publishedDate).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric',
            })}
          </p>
        )}
        <h2 className="font-bold text-xl leading-tight mb-2" style={{ color: 'var(--ink)' }}>
          <Link href={post.slug} className="hover:underline" style={{ color: 'var(--ink)' }}>
            {post.title}
          </Link>
        </h2>
        {post.excerpt && (
          <p className="text-sm leading-relaxed" style={{ color: 'var(--faded)' }}>
            {post.excerpt}
          </p>
        )}
        <Link
          href={post.slug}
          className="inline-block mt-3 font-[var(--font-mono)] text-xs tracking-widest uppercase underline"
          style={{ color: 'var(--ink)' }}
        >
          Read →
        </Link>
      </div>
    </article>
  )
}
