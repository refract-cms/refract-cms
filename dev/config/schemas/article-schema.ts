import {
  composeSchema,
  createTextEditor,
  createMarkdownRteEditor,
  createDatePickerEditor,
  propertyBuilder,
  createSingleEntityPickerEditor,
} from '@refract-cms/core';
import { CustomTextEditor } from '../editor-components/custom-text-editor';
import DescriptionIcon from '@material-ui/icons/Description';
import { ArticleCategorySchema } from './article-category-schema';
import { FileSystemImageSchema } from '@refract-cms/plugin-file-system-image';

export const ArticleSchema = composeSchema({
  options: {
    alias: 'article',
    displayName: 'Article',
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
    image: propertyBuilder.singleSchemaPicker(FileSystemImageSchema, {
      displayName: 'Image',
    }),
    category: propertyBuilder.singleSchemaPicker(ArticleCategorySchema, {
      displayName: 'Category',
    }),
  },
});
