import { EntitySchema } from '@refract-cms/core';
import mongoose, { SchemaTypeOpts, Schema, SchemaType, mongo } from 'mongoose';
import { ServerConfig } from '../config/server-config';

export class MongooseSchemaBuilder {
  constructor() {}

  buildSchema(schemas: EntitySchema[]) {
    schemas.forEach((entitySchema) => {
      this.configureEntitySchema(entitySchema);
    });
  }

  configureEntitySchema(entitySchema: EntitySchema) {
    delete mongoose.connection.models[entitySchema.options.alias];
    const definition = Object.keys(entitySchema.properties).reduce((acc, propertyKey) => {
      const typeDef = entitySchema.properties[propertyKey].type;
      acc[propertyKey] = typeDef;
      return acc;
    }, {}) as any;

    const EntitySchema = new mongoose.Schema(definition, {
      collection: entitySchema.options.mongoCollectionName,
    });
    mongoose.model(entitySchema.options.alias, EntitySchema);
  }
}
