/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    reactStrictMode: true,
    images: { unoptimized: true },
    poweredByHeader: false
};

module.exports = nextConfig;
