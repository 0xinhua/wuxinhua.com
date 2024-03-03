import Head from 'next/head'
import PostBody from '@/components/post-body'
import PostHeader from '@/components/post-header'
import { getPostBySlug, getAllPosts } from '@/lib/api'
import { CMS_NAME } from '@/lib/constants'
import mixpanel from 'mixpanel-browser'

type Params = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }) {
  let post = getPostBySlug(params.slug, [
    'title',
    'excerpt',
  ])
  return {
    title: `${post.title} - ${CMS_NAME}`,
    description: `${post.excerpt} - ${CMS_NAME}`
  }
}


export default async function Post({ params }: Params) {

  let post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
    'excerpt',
    'tags'
  ])

  mixpanel.init('39739eb6ec9042a8e2f6502b4db42554')
  mixpanel.track_pageview({"page": "posts", "url": `https://wuxinhua.com/posts/${params.slug}`})
  
  return (
    <>
      <article className="mt-1 mb-16">
        <Head>
          <title>
            {post.title} - {CMS_NAME}
          </title>
          <meta name="description" content={post.excerpt} />
          <meta name="keywords" content={post.tags}></meta>
          {/* @ts-ignore */}
          {post?.ogImage?.url ? <meta property="og:image" content={post.ogImage.url} /> : null}
        </Head>
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
        />
        <PostBody content={post.content} />
      </article>
    </>
  )
}

export async function generateStaticParams() {
  const posts = getAllPosts(['slug'])
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
