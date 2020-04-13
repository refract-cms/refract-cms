import path from 'path';
import nodeExternals from 'webpack-node-externals';
import webpack from 'webpack';
import StartServerPlugin from 'start-server-webpack-plugin';
import WebpackBar from 'webpackbar';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());
const __dirname = new URL(import.meta.url).pathname;

export function createClientConfig() {
  let webpackConfig = {
    devtool: 'inline-source-map',
    entry: [path.resolve(__dirname, '../src/client/index.tsx')],
    mode: 'production',
    target: 'web',
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: 'ts-loader',
          include: [path.resolve(__dirname, '../src')],
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, 'tsconfig.json'),
          },
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: 'ts-loader',
          include: [path.resolve(process.cwd(), 'src')],
          options: {
            transpileOnly: true,
            configFile: path.resolve(process.cwd(), 'tsconfig.json'),
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          loader: 'file-loader?name=fonts/[name].[ext]',
        },
        // {
        //   test: /\.css$/,
        //   use: ["style-loader", "css-loader"]
        // }
      ],
    },
    plugins: [
      // new webpack.NamedModulesPlugin(),
      new WebpackBar({
        name: 'client',
        color: '#3949ab',
      }),

      // new ForkTsCheckerWebpackPlugin({
      //   tsconfig: path.resolve(process.cwd(), "tsconfig.json"),
      //   memoryLimit: 2048,
      //   // tslint: path.resolve(__dirname, "tslint.json"),
      //   //reportFiles: [`${path.resolve(process.cwd())}/**/**.{ts,tsx}`],
      //   ignoreLints: ["**/*.test.*"],
      //   async: true
      // })
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.mjs', '.js', '.graphql'],
      alias: {
        '@consumer/config': path.join(process.cwd(), 'src'),
      },
    },
    output: {
      path: path.join(process.cwd(), 'dist/public'),
      publicPath: '/',
      filename: 'client.js',
    },
  };

  if (fs.existsSync(path.resolve(appDirectory, 'build-config.js'))) {
    const buildConfig = require(path.resolve(appDirectory, 'build-config.js'));

    webpackConfig = buildConfig({ webpackConfig, target: 'client' });
  }
  return webpackConfig;
}

export function createServerConfig() {
  let webpackConfig = {
    entry: [path.resolve(__dirname, '../src/index.ts')],
    target: 'node',
    mode: 'production',
    externals: [
      nodeExternals({
        whitelist: ['webpack/hot/poll?1000'],
      }),
    ],
    node: {
      __console: false,
      __dirname: false,
      __filename: false,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: 'ts-loader',
          include: [path.resolve(__dirname, '../src')],
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, 'tsconfig.server.json'),
          },
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: 'ts-loader',
          include: [path.resolve(process.cwd(), 'src')],
          options: {
            transpileOnly: true,
            configFile: path.resolve(process.cwd(), 'tsconfig.json'),
          },
        },
        {
          test: /\.mjs$/,
          //include: /node_modules/,
          type: 'javascript/auto',
        },
        // {
        //   test: /\.(js|jsx|ts|tsx)?$/,
        //   loader: "prettier-loader",
        //   exclude: /node_modules/
        // },
        // {
        //   test: /\.(graphql|gql)$/,
        //   exclude: /node_modules/,
        //   loader: "graphql-tag/loader"
        // }
      ],
    },
    plugins: [
      new WebpackBar({
        name: 'server',
        color: '#3949ab',
      }),
      new ForkTsCheckerWebpackPlugin({
        tsconfig: path.resolve(process.cwd(), 'tsconfig.json'),
        memoryLimit: 2048,
        // tslint: path.resolve(__dirname, "tslint.json"),
        //reportFiles: [`${path.resolve(process.cwd())}/**/**.{ts,tsx}`],
        ignoreLints: ['**/*.test.*'],
        async: true,
      }),
      // function() {
      //   this.plugin("done", function(stats) {
      //     if (
      //       stats.compilation.errors &&
      //       stats.compilation.errors.length &&
      //       process.argv.indexOf("--watch") == -1
      //     ) {
      //       console.log(stats.compilation.errors);
      //       throw new Error("webpack build failed.");
      //     }
      //     // ...
      //   });
      // }
      // new ForkTsCheckerWebpackPlugin({
      //   tsconfig: path.resolve(__dirname, "tsconfig.json"),
      //   memoryLimit: 2048,
      //   tslint: path.resolve(__dirname, "tslint.json"),
      //   reportFiles: ["./consumer/src/**", "./packages/**/src/**"],
      //   ignoreLints: ["**/*.test.*"],
      //   async: true
      // })
    ],
    resolve: {
      extensions: ['.ts', '.tsx', '.mjs', '.js', '.graphql'],
      alias: {
        '@consumer/config': path.join(process.cwd(), 'src'),
      },
    },
    output: { path: path.join(process.cwd(), 'dist'), filename: 'server.js' },
  };

  if (fs.existsSync(path.resolve(appDirectory, 'build-config.js'))) {
    const buildConfig = require(path.resolve(appDirectory, 'build-config.js'));

    webpackConfig = buildConfig({ webpackConfig, target: 'server' });
  }
  return webpackConfig;
}
