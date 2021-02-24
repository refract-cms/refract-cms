import dotenv from 'dotenv';
// dotenv.config({ path: require('find-config')('.env') });
dotenv.config();
import path from 'path';
// dotenv.config({ path: path.resolve(process.cwd(), '.env') });
//
// console.log(path.resolve(process.cwd(), '.env'));
console.log(process.env.MONGO_URI, 'root');

import express from 'express';
import { refractCmsMiddleware } from '@refract-cms/server';
import { serverConfig } from './server-config';
import cors from 'cors';
import chalk from 'chalk';

const app = express();

app.use(cors());

app.use('/cms', refractCmsMiddleware({ serverConfig }));

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
