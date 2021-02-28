import { buildServerConfig } from '@refract-cms/server';
import { config } from '../config/config';
import { constants } from '../shared/constants';
import chalk from 'chalk';

export const serverConfig = buildServerConfig({
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
  events: {
    onMongoConnected: () => {
      const PORT = process.env.PORT || 3000;

      console.log(chalk.magenta(`GraphQL endpoint: http://localhost:${PORT}${constants.refractPath}/graphql`));
      console.log(chalk.blue(`CMS Dashboard: http://localhost:${PORT}`));

      if (process.env.NODE_ENV === 'development') {
        console.log(
          chalk.yellow(
            `CMS Dashboard credentials: ${serverConfig.auth.adminCredentials.username} / ${serverConfig.auth.adminCredentials.password}`
          )
        );
      }
    },
  },
});
