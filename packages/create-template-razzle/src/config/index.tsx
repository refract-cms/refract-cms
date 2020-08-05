import { configure } from '@refract-cms/core';
import { ArticleSchema } from './schemas/article-schema';
import { ArticleCategorySchema } from './schemas/article-category-schema';

export const config = configure({
  schema: [ArticleSchema, ArticleCategorySchema],
});
