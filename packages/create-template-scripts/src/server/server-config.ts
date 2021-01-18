import { ServerConfig } from '@refract-cms/server';
import { config } from '../config/config';

export const serverConfig: ServerConfig = {
  auth: {
    adminCredentials: {
      username: 'admin',
      password: 'asdf',
    },
    jwt: {
      secret: '',
      issuer: '',
    },
  },
  config,
  mongoConnectionString: '',
  rootPath: '/',
};
