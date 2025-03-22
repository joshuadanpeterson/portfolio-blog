// next.config.js

require("dotenv").config();
const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
  images: {
    domains: ["cdn.midjourney.com", "images.unsplash.com", "substackcdn.com"], // Add this line
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
