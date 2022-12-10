import Container from './container'
import cn from 'classnames'
import { EXAMPLE_PATH } from '../lib/constants'

type Props = {
  preview?: boolean
}

const Alert = ({ preview }: Props) => {
  return (
    <div
      className={cn('border-b', {
        'bg-neutral-800 border-neutral-800 text-white': preview,
        'bg-neutral-50 border-neutral-200': !preview,
      })}
    >
      <Container>
        <div className="py-2 text-center text-lg">
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
            <div className='flex justify-between'>
              <a>0xinhua's Notes</a>
              <ul className='justify-end flex'>
                <li className='ml-3'><a href="/">Home</a></li>
                <li className='ml-3'><a href="/posts/archives">Archives</a></li>
                <li className='ml-3'><a href="/posts/about">About</a></li>
              </ul>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Alert
