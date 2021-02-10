import { UserConfig, PluginConfig, composeSchema, buildConfig } from '@refract-cms/core';
import {
  ServerConfig,
  UserServerConfig,
  buildServerConfig,
  PluginServerConfig,
  EventService,
} from '@refract-cms/server';
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

describe('buildServerConfig - with ad plugin', () => {
  it('merges schemas', () => {
    const adPluginConfig: PluginConfig = {
      name: 'ad',
      schema: [ActiveDirectoryUserSchema],
    };

    const adPluginServerConfig: PluginServerConfig = {
      config: adPluginConfig,
      configureRouter: (router) => {
        //
      },
    };

    const userConfig: UserConfig = {
      schema: [ProductSchema],
      plugins: [adPluginConfig],
    };

    const config = buildConfig(userConfig);

    const userServerConfig: UserServerConfig = {
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

    const serverConfig = buildServerConfig(userServerConfig);

    expect(serverConfig.config.schema.length).to.equal(2);
    expect(serverConfig.routers.length).to.equal(1);
  });

  it('merges events', () => {
    const adPluginConfig: PluginConfig = {
      name: 'ad',
      schema: [ActiveDirectoryUserSchema],
    };

    let adPluginOnSaveEventFired = false;

    const adPluginServerConfig: PluginServerConfig = {
      config: adPluginConfig,
      configureRouter: (router) => {
        //
      },
      events: {
        onSave: () => {
          adPluginOnSaveEventFired = true;
        },
      },
    };

    const config: UserConfig = {
      schema: [ProductSchema],
      plugins: [adPluginConfig],
    };

    let UserServerConfigOnSaveEventFired = false;

    const userServerConfig: UserServerConfig = {
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
      events: {
        onSave: () => {
          UserServerConfigOnSaveEventFired = true;
        },
      },
    };

    const serverConfig = buildServerConfig(userServerConfig);
    const eventService = new EventService(serverConfig);

    eventService.onSave();

    expect(serverConfig.events.length).to.equal(2);
    expect(UserServerConfigOnSaveEventFired).to.be.true;
    expect(adPluginOnSaveEventFired).to.be.true;
  });
});
