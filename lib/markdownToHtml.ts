import { remark } from 'remark'
import html from 'remark-html'
import prism from 'remark-prism'
import remarkGfm from "remark-gfm"

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(prism)
    .use(remarkGfm)
    .process(markdown)
  return result.toString()
}
