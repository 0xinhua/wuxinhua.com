import Container from "@/components/container"
import Header from "@/components/header"
import Layout from "@/components/layout"
import { getAllPosts } from "@/lib/api"
import Link from "next/link"
import classnames from "classnames"
import Post from '@/interfaces/post'
import { formatDate } from "@/lib/utils"
import Head from "next/head"
import { CMS_NAME } from "@/lib/constants"

type Props = {
  allPosts: Post[]
}

export default function Changelogs({ allPosts }: Props) {

  return (
    <>
      <Layout >
        <Container>
        <Header />
        <Head>
          <title>
            {`Changelogs - ${CMS_NAME}`}
          </title>
        </Head>
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
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {

  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}