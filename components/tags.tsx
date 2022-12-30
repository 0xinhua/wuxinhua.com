
import Image from 'next/image'
import tagsIcon from '@/assets/tags.svg'

const alt = `tag icon`;

const Tags = (props) => {
  const { tags } = props
  const tagList = tags ? tags.split(' ').filter(tag => tag) : []
  return (
    tagList.length ? <div className="md:mx-1 flex mt-1.5 md:mt-0 flex-wrap">
      <Image
        className="text-base"
        alt={alt}
        src={tagsIcon}
      />
      {
        tagList.map(tag => {
          return (<span className='mr-1'>{tag}</span>)
        })
      }
    </div>: null
  );
}

export default Tags;
