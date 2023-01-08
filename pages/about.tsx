import Link from "next/link"
import style from './style.module.css'
import Container from './../components/container'
import Header from './../components/header'
import Layout from './../components/layout'
import Head from 'next/head'
import { CMS_NAME } from "@/lib/constants"

export default function About () {
  return (
    <Layout>
      <Container>
        <Header />
        <Head>
          <title>
            About me - {CMS_NAME}
          </title>
        </Head>
        <div className={style.content}>
        <figure className={style.blockquote}>
          <blockquote cite="https://www.turing.ac.uk/blog/what-alan-turing-means-us">
            <p>“ We can only see a short distance ahead, but we can see plenty there that needs to be done. ”</p>
          </blockquote>
          <figcaption>—Alan Turing</figcaption>
        </figure>
        <p>Update： 🎉 2022 年开始了一个 newsletter 项目： <Link className="underline" href={`https://321laixin.zhubai.love/`}>321来信</Link>，截止到年底收获了近 300 读者订阅，如果你喜欢我推送的内容，欢迎邮箱或微信订阅 ❤️</p>
        <img className="my-8" src="https://assets.wuxinhua.com/blog/assets/newsletter/image.png" />
        <p>👋 Hi，欢迎你访问我的博客，可以叫我 xinhua 或英文名 Kevin ~</p>
        <p>软件开发工程师<img src="https://assets.wuxinhua.com//blog/assets/coder.gif" width="30" alt="https://assets.wuxinhua.com//blog/assets/coder.gif" className="inline" />，在北京，之前曾在
        <Link className="underline" href="https://www.bytedance.com/zh">@字节跳动</Link>、
        <Link className="underline" href={`https://juejin.cn/`}>@掘金社区</Link>写代码</p>
        <p>喜欢开源，热爱互联网，一直想为这个世界变得更好做出微小的努力</p>
        <p>保持好奇心，热衷于在网上分享自己的知识、见解</p>
        <p>只要命运的齿轮沒有出差错，这个博客应该会一直更下去</p>
        <p>任何博客的问题、讨论交流、或者认识我都可以通过邮箱 <Link className="underline" href={`mailto:wuxinhua.cn@gmail.com`}>wuxinhua.cn@gmail.com</Link>联系到我</p>
        <p>如果喜欢我写的东西也可以订阅博客的 <Link className="underline" target="_blank" href={`https://wuxinhua.com/rss.xml`}>rss</Link></p>
        更多:
        <p><Link className="underline" href={`https://github.com/0xinhua`}>🐙 GitHub</Link></p>
        <p><Link className="underline" href={`https://web.okjike.com/u/BC942F46-A5E2-40A0-B419-5AB8B3A02BE1`}>🌎 日常朋友圈</Link></p>
        <p><Link className="underline" href={`https://twitter.com/0xinhua`}>🐦 Twitter</Link></p>
        <p><Link className="underline" href={`http://music.163.com/#/user/home?id=15767523`}>🎧 Music</Link></p>
        <br />
        <hr />
        <p>👋 Hi there，It's Kevin ~ </p>
        <p>🌇 Days as Software Engineer at <Link className="underline" href="https://bytedance.com/en">@Bytedance</Link></p>
        <p>🌃 Nights as Motorcycle rider | Blogger | Reader |  Lifelong learner</p>
        <p>📍 Base Beijing, China</p>
        <p>📌 So nice to meet you here, always trying new things on Tech | Sport | Money | ₿itcoin etc</p>
        <p>☕️ Hobbies : 📚 📈 🏂 🏊 🏋️ 🫕 🏍 Looking for more ～</p>
        <p>📮 Email: wuxinhua.cn@gmail.com</p>
        <p>More:</p>
        <p><Link className="underline" href={`https://github.com/0xinhua`}> 🐙 GitHub </Link></p>
        <p><Link className="underline" href={`https://web.okjike.com/u/BC942F46-A5E2-40A0-B419-5AB8B3A02BE1`}>🌎 Daily </Link></p>
        <p><Link className="underline" href={`https://twitter.com/0xinhua`}>🐦 Twitter</Link></p>
        <p><Link className="underline" href={`http://music.163.com/#/user/home?id=15767523`}>🎧 Music</Link></p>
        </div>
      </Container>
    </Layout>
  )
}
