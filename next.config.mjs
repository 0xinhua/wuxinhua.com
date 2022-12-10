/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/archives',
        destination: '/posts/archives',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/posts/about',
        permanent: true,
      },
    ]
  },
}

export default nextConfig