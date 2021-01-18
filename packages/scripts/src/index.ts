import inquirer from 'inquirer';
import program from 'commander';
import { devCommand } from './dev/dev';
import { Config } from '@refract-cms/core';
import { ServerConfig } from '@refract-cms/server';
import { Theme } from '@material-ui/core/styles';
import path from 'path';

export async function run(args: any) {
  const configPath = path.resolve(process.cwd(), 'refract.config.ts');
  console.log({ configPath });
  // const config = await import(configPath).then((config: ScriptsConfig) => config);
  const config = require(configPath).default;
  console.log({ config });
  program.command('dev').action(() => {
    devCommand();
  });
  // console.log('create app...', args);
  // program.option('-d, --dir <type>', 'Project name and folder name');
  // .option('-s, --sample-schema <type>', 'Sample schema (default or blog)');

  program.parse(process.argv);
}

export default run;

export interface ScriptsConfig {
  config: () => Promise<Config>;
  serverConfig: () => Promise<ServerConfig>;
  theme?: Theme;
}
