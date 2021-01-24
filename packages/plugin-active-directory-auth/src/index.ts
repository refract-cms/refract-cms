import type { PluginConfig } from '@refract-cms/core';
import { ActiveDirectoryUserSchema } from './active-directory-user.schema';

export const activeDirectoryPluginConfig: PluginConfig = {
  name: 'activeDirectoryAuth',
  schema: [ActiveDirectoryUserSchema],
};
