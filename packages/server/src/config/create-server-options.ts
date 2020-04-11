import { ServerOptions } from './server-options';
import merge from 'lodash/merge';
import produce from 'immer';
import { ServerOptionsArgs } from './server-options-args';
import { ServerConfig } from './server-config';
import { EntitySchema } from '@refract-cms/core';
import mergeWith from 'lodash/mergeWith';
import isArray from 'lodash/isArray';
import express from 'express';

function customizer(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

export function buildServerOptions(serverConfig: ServerConfig): ServerOptions {
  const configs = [serverConfig, ...serverConfig.plugins];
  const { resolverPlugins, resolvers, config }: ServerOptionsArgs = mergeWith(
    serverConfig,
    ...serverConfig.plugins,
    customizer
  );
  //   const  ServerOptionsArgs = serverOptionsConfigs.reduce<ServerOptionsArgs>(
  // k    merge,
  //     {} as any
  //   );
  // const schemas = serverOptionsConfigs.reduce<EntitySchema[]>((acc, current) => {
  //   acc = produce(acc, draft => {
  //     for (const entitySchema of current.config.schema) {
  //       acc.push(entitySchema);
  //     }
  //   });
  //   return acc;
  // }, []);
  // console.log(evjents);
  const events = Array.prototype.concat(configs.map((o) => o.events)).filter(Boolean) || [];
  return {
    config,
    resolverPlugins,
    schemas: config.schema,
    resolvers,
    events,
    routers: serverConfig.plugins.map((plugin) => {
      const router = express.Router();
      if (plugin.configureRouter) {
        plugin.configureRouter(router);
      }
      return {
        alias: plugin.config.name,
        router,
      };
    }), // Array.prototype.concat(serverOptionsConfigs.map(o => o.addExpressRouter()))
  };
}
