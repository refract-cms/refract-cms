import type { PropertyType, EntitySchema, Config, PluginConfig } from '@refract-cms/core';
import { ResolverPlugin } from '../plugins/resolver-plugin';
import type { ServerOptions } from './server-options';
import type { Events } from './events';

export interface ServerOptionsArgs extends Partial<Pick<ServerOptions, 'resolvers' | 'resolverPlugins'>> {
  events?: Events;
  config: PluginConfig | Config;
}
