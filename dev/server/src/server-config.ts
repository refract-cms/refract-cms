import { ServerConfig } from '@refract-cms/server';
import { config } from '@local/config';

export const serverConfig: ServerConfig = {
  rootPath: '/cms',
  config,
  mongoConnectionString: process.env.MONGO_URI,
  plugins: [],
  auth: {
    adminCredentials: {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD,
    },
    jwt: {
      issuer: 'my-app',
      secret: process.env.JWT_SECRET,
    },
  },
};
