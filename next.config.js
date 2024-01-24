/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
}

module.exports = nextConfig

const withVideos = require('next-videos')

module.exports = withVideos();