import { ScriptsConfig } from '@refract-cms/scripts';

const config: ScriptsConfig = {
  config: () => import('./src/config/config').then(({ config }) => config),
  serverConfig: () => import('./src/server/server-config').then(({ serverConfig }) => serverConfig),
};

export default config;
