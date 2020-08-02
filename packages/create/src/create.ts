import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export function create(args: { name: string }) {
  const { name } = args;
  const dirname = `/${path.dirname(import.meta.url.substring(8))}`;
  const targetDir = path.resolve(process.cwd(), name);
  console.log(`creating refract-cms app in ${targetDir}`);
  fs.ensureDirSync(targetDir);
  const templateDir = path.resolve(dirname, '../assets/create-template');
  console.log(chalk.blue(dirname), chalk.magenta(templateDir));
  fs.copySync(templateDir, targetDir);
  console.log(chalk.green(`Successfully created app`));
  console.log(`cd ./${name}`);
  console.log(`npm install`);
  console.log(`npm start`);
}
