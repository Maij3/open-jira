/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["prnt.sc"],
    unoptimized: true,
  },
};

module.exports = nextConfig;
