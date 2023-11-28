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

module.exports = nextConfig
