import { writeFileSync } from "fs";
import { getAllPosts } from './../lib/api';

const generate = async () => {

  const posts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
  ]);
  console.log('posts', posts)

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${posts
      .map((post) => {
        return `
        <url>
          <loc>${`https://wuxinhua.com/posts/` + post.slug}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>
      `;
      })
      .join("")}
    </urlset>
  `;

  writeFileSync('public/sitemap.xml', sitemap.trim());

}

generate();
