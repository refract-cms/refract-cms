process.env.NODE_ENV = 'development';
import fs from 'fs';
import webpack from 'webpack';
import { createServerConfig, createClientConfig } from '../config/create-prod-config';
import devServer from 'webpack-dev-server';
import chalk from 'chalk';

//@ts-ignore
process.noDeprecation = true; // turns off that loadQuery clutter.

// Capture any --inspect or --inspect-brk flags (with optional values) so that we
// can pass them when we invoke nodejs
process.env.INSPECT_BRK = process.argv.find((arg) => arg.match(/--inspect-brk(=|$)/)) || '';
process.env.INSPECT = process.argv.find((arg) => arg.match(/--inspect(=|$)/)) || '';

function main() {
  console.info('Compiling...');

  let clientConfig = createClientConfig();
  let serverConfig = createServerConfig();

  // Compile our assets with webpack
  const clientCompiler = compile(clientConfig);
  const serverCompiler = compile(serverConfig);

  clientCompiler.run(() => {
    serverCompiler.run();
  });
}

// Webpack compile in a try-catch
function compile(config) {
  let compiler;
  try {
    compiler = webpack(config);
  } catch (e) {
    console.error('Failed to compile.', [e]);
    // process.exit(1);
  }
  return compiler;
}

main();
