import { composeSchema, createTextEditor } from '@refract-cms/core';
import CategoryIcon from '@material-ui/icons/Category';

export const BlogPostCategorySchema = composeSchema({
  options: {
    alias: 'blogPostCategory',
    displayName: 'Category',
    icon: CategoryIcon,
    instanceDisplayProps: category => ({
      primaryText: category.name
    })
  },
  properties: {
    name: {
      displayName: 'Name',
      editorComponent: createTextEditor(),
      type: String
    }
  }
});
