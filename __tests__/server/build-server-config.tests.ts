import { UserConfig, PluginConfig, composeSchema } from '@refract-cms/core';
import { ServerConfig, ServerUserConfig, buildServerConfig, ServerPluginConfig } from '@refract-cms/server';
import { expect } from 'chai';

const ProductSchema = composeSchema({
  options: {
    alias: 'product',
  },
  properties: {},
});

const ActiveDirectoryUserSchema = composeSchema({
  options: {
    alias: 'activeDirectoryUser',
  },
  properties: {},
});

describe('buildServerConfig', () => {
  it('merges two configs', () => {
    const adPluginConfig: PluginConfig = {
      schema: [ActiveDirectoryUserSchema],
    };

    const adPluginServerConfig: ServerPluginConfig = {
      config: adPluginConfig,
      configureRouter: (router) => {
        //
      },
    };

    const config: UserConfig = {
      schema: [ProductSchema],
      plugins: [adPluginConfig],
    };

    const serverUserConfig: ServerUserConfig = {
      rootPath: '/cms',
      config,
      mongoConnectionString: '',
      plugins: [adPluginServerConfig],
      auth: {
        adminCredentials: {
          username: 'username',
          password: 'pw',
        },
        jwt: {
          issuer: 'my-app',
          secret: 'secret',
        },
      },
    };

    const serverConfig = buildServerConfig(serverUserConfig);

    // expect(serverConfig.events.length).to.equal(2);
    expect(serverConfig.config.schema.length).to.equal(2);
  });
});
