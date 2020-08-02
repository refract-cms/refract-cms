import {
  configure,
  composeSchema,
  createTextEditor,
  createMarkdownRteEditor,
  createDatePickerEditor,
} from '../../../../packages/core/src';

const ArticleSchema = composeSchema({
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

export const config = configure({
  schema: [ArticleSchema],
});
