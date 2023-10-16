const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

module.exports = {
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    return config;
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // domains: ["img.seadn.io"],
    remotePatterns: [
      {
        hostname: "**",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;
