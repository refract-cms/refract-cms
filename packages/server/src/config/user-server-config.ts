import type { UserConfig, PropertyType, Config } from '@refract-cms/core';
import { ResolverPlugin } from '../plugins/resolver-plugin';
import { ASTNode } from 'graphql';
import type { PluginServerConfig } from '../plugins/plugin-server-config';
import type { Events } from '../events/events';

export interface UserServerConfig {
  config: Config;
  mongoConnectionString: string;
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
  plugins: PluginServerConfig[];
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
