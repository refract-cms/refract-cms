import * as React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import { TextField, Select, MenuItem, Checkbox, ListItemText, InputLabel, FormControl } from '@material-ui/core';

export interface MultipleDropdownEditorOptions {
  selectOptions: string[];
}

export default (options?: MultipleDropdownEditorOptions) => (props: PropertyEditorProps<string[]>) => {
  const selectOptions = options ? options.selectOptions || [] : [];
  const value = props.value || [];
  return (
    <FormControl fullWidth>
      <InputLabel>{props.propertyOptions.displayName}</InputLabel>
      <Select
        value={value}
        fullWidth
        multiple
        onChange={(e) => {
          props.setValue(
            ((e.target.value as any) as string[]).filter((value) => selectOptions.some((option) => value === option))
          );
        }}
        renderValue={(e) => {
          if (e instanceof Array) {
            return `${e.join(', ')}`;
          }
          return '';
        }}
      >
        {selectOptions.map((selectOption) => {
          const checked = value.some((value) => value === selectOption);
          return (
            <MenuItem key={selectOption} value={selectOption}>
              <Checkbox checked={checked} />
              <ListItemText primary={selectOption} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
