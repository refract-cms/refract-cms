import React from 'react';
import type { PropertyEditor } from '@refract-cms/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paragraph: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(),
  },
}));

interface CustomTextEditorOptions {
  showHelpText?: boolean;
}

export const customTextEditor: PropertyEditor<CustomTextEditorOptions, string> = (options) => (props) => {
  const classes = useStyles(props);
  const { value, setValue } = props;
  return (
    <div>
      {options.showHelpText && (
        <p className={classes.paragraph}>This is an example of a basic custom editor component</p>
      )}
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};
