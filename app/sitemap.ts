import type { MetadataRoute } from 'next'
import { getPosts } from '@/lib/notion'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => {
    const path = post.slug.startsWith('/') ? post.slug : `/${post.slug}`
    return {
      url: `https://blog.foodcosting.app${path}`,
      lastModified: post.publishedDate ? new Date(post.publishedDate) : undefined,
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  })

  return [
    {
      url: 'https://blog.foodcosting.app',
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...postEntries,
  ]
}
// sitemap updated 1783370319
