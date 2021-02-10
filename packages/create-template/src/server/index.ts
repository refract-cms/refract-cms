import express from 'express';
import { refractCmsMiddleware, buildServerConfig } from '@refract-cms/server';
import { config } from '../config';
import dotenv from 'dotenv';
import chalk from 'chalk';
import path from 'path';

dotenv.config();

const app = express();

const serverConfig = buildServerConfig({
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
});

const cmsRoute = '/cms';

app.use(cmsRoute, refractCmsMiddleware({ serverConfig }));

app.use('/client', express.static(path.resolve(__dirname, 'client')));

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(chalk.magenta(`GraphQL endpoint: http://localhost:${PORT}${cmsRoute}/graphql`));
  console.log(chalk.blue(`CMS Dashboard: http://localhost:${PORT}`));
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `CMS Dashboard credentials: ${serverConfig.auth.adminCredentials.username} / ${serverConfig.auth.adminCredentials.password}`
    );
  }
});
