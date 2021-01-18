import type { PropertyOptions } from '../properties/property-options';
import type { EntitySchema, Return } from './entity-schema';
import type { EntityOptions } from './entity-options';

export function composeSchema<T>(args: {
  properties: { [K in keyof T]: PropertyOptions<T, T[K]> };
  options: EntityOptions<T>;
}): EntitySchema<T> {
  return {
    ...args,
    prototypes: {} as Return<T>,
  };
}
export default composeSchema;
