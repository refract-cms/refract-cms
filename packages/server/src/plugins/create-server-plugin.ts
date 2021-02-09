import type { PluginConfig } from '@refract-cms/core';
import type { ServerPluginConfig } from './server-plugin-config';

export function createServerPlugin(
  pluginConfig: PluginConfig,
  serverPlugin: Omit<ServerPluginConfig, 'config'>
): ServerPluginConfig {
  return {
    config: pluginConfig,
    ...serverPlugin,
  };
}
