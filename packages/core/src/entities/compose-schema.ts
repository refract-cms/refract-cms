import { PropertyOptions } from '../properties/property-options';
import { EntitySchema, Return } from './entity-schema';
import { EntityOptions } from './entity-options';

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
