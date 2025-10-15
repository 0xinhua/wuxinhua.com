import { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: `Home - About Me`,
  description: 'About Me',
}

export default function MeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <main className="flex-1 ml-0 pt-16 md:pt-0">{children}</main>
    </div>
  )
}
