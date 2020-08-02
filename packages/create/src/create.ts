import fs from 'fs-extra';
import path from 'path';

export function create(args: { name: string }) {
  const { name } = args;
  const targetDir = path.resolve(process.cwd(), name);
  console.log(`creating refract-cms app in ${targetDir}`);
  fs.ensureDirSync(targetDir);
  fs.copySync(path.resolve(__dirname, './create-template'), targetDir);
}
