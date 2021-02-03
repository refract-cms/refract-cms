import type { ServerUserConfig } from '@refract-cms/server';
import { config } from '@local/config';
import { activeDirectoryServerPlugin } from '@refract-cms/plugin-active-directory-auth/src/server';

export const serverConfig: ServerUserConfig = {
  rootPath: '/cms',
  config,
  mongoConnectionString: process.env.MONGO_URI,
  plugins: [activeDirectoryServerPlugin],
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
