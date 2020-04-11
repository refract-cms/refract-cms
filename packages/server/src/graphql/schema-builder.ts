import { PropertyType, EntitySchema, PropertyOptions, Entity } from '@refract-cms/core';
import {
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLList,
  GraphQLType,
  GraphQLSchema,
  GraphQLInputObjectType,
  GraphQLInputType,
  GraphQLInt,
  GraphQLScalarType,
} from 'graphql';
import mongoose from 'mongoose';
// import { Properties, buildHelpers } from '../create-public-schema';
import { repositoryForSchema } from '../repository-for-schema';
import { getGraphQLQueryArgs, getMongoDbQueryResolver, getMongoDbFilter } from 'graphql-to-mongodb';
import { Db, ObjectId } from 'mongodb';
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date';
import chalk from 'chalk';
import { MongoIdType } from './mongo-id.type';
import { ResolvedPropertyOptions } from '../resolved-property-options';
import { singleRefPlugin } from '../plugins/single-ref-plugin';
import { multipleRefPlugin } from '../plugins/multiple-ref-plugin';
import produce from 'immer';
import { ServerOptions } from '../config/server-options';

export class SchemaBuilder {
  types: GraphQLObjectType[] = [];
  inputTypes: GraphQLInputObjectType[] = [];
  serverOptions: ServerOptions;

  init(serverOptions: ServerOptions) {
    this.types = [];
    this.inputTypes = [];
    this.serverOptions = produce(serverOptions, (newServerOptions) => {
      newServerOptions.resolverPlugins = newServerOptions.resolverPlugins || [];
      newServerOptions.resolverPlugins.push(singleRefPlugin);
      newServerOptions.resolverPlugins.push(multipleRefPlugin);
    });
  }

  getTypeFromSchema<T>(entitySchema: EntitySchema<T>) {
    return this.buildGraphQLObjectFromSchema({
      entitySchema,
    });
  }

  getEntityTypeFromSchema<T>(entitySchema: EntitySchema<T>) {
    return this.buildGraphQLObjectFromSchema({
      entitySchema,
      prefixName: '',
      addResolvers: false,
      suffixName: 'Entity',
    });
  }

  buildSchema(schema: EntitySchema[]) {
    let publicQueryFields = {};
    schema.forEach((entitySchema) => {
      const type = this.buildGraphQLObjectFromSchema({
        entitySchema,
        prefixName: '',
        addResolvers: true,
      });
      const repository = repositoryForSchema(entitySchema);

      publicQueryFields = {
        ...publicQueryFields,
        ...this.buildPublicFieldQueries(entitySchema, repository, type),
      };

      console.log(chalk.blue(`Added schema: ${entitySchema.options.displayName || entitySchema.options.alias}`));
    });

    const publicQuery = new GraphQLObjectType({
      name: 'Query',
      fields: publicQueryFields,
    });

    const publicGraphQLSchema = new GraphQLSchema({ query: publicQuery });

    let internalQueryFields = {};
    schema.forEach((entitySchema) => {
      const repository = repositoryForSchema(entitySchema);
      internalQueryFields = {
        ...internalQueryFields,
        ...this.buildInternalFieldQueries(entitySchema, repository),
      };
    });

    const internalQuery = new GraphQLObjectType({
      name: 'Query',
      fields: internalQueryFields,
    });

    let mutationFields = {};
    schema.forEach((entitySchema) => {
      const repository = repositoryForSchema(entitySchema);

      mutationFields = {
        ...mutationFields,
        ...this.buildFieldMutations(entitySchema, repository),
      };
    });

    const mutation = new GraphQLObjectType({
      name: 'Mutation',
      fields: mutationFields,
    });

    const internalGraphQLSchema = new GraphQLSchema({ query: internalQuery, mutation });

    this.serverOptions.events
      .filter((e) => Boolean(e.onSchemaBuilt))
      .forEach((events) => {
        events.onSchemaBuilt(publicGraphQLSchema);
      });

    // //emitGraphqlCodeGen(publicGraphQLSchema, this.serverOptions).catch(console.log);

    return {
      publicGraphQLSchema,
      internalGraphQLSchema,
    };
  }

  buildInternalFieldQueries<TEntity extends Entity & mongoose.Document>(
    entitySchema: EntitySchema<TEntity>,
    repository: mongoose.Model<TEntity>
  ) {
    const entityType = this.getEntityTypeFromSchema(entitySchema);
    const args = getGraphQLQueryArgs(entityType);
    const resolvers = {
      [`${entitySchema.options.alias}EntityList`]: {
        type: new GraphQLList(entityType),
        args,
        resolve: getMongoDbQueryResolver(
          entityType,
          async (filter, projection, options, obj, args, { db }: { db: Db }) => {
            return repository
              .find(filter)
              .sort(options.sort)
              .limit(options.limit || 100)
              .skip(options.skip || 0);
          }
        ),
      },
      [`${entitySchema.options.alias}Count`]: {
        type: GraphQLInt,
        args: {
          filter: args.filter,
        },
        resolve: (_, { filter }) => repository.countDocuments(getMongoDbFilter(entityType, filter)),
      },
      [`${entitySchema.options.alias}EntityFindById`]: {
        type: entityType,
        args: {
          id: { type: GraphQLString },
        },
        resolve: (_, { id }) => {
          return repository.findById(id);
        },
      },
    };
    return resolvers;
  }

