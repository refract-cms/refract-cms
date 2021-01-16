import inquirer from 'inquirer';
import program from 'commander';
import { devCommand } from './dev/dev';

export async function run(args: any) {
  program.command('dev').action(() => {
    devCommand();
  });
  // console.log('create app...', args);
  // program.option('-d, --dir <type>', 'Project name and folder name');
  // .option('-s, --sample-schema <type>', 'Sample schema (default or blog)');

  program.parse(process.argv);
}

export default run;
