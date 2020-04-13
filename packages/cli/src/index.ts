import inquirer from 'inquirer';
import program from 'commander';
import express from 'express';
import { ServerConfig } from '@refract-cms/server';
import { Config } from '@refract-cms/core';
import { Theme } from '@material-ui/core';

export interface CliServerConfig extends Omit<ServerConfig, 'rootPath' | 'config'> {
  configureExpress?: (app: express.Express) => void;
}
export interface CliConfig extends Config {
  theme: Theme;
  path?: string;
}
export function configureCli(config: CliConfig): CliConfig {
  return {
    ...config,
    path: (config.path || '/').replace(/\/$/, ''),
  };
}

export function configureCliServer(config: CliServerConfig): CliServerConfig {
  return config;
}
function run(args: any) {
  return new Promise((resolve) => {
    console.log('run...', args, import.meta.url);
    resolve();
  });
}

export default run;
