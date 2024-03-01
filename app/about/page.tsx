import Link from "next/link"
import Head from 'next/head'
import { CMS_NAME } from "@/lib/constants"
import { Metadata } from "next"
import Image from "next/image"
import { IconTwitter, IconRss, IconGitHub } from "@/components/icons"

export const metadata: Metadata = {
  title: `关于我 - ${CMS_NAME}`,
  description: 'Blog about Engineering, Start-up Business, Tech trends | wuxinhua.com，321来信 - 关注 AI 、创业以及互联网最新的资讯和思考',
}

export default function About () {
  
  return (
      <>
        <Head>
          <title>
           {`About - ${CMS_NAME}`}
          </title>
        </Head>
        <div>
          <div className="mb-10 inline-block">
            <a href="https://321letter.substack.com/">
              <Image alt="321来信" className="rounded mb-5" src="https://assets.wuxinhua.com/blog/assets/newsletter/321-screenshot-20231128.png" width={670} height={420} />
            </a>
              <p className="text-center mt-10 mb-2">点击订阅 Newsletter - <a className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" target="_blank" href="https://321letter.substack.com/" title="Substack - 321来信">321来信</a></p>
              <p className="text-center">与超过 413 🎉 位订阅读者一起关注 AI 、创业以及互联网最新的资讯和思考。</p>
          </div>
          <div className="text-center">
            <p className="mb-2">👋 欢迎你访问我的网络日志，0xinhua 之前在
            <Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href="https://bytedance.com/" target="_blank"> ByteDance </Link>和
            <Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href={`https://juejin.cn/`} target="_blank"> juejin.cn </Link>写代码，目前在创业。</p>
            <p>只要命运齿轮沒有出差错，这个日志会一直更下去。</p>
            <p style={{marginTop: '20px'}}></p>
            <span className="mr-5 gap-2 inline-flex"><IconGitHub className="inline-block text-slate-500 hover:text-slate-600 dark:hover:text-slate-300" /><Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href={`https://github.com/0xinhua`} target="_blank">@0xinhua</Link></span>
            <span className="mr-5 gap-2 inline-flex"><IconTwitter className="inline-block text-slate-500 hover:text-slate-600 dark:hover:text-slate-300" /><Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href={`https://twitter.com/intent/follow?screen_name=0xinhua`} target="_blank">@0xinhua</Link></span>
            <span className="mr-5 gap-2 inline-flex"><IconRss className="inline-block text-slate-500 hover:text-slate-600 dark:hover:text-slate-300" /> <Link className="text-blue-500 text-highlight-link  hover:underline hover:text-blue-600 underline-offset-4" target="_blank" href={`https://wuxinhua.com/rss.xml`}> rss.xml </Link></span>
          </div>
        </div>
    </>
  )
}
