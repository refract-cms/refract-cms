import {
  composeSchema,
  createTextEditor,
  createDatePickerEditor,
  propertyBuilder,
  createMarkdownRteEditor
} from '@refract-cms/core';
import DescriptionIcon from '@material-ui/icons/Description';
import { BlogPostCategorySchema } from './blog-post-category.schema';
import { AuthorSchema } from './author.schema';
import moment from 'moment';

export const BlogPostSchema = composeSchema({
  options: {
    alias: 'blogPost',
    displayName: 'Blog post',
    icon: DescriptionIcon,
    instanceDisplayProps: blogPost => ({
      primaryText: blogPost.title,
      secondaryText: blogPost.date && moment(blogPost.date).format('LL')
    }),
    defaultSort: {
      orderByDirection: 'DESC',
      orderByField: 'date'
    }
  },
  properties: {
    title: {
      displayName: 'Title',
      editorComponent: createTextEditor(),
      type: String
    },
    bodyText: {
      displayName: 'Body text',
      editorComponent: createMarkdownRteEditor(),
      type: String
    },
    date: {
      displayName: 'Date',
      editorComponent: createDatePickerEditor(),
      type: Date
    },
    category: propertyBuilder.multipleReferences(BlogPostCategorySchema, {
      displayName: 'Categories'
    }),
    author: propertyBuilder.singleReference(AuthorSchema, {
      displayName: 'Author'
    })
  }
});
