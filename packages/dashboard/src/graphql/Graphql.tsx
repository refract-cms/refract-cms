import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core';
import type { RouteComponentProps } from '@reach/router';

const styles = {
  iframe: {
    width: '100%',
    height: 'calc(100vh - 64px)',
    border: 'none',
    marginBottom: `-4px`,
  },
};

interface GraphqlProps extends RouteComponentProps {
  serverUrl: string;
}

interface Props extends GraphqlProps, WithStyles<typeof styles> {}

export default withStyles(styles)(({ serverUrl, classes }: Props) => (
  <iframe className={classes.iframe} src={`${serverUrl}/graphql-playground`} />
));
