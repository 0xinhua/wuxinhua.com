import Head from 'next/head'
import Container from '@/components/container'
import PostBody from '@/components/post-body'
import Header from '@/components/header'
import PostHeader from '@/components/post-header'
import Layout from '@/components/layout'
import { getPostBySlug, getAllPosts } from '../../../lib/api'
import PostTitle from '@/components/post-title'
import { CMS_NAME } from '@/lib/constants'
import markdownToHtml from '@/lib/markdownToHtml'
import type PostType from '@/interfaces/post'

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
  
  // const content = await markdownToHtml(post.content || '')
  return (
    <>
      <article className="mt-1 mb-32">
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
