const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      buffer: require.resolve('buffer/'),
      https: require.resolve('https-browserify'),
      querystring: require.resolve('querystring-es3'),
      fs: false,
      path: false,
      zlib: require.resolve('browserify-zlib'),
      http: require.resolve('stream-http'),
      url: require.resolve('url/'),
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
