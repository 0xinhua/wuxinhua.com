import PostPreview from './post-preview'
import type Post from '../interfaces/post'
import style from './more-stories.module.css'

type Props = {
  posts: Post[]
}

const excludePosts = [
  'about.md',
  'archives.md',
  'hello-world.md',
];

const MoreStories = ({ posts }: Props) => {
  const filteredPosts = posts.filter((post) => !excludePosts.includes(post.slug + '.md'))

  return (
    <section>
      <h2 className="mt-8 mb-4 text-xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
        {/* 更多文章 */}
      </h2>
      <div className={style.moreStories}>
        {filteredPosts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
            tags={post.tags}
          />
        ))}
      </div>
    </section>
  )
}

export default MoreStories
