import React, { ComponentType } from 'react';
import { Theme, createStyles, WithStyles, withStyles, Typography, AppBar, Toolbar } from '@material-ui/core';
import classNames from 'classnames';

export interface PageProps {
  disablePadding?: boolean;
  title: string;
  actionComponents?: React.ReactElement<any>[];
}

const styles = (theme: Theme) =>
  createStyles({
    padded: {
      padding: theme.spacing(3),
    },
    appBar: {
      bottom: 'auto',
      top: 64,
      background: theme.palette.background.default,
    },
    toolbar: {
      marginLeft: 240,
      alignItems: 'center',
      justifyContent: 'space-between',
      // minHeight: 40,
      // height: 40
    },
    page: {
      marginTop: 64,
    },
    actionButton: {
      marginLeft: theme.spacing(),
    },
  });

interface Props extends PageProps, WithStyles<typeof styles> {}

const Page: ComponentType<Props> = ({ children, classes, disablePadding, title, actionComponents }) => (
  <div
    className={classNames(classes.page, {
      [classes.padded]: !disablePadding,
    })}
  >
    <AppBar position="fixed" color="default" className={classes.appBar} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5">{title}</Typography>
        <div />
        <div>
          {actionComponents &&
            actionComponents.map((Component, index) => (
              <span key={index} className={classes.actionButton}>
                {Component}
              </span>
            ))}
        </div>
      </Toolbar>
    </AppBar>

    {children}
  </div>
);

export default withStyles(styles)(Page) as ComponentType<PageProps>;
