import * as React from 'react';
import type { PropertyEditorProps } from '../properties/property-editor-props';
import { TextField, Select, MenuItem, ListItemText, FormControl, InputLabel } from '@material-ui/core';

export interface SingleDropdownEditorOptions {
  selectOptions: string[];
}

export default (options?: SingleDropdownEditorOptions) => (props: PropertyEditorProps<string>) => {
  const selectOptions = options ? options.selectOptions || [] : [];
  return (
    <FormControl fullWidth>
      <InputLabel>{props.propertyOptions.displayName}</InputLabel>
      <Select value={props.value || selectOptions[0]} onChange={(e) => props.setValue(e.target.value as string)}>
        {selectOptions.map((selectOption) => (
          <MenuItem key={selectOption} value={selectOption}>
            {selectOption}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
