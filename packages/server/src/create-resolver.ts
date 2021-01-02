import { EntitySchema, PropertyType, ActualType } from '@refract-cms/core';
import { RefractGraphQLContext } from './graphql/refract-graphql-context';
import { GraphQLFieldConfigArgumentMap } from 'graphql';

export function createResolver<T>(
  schema: EntitySchema<T>,
  resolvers: {
    [key: string]: {
      type: PropertyType;
      resolve?: (source: ActualType<T>, args: GraphQLFieldConfigArgumentMap, context: RefractGraphQLContext) => any;
    };
  }
) {
  return {
    [schema.options.alias]: resolvers,
  };
}
