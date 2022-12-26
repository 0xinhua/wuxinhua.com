import Container from "@/components/container"
import Header from "@/components/header"
import Layout from "@/components/layout"
import { getAllPosts } from "@/lib/api"
import Link from "next/link"
import classnames from "classnames"
import Post from '../interfaces/post'
import { formatDate } from "@/lib/utils"

type Props = {
  allPosts: Post[]
}

export default function Changelogs({ allPosts }: Props) {

  return (
    <>
      <Layout >
        <Container>
        <Header />
          { allPosts.map(post => {
            return (
              <div className="mb-3 text-base flex" key={post.slug}>
                <dl className="left-0 top-0 mr-3">
                  <dt className="sr-only">Date</dt>
                  <dd className={classnames('whitespace-nowrap text-sm leading-6 dark:text-slate-400 text-[#64748b]')}>
                    <time dateTime={post.date}>{formatDate(post.date, 'yyyy-dd-mm')}</time>
                  </dd>
                </dl>
                <Link className="underline" href={`/posts/${encodeURIComponent(post.slug)}`}>{post.title}</Link>
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