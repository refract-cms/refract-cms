import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import { spawn } from 'child_process';
import ora from 'ora';

const spinner = ora({
  text: 'Installing dependencies',
  spinner: 'dots',
});

export function create(args: { name: string }) {
  const { name } = args;
  const dirname = `/${path.dirname(import.meta.url.substring(8))}`;
  const targetDir = path.resolve(process.cwd(), name);

  const npmInstall = () => {
    return new Promise((resolve, reject) => {
      var process = spawn('npm install', { shell: true, cwd: targetDir });
      spinner.start();
      process.on('exit', () => {
        resolve();
      });
    });
  };

  console.log(`Creating refract-cms app in ${targetDir}`);
  fs.ensureDirSync(targetDir);
  const templateDir = path.resolve(dirname, '../assets/create-template');
  fs.copySync(templateDir, targetDir);
  fs.renameSync(path.resolve(targetDir, '.npmignore'), path.resolve(targetDir, '.gitignore')))
  console.log(chalk.green(`Successfully created app`));
  npmInstall().then(() => {
    spinner.stop();
    console.log(`Installed npm dependencies`);
    console.log(`cd ./${name}`);
    console.log(`docker-compose up -d`);
    console.log(`npm run dev`);
  });
}
