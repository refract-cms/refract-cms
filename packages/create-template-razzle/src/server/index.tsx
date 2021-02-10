import express from 'express';
import { refractCmsMiddleware } from '@refract-cms/server';
import { serverConfig } from './server-config';
import chalk from 'chalk';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const cmsRoute = '/cms';

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(cmsRoute, refractCmsMiddleware({ serverConfig }))
  .get('/*', (req, res) => {
    res.status(200).send(
      `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="utf-8" />
        <title>Refract-CMS App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
        ${
          process.env.NODE_ENV === 'production'
            ? `<script src="${assets.client.js}" defer></script>`
            : `<script src="${assets.client.js}" defer crossorigin></script>`
        }
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>`
    );
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

export default server;
