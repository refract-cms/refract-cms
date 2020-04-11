import React from 'react';
import { PropertyEditorProps } from '../properties/property-editor-props';
import {
  IconButton,
  Typography,
  Button,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelActions,
  ExpansionPanelDetails,
} from '@material-ui/core';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Add from '@material-ui/icons/Add';

export interface ListEditorOptions<T> {
  itemComponent: React.ComponentType<PropertyEditorProps<T>>;
  max: number;
  displayNameFormat?: (item: T, index: number) => string;
}

export interface Props<T> extends ListEditorOptions<T>, PropertyEditorProps<T[]> {}

interface State<T> {
  showAddNewEditor: boolean;
  stagedValue: T | undefined;
  expandedIndex: number;
}

class ListEditor<T> extends React.Component<Props<T>, State<T>> {
  state: State<T> = {
    showAddNewEditor: false,
    stagedValue: undefined,
    expandedIndex: -1,
  };

  render() {
    const { setValue, propertyOptions, propertyKey, serverUrl, source } = this.props;
    const value = this.props.value || [];
    return (
      <div>
        {value.map((v, index) => (
          <ExpansionPanel
            expanded={this.state.expandedIndex === index}
            onChange={(e, expanded) => this.setState({ expandedIndex: expanded ? index : -1 })}
            key={index}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
              <Typography>{this.props.displayNameFormat && this.props.displayNameFormat(v, index)}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <this.props.itemComponent
                source={source}
                serverUrl={serverUrl}
                propertyOptions={propertyOptions}
                propertyKey={propertyKey}
                value={v}
                setValue={(newValue) => {
                  if (newValue) {
                    const newValues = [...value];
                    newValues[index] = newValue;
                    setValue(newValues);
                  } else {
                    setValue(value.filter((_, i) => index !== i));
                  }
                }}
              />
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Button onClick={() => setValue(value.filter((_, i) => index !== i))}>Remove</Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        ))}
        {this.state.showAddNewEditor && (
          <this.props.itemComponent
            source={source}
            serverUrl={serverUrl}
            propertyOptions={propertyOptions}
            propertyKey={propertyKey}
            value={this.state.stagedValue}
            setValue={(newValue) => {
              this.setState({
                stagedValue: newValue,
              });
            }}
          />
        )}
        {this.state.showAddNewEditor ? (
          <div>
            <Button
              onClick={() =>
                this.setState({
                  showAddNewEditor: false,
                  stagedValue: undefined,
                })
              }
            >
              Cancel add
            </Button>
            <Button
              onClick={() => {
                const { stagedValue } = this.state;
                const newValues = [...value, stagedValue];
                setValue(newValues as T[]);
                this.setState({
                  stagedValue: undefined,
                  showAddNewEditor: false,
                });
              }}
            >
              Add item
            </Button>
          </div>
        ) : (
          <IconButton
            onClick={() =>
              this.setState({
                showAddNewEditor: true,
              })
            }
          >
            <Add />
          </IconButton>
        )}
      </div>
    );
  }
}

export default function <T>(options: ListEditorOptions<T>) {
  return (props: Props<T>) => <ListEditor {...props} {...options} />;
}
