import { PropertyType, EntitySchema, Config, PluginConfig } from '@refract-cms/core';
import { ResolverPlugin } from '../plugins/resolver-plugin.model';
import { ServerOptions } from './server-options.model';
import { Events } from './events.model';

export interface ServerOptionsArgs extends Partial<Pick<ServerOptions, 'resolvers' | 'resolverPlugins'>> {
  events?: Events;
  config: PluginConfig | Config;
}
