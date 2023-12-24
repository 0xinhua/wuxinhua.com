import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Meta from '@/components/meta'
import Container from '@/components/container'
import { Providers } from '@/components/providers'
import Footer from '@/components/footer'
import { CMS_NAME } from '@/lib/constants'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `Home - ${CMS_NAME}`,
  description: 'Blog about Engineering, Start-up Business, Tech trends | wuxinhua.com',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Meta />
      <Script src="https://www.googletagmanager.com/gtag/js?id=UA-146717212-1"></Script>
      <Script dangerouslySetInnerHTML={{
        __html:`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-146717212-1');
        `,
      }}
      />
      <body className={inter.className}>
        <Providers
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          >
            <Navbar />
            <main className="flex min-h-screen flex-col items-center justify-between lg:p-16 sm:p-8 p-4 mx-auto">
              <Container>
                {children}
              </Container>
            </main>
        </Providers>
        <Footer />
      </body>
    </html>
  )
}
