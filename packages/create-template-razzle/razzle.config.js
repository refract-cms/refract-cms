const { merge } = require('webpack-merge');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// https://razzlejs.org/docs/customization
module.exports = {
  modifyWebpackConfig({ env, webpackConfig }) {
    return merge(webpackConfig, {
      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            loader: 'ts-loader',
            exclude: path.resolve(__dirname, 'node_modules'),
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      plugins: [new ForkTsCheckerWebpackPlugin()],
      resolve: {
        extensions: ['.ts', '.tsx'],
      },
    });
  },
};
