---
id: create-editor-component
title: Create editor component
---

## Write component

This is just a standard React component,
you can do whatever you want in here including async calls to API's. You receive the current value & a setValue function as props.

The props are typed based on what the target type for this editor is e.g. `PropertyEditorProps<string>` or `PropertyEditorProps<Date>`.

To apply styles use the `useStyles` hook from material-ui.

```tsx
import React from 'react';
import { PropertyEditorProps } from '@refract-cms/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paragraph: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(),
  },
}));

export interface CustomTextEditorProps extends PropertyEditorProps<string> {}

export function CustomTextEditor(props: CustomTextEditorProps) {
  const classes = useStyles(props);
  const { value, setValue } = props;
  return (
    <div>
      <p className={classes.paragraph}>This is an example of a basic custom editor component</p>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
}
```

## Add custom editor to schema

Add a reference to the custom editor component for the desired property in your schema:

```tsx
myProperty: {
  type: String,
  displayName: 'My Property',
  editorComponent: CustomTextEditor,
},
```
