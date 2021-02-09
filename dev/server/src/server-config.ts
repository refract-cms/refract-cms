import { buildServerConfig } from '@refract-cms/server';
import { config } from '@local/config';
import { activeDirectoryServerPlugin } from '@refract-cms/plugin-active-directory-auth/src/server';
import dotenv from 'dotenv';
const env = dotenv.config().parsed;

export const serverConfig = buildServerConfig({
  rootPath: '/cms',
  config,
  mongoConnectionString: env.MONGO_URI,
  plugins: [activeDirectoryServerPlugin],
  auth: {
    adminCredentials: {
      username: env.ADMIN_USERNAME,
      password: env.ADMIN_PASSWORD,
    },
    jwt: {
      issuer: 'my-app',
      secret: env.JWT_SECRET,
    },
  },
});
