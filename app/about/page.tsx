import Link from "next/link"
import Head from 'next/head'
import { CMS_NAME } from "@/lib/constants"
import { Metadata } from "next"
import Image from "next/image"
import { IconTwitter, IconRss, IconGitHub, IconEmail, IconJike } from "@/components/icons"
import mixpanel from 'mixpanel-browser'

export const metadata: Metadata = {
  title: `关于我 - ${CMS_NAME}`,
  description: 'Blog about Engineering, Start-up Business, Tech trends | wuxinhua.com，321来信 - 关注 AI 、创业以及互联网最新的资讯和思考',
}

export default function About () {

  mixpanel.init('39739eb6ec9042a8e2f6502b4db42554')
  mixpanel.track_pageview({"page": "about", "url": "https://wuxinhua.com/about"})
  
  return (
      <>
        <Head>
          <title>
           {`About - ${CMS_NAME}`}
          </title>
        </Head>
        <div>
          <div className="mb-4 inline-block">
            <p className="text-center mt-4 mb-2">点击订阅 Newsletter - <a className="text-blue-500 dark:text-blue-200 font-semibold  hover:underline hover:text-blue-600 underline-offset-4" target="_blank" href="https://321letter.substack.com/" title="Substack - 321来信">321来信</a></p>
            <p className="text-center">与超过 <span className="font-semibold"> 413 </span>🎉 位订阅读者一起关注 AI 、创业以及互联网最新的资讯和思考。</p>
              <a href="https://321letter.substack.com/">
                <Image alt="321来信" className="rounded" src="/assets/site/321-screenshot-20231128.jpeg" width={670} height={420} />
              </a>
          </div>
          <div className="mb-4 inline-block">
            <p className="text-center mb-2">
              <a className="text-blue-500 dark:text-blue-200  hover:underline hover:text-blue-600 underline-offset-4 font-semibold" target="_blank" href="https://twittershots.com/" title="twitter screenshots generator">
              TwitterShots.com </a>
             - Making Pretty Twitter Screenshots.
            </p>
              <a href="https://twittershots.com/">
                <Image alt="free twitter screenshot tool, download and share quickly" className="rounded mb-5 p-4 sm:p-9" src="/assets/site/twitter-screenshots-generator.png" width={670} height={420} />
              </a>
          </div>
          <div className="text-center">
            <p className="mb-2">👋 欢迎你访问我的网络日志。</p>
            <p className="mb-2">0xinhua 之前在
            <Link className="text-blue-500 dark:text-blue-200  hover:underline hover:text-blue-600 underline-offset-4" href="https://bytedance.com/" target="_blank"> ByteDance </Link>和
            <Link className="text-blue-500 dark:text-blue-200  hover:underline hover:text-blue-600 underline-offset-4" href={`https://juejin.cn/`} target="_blank"> juejin.cn </Link>写代码，目前在创业公司做全栈开发。</p>
            <p>只要命运齿轮沒有出差错，这个日志会一直更下去。</p>
            <p style={{marginTop: '20px'}}></p>
            <div className="flex justify-center items-center flex-wrap">
              <span className="mr-5 gap-2 inline-flex">
                <IconGitHub className="inline-block text-slate-500 hover:text-slate-600 dark:hover:text-slate-300" />
                <Link className="text-blue-500 dark:text-blue-200  hover:underline hover:text-blue-600 underline-offset-4" href={`https://github.com/0xinhua`} target="_blank">@0xinhua</Link>
              </span>
              <span className="mr-5 gap-2 inline-flex">
                <IconTwitter className="inline-block text-slate-500 hover:text-slate-600 dark:hover:text-slate-300" />
                <Link className="text-blue-500 dark:text-blue-200  hover:underline hover:text-blue-600 underline-offset-4" href={`https://twitter.com/intent/follow?screen_name=0xinhua`} target="_blank">@0xinhua</Link>
              </span>
              <span className="mr-5 gap-2 inline-flex mt-2 sm:mt-0">
                <IconJike className="inline-block text-slate-500 hover:text-slate-600 dark:hover:text-slate-300" />
                <Link className="text-blue-500 dark:text-blue-200  hover:underline hover:text-blue-600 underline-offset-4" title="即刻 @0xinhua" href={`https://web.okjike.com/u/BC942F46-A5E2-40A0-B419-5AB8B3A02BE1`} target="_blank">@0xinhua</Link>
              </span>
            </div>
            <p className="mt-5">
              <span className="mr-5 gap-2 inline-flex">
                <IconEmail className="inline-block text-slate-500 hover:text-slate-600 dark:hover:text-slate-300" />
                <Link className="text-blue-500 dark:text-blue-200  hover:underline hover:text-blue-600 underline-offset-4" href={`mailto:wuxinhua.cn@gmail.com`} target="_blank">wuxinhua.cn@gmail.com</Link>
              </span>
              <span className="mr-5 gap-2 inline-flex">
                <IconRss className="inline-block text-slate-500 hover:text-slate-600 dark:hover:text-slate-300" />
                <Link className="text-blue-500 dark:text-blue-200 text-highlight-link  hover:underline hover:text-blue-600 underline-offset-4" target="_blank" href={`https://wuxinhua.com/rss.xml`}> rss.xml </Link>
              </span>
            </p>
          </div>
        </div>
    </>
  )
}
