# <https://wuxinhua.com>
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2F0xinhua%2Fwuxinhua.com.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2F0xinhua%2Fwuxinhua.com?ref=badge_shield)


![](./assets/screenshot.jpeg)

My personal Blog using [Next.js](https://nextjs.org/), Markdown, TypeScript, [blog-starter](https://github.com/vercel/next.js/tree/canary/examples/blog-starter) and deploy it to the cloud with [Vercel](https://vercel.com/).

## Feature

- Markdown
- Rss and Sitemap
- Dark mode
- Good SEO([lighthouse performance score](./assets/lighthouse.jpeg) 100 🎉)
- Search(not suport yet)

## Structure

- `lib/*` - Short for "library", utils code for external services.
- `scripts/*` - Generate rss and sitemap xml.
- `pages/*` - All static pages.
- `components/*` - Basic ui components.
- `public/*` - Static assets including fonts and images and seo verify file.
- `_posts/*` - All markdown posts.

## Dev

```bash
git clone https://github.com/0xinhua/wuxinhua.com.git my-blog
```

```bash
npm install -g pnpm && cd my-blog && pnpm install
```

```bash
pnpm dev
```

The blog should be up and running on [http://localhost:1024](http://localhost:1024)

## Prod

```bash
pnpm build && pnpm start
```

## MIT License

You can use all the code after removing my personal information and original posts.


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2F0xinhua%2Fwuxinhua.com.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2F0xinhua%2Fwuxinhua.com?ref=badge_large)