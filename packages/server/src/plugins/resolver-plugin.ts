import { ResolvedPropertyOptions } from '../resolved-property-options';
import { PropertyType } from '@refract-cms/core';
import { ServerConfig } from '../config/server-config';
import { GraphQLObjectType, GraphQLFieldConfig } from 'graphql';
import { RefractGraphQLContext } from '../graphql/refract-graphql-context';
import { SchemaBuilder } from '../graphql/schema-builder';
import { ServerOptions } from '../config/server-options';

export interface ResolverPlugin<T extends PropertyType = any> {
  alias: string;
  buildFieldConfig: (args: {
    propertyKey: string;
    meta: any;
    serverOptions: ServerOptions;
    schemaBuilder: SchemaBuilder;
  }) => GraphQLFieldConfig<any, RefractGraphQLContext>;
}
