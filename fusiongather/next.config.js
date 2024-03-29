/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'utfs.io',
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'www.vizagchamber.com',
            port: '',
          }
        ],
      },
}

module.exports = nextConfig
