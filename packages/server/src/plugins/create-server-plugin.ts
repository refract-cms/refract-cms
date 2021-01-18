import type { PluginConfig } from '@refract-cms/core';
import type { ServerPlugin } from './server-plugin';

export function createServerPlugin(
  pluginConfig: PluginConfig,
  serverPlugin: Omit<ServerPlugin, 'config'>
): ServerPlugin {
  return {
    config: pluginConfig,
    ...serverPlugin,
  };
}
