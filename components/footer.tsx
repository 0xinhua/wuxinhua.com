import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'

const Footer = () => {
  return (
    <footer className="py-2">
      <Container>
        <div className="flex flex-col lg:flex-column items-center border-t border-neutral-200 py-4 text-gray-600">
          <div className="flex flex-col lg:flex-column justify-center items-center">
            <p>© 2016 - 2022 Created with ❤️ by @wuxinhua</p>
            <p>Powered by <a href="https://nextjs.org/" className="underline hover:text-blue-600 duration-200 transition-colors">Next.js</a></p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
