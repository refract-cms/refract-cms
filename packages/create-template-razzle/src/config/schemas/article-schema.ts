import { composeSchema, createTextEditor, createMarkdownRteEditor, createDatePickerEditor } from '@refract-cms/core';
import { CustomTextEditor } from '../editor-components/custom-text-editor';

export const ArticleSchema = composeSchema({
  options: {
    alias: 'article',
    displayName: 'Article',
    instanceDisplayProps: (article) => ({
      primaryText: article.title,
    }),
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
