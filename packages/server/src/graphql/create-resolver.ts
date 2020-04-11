import { EntitySchema } from '@refract-cms/core';
import { ResolvedPropertyOptions } from '../resolved-property-options';

export function createResolver<T, N>(
  schema: EntitySchema<T>,
  properties: { [K in keyof N]: ResolvedPropertyOptions<T, N[K]> }
) {
  return {
    [schema.options.alias]: properties,
  };
}
