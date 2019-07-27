const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  useFileSystemPublicRoutes: false,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(j|t)sx?$/,
      use: [
        {
          loader: 'linaria/loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production',
          },
        },
      ],
    });

    return config;
  },
});
