import { EntitySchema } from '@refract-cms/core';
import { repositoryForSchema } from '../repository-for-schema';
import { createResolverPlugin } from './create-resolver-plugin';

export const singleRefPlugin = createResolverPlugin({
  alias: 'singleRef',
  buildFieldConfig: ({ propertyKey, meta, serverOptions, schemaBuilder }) => {
    const refSchema: EntitySchema = meta.schema;
    return {
      type: schemaBuilder.getTypeFromSchema(refSchema),
      resolve: source => {
        const id: string = source[propertyKey] as any;
        return repositoryForSchema(refSchema).findOne({ _id: id }) as any;
      }
    };
  }
});
