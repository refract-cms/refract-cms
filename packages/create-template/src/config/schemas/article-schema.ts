import { composeSchema, createTextEditor, createMarkdownRteEditor, createDatePickerEditor } from '@refract-cms/core';

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
