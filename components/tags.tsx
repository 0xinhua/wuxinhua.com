
import Image from 'next/image'
import tagsIcon from '@/assets/tags.svg'

const alt = `tag icon`;

const Tags = (props) => {
  const { tags } = props
  const tagList = tags ? tags.split(' ').filter(tag => tag) : []
  return (
    tagList.length ? <div className="flex flex-wrap">
      {
        tagList.map((tag, index) => {
          return (<span key={tag + index} className='mr-2 text-[0.8rem] px-2 py-1 md:mt-0 mt-2 rounded bg-gray-50 hover:bg-gray-100 dark:bg-transparent dark:text-gray-400'># {tag}</span>)
        })
      }
    </div>: null
  );
}

export default Tags;
