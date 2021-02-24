import { composeSchema, createTextEditor } from '@refract-cms/core';
import CategoryIcon from '@material-ui/icons/Category';

export const ArticleCategorySchema = composeSchema({
  options: {
    alias: 'articleCategory',
    displayName: 'Article Category',
    instanceDisplayProps: (articleCategory) => ({
      primaryText: articleCategory.name,
    }),
    icon: CategoryIcon,
  },
  properties: {
    name: {
      type: String,
      displayName: 'Title1z',
      editorComponent: createTextEditor(),
    },
  },
});
