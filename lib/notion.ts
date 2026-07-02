import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'
import type { PostMeta, Post } from './types'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const n2m = new NotionToMarkdown({ notionClient: notion })

const DB_ID = process.env.NOTION_BLOG_DB_ID!

function extractText(richText: any[]): string {
  return richText?.map((t: any) => t.plain_text).join('') ?? ''
}

function normalizeSlug(slug: string): string {
  return slug.startsWith('/') ? slug : '/' + slug
}

export async function getPosts(): Promise<PostMeta[]> {
  try {
    const response = await notion.databases.query({
      database_id: DB_ID,
      filter: { property: 'Status', select: { equals: 'Published' } },
      sorts: [{ property: 'Date', direction: 'descending' }],
    })

    return response.results
      .filter((page: any) => page.object === 'page')
      .map((page: any) => {
        const props = page.properties
        return {
          id: page.id,
          title: extractText(props['Title']?.title ?? []),
          slug: normalizeSlug(extractText(props['Slug']?.rich_text ?? [])),
          excerpt: extractText(props['Excerpt']?.rich_text ?? []),
          featuredImage: props['Featured Image']?.url ?? '',
          publishedDate: props['Date']?.date?.start ?? props['Published Date']?.date?.start ?? '',
          targetKeyword: extractText(props['Target Keyword']?.rich_text ?? []),
        }
      })
      .filter((post) => post.slug !== '')
  } catch (e) {
    console.error('[notion] getPosts failed:', e)
    return []
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  const normalizedSlug = normalizeSlug(slug)
  try {
    const response = await notion.databases.query({
      database_id: DB_ID,
      filter: {
        and: [
          { property: 'Status', select: { equals: 'Published' } },
          { property: 'Slug', rich_text: { equals: normalizedSlug } },
        ],
      },
    })

    const page = response.results[0] as any
    if (!page) return null

    const props = page.properties
    const mdBlocks = await n2m.pageToMarkdown(page.id)
    const mdString = n2m.toMarkdownString(mdBlocks)
    const bodyHtml = DOMPurify.sanitize(await marked(mdString.parent ?? ''))

    return {
      id: page.id,
      title: extractText(props['Title']?.title ?? []),
      slug: extractText(props['Slug']?.rich_text ?? []),
      excerpt: extractText(props['Excerpt']?.rich_text ?? []),
      featuredImage: props['Featured Image']?.url ?? '',
      publishedDate: props['Date']?.date?.start ?? props['Published Date']?.date?.start ?? '',
      targetKeyword: extractText(props['Target Keyword']?.rich_text ?? []),
      bodyHtml,
    }
  } catch (e) {
    console.error('[notion] getPost failed:', slug, e)
    return null
  }
}
