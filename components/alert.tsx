import Container from '@/components/container'
import { useTheme } from 'next-themes'
import ThemeModeIcon from '@/components/theme-icon'
import Nav from './nav'

type Props = {
  preview?: boolean
}

const Alert = ({ preview }: Props) => {
  const { theme, setTheme } = useTheme()
  const links = [
    {
      path: '/',
      label: '首页'
    },
    // TODO
    // {
    //   path: '/newsletter',
    //   label: 'Newsletter',
    // },
    {
      path: '/changelogs/',
      label: '日志',
    },
    {
      path: '/about/',
      label: '关于我'
    }
  ]
  return (
    <div
      // className={cn('border-b', {
      //   'bg-neutral-800 border-neutral-800 text-white': preview,
      //   'bg-neutral-50 border-neutral-200': !preview,
      // })}
    >
      <Container>
        <div className="py-2 text-center text-lg bordeer-bottom border-solid border-b">
          {preview ? (
            <>
              This page is a preview.{' '}
              <a
                href="/api/exit-preview"
                className="underline hover:text-teal-300 duration-200 transition-colors"
              >
                Click here
              </a>{' '}
              to exit preview mode.
            </>
          ) : (
            <div className='flex justify-between items-center'>
              <Nav links={links}/>
              <div className='flex justify-between items-center'>
                <button
                  className='py-2 text-gray-600 dark:text-gray-400'
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  <ThemeModeIcon />
                </button>
                <a
                  title='Star me on GitHub'
                  href="https://github.com/0xinhua/wuxinhua.com"
                  target="_blank"
                  className="ml-3 block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300"
                >
                  <span className="sr-only">Blog source code on GitHub</span>
                  <svg
                    viewBox="0 0 16 16"
                    className="w-5 h-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Alert
