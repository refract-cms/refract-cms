import { buildServerConfig } from '@refract-cms/server';
import { config } from './config';
import { activeDirectoryServerPlugin } from '@refract-cms/plugin-active-directory-auth/src/server';
import { fileSystemImageServerPlugin } from '@refract-cms/plugin-file-system-image/src/server';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

console.log(process.env.MONGO_URI, 'abcd');
export const serverConfig = buildServerConfig({
  config,
  mongoConnectionString: process.env.MONGO_URI,
  plugins: [
    activeDirectoryServerPlugin,
    fileSystemImageServerPlugin({ filesPath: path.resolve(process.cwd(), 'files') }),
  ],
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
});
