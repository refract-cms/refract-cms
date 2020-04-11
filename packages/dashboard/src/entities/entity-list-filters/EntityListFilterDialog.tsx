import React, { ComponentType } from 'react';
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Grid,
} from '@material-ui/core';
import { compose } from 'recompose';
import { AppState } from '../../state/app-state';
import { connect } from 'react-redux';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import { EntitySchema, isBasicPropertyType } from '@refract-cms/core';
import * as EntityActions from '../state/entity-actions';
import { operatorDescriptions } from './operater-descriptions';
export interface EntityListFilterDialogProps extends Pick<DialogProps, 'open' | 'onClose'> {
  schema: EntitySchema<any>;
  setOpened: (opened: boolean) => void;
  count?: number;
}

const styles = (theme: Theme) =>
  createStyles({
    formControl: {
      marginBottom: theme.spacing(),
    },
  });

interface Props
  extends EntityListFilterDialogProps,
    WithStyles<typeof styles>,
    ReturnType<typeof mapStateToProps>,
    Readonly<typeof mapDispatchToProps> {}

const EntityListFilterDialog: ComponentType<Props> = ({
  classes,
  onClose,
  open,
  setOpened,
  schema,
  filters,
  addFilter,
  updateFilter,
  removeFilter,
  resetFilters,
  count,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Filter {count ? <>({count} matches)</> : ''}</DialogTitle>
      <DialogContent>
        {filters.map((filter, index) => {
          const Editor = schema.properties[filter.propertyKey].editorComponent;
          return (
            <Grid key={index} container spacing={2}>
              <Grid item xs={3}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel>Property</InputLabel>
                  <Select
                    value={filter.propertyKey}
                    onChange={(e) => {
                      updateFilter({
                        alias: schema.options.alias,
                        index,
                        filter: {
                          ...filter,
                          propertyKey: e.target.value as string,
                        },
                        schema,
                      });
                    }}
                  >
                    {Object.keys(schema.properties)
                      .filter((propertyKey) => isBasicPropertyType(schema.properties[propertyKey].type))
                      .map((propertyKey) => (
                        <MenuItem key={propertyKey} value={propertyKey}>
                          {schema.properties[propertyKey].displayName || propertyKey}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl className={classes.formControl} fullWidth>
                  <InputLabel>Operater</InputLabel>
                  <Select
                    value={filter.operater}
                    onChange={(e) => {
                      updateFilter({
                        alias: schema.options.alias,
                        index,
                        filter: {
                          ...filter,
                          operater: e.target.value as any,
                        },
                        schema,
                      });
                    }}
                  >
                    {operatorDescriptions.map((operaterDescription) => (
                      <MenuItem key={operaterDescription.operater} value={operaterDescription.operater}>
                        {operaterDescription.displayName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <Editor
                  source={{} as any}
                  serverUrl=""
                  propertyKey={filter.propertyKey}
                  propertyOptions={schema.properties[filter.propertyKey]}
                  value={filter.value}
                  setValue={(value) => {
                    updateFilter({
                      alias: schema.options.alias,
                      index,
                      filter: {
                        ...filter,
                        value,
                      },
                      schema,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  style={{ marginTop: 11 }}
                  fullWidth
                  onClick={() => removeFilter({ alias: schema.options.alias, index })}
                >
                  Remove filter
                </Button>
              </Grid>
            </Grid>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          onClick={() => {
            addFilter({ schema });
          }}
        >
          Add filter
        </Button>
        <Button onClick={() => resetFilters({ alias: schema.options.alias })}>Clear</Button>
        <Button onClick={() => setOpened(false)}>Done</Button>
      </DialogActions>
    </Dialog>
  );
};

function mapStateToProps(state: AppState, ownProps: EntityListFilterDialogProps) {
  return {
    filters: state.entity[ownProps.schema.options.alias].filters,
  };
}

const mapDispatchToProps = { ...EntityActions };

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(EntityListFilterDialog) as ComponentType<EntityListFilterDialogProps>;
