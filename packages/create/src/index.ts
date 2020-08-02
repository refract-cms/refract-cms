import inquirer from 'inquirer';
import program from 'commander';
import { createApp } from './create-app';

function run(args: any) {
  return new Promise((resolve) => {
    // console.log('create app...', args);
    program.option('-d, --dir <type>', 'Project name and folder name');
    // .option('-s, --sample-schema <type>', 'Sample schema (default or blog)');

    program.parse(process.argv);

    inquirer
      .prompt(
        [
          {
            name: 'dir',
            message: 'Project folder name',
          },
          // {
          //   type: 'list',
          //   name: 'sampleSchema',
          //   message: 'Would you like to use a starter schema?',
          //   choices: [
          //     {
          //       name: 'Blog',
          //       value: 'blog',
          //     },
          //     {
          //       name: 'No thanks, a clean install please.',
          //       value: 'default',
          //     },
          //   ],
          // },
        ].filter((question) => question.name in program === false)
      )
      .then((promptAnswers) => {
        const answers = {
          name: program.dir,
          // sampleSchema: program.sampleSchema,
          ...promptAnswers,
        };
        createApp(answers);
      });

    resolve();
  });
}

export default run;
