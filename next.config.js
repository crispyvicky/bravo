/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for Vercel deployment
  // output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  // distDir: 'dist', // Remove custom distDir for Vercel

  // Performance optimizations
  images: {
    unoptimized: true,
  },

  // Bundle optimization
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Webpack optimizations
  // webpack: (config, { isServer }) => {
  //   // Optimize bundle splitting
  //   config.optimization.splitChunks = {
  //     chunks: 'all',
  //     minSize: 20000,
  //     maxSize: 244000,
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all',
  //         priority: 10,
  //       },
  //       common: {
  //         name: 'common',
  //         minChunks: 2,
  //         chunks: 'all',
  //         priority: 5,
  //         reuseExistingChunk: true,
  //       },
  //     },
  //   };

  //   return config;
  // },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
