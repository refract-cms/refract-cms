import { Router } from 'express';
import { ResolverPlugin } from './resolver-plugin';
import { ServerOptions } from '../config/server-options';
import { ServerOptionsArgs } from '../config/server-options-args';
import { PluginConfig } from '@refract-cms/core';

export interface ServerPlugin extends ServerOptionsArgs {
  // resolverPlugins: ResolverPlugin[];
  configureRouter?: (router: Router) => void;
  config: PluginConfig;
}
