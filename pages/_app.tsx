import { AppProps } from 'next/app'
import '../styles/index.css'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <ThemeProvider attribute="class">
    <Component {...pageProps} />
    <Analytics />
    </ThemeProvider>
    </>
  )
}
