import type { PropertyType, EntitySchema, Config } from '@refract-cms/core';
import type { ResolverPlugin } from '../plugins/resolver-plugin';
import type { Events } from '../events/events';
import type { Router } from 'express';
import type { UserServerConfig } from './user-server-config';
import type { PluginServerConfig } from '../plugins/plugin-server-config';

export interface ServerConfig {
  config: UserServerConfig['config'];
  resolverPlugins: Required<PluginServerConfig['resolverPlugins']>;
  events: Events[];
  routers: {
    alias: string;
    router: Router;
  }[];
  resolvers: Required<UserServerConfig['resolvers']>;
  auth: UserServerConfig['auth'];
  mongoConnectionString: UserServerConfig['mongoConnectionString'];
}
