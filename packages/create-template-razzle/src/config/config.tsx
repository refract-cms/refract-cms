import { buildConfig } from '@refract-cms/core';
import { ArticleSchema } from './schemas/article-schema';
import { ArticleCategorySchema } from './schemas/article-category-schema';

export const config = buildConfig({
  schema: [ArticleSchema, ArticleCategorySchema],
});
