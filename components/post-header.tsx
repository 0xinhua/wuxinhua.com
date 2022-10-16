import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import type Author from '../interfaces/author'

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
}

const PostHeader = ({ title, coverImage, date, author }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      { author && author?.picture ? <div className="max-w-2xl mx-auto">
        <Avatar name={author?.name} picture={author?.picture} />
      </div> : null }
      { coverImage ? <div className="max-w-2xl mx-auto">
        <CoverImage title={title} src={coverImage} />
      </div> : null }
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          {author && author?.name ? <Avatar name={author.name} picture={author.picture} /> : null }
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  )
}

export default PostHeader
