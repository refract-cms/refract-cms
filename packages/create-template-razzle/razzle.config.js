const { merge } = require('webpack-merge');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

// https://razzlejs.org/docs/customization
module.exports = {
  /**
   *
   * @param {{ webpackConfig: import('webpack').Configuration }} args
   * @returns {import('webpack').Configuration}
   */
  modifyWebpackConfig({ env, webpackConfig }) {
    return merge(webpackConfig, {
      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            loader: 'ts-loader',
            include: path.resolve(__dirname, 'src'),
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
