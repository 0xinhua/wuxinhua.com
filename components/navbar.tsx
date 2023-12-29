"use client"

import Container from '@/components/container'
import { useTheme } from 'next-themes'
import Nav from './nav'
import { useEffect, useState } from 'react'
import { IconGitHub, IconMoon, IconSun } from './icons'

type Props = {
  preview?: boolean
}

function ThemeToggle() {
  let { resolvedTheme, setTheme } = useTheme()
  let otherTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
  let [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${otherTheme} theme` : 'Toggle theme'}
      className="flex"
      onClick={() => setTheme(otherTheme)}
    >
      <IconMoon className="text-slate-500 hover:stroke-slate-300 dark:block hidden transition" />
      <IconSun className="text-slate-500 dark:hidden hover:stroke-slate-600 transition" />
    </button>
  )
}

const Navbar = ({ preview }: Props) => {
  const { theme, setTheme } = useTheme()
  const links = [
    {
      path: '/',
      label: '首页'
    },
    {
      path: '/changelogs/',
      label: '日志',
    },
    {
      path: '/about/',
      label: '关于'
    }
  ]
  return (
    <div
    >
      <Container>
        <div className="py-4 sm:px-0 px-4 text-center text-lg bordeer-bottom border-solid">
            <div className='flex justify-between items-center'>
              <Nav links={links}/>
              <div className='flex justify-between items-center'>
                <button
                  className='py-2 text-gray-600 dark:text-gray-400'
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                </button>
                <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <ThemeToggle />
                </div>
              </div>
              <a
                title='Star me on GitHub'
                href="https://github.com/0xinhua/wuxinhua.com"
                target="_blank"
                className="ml-3 text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 block"
              >
                <span className="sr-only">Blog source code on GitHub</span>
                <IconGitHub />
              </a>
              </div>
            </div>
        </div>
      </Container>
    </div>
  )
}

export default Navbar
