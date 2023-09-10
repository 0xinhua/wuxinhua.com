import Container from '@/components/container'
import Layout from '@/components/layout'
import Head from 'next/head'
import { CMS_NAME } from 'lib/constants'
import NewsletterHeader from '@/components/newsletter-header'
import NewsletterList from '@/components/newsletter-list'

export default function Index() {
  return (
    <>
      <Layout>
        <Head>
          <title>{`321 来信 - ${CMS_NAME}`}</title>
        </Head>
        <Container>
          <NewsletterHeader />
          <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-start">
            <span className="bg-white dark:bg-black pr-2 pl-8 text-sm text-gray-500">往期来信</span>
          </div>
        </div>
          <NewsletterList />
        </Container>
      </Layout>
    </>
  )
}
