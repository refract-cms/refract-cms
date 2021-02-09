import { ResolvedPropertyOptions } from '../resolved-property-options';
import type { PropertyType } from '@refract-cms/core';
import type { GraphQLObjectType, GraphQLFieldConfig } from 'graphql';
import type { RefractGraphQLContext } from '../graphql/refract-graphql-context';
import type { SchemaBuilder } from '../graphql/schema-builder';
import type { ServerConfig } from '../config/server-config';

export interface ResolverPlugin<T extends PropertyType = any> {
  alias: string;
  buildFieldConfig: (args: {
    propertyKey: string;
    meta: any;
    serverConfig: ServerConfig;
    schemaBuilder: SchemaBuilder;
  }) => GraphQLFieldConfig<any, RefractGraphQLContext>;
}
