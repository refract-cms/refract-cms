import type { EntitySchema } from '@refract-cms/core';
import { collection } from '../collection';
import { createResolverPlugin } from './create-resolver-plugin';

export const singleRefPlugin = createResolverPlugin({
  alias: 'singleRef',
  buildFieldConfig: ({ propertyKey, meta, serverConfig, schemaBuilder }) => {
    const refSchema: EntitySchema = meta.schema;
    return {
      type: schemaBuilder.getTypeFromSchema(refSchema),
      resolve: (source) => {
        const id: string = source[propertyKey] as any;
        return collection(refSchema).findOne({ _id: id }) as any;
      },
    };
  },
});
