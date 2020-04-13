import inquirer from 'inquirer';
import program from 'commander';

function run(args: any) {
  return new Promise((resolve) => {
    import('./scripts/create').then(({ create }) => {
      create({ dir: 'hi', sampleSchema: 'blog' });
      resolve();
    });
  });
  // return new Promise((resolve) => {
  //   program
  //     .option('-d, --dir <type>', 'Project name and folder name')
  //     .option('-s, --sample-schema <type>', 'Sample schema (default or blog)');

  //   program.parse(args);

  //   inquirer
  //     .prompt(
  //       [
  //         {
  //           name: 'dir',
  //           message: 'Project folder name',
  //         },
  //         {
  //           type: 'list',
  //           name: 'sampleSchema',
  //           message: 'Would you like to use a starter schema?',
  //           choices: [
  //             {
  //               name: 'Blog',
  //               value: 'blog',
  //             },
  //             {
  //               name: 'No thanks, a clean install please.',
  //               value: 'default',
  //             },
  //           ],
  //         },
  //       ].filter((question) => question.name in program === false)
  //     )
  //     .then((promptAnswers) => {
  //       const answers = {
  //         dir: program.dir,
  //         sampleSchema: program.sampleSchema,
  //         ...promptAnswers,
  //       };
  //       create(answers);
  //       resolve();
  //     });
  // });
}

export default run;
