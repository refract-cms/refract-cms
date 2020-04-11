import { Router } from 'express';
import { ResolverPlugin } from './resolver-plugin.model';
import { ServerOptions } from '../config/server-options.model';
import { ServerOptionsArgs } from '../config/server-options-args.model';
import { PluginConfig } from '@refract-cms/core';

export interface ServerPlugin extends ServerOptionsArgs {
  // resolverPlugins: ResolverPlugin[];
  configureRouter?: (router: Router) => void;
  config: PluginConfig;
}
