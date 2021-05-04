import React, { ComponentType } from 'react';
import { Theme, createStyles, WithStyles, withStyles, ButtonGroup, Button, Chip } from '@material-ui/core';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { EditorState, Entity, RichUtils, SelectionState } from 'draft-js';
import classNames from 'classnames';
import getRangesForDraftEntity from 'draft-js/lib/getRangesForDraftEntity';

export interface RteToolbarProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(),
    },
    active: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
      },
    },
    buttonGroup: {
      marginRight: theme.spacing(),
      marginBottom: theme.spacing(),
    },
  });

interface Props extends RteToolbarProps, WithStyles<typeof styles> {}

const RteToolbar: ComponentType<Props> = (props) => {
  const { classes, setEditorState, editorState } = props;

  const currentStyle = props.editorState.getCurrentInlineStyle();
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();

  function createBlockButtonProps({ blockType }: { blockType: string }) {
    return {
      className: classNames({
        [classes.active]: RichUtils.getCurrentBlockType(editorState) === blockType,
      }),
      onClick: () => setEditorState(RichUtils.toggleBlockType(editorState, blockType)),
    };
  }
  function createStyleButtonProps({ inlineStyle }: { inlineStyle: string }) {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    return {
      className: classNames({
        [classes.active]: currentStyle.has(inlineStyle),
      }),
      onClick: () => setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle)),
    };
  }

  const selectionState = editorState.getSelection();
  const start = selectionState.getStartOffset();
  const end = selectionState.getEndOffset();

  const startKey = editorState.getSelection().getStartKey();
  const startOffset = editorState.getSelection().getStartOffset();
  const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
  const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

  const selectionKey = selectionState.getAnchorKey();
  const selectionOffset = selectionState.getAnchorOffset();

  const selectedText = blockWithLinkAtBeginning.getText().slice(start, end);

  let url = '';
  if (linkKey) {
    const linkInstance = contentState.getEntity(linkKey);
    url = linkInstance.getData().url;
  }

  function removeSelectedUrl() {
    getRangesForDraftEntity(blockWithLinkAtBeginning, linkKey).forEach((range) => {
      if (range.start <= selectionOffset && selectionOffset <= range.end) {
        const block = contentState.getBlockForKey(selectionKey);
        const blockKey = block.getKey();
        const linkSelection = new SelectionState({
          anchorOffset: range.start,
          anchorKey: blockKey,
          focusOffset: range.end,
          focusKey: blockKey,
          isBackward: false,
          hasFocus: selectionState.getHasFocus(),
        });
        setEditorState(RichUtils.toggleLink(editorState, linkSelection, null));
      }
    });
  }

  const hasLink = Boolean(url);

  function toggleLinkButtonProps() {
    const newUrl = selectedText;
    return {
      className: classNames({
        [classes.active]: hasLink,
      }),
      onClick: () => {
        if (hasLink) {
          removeSelectedUrl();
        } else {
          if (newUrl.length > 0) {
            const entityKey = Entity.create('LINK', 'MUTABLE', { url: newUrl });
            setEditorState(RichUtils.toggleLink(editorState, selection, entityKey));
          }
        }
      },
    };
  }
  return (
    <div className={classes.root}>
      <ButtonGroup className={classes.buttonGroup} size="small">
        <Button {...createBlockButtonProps({ blockType: 'unstyled' })}>Normal</Button>
        <Button {...createBlockButtonProps({ blockType: 'header-one' })}>H1</Button>
        <Button {...createBlockButtonProps({ blockType: 'header-two' })}>H2</Button>
        <Button {...createBlockButtonProps({ blockType: 'header-three' })}>H3</Button>
        <Button {...createBlockButtonProps({ blockType: 'header-four' })}>H4</Button>
        <Button {...createBlockButtonProps({ blockType: 'header-five' })}>H5</Button>
        <Button {...createBlockButtonProps({ blockType: 'header-six' })}>H6</Button>
        <Button {...createBlockButtonProps({ blockType: 'blockquote' })}>Quote</Button>
      </ButtonGroup>
      <ButtonGroup className={classes.buttonGroup} size="small">
        <Button {...createStyleButtonProps({ inlineStyle: 'BOLD' })}>Bold</Button>
        <Button {...createStyleButtonProps({ inlineStyle: 'ITALIC' })}>Italic</Button>
        <Button {...createStyleButtonProps({ inlineStyle: 'UNDERLINE' })}>Underline</Button>
      </ButtonGroup>
      <ButtonGroup className={classes.buttonGroup} size="small">
        <Button {...toggleLinkButtonProps()}>Link</Button>
        {hasLink && (
          <Chip
            size="medium"
            label={url}
            onDelete={() => {
              removeSelectedUrl();
            }}
          />
        )}
      </ButtonGroup>
    </div>
  );
};

export default compose(withStyles(styles))(RteToolbar) as ComponentType<RteToolbarProps>;
