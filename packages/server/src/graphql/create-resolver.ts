import type { EntitySchema, PropertyType, ActualType } from '@refract-cms/core';
import type { RefractGraphQLContext } from '../graphql/refract-graphql-context';
import type { GraphQLFieldConfigArgumentMap } from 'graphql';

export function createResolver<T>(
  schema: EntitySchema<T>,
  resolvers: {
    [key: string]: {
      type: PropertyType;
      args?: GraphQLFieldConfigArgumentMap;
      resolve?: (source: ActualType<T>, args: any | undefined, context: RefractGraphQLContext) => any;
    };
  }
) {
  return {
    [schema.options.alias]: resolvers,
  };
}
