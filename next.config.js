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
    ],
  },
};

module.exports = nextConfig;
