import Image from 'next/image'

import MoreStories from '@/components/more-stories'
import { getAllPosts } from '@/lib/api'
import Search from '@/components/search'
import { CMS_NAME } from '@/lib/constants'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `首页 - ${CMS_NAME}`,
  description: 'Blog about Engineering, Start-up Business, Tech trends | wuxinhua.com',
}

export default function Home() {

  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'tags',
    'ogImage'
  ])

  const morePosts = allPosts.slice(0)
  return (
      <>
        <Search />
        {/* @ts-ignore */}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </>
  )
}

