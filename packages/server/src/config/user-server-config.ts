import type { UserConfig, PropertyType, Config, EntitySchema } from '@refract-cms/core';
import type { ASTNode, GraphQLFieldConfig, GraphQLFieldConfigMap, GraphQLObjectType, Thunk } from 'graphql';
import type { PluginServerConfig } from '../plugins/plugin-server-config';
import type { Events } from '../events/events';
import type { RefractGraphQLContext } from '../graphql/refract-graphql-context';
import type { getCollection } from '../get-collection';

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
  query?: ExtendGraphQL;
  mutation?: ExtendGraphQL;
  // config: PluginConfig | Config;
}

type ExtendGraphQL = (opts: {
  getType: <T>(entitySchema: EntitySchema<T>) => GraphQLObjectType;
  getCollection: typeof getCollection;
}) => () => {
  [x: string]: GraphQLFieldConfig<any, RefractGraphQLContext, any>;
};
