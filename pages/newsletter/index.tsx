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
          <title>{CMS_NAME}'s Blog</title>
        </Head>
        <Container>
        <NewsletterHeader />
        <NewsletterList />
        </Container>
      </Layout>
    </>
  )
}
