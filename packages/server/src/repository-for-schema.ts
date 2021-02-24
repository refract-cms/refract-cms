import type { Entity, EntitySchema } from '@refract-cms/core';
import mongoose from 'mongoose';

export type ModelType<T> = mongoose.Model<mongoose.Document & EntitySchema<T>['prototypes']>;

export function repositoryForSchema<T>(schema: EntitySchema<T>) {
  return mongoose.models[schema.options.alias] as ModelType<T>;
}
