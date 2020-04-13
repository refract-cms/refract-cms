import { BlogPostSchema } from './schemas/blog-post.schema';
import { BlogPostCategorySchema } from './schemas/blog-post-category.schema';
import { AuthorSchema } from './schemas/author.schema';
import { configureCli } from '@refract-cms/cli';
import { createMuiTheme } from '@material-ui/core';
import { indigo, pink } from '@material-ui/core/colors';

export default configureCli({
  schema: [BlogPostSchema, AuthorSchema, BlogPostCategorySchema],
  path: '/',
  theme: createMuiTheme({
    palette: {
      type: 'light',
      primary: {
        main: indigo[500]
      },
      secondary: {
        main: pink[500]
      }
    }
  })
});
