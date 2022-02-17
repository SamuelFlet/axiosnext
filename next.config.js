/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: 'https://blog--images3.s3.us-west-2.amazonaws.com',
    domains: ['blog--images3.s3.us-west-2.amazonaws.com'],
  },
}

module.exports = nextConfig
