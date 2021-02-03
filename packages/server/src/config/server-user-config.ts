import type { Config, PropertyType } from '@refract-cms/core';
import { ResolverPlugin } from '../plugins/resolver-plugin';
import { ASTNode } from 'graphql';
import type { ServerPlugin } from '../plugins/server-plugin';
import type { Events } from './events';

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
  plugins: ServerPlugin[];
  events?: Events;
  // config: PluginConfig | Config;
}
