import type { Config} from '@refract-cms/core';
import { ArticleSchema } from './schemas/article-schema';
import { ArticleCategorySchema } from './schemas/article-category-schema';

export const config: Config ={
  schema: [ArticleSchema, ArticleCategorySchema],
};
