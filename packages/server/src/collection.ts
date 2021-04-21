import type { Entity, EntitySchema, Return } from '@refract-cms/core';
import mongoose from 'mongoose';

export function collection<T>(schema: EntitySchema<T>) {
  type ModelType = mongoose.Document & Return<T>; // EntitySchema<T>['prototypes'];
  return mongoose.models[schema.options.alias] as mongoose.Model<ModelType & any>;
}
