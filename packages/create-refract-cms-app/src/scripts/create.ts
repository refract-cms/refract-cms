import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import shell from 'shelljs';
import ora from 'ora';
import { spawn } from 'child_process';

const __dirname = new URL(import.meta.url).pathname;

export function create({ dir, sampleSchema }: { dir: string; sampleSchema: 'blog' | 'default' }) {
  console.log({ dir, sampleSchema });
  return;
  const appDir = path.resolve(process.cwd(), dir);
  const spinner = ora({
    text: 'Installing dependencies',
    spinner: 'dots',
  });

  const npmInstall = () => {
    return new Promise((resolve, reject) => {
      var process = spawn('npm install', { shell: true, cwd: appDir });
      spinner.start();
      process.on('exit', () => {
        resolve();
      });
    });
  };

  console.log('Creating a new app in ' + appDir);
  fs.ensureDirSync(dir);

  fs.copySync(path.join(__dirname, '../new-source-files'), path.join(process.cwd(), dir));
  console.log('Created app in ' + chalk.blue(appDir));

  fs.copySync(
    path.join(__dirname, '../starter-schema-configs', sampleSchema),
    path.join(process.cwd(), dir, 'refract-cms/src')
  );

  spinner.start();
  npmInstall().then(() => {
    spinner.stop();
    console.log('--------');
    console.log(chalk.yellow('cd ' + dir));
    console.log(chalk.yellow('docker-compose up --build'));
    console.log('--------');
    console.log('Changes made in ./refract-cms/src will be hot-reloaded.');
    process.exit();
  });
}
