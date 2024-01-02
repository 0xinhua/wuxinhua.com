import { CodeBlock } from './codeblock'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeRaw from "rehype-raw"
import ReactMarkdown, { Options } from 'react-markdown'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="
      prose
      prose-stone
      prose-base
      prose-code:before:content-none
      prose-code:after:content-none
      dark:prose-invert
      max-w-2xl
      mx-auto
      mt-8">
      <div className="flex-1 px-1 space-y-2 overflow-hidden">
        <ReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, className, children, ...props }) {

              const match = /language-(\w+)/.exec(className || '')

              if (match) {
                return (
                  <CodeBlock
                    key={Math.random()}
                    language={(match && match[1]) || ''}
                    value={String(children).replace(/\n$/, '')}
                    {...props}
                  />
                )
              }
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
            a({ node, children, ...props }) {
              return (
                <a className="text-blue-600 hover:underline underline-offset-4 no-underline font-normal" target='_blank' rel="noopener noreferrer" {...props}>
                  {children}
                </a>
              )
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}

export default PostBody
