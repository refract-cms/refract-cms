import React from 'react';
import type { PropertyEditorProps } from '../properties/property-editor-props';
import { Checkbox } from '@material-ui/core';

export interface BooleanEditorOptions {
  checked?: boolean;
}

const defaultOptions: BooleanEditorOptions = { checked: false };

interface Props extends PropertyEditorProps<boolean> {}

export default (options: BooleanEditorOptions = defaultOptions) =>
  class extends React.Component<Props> {
    componentDidMount() {
      if (!this.props.value && this.props.value !== false) {
        this.props.setValue(Boolean(options.checked));
      }
    }
    render() {
      const { value, setValue } = this.props;
      return (
        <Checkbox
          checked={value || options.checked}
          onChange={(e, checked) => {
            return setValue(checked);
          }}
        />
      );
    }
  };
