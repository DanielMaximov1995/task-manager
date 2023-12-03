/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['files.edgestore.dev', 'images.unsplash.com']
    },
    typescript : {
        ignoreBuildErrors : true
    },
    experimental: {
        serverActions : true
    }
}

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig)
