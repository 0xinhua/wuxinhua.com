import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'

const Footer = () => {
  return (
    <footer className="py-6 bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="flex flex-col lg:flex-column items-center">
          <div className="flex flex-col lg:flex-column justify-center items-center lg:pl-4 lg:w-1/2">
            <p>© 2016 - 2022 Created with  by wuxinhua</p>
            <p>Powered by Next.js  Host by Aliyun</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
