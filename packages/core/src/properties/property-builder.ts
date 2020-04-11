import { EntitySchema } from '../entities/entity-schema';
import { PropertyOptions } from './property-options';
import { createSingleEntityPickerEditor, createMultipleEntityPickerEditor } from '..';

function singleReference(
  schema: EntitySchema,
  options?: Pick<PropertyOptions<any, String>, 'displayName' | 'defaultValue'>
): PropertyOptions<any, StringConstructor> {
  return {
    ...options,
    type: String,
    editorComponent: createSingleEntityPickerEditor({
      schema
    }),
    resolverPlugin: {
      alias: 'singleRef',
      meta: { schema }
    }
  };
}

function multipleReferences(
  schema: EntitySchema,
  options?: Pick<PropertyOptions<any, String>, 'displayName' | 'defaultValue'> & { max?: number }
): PropertyOptions<any, StringConstructor[]> {
  return {
    ...options,
    type: [String],
    editorComponent: createMultipleEntityPickerEditor({
      schema,
      max: options.max
    }),
    resolverPlugin: {
      alias: 'multipleRef',
      meta: { schema }
    }
  };
}

export const propertyBuilder = {
  singleReference,
  multipleReferences
};
