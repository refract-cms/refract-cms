import React from 'react';
import { Typography, Theme, NoSsr, Paper, makeStyles, Link as MuiLink } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    textDecoration: 'underline',
  },
}));

export const Link = (props) => {
  const data = props.contentState.getEntity(props.entityKey).getData();
  const { url } = data;
  console.log(data);
  const classes = useStyles(props);
  return (
    <MuiLink className={classes.link} href={url}>
      {props.children}
    </MuiLink>
  );
};
