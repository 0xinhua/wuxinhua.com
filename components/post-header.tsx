import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'

type Props = {
  title: string
  coverImage: string
  date: string
};

const PostHeader = ({ title, coverImage, date }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      { coverImage ? <div className="max-w-2xl mx-auto">
        <CoverImage title={title} src={coverImage} />
      </div> : null }
      <div className="max-w-2xl mx-auto mt-2">
        { date ? <div className="mb-4 text-base text-slate-600 dark:text-gray-400 mt-3">
          @0xinhua 发布于 <DateFormatter dateString={date} />
        </div> : null }
      </div>
    </>
  )
}

export default PostHeader
