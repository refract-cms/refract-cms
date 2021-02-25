import express from 'express';
import { renderToString } from 'react-dom/server';
import { refractCmsMiddleware } from '@refract-cms/server';
import { serverConfig } from './server-config';
import chalk from 'chalk';
import React from 'react';
import { Html } from './Html';

const cmsRoute = '/cms';

const app = express();

app.disable('x-powered-by');

app.use(express.static(process.env.RAZZLE_PUBLIC_DIR));

app.use(cmsRoute, refractCmsMiddleware({ serverConfig }));

app.get('/*', (req, res) => {
  res.status(200).send(`<!doctype html>${renderToString(<Html title="Refract CMS App" />)}`);
});

const PORT = process.env.PORT || 3000;

console.log(chalk.magenta(`GraphQL endpoint: http://localhost:${PORT}${cmsRoute}/graphql`));
console.log(chalk.blue(`CMS Dashboard: http://localhost:${PORT}`));

if (process.env.NODE_ENV === 'development') {
  console.log(
    chalk.yellow(
      `CMS Dashboard credentials: ${serverConfig.auth.adminCredentials.username} / ${serverConfig.auth.adminCredentials.password}`
    )
  );
}

export default app;
