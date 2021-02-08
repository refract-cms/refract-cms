import type { PropertyType, EntitySchema, Config } from '@refract-cms/core';
import type { ResolverPlugin } from '../plugins/resolver-plugin';
import type { Events } from '../events/events';
import type { Router } from 'express';
import type { ServerUserConfig } from './server-user-config';

export interface ServerConfig {
  config: ServerUserConfig['config'];
  resolverPlugins?: ResolverPlugin[];
  events: Events[];
  routers: {
    alias: string;
    router: Router;
  }[];
  resolvers: Required<ServerUserConfig['resolvers']>;
  auth: ServerUserConfig['auth'];
  mongoConnectionString: ServerUserConfig['mongoConnectionString'];
}
