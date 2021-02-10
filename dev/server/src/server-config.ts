import { buildServerConfig } from '@refract-cms/server';
import { config } from '@local/config';
import { activeDirectoryServerPlugin } from '@refract-cms/plugin-active-directory-auth/src/server';
import { fileSystemImageServerPlugin } from '@refract-cms/plugin-file-system-image/src/server';
import dotenv from 'dotenv';
import path from 'path';
const env = dotenv.config().parsed;

export const serverConfig = buildServerConfig({
  config,
  mongoConnectionString: env.MONGO_URI,
  plugins: [
    activeDirectoryServerPlugin,
    fileSystemImageServerPlugin({ filesPath: path.resolve(process.cwd(), 'files') }),
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
});
