import express from 'express';
import { refractCmsHandler, ServerConfig } from '@refract-cms/server';
//@ts-ignore
import configImport from '@consumer/config/refract.config';
//@ts-ignore
import serverConfigImport from '@consumer/config/server.config';
import path from 'path';
import '@babel/polyfill';
import cors from 'cors';
import { CliServerConfig, CliConfig } from '@refract-cms/cli';
import { Config } from '@refract-cms/core';

const server = express();

const serverConfig: CliServerConfig & ServerConfig = serverConfigImport;
const config: Config & CliConfig = configImport;

serverConfig.config = config;
serverConfig.rootPath = config.path;

const scriptSrc = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/client.js' : '/public/client.js';

const handler = refractCmsHandler({
  serverConfig
});

server
  .use(handler[0], cors(), handler[1])
  .use('/public', express.static(path.join(__dirname, 'public')))
  .get(`${serverConfig.rootPath}*`, (req, res) => {
    res.send(
      `<!doctype html>
<html lang="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    <title>Refract-CMS Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
</head>
<body>
    <div id="root"></div>
    <script src="${scriptSrc}" defer crossorigin></script>
</body>
</html>`
    );
  });

if (serverConfig.configureExpress) {
  serverConfig.configureExpress(server);
}

export default server;
