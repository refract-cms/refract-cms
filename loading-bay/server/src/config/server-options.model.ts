import { PropertyType, EntitySchema, Config } from '@refract-cms/core';
import { ServerOptionsArgs } from './server-options-args.model';
import { ResolverPlugin } from '../plugins/resolver-plugin.model';
import { Events } from './events.model';
import { Router } from 'express';

export interface ServerOptions {
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
