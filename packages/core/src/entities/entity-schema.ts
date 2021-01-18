import composeSchema from './compose-schema';
import type { PropertyOptions } from '../properties/property-options';
import type { EntityOptions } from './entity-options';
import type { ActualType } from '../properties/property-types';
import type { Entity } from './entity';

type ObjectWithConstructorTypes<T> = {
  [K in keyof T]: PropertyOptions<T, T[K]>;
};
export type Return<T> = {
  [K in keyof ObjectWithConstructorTypes<T>]: ActualType<ObjectWithConstructorTypes<T>[K]['type']>;
} &
  Entity;

export type EntitySchema<T = any> = {
  properties: { [K in keyof T]: PropertyOptions<T, T[K]> };
  options: EntityOptions;
  prototypes: Return<T>;
};
