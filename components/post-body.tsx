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
      <div
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default PostBody
