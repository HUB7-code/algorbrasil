import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
    dest: "public",
    disable: process.env.NODE_ENV === "development", // Desativar em dev para não cachear tudo
    register: true,
    skipWaiting: true,
    cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    workboxOptions: {
        disableDevLogs: true,
    },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compress: true,                  // Gzip/Brotli compression
    poweredByHeader: false,          // Remove X-Powered-By (security + smaller header)
    transpilePackages: ['three'],
    allowedDevOrigins: ['127.0.0.1', 'localhost'],
    optimizeFonts: true,
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        optimizeCss: false,           // Only enable in prod (needs critters)
        optimizePackageImports: ['framer-motion', 'lucide-react', '@clerk/nextjs'],
    },
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 31536000,    // 1 year cache for images
        deviceSizes: [640, 828, 1080, 1280, 1920],
        imageSizes: [32, 48, 64, 96, 128, 256],
        remotePatterns: [
            { protocol: 'https', hostname: 'api.dicebear.com' },
            { protocol: 'https', hostname: 'images.unsplash.com' },
        ],
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    async headers() {
        return [
            {
                // Cache máximo para vídeos (imutável)
                source: '/videos/:path*',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
            {
                // Cache máximo para assets Next.js gerados
                source: '/_next/static/:path*',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
            {
                // Cache de imagens públicas + fonts
                source: '/:all*(png|jpg|jpeg|webp|avif|svg|ico|woff|woff2|ttf)',
                headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, stale-while-revalidate=86400' }],
            },
            {
                // Security headers para todas as páginas
                source: '/(.*)',
                headers: [
                    { key: 'X-Content-Type-Options', value: 'nosniff' },
                    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
                ],
            },
        ];
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

export default withPWA(nextConfig);
