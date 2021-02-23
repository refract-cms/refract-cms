import { buildConfig } from '@refract-cms/core';
import { ArticleSchema } from './schemas/article-schema';
import { ArticleCategorySchema } from './schemas/article-category-schema';
import { activeDirectoryPluginConfig } from '@refract-cms/plugin-active-directory-auth';
import { fileSystemImagePluginConfig } from '@refract-cms/plugin-file-system-image';
// import { ActiveDirectoryUserSchema } from '@refract-cms/plugin-active-directory-auth/src/active-directory-user.schema';

export const config = buildConfig({
  schema: [ArticleSchema, ArticleCategorySchema],
  plugins: [activeDirectoryPluginConfig, fileSystemImagePluginConfig],
  localization: {
    languages: [
      {
        name: 'en',
      },
      {
        name: 'dk',
        fallback: 'en',
      },
    ],
    defaultLanguage: 'en',
  },
});
