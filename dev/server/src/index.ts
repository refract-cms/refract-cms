import express from 'express';
import { refractCms } from '@refract-cms/server';
import { serverConfig } from './server-config';
import cors from 'cors';
import chalk from 'chalk';

const app = express();

app.use(cors());

app.use('/cms', refractCms({ serverConfig }));

app.listen(4100, () => {
  console.log(`API listening on port 4100`);
  if (process.env.NODE_ENV === 'development') {
    console.log(
      chalk.magenta(
        `Login to the dashboard with ${serverConfig.auth.adminCredentials.username} / ${serverConfig.auth.adminCredentials.password}`
      ),
      chalk.magenta(`GraphQL API running at http://localhost:4100/cms/graphql`)
    );
  }
});
