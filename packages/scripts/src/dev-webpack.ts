import webpack, { Configuration } from 'webpack';
import { watch } from 'chokidar';
import chalk from 'chalk';
import path from 'path';
import nodemon from 'nodemon';
import StartServerPlugin from 'start-server-webpack-plugin';

export function createWebpackDevServerConfig(): Configuration {
  return {
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: 'index.js',
    },
    mode: 'development',
    target: 'node',
    // externals: ['mongoose'],
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
      new StartServerPlugin({
        name: 'index.js',
        // nodeArgs: ['--inspect'], // allow debugging
        args: [], // pass args to script
        signal: false,
        keyboard: true,
      }),
      // new WebpackBar({
      //   name: 'client',
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

export function dev() {
  //   const watcher = watch([
  //     path.resolve(process.cwd(), 'src/**/*.ts*', path.resolve(process.cwd(), '../../packages/**/*.ts*')),
  //     path.resolve(process.cwd(), 'src/*.ts*'),
  //   ]);
  console.log('Building server...');
  compiler.watch({}, (err, stats) => {
    // console.log(err, stats);
    console.log(chalk.green(`Server built.`));
  });
  //   console.log('Watching files... \n');
  //   build();
  //   watcher.on('change', () => {
  //     build();
  //   });
  //   nodemonInstance = nodemon({
  //     cwd: process.cwd(),
  //     delay: 1,
  //     watch: ['dist'],
  //     script: 'dist/index.js',
  //   });
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
const webpackConfig = createWebpackDevServerConfig();
const compiler = webpack(webpackConfig);

const build = async () => {
  //Start build service

  try {
    // process.stdout.cursorTo(0, 2);
    // process.stdout.clearLine(0);
    // Get time before build starts
    const timerStart = Date.now();
    // Build code
    await new Promise<void>((resolve) => {
      compiler.run(() => {
        resolve();
      });
    });

    // Get time after build ends
    const timerEnd = Date.now();
    updateLine(chalk.green(`Built in ${timerEnd - timerStart}ms.`), true);
  } catch (e) {
    // OOPS! ERROR!
  } finally {
    // We command you to stop. Will start again if files change.
    // service.stop();
  }
};
