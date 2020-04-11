import { action } from 'typesafe-actions';
import { Config } from '@refract-cms/core';

export const CONFIGURE = '@@CMS/CONFIGURE';

export const configure = (config: Config, serverUrl: string) => {
  return action(CONFIGURE, {
    ...config,
    serverUrl
  });
};
