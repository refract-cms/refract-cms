import { buildConfig } from '@refract-cms/core';
import { ArticleSchema } from './schemas/article-schema';
import { ProductSchema } from './schemas/product-schema';

export const config = buildConfig({
  schema: [ArticleSchema, ProductSchema],
});
