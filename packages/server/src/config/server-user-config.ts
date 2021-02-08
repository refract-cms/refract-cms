import type { UserConfig, PropertyType } from '@refract-cms/core';
import { ResolverPlugin } from '../plugins/resolver-plugin';
import { ASTNode } from 'graphql';
import type { ServerPluginConfig } from '../plugins/server-plugin-config';
import type { Events } from './events';

export interface ServerUserConfig {
  config: UserConfig;
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
  // config: PluginConfig | Config;
}
