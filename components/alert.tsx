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
              <button
                className='py-2 text-gray-600 dark:text-gray-400'
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <ThemeModeIcon />
                </button>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Alert
