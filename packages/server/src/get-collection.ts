import type { Entity, EntitySchema, Return } from '@refract-cms/core';
import mongoose from 'mongoose';

export function getCollection<T>(schema: EntitySchema<T>) {
  return mongoose.models[schema.options.alias] as mongoose.Model<mongoose.Document & Return<T>>;
}
