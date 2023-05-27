import { unified } from 'unified'
import prism from 'remark-prism'
import remarkGfm from "remark-gfm"
import rehypeExternalLinks from 'rehype-external-links'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkHtml from 'remark-html'
import remarkParse from 'remark-parse'

export default async function markdownToHtml(markdown: string) {
  const result = await unified()
  .use(remarkParse)
  .use(remarkHtml, { sanitize: false })
  .use(remarkGfm)
  .use(prism)
  .use(remarkRehype)
  .use(rehypeExternalLinks, { rel: ['nofollow', 'noreferrer', 'noopener'], target: '_blank'})
  .use(rehypeStringify)
  .process(markdown)
  return String(result)
}