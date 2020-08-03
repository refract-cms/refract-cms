import { composeSchema, createTextEditor, createMarkdownRteEditor, createDatePickerEditor } from '@refract-cms/core';

export const ArticleSchema = composeSchema({
  options: {
    alias: 'article',
  },
  properties: {
    title: {
      type: String,
      editorComponent: createTextEditor(),
    },
    body: {
      type: String,
      editorComponent: createMarkdownRteEditor(),
    },
    date: {
      type: Date,
      editorComponent: createDatePickerEditor(),
    },
  },
});
