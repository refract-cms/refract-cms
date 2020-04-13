import program from 'commander';

export function run(args: any) {
  program
    .command('start')
    .description('start')
    .action(function () {
      require('../scripts/start');
    });

  program
    .command('build')
    .description('build')
    .action(function () {
      require('../scripts/build');
    });

  program.parse(process.argv);
}
