/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/archives',
        destination: '/posts/about',
        permanent: true,
      },
    ]
  },
}

export default nextConfig