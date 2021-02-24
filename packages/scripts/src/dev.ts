import { startService } from 'esbuild';
import { watch } from 'chokidar';
import chalk from 'chalk';
import path from 'path';
import nodemon from 'nodemon';

export function dev() {
  console.log('dev', path.resolve(process.cwd(), 'src/**/*.ts*'));
  console.log('dev', path.resolve(process.cwd(), 'src/index.ts'));
  const watcher = watch([
    path.resolve(process.cwd(), 'src/**/*.ts*', path.resolve(process.cwd(), '../../packages/**/*.ts*')),
    path.resolve(process.cwd(), 'src/*.ts*'),
  ]);
  console.log('Watching files... \n');
  build();
  watcher.on('change', () => {
    build();
  });
  nodemon({
    cwd: process.cwd(),
    watch: ['dist'],
    script: 'dist/index.js',
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
const build = async () => {
  //Start build service
  const service = await startService();
  try {
    // process.stdout.cursorTo(0, 2);
    // process.stdout.clearLine(0);
    // Get time before build starts
    const timerStart = Date.now();
    // Build code
    await service.build({
      color: true,
      entryPoints: [path.resolve(process.cwd(), 'src/index.ts')],
      outfile: path.resolve(process.cwd(), 'dist/index.js'),
      external: ['mongoose'],
      bundle: true,
      sourcemap: false,
      tsconfig: path.resolve(process.cwd(), 'tsconfig.json'),
      platform: 'node',
      target: 'node14.15.0',
      logLevel: 'error',
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
