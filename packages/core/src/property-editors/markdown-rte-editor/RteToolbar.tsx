import React, { ComponentType } from 'react';
import { Theme, createStyles, WithStyles, withStyles, ButtonGroup, Button } from '@material-ui/core';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { EditorState, Entity, RichUtils } from 'draft-js';
import classNames from 'classnames';

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

  function toggleLinkButtonProps() {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    console.log(selection.keys());
    const url = 'www.danfoss.com';
    console.log({ selection });
    const hasLink = RichUtils.currentBlockContainsLink(editorState);
    return {
      className: classNames({
        [classes.active]: hasLink,
      }),
      onClick: () => {
        if (hasLink) {
          setEditorState(RichUtils.toggleLink(editorState, selection, null));
        } else {
          if (url.length > 0) {
            const entityKey = Entity.create('LINK', 'MUTABLE', { url: url });
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
      <ButtonGroup size="small">
        <Button {...createStyleButtonProps({ inlineStyle: 'BOLD' })}>Bold</Button>
        <Button {...createStyleButtonProps({ inlineStyle: 'ITALIC' })}>Italic</Button>
        <Button {...createStyleButtonProps({ inlineStyle: 'UNDERLINE' })}>Underline</Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button {...toggleLinkButtonProps()}>Link</Button>
      </ButtonGroup>
    </div>
  );
};

export default compose(withStyles(styles))(RteToolbar) as ComponentType<RteToolbarProps>;
