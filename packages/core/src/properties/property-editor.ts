import type { PropertyEditorProps } from './property-editor-props';

export type PropertyEditor<TOptions, TType> = (options: TOptions) => React.ComponentType<PropertyEditorProps<TType>>;
