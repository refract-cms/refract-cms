import { Service, startService } from 'esbuild';
import { watch } from 'chokidar';
import chalk from 'chalk';
import path from 'path';
import nodemon from 'nodemon';
import esbuildNodeExternals from 'esbuild-node-externals';

let nodemonInstance: typeof nodemon;

process.on('SIGINT', function () {
  if (nodemon) {
    nodemonInstance.reset();
  }
});

export function dev() {
  const watcher = watch([
    path.resolve(process.cwd(), 'src/**/*.ts*', path.resolve(process.cwd(), '../../packages/**/*.ts*')),
    path.resolve(process.cwd(), 'src/*.ts*'),
  ]);
  console.log('Watching files... \n');
  build().then(() => {
    nodemonInstance = nodemon({
      cwd: process.cwd(),
      delay: 1,
      watch: ['dist'],
      script: 'dist/server.js',
    });
  });
  watcher.on('change', () => {
    build();
  });
}

const noop = () => {};

/**
 * Function to update lines when something happens
 * @param input The text you want to print
 * @param isBuiltInput Whether you are printing `Built in x ms` or not
 */
const updateLine = (input: string, isBuiltInput: boolean = false) => {
  const numberOfLines = (input.match(/\n/g) || []).length;
  // process.stdout.cursorTo(0, 2);
  // process.stdout.clearScreenDown();
  process.stdout.write(input + '\n');
  isBuiltInput ? process.stdout.moveCursor(0, -numberOfLines) : noop();
};

/**
 * Builds the code in no time
 */
let service: Service;
const build = async () => {
  //Start build service
  service = await startService();
  try {
    // process.stdout.cursorTo(0, 2);
    // process.stdout.clearLine(0);
    // Get time before build starts
    const timerStart = Date.now();
    // Build code
    await service.build({
      color: true,
      entryPoints: [path.resolve(process.cwd(), 'src/index.ts')],
      outfile: path.resolve(process.cwd(), 'dist/server.js'),
      external: ['mongoose', 'webpack', 'fsevents', 'parcel-bundler'],
      // external: [/^[a-z0-9-]/],
      bundle: true,
      sourcemap: false,
      tsconfig: path.resolve(process.cwd(), 'tsconfig.json'),
      platform: 'node',
      target: 'node14.15.0',
      logLevel: 'error',
      plugins: [esbuildNodeExternals()],
    });
    // Get time after build ends
    const timerEnd = Date.now();
    updateLine(chalk.green(`Built in ${timerEnd - timerStart}ms.`), true);
  } catch (e) {
    // OOPS! ERROR!
  } finally {
    // We command you to stop. Will start again if files change.
    service.stop();
  }
};
