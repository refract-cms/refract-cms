import type { PluginConfig } from '@refract-cms/core';
import type { PluginServerConfig } from './plugin-server-config';

export function createServerPlugin(
  pluginConfig: PluginConfig,
  serverPlugin: Omit<PluginServerConfig, 'config'>
): PluginServerConfig {
  return {
    config: pluginConfig,
    ...serverPlugin,
  };
}
