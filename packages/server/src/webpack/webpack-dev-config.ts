import webpack, { Configuration } from 'webpack';
import path from 'path';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

export const webpackDevConfig: Configuration = {
  output: {
    path: '/',
    filename: '[name].js',
  },
  mode: 'development',

  resolve: {
    alias: { '@consumer/config': path.resolve(process.cwd(), 'src/config') },
    extensions: ['.ts', '.tsx', '.js'],
  },
  entry: {
    // main: ['webpack-hot-middleware/client', '@refract-cms/server/src/client'],
    // main: [path.resolve(process.cwd(), 'src/client')],
    main: ['@refract-cms/server/src/client'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        // options: {
        //   transpileOnly: true,
        // },
      },
    ],
  },
  // plugins: [new webpack.HotModuleReplacementPlugin(), new ForkTsCheckerWebpackPlugin({})],
};
