export default function ArticleBody({ html }: { html: string }) {
  return (
    <div
      className="prose-article"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
