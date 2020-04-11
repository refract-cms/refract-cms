import { EntitySchema } from '@refract-cms/core';
import { repositoryForSchema } from '../repository-for-schema';
import { createResolverPlugin } from './create-resolver-plugin';
import { GraphQLList } from 'graphql';
import { getMongoDbQueryResolver, getGraphQLQueryArgs } from 'graphql-to-mongodb';
import { merge } from 'lodash';

export const multipleRefPlugin = createResolverPlugin({
  alias: 'multipleRef',
  buildFieldConfig: ({ propertyKey, meta, serverOptions, schemaBuilder }) => {
    const refSchema: EntitySchema = meta.schema;
    const type = schemaBuilder.getTypeFromSchema(refSchema);
    const entityType = schemaBuilder.getEntityTypeFromSchema(refSchema);
    return {
      type: new GraphQLList(type),
      args: getGraphQLQueryArgs(entityType),
      resolve: getMongoDbQueryResolver(entityType, async (filter, projection, options, source, args) => {
        const ids = source[propertyKey] as string[];
        return repositoryForSchema(refSchema)
          .find(
            merge(filter, {
              _id: {
                $in: ids
              }
            })
          )
          .sort(options.sort)
          .limit(options.limit)
          .skip(options.skip);
      })
    };
  }
});
