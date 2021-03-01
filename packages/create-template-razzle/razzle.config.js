const { merge } = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { ESBuildPlugin, ESBuildMinifyPlugin } = require('esbuild-loader');

// https://razzlejs.org/docs/customization
module.exports = {
  /**
   *
   * @param {{ webpackConfig: import('webpack').Configuration }} args
   * @returns {import('webpack').Configuration}
   */
  modifyWebpackConfig({ env, webpackConfig }) {
    return merge(webpackConfig, {
      optimization: {
        minimize: env.target === 'web' && !env.dev,
        minimizer: [
          new ESBuildMinifyPlugin({
            target: 'es2015',
          }),
        ],
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
              target: env.target === 'web' ? 'es2015' : 'esnext',
            },
          },
        ],
      },
      plugins: [new ForkTsCheckerWebpackPlugin(), new ESBuildPlugin()],
      resolve: {
        extensions: ['.ts', '.tsx'],
      },
    });
  },
};
