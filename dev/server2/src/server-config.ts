import { buildServerConfig } from '@refract-cms/server';
import { config } from './config';
import { activeDirectoryServerPlugin } from '@refract-cms/plugin-active-directory-auth/src/server';
// import { fileSystemImageServerPlugin } from '@refract-cms/plugin-file-system-image/src/server';
import path from 'path';
import { env } from './env';

export const serverConfig = buildServerConfig({
  config,
  mongoConnectionString: env.MONGO_URI,
  plugins: [
    activeDirectoryServerPlugin,
    // fileSystemImageServerPlugin({ filesPath: path.resolve(process.cwd(), 'files') }),
  ],
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
  dev: true,
});
