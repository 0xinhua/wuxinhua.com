import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'

const Meta = () => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link rel="apple-touch-icon-precomposed" sizes="57x57" href="/favicon/apple-touch-icon-57x57.png" />
      <link rel="apple-touch-icon-precomposed" sizes="114x114" href="/favicon/apple-touch-icon-114x114.png" />
      <link rel="apple-touch-icon-precomposed" sizes="72x72" href="/favicon/apple-touch-icon-72x72.png" />
      <link rel="apple-touch-icon-precomposed" sizes="144x144" href="/favicon/apple-touch-icon-144x144.png" />
      <link rel="apple-touch-icon-precomposed" sizes="60x60" href="/favicon/apple-touch-icon-60x60.png" />
      <link rel="apple-touch-icon-precomposed" sizes="120x120" href="/favicon/apple-touch-icon-120x120.png" />
      <link rel="apple-touch-icon-precomposed" sizes="76x76" href="/favicon/apple-touch-icon-76x76.png" />
      <link rel="apple-touch-icon-precomposed" sizes="152x152" href="/favicon/apple-touch-icon-152x152.png" />
      <link rel="icon" type="image/png" href="/favicon/favicon-196x196.png" sizes="196x196" />
      <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
      <link rel="icon" type="image/png" href="/favicon/favicon-32x32.png" sizes="32x32" />
      <link rel="icon" type="image/png" href="/favicon/favicon-16x16.png" sizes="16x16" />
      <link rel="icon" type="image/png" href="/favicon/favicon-128.png" sizes="128x128" />
      <meta name="application-name" content="&nbsp;"/>
      <meta name="msapplication-TileColor" content="#FFFFFF" />
      <meta name="msapplication-TileImage" content="mstile-144x144.png" />
      <meta name="msapplication-square70x70logo" content="mstile-70x70.png" />
      <meta name="msapplication-square150x150logo" content="mstile-150x150.png" />
      <meta name="msapplication-wide310x150logo" content="mstile-310x150.png" />
      <meta name="msapplication-square310x310logo" content="mstile-310x310.png" />

      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <link
        href="/assets/style/prism-okaidia.css"
        rel="stylesheet"
      />
      <meta
        name="description"
        content={`${CMS_NAME}'s Blog, Tech blogger and software engineer sharing insights on development, tech trends, and entrepreneurship. Join 500+ for weekly updates.`}
      />
      <meta property="og:url" content="https://wuxinhua.com/" />
      <meta property="og:title" content="wuxinhua.com" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content="Tech blogger and software engineer sharing insights on development, tech trends, and entrepreneurship. Join 500+ for weekly updates" />
      <meta property="og:image" content="https://wuxinhua.com/assets/meta/og-image.png"  />
      <meta property="og:image:url"  content="https://wuxinhua.com/assets/meta/og-image.png"  />
      <meta property="twitter:image" content="https://wuxinhua.com/assets/meta/og-image.png"  />
      <meta content="summary_large_image" name="twitter:card" />
      <meta name="twitter:url" content="https://wuxinhua.com/" />
      <meta name="twitter:creator" content="@0xinhua" />
      <meta name="twitter:title" content="Blog about Engineering, Start-up Business, Tech trends | wuxinhua.com" />
      <meta name="twitter:description" content="Oxinhua is a Tech blogger and software engineer, Join with 500+ for latest in tech and startup business insights." />
    </Head>
  )
}

export default Meta
