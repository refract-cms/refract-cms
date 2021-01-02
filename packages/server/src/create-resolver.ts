import type { EntitySchema, PropertyType, ActualType } from '@refract-cms/core';

export function createResolver<T>(
  schema: EntitySchema<T>,
  resolvers: {
    [key: string]: {
      type: PropertyType;
      resolve?: (source: ActualType<T>) => any;
    };
  }
) {
  return {
    [schema.options.alias]: resolvers,
  };
}
