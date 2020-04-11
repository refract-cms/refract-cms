import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { TextField } from '@material-ui/core';

type numberType = 'FLOAT' | 'NUMBER' | 'INT';

export interface TextEditorOptions {
  maxLength?: number;
  multiline?: boolean;
  numberType: numberType;
}

const defaultOptions: TextEditorOptions = { numberType: 'NUMBER' };

export default (options: TextEditorOptions = defaultOptions) => (props: PropertyEditorProps<number>) => {
  return (
    <TextField
      multiline={options.multiline}
      fullWidth
      inputProps={{
        maxLength: options.maxLength,
      }}
      label={props.propertyOptions.displayName}
      value={props.value || ''}
      onChange={(e) => {
        let val: number = 0;
        if (options.numberType === 'FLOAT') {
          val = parseFloat(e.target.value);
        }
        if (options.numberType === 'NUMBER') {
          val = Number(e.target.value);
        }
        if (options.numberType === 'INT') {
          val = parseInt(e.target.value);
        }
        return props.setValue(val);
      }}
      type="number"
    />
  );
};
