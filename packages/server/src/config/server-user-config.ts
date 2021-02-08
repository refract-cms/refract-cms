import type { UserConfig, PropertyType, Config } from '@refract-cms/core';
import { ResolverPlugin } from '../plugins/resolver-plugin';
import { ASTNode } from 'graphql';
import type { ServerPluginConfig } from '../plugins/server-plugin-config';
import type { Events } from '../events/events';

export interface ServerUserConfig {
  config: Config;
  mongoConnectionString: string;
  rootPath: string;
  auth: {
    adminCredentials: {
      username: string;
      password: string;
    };
    jwt: {
      issuer?: string;
      secret: string;
    };
  };
  plugins: ServerPluginConfig[];
  events?: Events;
  resolvers?: {
    [key: string]: {
      [key: string]: {
        type: PropertyType;
        resolve?: any;
      };
    };
  };
  // config: PluginConfig | Config;
}
