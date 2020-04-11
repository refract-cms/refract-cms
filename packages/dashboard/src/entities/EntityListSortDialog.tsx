import React, { ComponentType } from 'react';
import {
  Theme,
  createStyles,
  WithStyles,
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Button,
} from '@material-ui/core';
import { compose } from 'recompose';
import { AppState } from '../state/app-state';
import { connect } from 'react-redux';
import { PropertyOptions, EntitySchema } from '@refract-cms/core';
import { DialogProps } from '@material-ui/core/Dialog';
import * as EntityActions from './state/entity-actions';

export interface EntityListSortDialogProps extends Pick<DialogProps, 'open' | 'onClose'> {
  schema: EntitySchema<any>;
  setOpened: (opened: boolean) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    formControl: {
      marginBottom: theme.spacing(),
    },
  });

interface Props
  extends EntityListSortDialogProps,
    WithStyles<typeof styles>,
    ReturnType<typeof mapStateToProps>,
    Readonly<typeof mapDispatchToProps> {}

const EntityListSortDialog: ComponentType<Props> = ({
  classes,
  schema,
  onClose,
  open,
  filters,
  setOrderByDirection,
  setOrderByField,
  setOpened,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Sort</DialogTitle>
      <DialogContent style={{ width: 400 }}>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel>Sort by</InputLabel>
          <Select
            value={filters.orderByField || ''}
            onChange={(e) =>
              setOrderByField({
                alias: schema.options.alias,
                orderByField: e.target.value as string,
              })
            }
          >
            <MenuItem value="">None</MenuItem>
            {Object.keys(schema.properties)
              .filter(
                (propertyKey) =>
                  schema.properties[propertyKey].type === String ||
                  schema.properties[propertyKey].type === Date ||
                  schema.properties[propertyKey].type === Number
              )
              .map((propertyKey: string, index: number) => {
                const propertyOptions = schema.properties[propertyKey] as PropertyOptions<any, any>;
                return (
                  <MenuItem key={index} value={propertyKey}>
                    {propertyOptions.displayName || propertyKey}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel>Direction</InputLabel>
          <Select
            value={filters.orderByDirection}
            onChange={(e) =>
              setOrderByDirection({
                alias: schema.options.alias,
                direction: e.target.value as 'ASC' | 'DESC',
              })
            }
          >
            <MenuItem value="ASC">ASC</MenuItem>
            <MenuItem value="DESC">DESC</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpened(false)}>Done</Button>
      </DialogActions>
    </Dialog>
  );
};

function mapStateToProps(state: AppState, ownProps: EntityListSortDialogProps) {
  const filters = state.entity[ownProps.schema.options.alias];
  return {
    filters,
  };
}

const mapDispatchToProps = { ...EntityActions };

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(EntityListSortDialog) as ComponentType<EntityListSortDialogProps>;
