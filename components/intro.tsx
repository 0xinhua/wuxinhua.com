import { CMS_NAME } from '../lib/constants'

const Intro = () => {
  return (
    <section className="flex-col md:flex-col flex items-start md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
        Notes
      </h1>
      <h4 className="text-center md:text-left text-lg mt-5">
        我的个人博客，主要记录日常遇到的开发问题、新知识、想法等.
      </h4>
    </section>
  )
}

export default Intro
