import express from 'express';
// import { refractCmsHandler } from '@refract-cms/server';
import { refractCmsHandler } from '../../../../packages/server/src';
import { config } from '../config';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { ServerConfig } from '../../../server/src/config/server-config';

dotenv.config();

const app = express();

app.use(express.static('public'));

const serverConfig: ServerConfig = {
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

app.use(...refractCmsHandler({ serverConfig }));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(chalk.magenta(`GraphQL endpoint: http://localhost:${PORT}${serverConfig.rootPath}/graphql`));
  console.log(chalk.blue(`CMS Dashboard: http://localhost:${PORT}`));
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `CMS Dashboard credentials: ${serverConfig.auth.adminCredentials.username} / ${serverConfig.auth.adminCredentials.password}`
    );
  }
});