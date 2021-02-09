import type { Router } from 'express';
import type { ResolverPlugin } from './resolver-plugin';
import type { PluginConfig } from '@refract-cms/core';
import type { ServerUserConfig } from '../config/server-user-config';

export interface ServerPluginConfig extends Pick<ServerUserConfig, 'events'> {
  configureRouter?: (router: Router) => void;
  config: PluginConfig;
  resolverPlugins?: ResolverPlugin[];
}
