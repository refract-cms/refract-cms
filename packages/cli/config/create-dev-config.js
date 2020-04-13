const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const StartServerPlugin = require("start-server-webpack-plugin");
const WebpackBar = require("webpackbar");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const fs = require("fs");
// var FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const appDirectory = fs.realpathSync(process.cwd());

function createClientConfig() {
  let webpackConfig = {
    devtool: "inline-source-map",
    entry: [
      require.resolve("razzle-dev-utils/webpackHotDevClient"),
      path.resolve(__dirname, "../src/client/index.tsx")
    ],
    mode: "development",
    target: "web",
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: "ts-loader",
          include: [path.resolve(__dirname, "../src")],
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, "tsconfig.json")
          }
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: "ts-loader",
          include: [path.resolve(process.cwd(), "src")],
          options: {
            transpileOnly: true,
            configFile: path.resolve(process.cwd(), "tsconfig.json")
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          loader: "file-loader?name=fonts/[name].[ext]"
        }
        // {
        //   test: /\.css$/,
        //   use: ["style-loader", "css-loader"]
        // }
      ]
    },
    plugins: [
      // new webpack.NamedModulesPlugin(),
      // new FriendlyErrorsWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new WebpackBar({
        name: "client",
        color: "#3949ab"
      }),
      new ForkTsCheckerWebpackPlugin({
        tsconfig: path.resolve(process.cwd(), "tsconfig.json"),
        memoryLimit: 2048,
        // tslint: path.resolve(__dirname, "tslint.json"),
        //reportFiles: [`${path.resolve(process.cwd())}/**/**.{ts,tsx}`],
        ignoreLints: ["**/*.test.*"],
        async: true
      })
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".mjs", ".js", ".graphql"],
      alias: {
        "@consumer/config": path.join(process.cwd(), "src")
      }
    },
    devServer: {
      host: "localhost",
      port: 3001,
      historyApiFallback: true,
      hot: true,
      headers: { "Access-Control-Allow-Origin": "*" },
      disableHostCheck: true,
      stats: "errors-only",
      clientLogLevel: "error"
    },
    output: {
      path: path.join(__dirname, ".build"),
      publicPath: "http://localhost:3001/",
      filename: "client.js"
    }
  };

  if (fs.existsSync(path.resolve(appDirectory, "build-config.js"))) {
    const buildConfig = require(path.resolve(appDirectory, "build-config.js"));

    webpackConfig = buildConfig({ webpackConfig, target: "client" });
  }
  return webpackConfig;
}

function createServerConfig() {
  let webpackConfig = {
    entry: [
      // "@babel/polyfill",
      "webpack/hot/poll?1000",
      path.resolve(__dirname, "../src/index.ts")
    ],
    target: "node",
    mode: "development",
    externals: [
      nodeExternals({
        whitelist: [
          "webpack/hot/poll?1000"
          // "@refract-cms/server",
          // "@refract-cms/core"
        ]
      })
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: "ts-loader",
          include: [path.resolve(__dirname, "../src")],
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, "tsconfig.server.json")
          }
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          loader: "ts-loader",
          include: [path.resolve(process.cwd(), "src")],
          options: {
            transpileOnly: true,
            configFile: path.resolve(process.cwd(), "tsconfig.json")
          }
        },
        {
          test: /\.mjs$/,
          //include: /node_modules/,
          type: "javascript/auto"
        }
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
      ]
    },
    plugins: [
      new StartServerPlugin({
        name: "server.js",
        keyboard: true
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new WebpackBar({
        name: "server",
        color: "#3949ab"
      }),
      new ForkTsCheckerWebpackPlugin({
        tsconfig: path.resolve(process.cwd(), "tsconfig.json"),
        memoryLimit: 2048,
        // tslint: path.resolve(__dirname, "tslint.json"),
        //reportFiles: [`${path.resolve(process.cwd())}/**/**.{ts,tsx}`],
        ignoreLints: ["**/*.test.*"],
        async: true
      })
      // new FriendlyErrorsWebpackPlugin()
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
      extensions: [".ts", ".tsx", ".mjs", ".js", ".graphql"],
      alias: {
        "@consumer/config": path.join(process.cwd(), "src")
      }
    },
    output: { path: path.join(process.cwd(), ".cache"), filename: "server.js" }
  };

  if (fs.existsSync(path.resolve(appDirectory, "build-config.js"))) {
    const buildConfig = require(path.resolve(appDirectory, "build-config.js"));

    webpackConfig = buildConfig({ webpackConfig, target: "server" });
  }
  return webpackConfig;
}

module.exports = {
  createClientConfig,
  createServerConfig
};
