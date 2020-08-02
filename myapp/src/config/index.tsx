// import { configure } from '@refract-cms/core';
import { configure } from '../../../../packages/core';
import { ArticleSchema } from './schemas/article';

export const config = configure({
  schema: [ArticleSchema],
});
