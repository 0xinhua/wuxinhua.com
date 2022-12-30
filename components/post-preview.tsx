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
      <h3 className="text-2xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]" legacyBehavior>
          <a className="hover:underline underline">{title}</a>
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
      <div className="text-sm mb-4 text-left text-gray-500 md:text-left md:mb-0 flex flex-col md:flex-row">
        <DateFormatter dateString={date} /> <Tags tags={tags} />
      </div>
      {/* {author && author?.name ? <Avatar name={author.name} picture={author.picture} /> : null} */}
    </div>
  )
}

export default PostPreview
