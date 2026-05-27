/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.midjourney.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-images-1.medium.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "substackcdn.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "steemitimages.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.hive.blog",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ipfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "scrappy.i.ipfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "chappy.i.ipfs.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "steepshot.org",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s18.postimg.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
