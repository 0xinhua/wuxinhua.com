import RSS from 'rss';
import { getAllPosts } from '../lib/api';
import fs from 'fs';

const genRssFeed = async () => {

  // console.log(' process.env', process.env.HOSTNAME, process.env.PORT)

  const site_url = 'https://wuxinhua.com'

  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
  ]);

  const feedOptions = {
    title: 'Blog posts | RSS Feed',
    description: 'Welcome to this blog posts!',
    site_url: site_url,
    feed_url: `${site_url}/rss.xml`,
    image_url: `${site_url}/logo.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Ibas`,
  };

  const feed = new RSS(feedOptions);

  allPosts.map((post) => {
    feed.item(
      {
        title: post.title,
        description: post.excerpt,
        url: `${site_url}/posts/${post.slug}`,
        date: post.date,
      }
    )
  })

  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));

};

genRssFeed();
