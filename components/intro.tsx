import Image from 'next/image'
const Intro = () => {
  return (
    <section className="flex-col md:flex-col flex items-start md:justify-between mt-16 md:mb-6 md:mb-10 mb-8">
      <Image
        className="text-base rounded"
        alt={'cover image'}
        width={1200}
        height={600}
        src="https://wuxinhua.com/assets/meta/og-image.png"
      />
      {/* <h2 className="sm:text-center dark:text-gray-400 text-gray-600 md:text-left text-lg">
        Bloginng about Engineering, sharing insights on tech trends and Start-up business.
      </h2> */}
    </section>
  )
}

export default Intro
