const path = require("path");

const withTM = require("next-transpile-modules")([
  "@refract-cms/core",
  "@refract-cms/dashboard",
  "@local/config",
]);

module.exports = withTM({});

// module.exports = {
//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//     // Note: we provide webpack above so you should not `require` it
//     // Perform customizations to webpack config
//     config.module.rules.push({
//       test: /\.m?js$/,
//       exclude: /node_modules/,
//       include: [path.resolve(__dirname, "../../packages")],
//       use: {
//         loader: "babel-loader",
//         options: {
//           presets: [["@babel/preset-env", { targets: "defaults" }]],
//         },
//       },
//     });

//     // Important: return the modified config
//     return config;
//   },
// };
