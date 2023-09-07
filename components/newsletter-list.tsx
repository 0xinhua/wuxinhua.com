const posts = [
  {
    id: 28,
    title: '#27 创始人是公司灵魂的守护者',
    href: '/posts/What-I-learned-at-AirCode/',
    description:
      '我最近在做什么，在创业公司工作的一些收获和想法',
    date: 'Aug 15, 2023',
    datetime: '2023-08-15',
    category: { title: 'Start-up', href: '#' },
  },
  {
    id: 27,
    title: '#26 SVB 硅谷银行为什么倒闭',
    href: '/posts/Why-the-SVB-bank-failure/',
    description:
      '银行的本质、SVB 为什么会倒闭、美联储加息到底加的是什么息',
    date: 'March 19, 2023',
    datetime: '2023-03-19 ',
    category: { title: 'SVB', href: '#' },
  },
  // More posts...
  {
    id: 0,
    title: '#0 Hello World - Newsletter 321来信',
    href: '/posts/newsletter-321laixin/',
    description:
      '这是321来信发出的第一封信，关于我是谁，为什么做这个？',
    date: 'April 14, 2023',
    datetime: '2022-04-14 ',
    category: { title: '321来信', href: '#' },
  },
]

export default function Example() {
  return (
    <div className="py-6 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mt-10 space-y-16 sm:mt-5">
            {posts.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full px-3 py-1.5 font-medium text-gray-600"
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.description}</p>
                </div>
              </article>
            ))}
          </div>
          <span className="pt-10 inline-block">More posts...</span>
        </div>
      </div>
    </div>
  )
}