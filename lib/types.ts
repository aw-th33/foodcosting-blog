export interface PostMeta {
  id: string
  title: string
  slug: string
  excerpt: string
  featuredImage: string
  publishedDate: string
  targetKeyword: string
}

export interface Post extends PostMeta {
  bodyHtml: string
}
