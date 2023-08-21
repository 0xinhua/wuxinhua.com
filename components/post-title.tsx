import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const PostTitle = ({ children }: Props) => {
  return (
    <h1 className="text-3xl max-w-2xl mx-auto font-bold tracking-tighter md:leading-none text-center md:text-left">
      {children}
    </h1>
  )
}

export default PostTitle
