import { ResolvedPropertyOptions } from '../resolved-property-options';
import type { PropertyType } from '@refract-cms/core';
import { ServerConfig } from '../config/server-config';
import type { GraphQLObjectType, GraphQLFieldConfig } from 'graphql';
import type { RefractGraphQLContext } from '../graphql/refract-graphql-context';
import type { SchemaBuilder } from '../graphql/schema-builder';
import type { ServerOptions } from '../config/server-options';

export interface ResolverPlugin<T extends PropertyType = any> {
  alias: string;
  buildFieldConfig: (args: {
    propertyKey: string;
    meta: any;
    serverOptions: ServerOptions;
    schemaBuilder: SchemaBuilder;
  }) => GraphQLFieldConfig<any, RefractGraphQLContext>;
}
