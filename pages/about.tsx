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
        <p>Hi 👋 ，欢迎你访问我的网络日志，只要命运的齿轮沒有出差错，这个日志会一直更下去。</p>
        <p>你可以使用 <Link className="text-highlight-link  hover:underline hover:text-blue-600 underline-offset-4" target="_blank" href={`https://wuxinhua.com/rss.xml`}>RSS </Link>
        订阅日志动态，通过邮箱 <Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href={`mailto:wuxinhua.cn@gmail.com`}>wuxinhua.cn@gmail.com</Link> 联系到我。</p>
        <p> 在北京生活、工作<img src="https://assets.wuxinhua.com//blog/assets/coder.gif" width="30" alt="https://assets.wuxinhua.com//blog/assets/coder.gif" className="inline" />，之前在
          <Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href="https://www.bytedance.com/zh" target="_blank"> 字节跳动 </Link>、
          <Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href={`https://juejin.cn/`} target="_blank">掘金社区 </Link>写代码。
        </p>
        <p>喜欢开源，热爱互联网，一直想为这个世界变得更好做出微小的贡献。</p>
        <p style={{marginTop: '20px'}}>更多:</p>
        <p>Newsletter：<Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href={`https://321laixin.zhubai.love/`} target="_blank">321来信</Link>（期待你加入与超过 400+ 🎉 订阅读者一起关注互联网最新科技动态）</p>
        <p>GitHub：<Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href={`https://github.com/0xinhua`} target="_blank">@0xinhua</Link></p>
        <p>即刻：<Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href={`https://web.okjike.com/u/BC942F46-A5E2-40A0-B419-5AB8B3A02BE1`} target="_blank">@0xinhua</Link></p>
        <p>Twitter：<Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href={`https://twitter.com/intent/follow?screen_name=0xinhua`} target="_blank">@0xinhua</Link></p>
        <br />
        <hr />
        <p>👋 Hi there，It's Kevin ~ </p>
        <p>🌇 Days as Software Engineer at 
        <Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href="https://bytedance.com/en" target="_blank"> Bytedance </Link>and
        <Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href={`https://juejin.cn/`} target="_blank"> juejin.cn </Link>previously.</p>
        <p>🌃 Nights as Motorcycle rider | Blogger | Reader |  Lifelong learner.</p>
        <p>📍 Base Beijing, China.</p>
        <p>📌 So nice to meet you here, always trying new things on Tech | Sport | Money | ₿itcoin etc.</p>
        <p>☕️ Hobbies : 📚 📈 🏂 🏊 🏋️ 🫕 🏍 Looking for more ～</p>
        <p>📮 Email: <Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href={`mailto:wuxinhua.cn@gmail.com`}>wuxinhua.cn@gmail.com</Link></p>
        <p>More:</p>
        <p>Newsletter: <Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href={`https://321laixin.zhubai.love/`} target="_blank">321来信</Link>（Join with more than 400+ 🎉 subscribers to keep up with the latest Internet technology</p>
        <p>GitHub: <Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href={`https://github.com/0xinhua`} target="_blank">@0xinhua</Link></p>
        <p>Twitter: <Link className="text-blue-500  hover:underline hover:text-blue-600 underline-offset-4" href={`https://twitter.com/0xinhua`} target="_blank">@0xinhua</Link></p>
        </div>
      </Container>
    </Layout>
  )
}
