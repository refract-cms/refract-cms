const { merge } = require('webpack-merge');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  modify(config, args, webpack) {
    return merge(config, {
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
