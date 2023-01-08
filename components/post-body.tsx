type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="
      prose
      prose-stone
      prose-base
      dark:prose-invert
      max-w-2xl
      mx-auto
      mt-10">
      <div
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
}

export default PostBody
