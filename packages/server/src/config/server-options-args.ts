import { PropertyType, EntitySchema, Config, PluginConfig } from '@refract-cms/core';
import { ResolverPlugin } from '../plugins/resolver-plugin';
import { ServerOptions } from './server-options';
import { Events } from './events';

export interface ServerOptionsArgs extends Partial<Pick<ServerOptions, 'resolvers' | 'resolverPlugins'>> {
  events?: Events;
  config: PluginConfig | Config;
}
