import RSS from 'rss';
import fs from 'fs';
import { getAllPosts } from '../lib/api';
import { CMS_NAME, SITE_URL } from '../lib/constants';

const genRssFeed = async () => {

  // console.log(' process.env', process.env.HOSTNAME, process.env.PORT)

  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
  ]);

  const feedOptions = {
    title: `${CMS_NAME} Blog posts | RSS Feed`,
    description: `Welcome to this ${CMS_NAME}'s Blog`,
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/rss.xml`,
    image_url: `${SITE_URL}/logo.png`,
    pubDate: new Date(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Ibas`,
  };

  const feed = new RSS(feedOptions);

  allPosts.map((post) => {
    feed.item(
      {
        title: post.title,
        description: post.excerpt,
        url: `${SITE_URL}/posts/${post.slug}`,
        date: post.date,
        author: CMS_NAME
      }
    )
  })

  fs.writeFileSync('./public/rss.xml', feed.xml({ indent: true }));

};

genRssFeed();
