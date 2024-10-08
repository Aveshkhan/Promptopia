// /** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                pathname: '**',
            },
        ],
        // domains: ['lh3.googleusercontent.com'],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    // webpack(config) {
    //     config.experiments = {
    //       ...config.experiments,
    //       topLevelAwait: true,
    //     }
    //     return config
    //   }
};

export default nextConfig;
