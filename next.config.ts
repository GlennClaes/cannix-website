import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Vercel builds its own deployment bundle. Standalone is only needed by Docker.
    ...(process.env.DOCKER_BUILD === "1" ? { output: "standalone" } : {}),
    images: {
        remotePatterns: [{ protocol: "https", hostname: "**" }],
        formats: ["image/avif", "image/webp"],
        qualities: [55, 75],
    },
    experimental: {
        optimizePackageImports: ["lucide-react", "framer-motion"],
    },
    turbopack: {},
    // Performance Budgets
    webpack: (config, { dev, isServer }) => {
        if (!dev && !isServer) {
            config.performance = {
                hints: 'error',
                maxEntrypointSize: 250 * 1024,      // 250 KB JS entrypoint
                maxAssetSize: 100 * 1024,           // 100 KB per asset
                assetFilter: (asset: string) => asset.endsWith('.js') || asset.endsWith('.css'),
            };
        }
        return config;
    },
};

export default nextConfig;
