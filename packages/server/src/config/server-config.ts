import type { PropertyType, EntitySchema, Config } from '@refract-cms/core';
import type { ResolverPlugin } from '../plugins/resolver-plugin';
import type { Events } from './events';
import type { Router } from 'express';
import type { ServerUserConfig } from './server-user-config';

export interface ServerConfig extends Pick<ServerUserConfig, 'auth' | 'mongoConnectionString' | 'resolvers'> {
  config: Config;
  resolverPlugins?: ResolverPlugin[];
  events: Events[];
  routers: {
    alias: string;
    router: Router;
  }[];
}
