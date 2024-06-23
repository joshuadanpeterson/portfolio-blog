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
    // loaderFile: path.resolve(__dirname, "src/lib/imageLoader.js"),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.midjourney.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
