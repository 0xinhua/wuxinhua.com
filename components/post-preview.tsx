import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import type Author from '../interfaces/author'
import Tags from './tags'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
  tags: string
}

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
  tags
}: Props) => {
  return (
    <div className="mb-8">
      <h3 className="text-xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]" legacyBehavior>
          <a className="
            hover:underline hover:text-blue-600 underline-offset-4 bg-gradient-to-r from-blue-200 to-blue-50 bg-[length:0px_10px] bg-left-bottom
            bg-no-repeat
            transition-[background-size]
            duration-500
            hover:bg-[length:100%_3px]
            group-hover:bg-[length:100%_10px]
            dark:from-purple-800 dark:to-purple-900
            "
          title={title}>{title}
          </a>
        </Link>
      </h3>
      <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-2">{excerpt}</p>
      {
        coverImage
        ? <div className="mb-4">
          <CoverImage slug={slug} title={title} src={coverImage} />
        </div>
        : null
      }
      <div className="flex flex-col text-sm mb-4 text-left text-gray-500 md:text-left md:mb-0 flex md:flex-col flex-row gap-3">
        <Tags tags={tags} />
        <DateFormatter dateString={date} />
      </div>
    </div>
  )
}

export default PostPreview
