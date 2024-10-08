import { CodeBlock } from './codeblock'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeRaw from "rehype-raw"
import ReactMarkdown, { Options } from 'react-markdown'
//@ts-ignore
import { HeadingProps } from "react-markdown/lib/ast-to-react"
import React from "react"
import TOC from './toc'
import classNames from 'classnames'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {

  const toc: {
    level: number,
    id: string,
    title: string,
  }[] = []

  const addToTOC = ({children, ...props}: React.PropsWithChildren<HeadingProps>) => {
    const level = Number(props.node.tagName.match(/h(\d)/)?.slice(1))

    if (level && children && typeof children[0] === "string") {

      const title = children; // 直接获取标题内容
      if (title) {
        const id = title
        toc.push({
          level,
          id,
          title,
        })
        return React.createElement(
          props.node.tagName, {id}, children
        )
      }
    } else {
      return React.createElement(props.node.tagName, props, children);
    }
  }

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
      relative
      mt-8"
    >
      <div className="flex-1 px-1 space-y-2">
        <ReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h2: addToTOC,
            h3: addToTOC,
            h4: addToTOC,
            h5: addToTOC,
            h6: addToTOC,
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
            img({ node, src, ...props }) {
              const newSrc = src + "?"
              return <img src={newSrc} {...props} />
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
        <TOC toc={toc} className="lg:flex hidden absolute -right-64 -top-1"/>
      </div>
    </div>
  )
}

export default PostBody
