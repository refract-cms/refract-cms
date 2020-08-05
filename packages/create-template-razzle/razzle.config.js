const { merge } = require("webpack-merge");
const path = require("path");

module.exports = {
  plugins: [
    {
      name: "typescript",
      options: {
        useBabel: false,
        tsLoader: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
        forkTsChecker: {
          tsconfig: "./tsconfig.json",
          tslint: false,
          watch: "./src",
          typeCheck: true,
        },
      },
    },
  ],
  modify(config, args, webpack) {
    return merge(config, {
      module: {
        rules: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            loader: "ts-loader",
            exclude: path.resolve(__dirname, "src"),
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
    });
  },
};
