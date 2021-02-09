import type { Router } from 'express';
import type { ResolverPlugin } from './resolver-plugin';
import type { PluginConfig } from '@refract-cms/core';
import type { UserServerConfig } from '../config/user-server-config';

export interface ServerPluginConfig extends Pick<UserServerConfig, 'events'> {
  configureRouter?: (router: Router) => void;
  config: PluginConfig;
  resolverPlugins?: ResolverPlugin[];
}
