import { Config, PropertyType } from '@refract-cms/core';
import { ResolverPlugin } from '../plugins/resolver-plugin.model';
import { ASTNode } from 'graphql';
import { ServerPlugin } from '../plugins/server-plugin.model';
import { ServerOptionsArgs } from './server-options-args.model';

export interface ServerConfig extends ServerOptionsArgs {
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
  plugins?: ServerPlugin[];
}
