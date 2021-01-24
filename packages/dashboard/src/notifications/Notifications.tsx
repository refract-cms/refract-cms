import React from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import type { AppState } from '../state/app-state';
import { addNotification, removeNotification } from './state/notification-actions';
import { connect } from 'react-redux';
import { combineContainers } from 'combine-containers';
import Close from '@material-ui/icons/Close';

interface Props extends MapDispatchToProps, ReturnType<typeof mapStateToProps> {}

const styles = (theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
  });

interface Props extends MapDispatchToProps, ReturnType<typeof mapStateToProps>, WithStyles<typeof styles> {}

const Notifications = ({ notification, addNotification, removeNotification }: Props) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    open={Boolean(notification)}
    autoHideDuration={6000}
    onClose={() => setTimeout(removeNotification, 1)}
    message={notification ? notification.message : ''}
    action={[
      <IconButton key="close" aria-label="Close" color="inherit" onClick={removeNotification}>
        <Close />
      </IconButton>,
    ]}
  />
);

function mapStateToProps(state: AppState) {
  return state.notification;
}

const mapDispatchToProps = {
  addNotification,
  removeNotification,
};

type MapDispatchToProps = typeof mapDispatchToProps;

export default combineContainers(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Notifications);
