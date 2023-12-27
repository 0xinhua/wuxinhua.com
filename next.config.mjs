/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wuxinhua.com',
        port: '',
        pathname: '/**/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.wuxinhua.com',
        port: '',
        pathname: '/**/**',
      },
    ],
  },
  trailingSlash: true,
  reactStrictMode: true,
  /* config options here */
  // async rewrites() {
  //   return [
  //     {
  //       source: '/2022/04/14/newsletter-321laixin/',
  //       destination: '/posts/newsletter-321laixin', // Matched parameters can be used in the destination
  //     },
  //     {
  //       source: '/2022/03/23/Node-js-Package-Manager-And-Npm-Dependency-Installation-Mechanism/',
  //       destination: '/posts/Node-js-Package-Manager-And-Npm-Dependency-Installation-Mechanism',
  //     },
  //   ]
  // },
  async redirects() {
    return [
      {
        source: '/archives',
        destination: '/changelogs',
        permanent: true,
      },
      {
        source: '/atom.xml',
        destination: '/rss.xml',
        permanent: true,
      },
      {
        source: '/rss',
        destination: '/rss.xml',
        permanent: true,
      },
      {
        source: '/2022/04/14/newsletter-321laixin/',
        destination: '/posts/newsletter-321laixin',
        permanent: true,
      },
      {
        source: '/2022/03/23/Node-js-Package-Manager-And-Npm-Dependency-Installation-Mechanism/',
        destination: '/posts/Node-js-Package-Manager-And-Npm-Dependency-Installation-Mechanism',
        permanent: true,
      },
      {
        source: '/2021/12/31/The-Daily-Notes-Of-2021/',
        destination: '/posts/The-Daily-Notes-Of-2021',
        permanent: true,
      },
      {
        source: '/2021/08/02/Newsletter-List-I-Subscribed/',
        destination: '/posts/Newsletter-List-I-Subscribed',
        permanent: true,
      },
      {
        source: '/2021/02/18/Discussion-On-The-Popularity-Of-Clubhouse/',
        destination: '/posts/Discussion-On-The-Popularity-Of-Clubhouse',
        permanent: true,
      },
      {
        source: '/2020/12/31/The-Daily-Notes-Of-2020/',
        destination: '/posts/The-Daily-Notes-Of-2020',
        permanent: true,
      },
      {
        source: '/2020/08/02/Web-Components/',
        destination: '/posts/Web-Components',
        permanent: true,
      },
      {
        source: '/2020/03/11/Too-Long-Dont-Read/',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/2020/01/21/Learning-Linux-Series-Command-Line-Crontab/',
        destination: '/posts/Learning-Linux-Series-Command-Line-Crontab',
        permanent: true,
      },
      {
        source: '/2019/12/30/The-Books-I-Read-In-2019/',
        destination: '/posts/The-Books-I-Read-In-2019',
        permanent: true,
      },
      {
        source: '/2019/11/30/Migrating-from-travis-to-GitHub-Actions/',
        destination: '/posts/Migrating-from-travis-to-GitHub-Actions',
        permanent: true,
      },
      {
        source: '/2019/11/02/Whats-new-in-iOS-13-and-adapting-app-to-new-version/',
        destination: '/posts/Whats-new-in-iOS-13-and-adapting-app-to-new-version',
        permanent: true,
      },
      {
        source: '/2019/07/31/The-common-issues-and-errors-I-have-faced-as-a-react-native-beginner/',
        destination: '/posts/The-common-issues-and-errors-I-have-faced-as-a-react-native-beginner',
        permanent: true,
      },
      {
        source: '/2019/04/27/A-Preview-Of-ECMAScript2019-ES10/',
        destination: '/posts/A-Preview-Of-ECMAScript2019-ES10',
        permanent: true,
      },
      {
        source: '/2019/02/25/The-Guide-To-Flexbox/',
        destination: '/posts/The-Guide-To-Flexbox',
        permanent: true,
      },
      {
        source: '/2018/12/29/The-Books-I-Read-In-2018/',
        destination: '/posts/The-Books-I-Read-In-2018',
        permanent: true,
      },
      {
        source: '/2018/12/28/Book-Review-Zero-To-One-By-Peter-Thiel/',
        destination: '/posts/Book-Review-Zero-To-One-By-Peter-Thiel',
        permanent: true,
      },
      {
        source: '/2018/09/25/Dive-Into-Docker/',
        destination: '/posts/Dive-Into-Docker',
        permanent: true,
      },
      {
        source: '/2018/07/05/Contenteditable-The-Good-Part-And-The-Ugly/',
        destination: '/posts/Contenteditable-The-Good-Part-And-The-Ugly',
        permanent: true,
      },
      {
        source: '/2018/04/30/Good-Code-vs-Bad-Code-in-Golang(翻译)/',
        destination: '/posts/Good-Code-vs-Bad-Code-in-Golang',
        permanent: true,
      },
      {
        source: '/2018/03/17/The-questions-about-react-and-redux-in-interview/',
        destination: '/posts/The-questions-about-react-and-redux-in-interview',
        permanent: true,
      },
      {
        source: '/2018/01/20/The-svg-animation-in-action/',
        destination: '/posts/The-svg-animation-in-action',
        permanent: true,
      },
      {
        source: '/2018/07/05/Contenteditable-The-Good-Part-And-The-Ugly/',
        destination: '/posts/Contenteditable-The-Good-Part-And-The-Ugly',
        permanent: true,
      },
      {
        source: '/2017/12/22/The-reading-book-list-in-2017/',
        destination: '/posts/The-reading-book-list-in-2017',
        permanent: true,
      },
      {
        source: '/2017/12/13/The-think-of-sort-algorithms/',
        destination: '/posts/The-think-of-sort-algorithms',
        permanent: true,
      },
      {
        source: '/2017/11/20/React-ssr-exploration/',
        destination: '/posts/React-ssr-exploration',
        permanent: true,
      },
      {
        source: '/2017/10/24/What-happen-from-input-the-URL-in-the-browser-to-the-page-bring-out-part2/',
        destination: '/posts/What-happen-from-input-the-URL-in-the-browser-to-the-page-bring-out-part2',
        permanent: true,
      },
      {
        source: '/2017/10/13/What-happen-from-input-the-URL-in-the-browser-to-the-page-bring-out/',
        destination: '/posts/What-happen-from-input-the-URL-in-the-browser-to-the-page-bring-out',
        permanent: true,
      },
      {
        source: '/2017/08/28/The-es6-features-learning-notes/',
        destination: '/posts/The-es6-features-learning-notes',
        permanent: true,
      },
      {
        source: '/2017/07/30/React-redux-connect-Explain-in-detail/',
        destination: '/posts/React-redux-connect-Explain-in-detail',
        permanent: true,
      },
      {
        source: '/2017/07/17/My-favorite-feed-RSS-feed-list/',
        destination: '/posts/My-favorite-feed-RSS-feed-list',
        permanent: true,
      },
      {
        source: '/2017/07/16/Book-review-Road-to-Heaven/',
        destination: '/posts/Book-review-Road-to-Heaven',
        permanent: true,
      },
      {
        source: '/2017/07/15/The-git-you-may-not-frequently-used/',
        destination: '/posts/The-git-you-may-not-frequently-used',
        permanent: true,
      },
      {
        source: '/2017/07/14/Migrating-webpack-from-v1-to-v2/',
        destination: '/posts/Migrating-webpack-from-v1-to-v2',
        permanent: true,
      },
    ]
  },
}

export default nextConfig