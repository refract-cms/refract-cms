import type { Entity, EntitySchema } from '@refract-cms/core';
import mongoose from 'mongoose';

export function repositoryForSchema<T>(schema: EntitySchema<T>) {
  type ModelType = mongoose.Document & EntitySchema<T>['prototypes'];
  return mongoose.models[schema.options.alias] as mongoose.Model<ModelType>;
}
