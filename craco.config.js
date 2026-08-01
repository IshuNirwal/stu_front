const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.plugins.push(
        new CompressionPlugin({
          algorithm: "gzip",
          test: /\.(js|css|html|svg)$/,
        })
      );
      return webpackConfig;
    },
  },
};
