import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export function create(args: { name: string }) {
  const { name } = args;
  const targetDir = path.resolve(process.cwd(), name);
  console.log(`creating refract-cms app in ${targetDir}`);
  fs.ensureDirSync(targetDir);
  fs.copySync(path.resolve(import.meta.url, './create-template'), targetDir);
  console.log(chalk.green(`Successfully created app`));
  console.log(`cd ./${name}`);
  console.log(`npm install`);
  console.log(`npm start`);
}
