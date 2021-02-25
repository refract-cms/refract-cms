// import webpack, { Configuration } from 'webpack';
// import path from 'path';
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
// import WebpackBar from 'webpackbar';

// export function createWebpackDevServerConfig(): Configuration {
//   return {
//     output: {
//       // publicPath: '/cms/',
//       publicPath: '/cms/',
//       path: '/',
//       filename: '[name].js',
//     },
//     mode: 'development',
//     resolve: {
//       mainFields: ['browser', 'main', 'module'],
//       alias: { '@consumer/config': path.resolve(process.cwd(), 'src/config') },
//       extensions: ['.ts', '.tsx', '.js'],
//     },
//     entry: {
//       main: ['@refract-cms/server/src/client'],
//     },
//     module: {
//       rules: [
//         {
//           test: /\.tsx?$/,
//           loader: 'ts-loader',
//           options: {
//             transpileOnly: true,
//           },
//         },
//         {
//           test: /\.mjs?$/,
//           loader: 'ts-loader',
//           options: {
//             transpileOnly: true,
//           },
//         },
//       ],
//     },
//     plugins: [
//       // new WebpackBar({
//       //   name: 'client',
//       //   fancy: true,
//       // }),
//       new webpack.HotModuleReplacementPlugin(),
//       // new ForkTsCheckerWebpackPlugin({
//       //   typescript: {
//       //     configFile: path.resolve(process.cwd(), 'tsconfig.json'),
//       //     memoryLimit: 300000,
//       //   },
//       // }),
//     ],
//   };
// }
