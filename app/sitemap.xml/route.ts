import { getPosts } from '@/lib/notion'

export const revalidate = 3600

export async function GET() {
  const posts = await getPosts()

  const urls = posts
    .map((post) => {
      const lastmod = post.publishedDate
        ? `<lastmod>${post.publishedDate}</lastmod>`
        : ''
      return `
    <url>
      <loc>https://blog.foodcosting.app${post.slug}</loc>
      ${lastmod}
      <changefreq>monthly</changefreq>
    </url>`
    })
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://blog.foodcosting.app</loc>
    <changefreq>weekly</changefreq>
  </url>${urls}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
