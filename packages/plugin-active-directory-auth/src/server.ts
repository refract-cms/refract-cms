import { createServerPlugin } from '@refract-cms/server';
import { activeDirectoryPluginConfig } from './';

export const activeDirectoryServerPlugin = createServerPlugin(activeDirectoryPluginConfig, {
  events: {
    onSchemaBuilt: () => console.log('hi from ad plugin')
  }
});
