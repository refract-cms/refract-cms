import React from 'react';
import type { PropertyEditorProps } from '@refract-cms/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paragraph: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(),
  },
}));

export function CustomTextEditor(props: PropertyEditorProps<string>) {
  const classes = useStyles(props);
  const { value, setValue } = props;
  return (
    <div>
      <p className={classes.paragraph}>This is an example of a basic custom editor component</p>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}
