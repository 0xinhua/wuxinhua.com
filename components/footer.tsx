import Container from './container'
import { CMS_AUTHOR } from '../lib/constants'

const currentYear = new Date().getFullYear()

const Footer = () => {
  return (
    <footer className="py-2">
      <Container>
        <div className="flex flex-col lg:flex-col items-center py-4 text-gray-600">
          <div className="flex flex-col lg:flex-col justify-center items-center">
            <p> ©{currentYear} | {`Made with ❤️ and ☕️ by`}<a href='https://github.com/0xinhua/' target={"_blank"} className="text-blue-500 dark:text-gray-200 hover:underline underline-offset-4 hover:text-blue-600 duration-200 transition-colors ml-1">{CMS_AUTHOR}</a></p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
