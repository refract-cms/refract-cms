import { configure } from '@refract-cms/core';
import { ArticleSchema } from './schemas/article';

export const config = configure({
  schema: [ArticleSchema],
});
