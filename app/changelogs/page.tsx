import Container from "@/components/container"
import Header from "@/components/header"
import Layout from "@/components/layout"
import { getAllPosts } from "@/lib/api"
import Link from "next/link"
import classnames from "classnames"
import Post from '@/interfaces/post'
import { formatDate } from "@/lib/utils"
import { CMS_NAME } from "@/lib/constants"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: `日志 - ${CMS_NAME}`,
  description: 'Blog about Engineering, Start-up Business, Tech trends | wuxinhua.com，321来信 - 关注 AI 、创业以及互联网最新的资讯和思考',
}

export default function Changelogs() {

  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return (
    <>
      { allPosts.map(post => {
        return (
          <div className="mb-3 text-base flex" key={post.slug}>
            <dl className="left-0 top-0 mr-3">
              <dt className="sr-only">Date</dt>
              <dd className={classnames('whitespace-nowrap text-sm leading-6 dark:text-slate-400 text-[#64748b]')}>
                <time dateTime={post.date}>{formatDate(post.date, 'yyyy-MM-dd')}</time>
              </dd>
            </dl>
            <Link className="hover:underline hover:text-blue-600 text-blue-500  underline-offset-4" href={`/posts/${encodeURIComponent(post.slug)}`} title={post.title}>{post.title}</Link>
          </div>
        )
      })}
    </>
  )
}