import inquirer from 'inquirer';
import program from 'commander';
// import { createApp } from './create-app';
import { build } from './build';
import { dev } from './dev-webpack';

function run(args: any) {
  return new Promise<void>((resolve) => {
    program
      .command('dev')
      .description('Start server in watch mode.')
      .action(() => {
        dev();
      });

    // Command implemented using stand-alone executable file (description is second parameter to `.command`)
    // Returns `this` for adding more commands.
    program
      .command('start <service>', 'start named service')
      .command('stop [service]', 'stop named service, or all if no name supplied');

    // refract build-dashboard
    // refract build
    // refract dev
    // refract start
    // refract create-helm-chart
    // refract create-dockerfile
    program.parse(process.argv);

    resolve();
  });
}

export default run;
