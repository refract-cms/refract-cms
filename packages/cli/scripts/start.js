process.env.NODE_ENV = "development";
const fs = require("fs");
const webpack = require("webpack");
const {
  createServerConfig,
  createClientConfig
} = require("../config/create-dev-config");
const devServer = require("webpack-dev-server");
const chalk = require("chalk").default;

process.noDeprecation = true; // turns off that loadQuery clutter.

// Capture any --inspect or --inspect-brk flags (with optional values) so that we
// can pass them when we invoke nodejs
process.env.INSPECT_BRK =
  process.argv.find(arg => arg.match(/--inspect-brk(=|$)/)) || "";
process.env.INSPECT =
  process.argv.find(arg => arg.match(/--inspect(=|$)/)) || "";

function main() {
  console.info("Compiling...");

  let clientConfig = createClientConfig();
  let serverConfig = createServerConfig();

  // Compile our assets with webpack
  const clientCompiler = compile(clientConfig);
  const serverCompiler = compile(serverConfig);

  // Instatiate a variable to track server watching
  let watching;

  // Start our server webpack instance in watch mode after assets compile
  clientCompiler.plugin("done", () => {
    // If we've already started the server watcher, bail early.
    if (watching) {
      return;
    }
    // Otherwise, create a new watcher for our server code.
    watching = serverCompiler.watch(
      {
        quiet: true,
        stats: "errors-only"
      },
      /* eslint-disable no-unused-vars */
      stats => {}
    );
  });

  const clientDevServer = new devServer(clientCompiler, clientConfig.devServer);
  clientDevServer.listen(3001, err => {
    if (err) {
      console.error(err);
    }
  });
}

// Webpack compile in a try-catch
function compile(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    console.error("Failed to compile.", [e]);
    // process.exit(1);
  }
  return compiler;
}

main();
