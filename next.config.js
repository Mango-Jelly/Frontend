/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/openvidu/:path*',
        destination: `https://mangotail.shop/openvidu/:path*`,
      },
      {
        source: '/ws/:path*',
        destination: `https://mangotail.shop/ws/:path*`,
      },
    ];
  },
  output: 'standalone',
  webpack: (config) => {
    config.module.rules.push({
      test: /.(mov|mp4)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: '[name].[ext]',
          },
        },
      ],
    });
    return config;
  },
  images: {
    domains: ['mongo-jelly.s3.ap-northeast-2.amazonaws.com'],
  },
};
