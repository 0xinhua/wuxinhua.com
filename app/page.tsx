import Image from 'next/image'

import MoreStories from '@/components/more-stories'
import { getAllPosts } from '@/lib/api'
import Search from '@/components/search'
import { CMS_NAME } from '@/lib/constants'
import { Metadata } from 'next'
import mixpanel from 'mixpanel-browser'

export const metadata: Metadata = {
  title: `首页 - ${CMS_NAME}`,
  description: 'Blog about Engineering, Start-up Business, Tech trends | wuxinhua.com',
}

export default function Home() {

  mixpanel.init('39739eb6ec9042a8e2f6502b4db42554')
  mixpanel.track_pageview({"page": "home", "url": "https://wuxinhua.com"})

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

