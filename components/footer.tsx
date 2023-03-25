import Container from './container'
import { CMS_AUTHOR } from '../lib/constants'

const currentYear = new Date().getFullYear()

const Footer = () => {
  return (
    <footer className="py-2">
      <Container>
        <div className="flex flex-col lg:flex-col items-center border-t border-neutral-200 py-4 text-gray-600">
          <div className="flex flex-col lg:flex-col justify-center items-center">
            <p>{`Made with ❤️ by`}<a href='https://github.com/0xinhua/' target={"_blank"} className="text-blue-500 hover:underline underline-offset-4 hover:text-blue-600 dark:text-sky-300 duration-200 transition-colors ml-1">@{CMS_AUTHOR}</a> ©{currentYear}</p>
            <p>Powered by
              <a href="https://vercel.com/" className="text-blue-500 underline-offset-4 hover:text-blue-600 hover:underline dark:text-sky-300 duration-200 transition-colors ml-1" target={"_blank"}>Vercel</a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
