/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    transpilePackages: ['three'],
    optimizeFonts: false, // Fix: Avoid SSL errors with Google Fonts in local dev
    compiler: {
        removeConsole: process.env.NODE_ENV === "production",
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.dicebear.com',
            },
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://127.0.0.1:8000/api/:path*',
            },
            {
                source: '/static/:path*',
                destination: 'http://127.0.0.1:8000/static/:path*',
            },
        ];
    },
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;
        return config;
    },
};

export default nextConfig;
