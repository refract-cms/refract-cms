import { configure } from '@refract-cms/core';
import { ArticleSchema } from './schemas/article-schema';

export const config = configure({
  schema: [ArticleSchema],
});
