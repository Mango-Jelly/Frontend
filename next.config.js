/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
            source : '/openvidu/:path*',
            destination : `https://mangotail.shop/openvidu/:path*`,
            // has: [
            //     {
            //         type: 'header',
            //         key: 
            //     }
            // ]
        },
      ]  
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
        })
        return config;
    }
    
};