  buildPublicFieldQueries<TEntity extends Entity & mongoose.Document>(
    entitySchema: EntitySchema<TEntity>,
    repository: mongoose.Model<TEntity>,
    type: GraphQLObjectType
  ) {
    const entityType = this.buildGraphQLObjectFromSchema({
      entitySchema,
      prefixName: '',
      addResolvers: false,
      suffixName: 'Entity',
    });
    const inputType = this.buildInput(`${entitySchema.options.alias}Input`, entitySchema.properties);
    const args = getGraphQLQueryArgs(entityType);
    const resolvers = {
      [`${entitySchema.options.alias}Count`]: {
        type: GraphQLInt,
        args: {
          filter: args.filter,
        },
        resolve: (_, { filter }) => repository.count(getMongoDbFilter(entityType, filter)),
      },
      [`${entitySchema.options.alias}List`]: {
        type: new GraphQLList(type),
        args,
        resolve: getMongoDbQueryResolver(
          entityType,
          async (filter, projection, options, obj, args, { db }: { db: Db }) => {
            return repository
              .find(filter)
              .sort(options.sort)
              .limit(options.limit || 100)
              .skip(options.skip || 0);
          },
          {
            differentOutputType: true,
          }
        ),
      },
      [`${entitySchema.options.alias}Preview`]: {
        type,
        args: {
          record: { type: inputType },
        },
        resolve: (_, { record }, { userId }) => {
          return record;
        },
      },
    };

    if (entitySchema.options.maxOne) {
      return {
        ...resolvers,
        [`${entitySchema.options.alias}`]: {
          type,
          args: {},
          resolve: async (obj: any, {}: any, context: any) => {
            return repository.findOne();
          },
        },
      };
    } else {
      return {
        ...resolvers,
        [`${entitySchema.options.alias}FindById`]: {
          type,
          args: {
            id: { type: GraphQLString },
          },
          resolve: (_, { id }) => {
            return repository.findById(id);
          },
        },
        [`${entitySchema.options.alias}FindOne`]: {
          type,
          args,
          resolve: getMongoDbQueryResolver(
            entityType,
            async (filter, projection, options, obj, args, { db }: { db: Db }) => {
              return repository
                .findOne(filter)
                .sort(options.sort)
                .limit(options.limit || 100)
                .skip(options.skip || 0);
            },
            {
              differentOutputType: true,
            }
          ),
        },
      };
    }
  }

  buildFieldMutations<TEntity extends Entity & mongoose.Document>(
    entitySchema: EntitySchema<TEntity>,
    repository: mongoose.Model<TEntity>
  ) {
    const inputType = this.buildInput(`${entitySchema.options.alias}Input`, entitySchema.properties);
    const entityType = this.getEntityTypeFromSchema(entitySchema);
    return {
      [`${entitySchema.options.alias}Create`]: {
        type: entityType,
        args: {
          record: { type: inputType },
        },
        resolve: (_, { record }, { userId }) => {
          if (!userId) {
            throw new Error('AuthenticationError');
          }
          return repository.create(record);
        },
      },
      [`${entitySchema.options.alias}Update`]: {
        type: entityType,
        args: {
          record: { type: inputType },
        },
        resolve: async (_, { record }, { userId }) => {
          if (!userId) {
            throw new Error('AuthenticationError');
          }
          if (!record._id) {
            throw new Error('Missing _id');
          }
          await repository.findByIdAndUpdate(record._id, record);
          return repository.findById(record._id);
        },
      },
      [`${entitySchema.options.alias}RemoveById`]: {
        type: GraphQLBoolean,
        args: {
          id: { type: GraphQLString },
        },
        resolve: async (_, { id }, { userId }) => {
          if (!userId) {
            throw new Error('AuthenticationError');
          }
          await repository.findByIdAndDelete(id);
          return true;
        },
      },
    };
  }

  buildType<T>(propertyName: string, propertyType: PropertyType): GraphQLType {
    switch (true) {
      case propertyType === String: {
        return GraphQLString;
      }
      case propertyType === Date: {
        return GraphQLDateTime;
      }
      case propertyType === Number: {
        return GraphQLFloat;
      }
      case propertyType === Boolean: {
        return GraphQLBoolean;
      }
      case propertyType instanceof Array: {
        const type = this.buildType(propertyName, propertyType[0]);
        return new GraphQLList(type);
      }
      case propertyType instanceof Object: {
        return this.buildShape(propertyName, propertyType as any);
      }

      // @ts-ignore
      // case 'SchemaType': {
      //   // @ts-ignore
      //   return this.buildGraphQLObjectFromSchema(propertyType.meta, '');
      // }
      // case 'Ref': {
      //   const shapeArgs = Object.keys(propertyType.meta.properties).reduce((acc, propertKey) => {
      //     acc[propertKey] = propertyType.meta.properties[propertKey].type;
      //     return acc;
      //   }, {}) as any;

      //   const shape = RefractTypes.shape(shapeArgs);
      //   return this.buildShape(propertyName, shape);
      // }
      default: {
        return GraphQLString;
      }
    }
  }

