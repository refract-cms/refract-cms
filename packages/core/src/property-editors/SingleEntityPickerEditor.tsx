import React from 'react';
import type { PropertyEditorProps } from '../properties/property-editor-props';
import type { EntitySchema } from '../entities/entity-schema';
import { createMultipleEntityPickerEditor } from '..';

export interface SingleEntityPickerOptions {
  schema: EntitySchema;
}

export default (options: SingleEntityPickerOptions) => {
  const MultipleEntityPickerEditor = createMultipleEntityPickerEditor(options);
  return ({ value, setValue, propertyKey, propertyOptions, serverUrl }: PropertyEditorProps<string>) => (
    <MultipleEntityPickerEditor
      source={{}}
      serverUrl={serverUrl}
      value={[value].filter(Boolean)}
      setValue={(newValue) => {
        setValue(newValue[newValue.length - 1]);
      }}
      propertyKey={propertyKey}
      propertyOptions={propertyOptions}
      {...options}
      max={1}
    />
  );
};
