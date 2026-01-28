import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.yandexcloud.net',
                port: '',
                pathname: '/sk-storage/**',
            },
        ],
    },
};

export default nextConfig;