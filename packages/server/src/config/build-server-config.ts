import produce from 'immer';
import type { ServerConfig } from './server-config';
import { EntitySchema } from '@refract-cms/core';
import express from 'express';
import type { ServerUserConfig } from './server-user-config';
import type { ServerPluginConfig } from '../plugins/server-plugin-config';

export function buildServerConfig(serverUserConfig: ServerUserConfig): ServerConfig {
  const { auth, plugins, config, mongoConnectionString, rootPath, events, resolvers } = serverUserConfig;
  return {
    events: [events],
    auth,
    config,
    mongoConnectionString,
    resolvers,
    routers: [],
    resolverPlugins: [],
  };
}
