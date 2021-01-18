import type React from 'react';
import type { PropertyEditorProps } from './property-editor-props';
import type { PropertyType, ActualType } from './property-types';
import type { Return } from '../entities/entity-schema';

export type PropertyOptions<T, TPropertyType extends PropertyType | any> = {
  displayName?: string;
  editorComponent?: React.ComponentType<PropertyEditorProps<ActualType<TPropertyType>, Return<T>>>;
  defaultValue?: (() => ActualType<TPropertyType>) | ActualType<TPropertyType> | Promise<ActualType<TPropertyType>>;
  type: TPropertyType;
  resolverPlugin?: {
    alias: string;
    meta: any;
  };
};
