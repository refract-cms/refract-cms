import inquirer from 'inquirer';
import program from 'commander';

function run(args: any) {
  return new Promise((resolve) => {
    console.log('create app...', args);
    resolve();
  });
}

export default run;
