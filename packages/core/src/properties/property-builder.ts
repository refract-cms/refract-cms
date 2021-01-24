import type { EntitySchema } from '../entities/entity-schema';
import type { PropertyOptions } from './property-options';
import { createSingleEntityPickerEditor, createMultipleEntityPickerEditor } from '..';

function singleSchemaPicker(
  schema: EntitySchema,
  options?: Pick<PropertyOptions<any, String>, 'displayName' | 'defaultValue'>
): PropertyOptions<any, StringConstructor> {
  return {
    ...options,
    type: String,
    editorComponent: createSingleEntityPickerEditor({
      schema,
    }),
    resolverPlugin: {
      alias: 'singleRef',
      meta: { schema },
    },
  };
}

function multipleSchemaPicker(
  schema: EntitySchema,
  options?: Pick<PropertyOptions<any, String>, 'displayName' | 'defaultValue'> & { max?: number }
): PropertyOptions<any, StringConstructor[]> {
  return {
    ...options,
    type: [String],
    editorComponent: createMultipleEntityPickerEditor({
      schema,
      max: options.max,
    }),
    resolverPlugin: {
      alias: 'multipleRef',
      meta: { schema },
    },
  };
}

export const propertyBuilder = {
  singleSchemaPicker,
  multipleSchemaPicker,
};
