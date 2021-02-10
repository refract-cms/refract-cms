import produce from 'immer';
import type { ServerConfig } from './server-config';
import { EntitySchema } from '@refract-cms/core';
import express from 'express';
import type { UserServerConfig } from './user-server-config';
import type { PluginServerConfig } from '../plugins/plugin-server-config';
import { singleRefPlugin } from '../plugins/single-ref-plugin';
import { multipleRefPlugin } from '../plugins/multiple-ref-plugin';

export function buildServerConfig(userServerConfig: UserServerConfig): ServerConfig {
  const { auth, plugins, config, mongoConnectionString, events, resolvers } = userServerConfig;
  const resolverPlugins: PluginServerConfig['resolverPlugins'] = [singleRefPlugin, multipleRefPlugin];
  plugins.forEach((plugin) => {
    if (plugin.resolverPlugins) {
      resolverPlugins.push(...plugin.resolverPlugins);
    }
  });
  const routers: ServerConfig['routers'] = [];
  plugins.forEach((plugin) => {
    if (plugin.configureRouter) {
      const router = express.Router();
      plugin.configureRouter(router);
      routers.push({
        alias: plugin.config.name,
        router,
      });
    }
  });
  return {
    events: [events, ...plugins.map((plugin) => plugin.events)].filter(Boolean),
    auth,
    config,
    mongoConnectionString,
    resolvers,
    routers,
    resolverPlugins,
  };
}
