import { composeSchema, createTextEditor, createMarkdownRteEditor, createDatePickerEditor } from '@refract-cms/core';
import { CustomTextEditor } from '../editor-components/custom-text-editor';
import DescriptionIcon from '@material-ui/icons/Description';

export const ArticleSchema = composeSchema({
  options: {
    alias: 'article',
    displayName: 'Article4',
    instanceDisplayProps: (article) => ({
      primaryText: article.title,
    }),
    icon: DescriptionIcon,
  },
  properties: {
    title: {
      type: String,
      displayName: 'Title',
      editorComponent: createTextEditor(),
    },
    description: {
      type: String,
      displayName: 'Description',
      editorComponent: CustomTextEditor,
    },
    body: {
      type: String,
      displayName: 'Body text',
      editorComponent: createMarkdownRteEditor(),
    },
    date: {
      type: Date,
      displayName: 'Date',
      editorComponent: createDatePickerEditor(),
    },
  },
});
