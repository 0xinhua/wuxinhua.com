import Container from '@/components/container'
import { EXAMPLE_PATH } from '../lib/constants'
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
      label: 'Home'
    },
    // TODO
    // {
    //   path: '/newsletter',
    //   label: 'Newsletter',
    // },
    {
      path: '/changelogs/',
      label: 'Changelogs',
    },
    {
      path: '/about/',
      label: 'About'
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
              {/* <a>0xinhua's Notes</a> */}
              <Nav links={links}/>
              <button
                className='px-6 py-2 text-gray-600 dark:text-gray-400'
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
