import path from 'path';
import type { Configuration } from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export const webpackProdConfig: Configuration = {
  output: {
    path: '/',
    filename: '[name].js',
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  entry: {
    main: [path.resolve(process.cwd(), 'src/config')],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
};
