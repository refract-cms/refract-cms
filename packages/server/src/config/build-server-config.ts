import produce from 'immer';
import type { ServerConfig } from './server-config';
import { EntitySchema } from '@refract-cms/core';
import express from 'express';
import type { ServerUserConfig } from './server-user-config';
import type { ServerPluginConfig } from '../plugins/server-plugin-config';
import { singleRefPlugin } from '../plugins/single-ref-plugin';
import { multipleRefPlugin } from '../plugins/multiple-ref-plugin';

export function buildServerConfig(serverUserConfig: ServerUserConfig): ServerConfig {
  const { auth, plugins, config, mongoConnectionString, rootPath, events, resolvers } = serverUserConfig;
  const resolverPlugins: ServerPluginConfig['resolverPlugins'] = [singleRefPlugin, multipleRefPlugin];
  plugins.forEach((plugin) => {
    if (plugin.resolverPlugins) {
      resolverPlugins.push(...plugin.resolverPlugins);
    }
  });
  return {
    events: [events, ...plugins.map((plugin) => plugin.events)].filter(Boolean),
    auth,
    config,
    mongoConnectionString,
    resolvers,
    routers: [],
    resolverPlugins,
  };
}
