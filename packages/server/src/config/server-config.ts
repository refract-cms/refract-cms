import type { PropertyType, EntitySchema, Config } from '@refract-cms/core';
import type { ResolverPlugin } from '../plugins/resolver-plugin';
import type { Events } from './events';
import type { Router } from 'express';

export interface ServerConfig {
  config: Config;
  schemas: EntitySchema[];
  resolverPlugins?: ResolverPlugin[];
  resolvers: {
    [key: string]: {
      [key: string]: {
        type: PropertyType;
        resolve?: any;
      };
    };
  };
  events: Events[];
  routers: {
    alias: string;
    router: Router;
  }[];
}
