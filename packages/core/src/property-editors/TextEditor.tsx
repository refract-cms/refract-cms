import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { TextField } from '@material-ui/core';

export interface TextEditorOptions {
  maxLength?: number;
  multiline?: boolean;
}

const defaultOptions: TextEditorOptions = {};

export default (options: TextEditorOptions = defaultOptions) => (props: PropertyEditorProps<string>) => {
  return (
    <TextField
      multiline={options.multiline}
      fullWidth
      inputProps={{
        maxLength: options.maxLength
      }}
      label={props.propertyOptions.displayName}
      value={props.value || ''}
      onChange={e => props.setValue(e.target.value)}
    />
  );
};
