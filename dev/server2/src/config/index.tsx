import { buildConfig } from '@refract-cms/core';
import { ArticleSchema } from './schemas/article-schema';

export const config = buildConfig({
  schema: [ArticleSchema],
});
