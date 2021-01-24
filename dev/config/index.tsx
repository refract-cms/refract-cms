import type { Config } from '@refract-cms/core';
import { configure } from '@refract-cms/core';
import { ArticleSchema } from './schemas/article-schema';
import { ArticleCategorySchema } from './schemas/article-category-schema';
import { activeDirectoryPluginConfig } from '@refract-cms/plugin-active-directory-auth';
import { ActiveDirectoryUserSchema } from '@refract-cms/plugin-active-directory-auth/src/active-directory-user.schema';

// export const config: Config = {
//   schema: [ArticleSchema, ArticleCategorySchema],
// };

export const config = configure(
  {
    schema: [ArticleSchema, ArticleCategorySchema],
  },
  activeDirectoryPluginConfig
);
