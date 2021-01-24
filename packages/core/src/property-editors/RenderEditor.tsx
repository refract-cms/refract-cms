import * as React from 'react';
import type { PropertyOptions } from '../properties/property-options';
import type { PropertyEditorProps } from '../properties/property-editor-props';

export interface RenderEditorProps extends PropertyEditorProps<any> {
  propertyOptions: PropertyOptions<any, any>;
}

interface Props extends RenderEditorProps {}

class RenderEditor extends React.Component<Props> {
  render() {
    const { propertyOptions, propertyKey, serverUrl, source } = this.props;
    if (propertyOptions.editorComponent) {
      return (
        <propertyOptions.editorComponent
          source={source}
          serverUrl={serverUrl}
          propertyOptions={propertyOptions}
          propertyKey={propertyKey}
          value={this.props.value}
          setValue={this.props.setValue}
        />
      );
    } else {
      return <React.Fragment />;
    }
  }
}

export default RenderEditor as React.ComponentType<RenderEditorProps>;
