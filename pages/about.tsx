import Link from "next/link"
import style from './style.module.css'
import Container from '@/components/container'
import Header from '@/components/header'
import Layout from '@/components/layout'
import Head from 'next/head'
import { CMS_NAME } from "@/lib/constants"

export default function About () {
  return (
    <Layout>
      <Container>
        <Header />
        <Head>
          <title>
           {`About - ${CMS_NAME}`}
          </title>
        </Head>
        <div className={style.content}>
          <a href="https://321letter.substack.com/" className="mb-10 inline-block">
            <img className="border border-gray-300 border-solid rounded mb-5" src="https://assets.wuxinhua.com/blog/assets/newsletter/321-screenshot-20231128.png"></img>
              <p className="text-center mt-10">期待你订阅加入 - <a className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href="https://321letter.substack.com/" title="Substack - 321来信">321来信</a></p>
              <p className="text-center">与超过 500+ 🎉 订阅读者一起关注 AI 、创业以及互联网最新的资讯和思考 </p>
          </a>
          <div className="text-center">
            <p>👋 欢迎你访问我的网络日志，之前在 
            <Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href="https://bytedance.com/" target="_blank"> ByteDance </Link>和
            <Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href={`https://juejin.cn/`} target="_blank"> juejin.cn </Link>写代码。</p>
            <p>只要命运的齿轮沒有出差错，这个日志会一直更下去。</p>
            <p style={{marginTop: '20px'}}></p>
            <span className="mr-5">GitHub：<Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href={`https://github.com/0xinhua`} target="_blank">@0xinhua</Link></span>
            <span className="mr-5">Twitter：<Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href={`https://twitter.com/intent/follow?screen_name=0xinhua`} target="_blank">@0xinhua</Link></span>
            <span>RSS: <Link className="text-highlight-link  hover:underline hover:text-blue-600 underline-offset-4" target="_blank" href={`https://wuxinhua.com/rss.xml`}> rss.xml </Link></span>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