  buildInputType<T>(propertyName: string, propertyType: PropertyType): GraphQLInputType {
    switch (true) {
      case propertyType === String: {
        return GraphQLString;
      }
      case propertyType === Date: {
        return GraphQLDateTime;
      }
      case propertyType === Number: {
        return GraphQLFloat;
      }
      case propertyType === Boolean: {
        return GraphQLBoolean;
      }
      case propertyType instanceof Array: {
        const type = this.buildInputType(propertyName, propertyType[0]);
        return new GraphQLList(type);
      }
      case propertyType instanceof Object: {
        return this.buildShapeInput(propertyName, propertyType as any);
      }
      default: {
        return GraphQLString;
      }
    }
  }

  buildInput<T extends Entity>(
    alias: string,
    properties: {
      [key: string]: PropertyOptions<any, any>;
    }
  ) {
    const existingType = this.types.find((t) => t.name === alias);

    if (existingType) {
      return existingType;
    }

    const inputTypes = new GraphQLInputObjectType({
      name: alias,
      fields: () =>
        Object.keys(properties).reduce(
          (acc, propertyKey) => {
            const propertyType = properties[propertyKey].type;
            const type = this.buildInputType(`${alias}${propertyKey}`, propertyType);
            acc[propertyKey] = {
              type,
            };
            return acc;
          },
          {
            _id: {
              type: MongoIdType,
            },
          }
        ),
    });

    this.inputTypes.push(inputTypes);
    return inputTypes;
  }

  buildEntity<T extends Entity>(
    alias: string,
    properties: {
      [key: string]: PropertyOptions<any, any>;
    },
    addResolvers?: boolean
  ) {
    const existingType = this.types.find((t) => t.name === alias);
    if (existingType) {
      return existingType;
    }
    const extraProperties =
      this.serverOptions.resolvers && addResolvers ? this.serverOptions.resolvers[alias] || {} : {};

    const editableAndResolvedProperties = {
      ...properties,
      ...extraProperties,
    };

    const type = new GraphQLObjectType({
      name: alias,
      fields: () =>
        Object.keys(editableAndResolvedProperties).reduce(
          (acc, propertyKey) => {
            const propertyOptions: PropertyOptions<any, any> &
              ResolvedPropertyOptions<any, any> = editableAndResolvedProperties[propertyKey] as any;
            const propertyType = propertyOptions.type;
            const type = this.buildType(`${alias}${propertyKey}`, propertyType);
            acc[propertyKey] = {
              type,
            };
            if (addResolvers && propertyOptions.resolve) {
              acc[propertyKey].resolve = propertyOptions.resolve;
              acc[propertyKey].dependencies = [];
            } else if (
              addResolvers &&
              propertyOptions.resolverPlugin &&
              this.serverOptions.resolverPlugins.some((plugin) => plugin.alias === propertyOptions.resolverPlugin.alias)
            ) {
              const plugin = this.serverOptions.resolverPlugins.find(
                (plugin) => plugin.alias === propertyOptions.resolverPlugin.alias
              );
              acc[propertyKey] = plugin.buildFieldConfig({
                propertyKey,
                meta: propertyOptions.resolverPlugin.meta,
                serverOptions: this.serverOptions,
                schemaBuilder: this,
              });
            }
            return acc;
          },
          {
            _id: {
              type: MongoIdType,
            },
          }
        ),
    });

    this.types.push(type);

    return type;
  }

  buildShape<T>(propertyName: string, propertyType: { [K: string]: PropertyType }) {
    return new GraphQLObjectType({
      name: propertyName,
      fields: Object.keys(propertyType).reduce((acc, propertyKey) => {
        const type = this.buildType(`${propertyName}${propertyKey}`, propertyType[propertyKey]);
        acc[propertyKey] = {
          type,
        };
        return acc;
      }, {}),
    });
  }

  buildShapeInput<T>(propertyName: string, propertyType: { [K: string]: PropertyType }) {
    return new GraphQLInputObjectType({
      name: propertyName,
      fields: Object.keys(propertyType).reduce((acc, propertyKey) => {
        const type = this.buildInputType(`${propertyName}${propertyKey}`, propertyType[propertyKey]);
        acc[propertyKey] = {
          type,
        };
        return acc;
      }, {}),
    });
  }

  private buildGraphQLObjectFromSchema({
    entitySchema,
    prefixName = '',
    addResolvers = true,
    suffixName = '',
  }: {
    entitySchema: EntitySchema;
    prefixName?: string;
    addResolvers?: boolean;
    suffixName?: string;
  }) {
    const type = this.buildEntity(
      prefixName + entitySchema.options.alias + suffixName,
      entitySchema.properties,
      addResolvers
    );
    return type;
  }
}

export const schemaBuilder = new SchemaBuilder();
