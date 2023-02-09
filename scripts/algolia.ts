import { ALGOLIA_APP_ID, INDEX_NAME, SITE_URL } from '../lib/constants'
import { getAllPosts } from '../lib/api'
const algoliasearch = require('algoliasearch')

const transformPosts = (posts) => {
  const transformed = posts.map(post => {
    return {
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      date: post.date,
      tags: post.tags,
      url: `${SITE_URL}/posts/${post.slug}`,
    }
  })
  return transformed
}

(async function () {
  try {
    const posts = await getAllPosts(
      [
        'title',
        'date',
        'slug',
        'author',
        'excerpt',
        'tags'
      ]
    );
    const objects = transformPosts(posts)

    // If you wanna use algolia search, replace it with your own applications settings in https://www.algolia.com/
    const client = algoliasearch(ALGOLIA_APP_ID, process.env.ALGOLIA_SERACH_ADMIN_API_PRIVATE_KEY)
    const index = client.initIndex(INDEX_NAME)

    index
      .saveObjects(objects, { autoGenerateObjectIDIfNotExist: true })
      .then(({ objectIDs }) => {
        console.log(objectIDs)
      })
      .catch(err => {
        console.log(err)
      });

  } catch (error) {
    console.log(error)
  }

})()