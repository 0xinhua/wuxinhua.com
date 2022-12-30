import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-146717212-1"></script>
      <script dangerouslySetInnerHTML={{
        __html:`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-146717212-1');
        `,
      }} />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
