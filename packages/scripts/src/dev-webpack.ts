import webpack, { Configuration } from 'webpack';
import { watch } from 'chokidar';
import chalk from 'chalk';
import path from 'path';
import nodemon from 'nodemon';
import StartServerPlugin from 'start-server-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import WebpackBar from 'webpackbar';
import WriteFilePlugin from 'write-file-webpack-plugin';

export function createWebpackDevServerConfig(): Configuration {
  return {
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: 'index.js',
    },
    mode: 'development',
    target: 'node',
    externals: [
      nodeExternals({
        additionalModuleDirs: [path.resolve(process.cwd(), '../../node_modules')],
      }),
    ],
    resolve: {
      mainFields: ['browser', 'main', 'module'],
      alias: { '@consumer/config': path.resolve(process.cwd(), 'src/config') },
      extensions: ['.ts', '.tsx', '.js'],
    },
    entry: {
      main: [path.resolve(process.cwd(), 'src/index')],
    },
    module: {
      rules: [
        // {
        //   test: /\.(js|jsx|ts|tsx|mjs)$/,
        //   loader: 'ts-loader',
        // //   include: [path.resolve(process.cwd(), 'src')],
        //   options: {
        //     transpileOnly: true,
        //   },
        // },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        {
          test: /\.mjs?$/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
    },
    plugins: [
      new WriteFilePlugin({
        // exclude hot-update files
        test: /^(?!.*(hot)).*/,
      }),
      new StartServerPlugin({
        name: 'index.js',
        // nodeArgs: ['--inspect'], // allow debugging
        args: [], // pass args to script
        signal: true,
        keyboard: true,
      }),
      // new WebpackBar({
      //   name: 'server',
      //   fancy: true,
      // }),
      //   new webpack.HotModuleReplacementPlugin(),
      // new ForkTsCheckerWebpackPlugin({
      //   typescript: {
      //     configFile: path.resolve(process.cwd(), 'tsconfig.json'),
      //     memoryLimit: 300000,
      //   },
      // }),
    ],
  };
}

// let nodemonInstance: typeof nodemon;

process.on('SIGINT', function () {
  //   if (nodemon) {
  //     nodemonInstance.reset();
  //   }
});

let nodemonInstance: typeof nodemon;

export function dev() {
  const webpackConfig = createWebpackDevServerConfig();
  const compiler = webpack(webpackConfig);
  console.log('Building server...');
  compiler.watch({}, (err, stats) => {
    if (err) {
      console.log(err);
    } else {
      console.log(chalk.green(`Server built.`));
    }
  });
  // nodemonInstance = nodemon({
  //   cwd: process.cwd(),
  //   delay: 1,
  //   watch: ['dist'],
  //   script: 'dist/index.js',
  // });
}
