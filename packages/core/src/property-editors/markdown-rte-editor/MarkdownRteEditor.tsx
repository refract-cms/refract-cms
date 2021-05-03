import React, { useState } from 'react';
import { Typography, Theme, NoSsr, Paper, makeStyles } from '@material-ui/core';
import { EditorState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js';
import { draftToMarkdown, markdownToDraft } from 'markdown-draft-js';
import RteToolbar from './RteToolbar';
import classNames from 'classnames';
import Editor from '@draft-js-plugins/editor';
import type { PropertyEditorProps } from '../../properties/property-editor-props';
import createLinkifyPlugin from '@draft-js-plugins/linkify';

const linkifyPlugin = createLinkifyPlugin();

export interface MarkdownRteEditorOptions {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(),
  },
  'header-one': {
    ...theme.typography.h1,
    margin: theme.spacing(1, 0),
  },
  'header-two': {
    ...theme.typography.h2,
    margin: theme.spacing(1, 0),
  },
  'header-three': {
    ...theme.typography.h3,
    margin: theme.spacing(1, 0),
  },
  'header-four': {
    ...theme.typography.h4,
    margin: theme.spacing(1, 0),
  },
  'header-five': {
    ...theme.typography.h5,
    margin: theme.spacing(1, 0),
  },
  'header-six': {
    ...theme.typography.h6,
    margin: theme.spacing(1, 0),
  },
  unstyled: {
    ...theme.typography.body1,
    margin: 0,
  },
  blockquote: {
    ...theme.typography.body1,
    color: '#828282',
    padding: theme.spacing(1, 2),
    fontStyle: 'italic',
    borderLeft: `${theme.spacing()}px solid ${theme.palette.secondary.light}`,
    marginLeft: 0,
  },
  '@global': {
    '.DraftEditor-editorContainer, .DraftEditor-root, .public-DraftEditor-content': {
      height: 'inherit',
      textAlign: 'initial',
    },
    ".public-DraftEditor-content[contenteditable='true']": {
      W: 'read-write-plaintext-only',
    },
    '.DraftEditor-root': {
      position: 'relative',
    },
    '.DraftEditor-editorContainer': {
      backgroundColor: 'rgba(255, 255, 255, 0)',
      borderLeft: '0.1px solid transparent',
      position: 'relative',
      zIndex: 1,
    },
    '.public-DraftEditor-block': {
      position: 'relative',
    },
    '.DraftEditor-alignLeft .public-DraftStyleDefault-block': {
      textAlign: 'left',
    },
    '.DraftEditor-alignLeft .public-DraftEditorPlaceholder-root': {
      left: '0',
      textAlign: 'left',
    },
    '.DraftEditor-alignCenter .public-DraftStyleDefault-block': {
      textAlign: 'center',
    },
    '.DraftEditor-alignCenter .public-DraftEditorPlaceholder-root': {
      margin: '0 auto',
      textAlign: 'center',
      width: '100%',
    },
    '.DraftEditor-alignRight .public-DraftStyleDefault-block': {
      textAlign: 'right',
    },
    '.DraftEditor-alignRight .public-DraftEditorPlaceholder-root': {
      right: '0',
      textAlign: 'right',
    },
    '.public-DraftEditorPlaceholder-root': {
      color: '#9197a3',
      position: 'absolute',
      zIndex: 1,
    },
    '.public-DraftEditorPlaceholder-hasFocus': {
      color: '#bdc1c9',
    },
    '.DraftEditorPlaceholder-hidden': {
      display: 'none',
    },
    '.public-DraftStyleDefault-block': {
      position: 'relative',
      whiteSpace: 'pre-wrap',
    },
    '.public-DraftStyleDefault-ltr': {
      direction: 'ltr',
      textAlign: 'left',
      marginBottom: theme.spacing(),
    },
    '.public-DraftStyleDefault-rtl': {
      direction: 'rtl',
      textAlign: 'right',
    },
    '.public-DraftStyleDefault-listLTR': {
      direction: 'ltr',
    },
    '.public-DraftStyleDefault-listRTL': {
      direction: 'rtl',
    },
    '.public-DraftStyleDefault-ol, .public-DraftStyleDefault-ul': {
      margin: '16px 0',
      padding: '0',
    },
    '.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listLTR': {
      marginLeft: '1.5em',
    },
    '.public-DraftStyleDefault-depth0.public-DraftStyleDefault-listRTL': {
      marginRight: '1.5em',
    },
    '.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listLTR': {
      marginLeft: '3em',
    },
    '.public-DraftStyleDefault-depth1.public-DraftStyleDefault-listRTL': {
      marginRight: '3em',
    },
    '.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listLTR': {
      marginLeft: '4.5em',
    },
    '.public-DraftStyleDefault-depth2.public-DraftStyleDefault-listRTL': {
      marginRight: '4.5em',
    },
    '.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listLTR': {
      marginLeft: '6em',
    },
    '.public-DraftStyleDefault-depth3.public-DraftStyleDefault-listRTL': {
      marginRight: '6em',
    },
    '.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listLTR': {
      marginLeft: '7.5em',
    },
    '.public-DraftStyleDefault-depth4.public-DraftStyleDefault-listRTL': {
      marginRight: '7.5em',
    },
    '.public-DraftStyleDefault-unorderedListItem': {
      listStyleType: 'square',
      position: 'relative',
    },
    '.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth0': {
      listStyleType: 'disc',
    },
    '.public-DraftStyleDefault-unorderedListItem.public-DraftStyleDefault-depth1': {
      listStyleType: 'circle',
    },
    '.public-DraftStyleDefault-orderedListItem': {
      listStyleType: 'none',
      position: 'relative',
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listLTR:before': {
      left: -36,
      position: 'absolute',
      textAlign: 'right',
      width: 30,
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-listRTL:before': {
      position: 'absolute',
      right: -36,
      textAlign: 'left',
      width: 30,
    },
    '.public-DraftStyleDefault-orderedListItem:before': {
      content: "counter(ol0) '. '",
      counterIncrement: 'ol0',
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth1:before': {
      content: "counter(ol1) '. '",
      counterIncrement: 'ol1',
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth2:before': {
      content: "counter(ol2) '. '",
      counterIncrement: 'ol2',
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth3:before': {
      content: "counter(ol3) '. '",
      counterIncrement: 'ol3',
    },
    '.public-DraftStyleDefault-orderedListItem.public-DraftStyleDefault-depth4:before': {
      content: "counter(ol4) '. '",
      counterIncrement: 'ol4',
    },
    '.public-DraftStyleDefault-depth0.public-DraftStyleDefault-reset': {
      counterReset: 'ol0',
    },
    '.public-DraftStyleDefault-depth1.public-DraftStyleDefault-reset': {
      counterReset: 'ol1',
    },
    '.public-DraftStyleDefault-depth2.public-DraftStyleDefault-reset': {
      counterReset: 'ol2',
    },
    '.public-DraftStyleDefault-depth3.public-DraftStyleDefault-reset': {
      counterReset: 'ol3',
    },
    '.public-DraftStyleDefault-depth4.public-DraftStyleDefault-reset': {
      counterReset: 'ol4',
    },
  },
}));

export default (options: MarkdownRteEditorOptions = {}) => ({ value, setValue }: PropertyEditorProps<string>) => {
  const rteValue = value
    ? EditorState.createWithContent(convertFromRaw(markdownToDraft(value)))
    : EditorState.createEmpty();
  const classes = useStyles({});
  const [editorState, setLocalEditorState] = React.useState<EditorState>(rteValue);

  const setEditorState = (newEditorState: EditorState) => {
    setLocalEditorState(newEditorState);
    const content = newEditorState.getCurrentContent();
    const newValue = draftToMarkdown(convertToRaw(content));
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <RteToolbar editorState={editorState} setEditorState={setEditorState} />
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        blockStyleFn={(contentBlock) => {
          const type = contentBlock.getType();
          return classes[type];
        }}
        plugins={[linkifyPlugin]}
      />
    </Paper>
  );
};
