import express from 'express';
import { refract } from '@refract-cms/server';
import { serverConfig } from './server-config';
import chalk from 'chalk';
import { indexHtml } from './index-html';
import { constants } from '../shared/constants';

const app = express();

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

app.use(constants.refractPath, refract({ serverConfig }));

app.get('/*', indexHtml);

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

export default app;
