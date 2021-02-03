import type { Config } from '@refract-cms/core';
import { ServerConfig, ServerUserConfig, buildServerConfig } from '@refract-cms/server';
import { expect } from 'chai';

describe('buildServerConfig', () => {
  it('merges two configs', () => {
    const config: Config = {
      schema: [],
    };

    const config1: ServerUserConfig = {
      rootPath: '/cms',
      config,
      mongoConnectionString: '',
      plugins: [],
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
    const config2: ServerUserConfig = {
      rootPath: '/cms',
      config,
      mongoConnectionString: '',
      plugins: [],
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
    const serverConfig = buildServerConfig(config1, config2);
    expect(serverConfig.events.length).to.equal(2);
  });
});
