import type { Router } from 'express';
import { ResolverPlugin } from './resolver-plugin';
import { ServerOptions } from '../config/server-options';
import type { ServerOptionsArgs } from '../config/server-options-args';
import type { PluginConfig } from '@refract-cms/core';

export interface ServerPluginConfig extends ServerOptionsArgs {
  // resolverPlugins: ResolverPlugin[];
  configureRouter?: (router: Router) => void;
  config: PluginConfig;
}
