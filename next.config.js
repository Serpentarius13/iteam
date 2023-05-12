/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    domains: [
      "lh3.googleusercontent.com",
      "upcdn.io",
      "avatars.githubusercontent.com",
    ],
  },

  reactStrictMode: true,
  
};

module.exports = nextConfig;
