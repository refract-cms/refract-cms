import * as express from 'express';
import graphqlHTTP from 'express-graphql';
import { authService } from './auth/auth-service';
import { MongooseSchemaBuilder } from './persistance/mongoose-schema-builder';
import mongoose from 'mongoose';
import { schemaBuilder } from './graphql/schema-builder';
import expressPlayground from 'graphql-playground-middleware-express';
import bodyParser from 'body-parser';
import { requireAuth } from './auth/require-auth-middleware';
import type { RefractGraphQLContext } from './graphql/refract-graphql-context';
import chalk from 'chalk';
import type { ServerConfig } from './config/server-config';
// import webpack from 'webpack';
// import { createWebpackDevClientConfig } from './webpack/create-webpack-dev-client-config';
// import webpackDevMiddleware from 'webpack-dev-middleware';
// import webpackHotMiddleware from 'webpack-hot-middleware';
// import rollup from 'express-middleware-rollup';
import path from 'path';
import Bundler from 'parcel-bundler';

export const refractCmsMiddleware = ({ serverConfig, app }: { serverConfig: ServerConfig; app: express.Express }) => {
  const { config } = serverConfig;

  const router = express.Router();

  router.use(bodyParser.json());

  // const webpackDevConfig = createWebpackDevClientConfig();
  // const compiler = webpack(webpackDevConfig);

  // app.use(webpackDevMiddleware(compiler, {}));

  // app.use(webpackHotMiddleware(compiler));

  router.post('/login', async (req, res) => {
    const { username, password } = req.body as any;
    const userId = await authService.findUserIdWithCredentials(username, password, serverConfig);
    if (userId) {
      const token = authService.createAccessToken(userId, serverConfig);
      res.send({ token });
    } else {
      res.sendStatus(403);
    }
  });

  if (mongoose.connection.readyState !== 1) {
    mongoose
      .connect(serverConfig.mongoConnectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log(chalk.green('Connected to MongoDB'));
      });
  }

  // const serverOptions = buildServerOptions(serverConfig);
  const mongooseSchemaBuilder = new MongooseSchemaBuilder();
  mongooseSchemaBuilder.buildSchema(serverConfig.config.schema);

  schemaBuilder.init(serverConfig);
  const { publicGraphQLSchema, internalGraphQLSchema } = schemaBuilder.buildSchema(serverConfig.config.schema);

  serverConfig.routers.forEach((routerDef) => {
    router.use(`/plugins/${routerDef.alias.toLowerCase()}`, routerDef.router);
  });

  router.use(
    '/graphql',
    graphqlHTTP((req, res) => {
      const context: RefractGraphQLContext = {
        req,
        serverConfig,
        baseUrl: req.baseUrl.replace('/graphql', ''),
      };
      return {
        schema: publicGraphQLSchema,
        graphiql: true,
        context,
      };
    })
  );

  router.use(
    '/internal/graphql',
    requireAuth(serverConfig),
    graphqlHTTP((req, res) => {
      const context = {
        userId: req.headers.authorization
          ? authService.verifyAccessToken(req.headers.authorization!, serverConfig).nameid
          : null,
      };
      return {
        schema: internalGraphQLSchema,
        graphiql: true,
        context: {
          userId: 'ad',
        },
      };
    })
  );

  router.get('/graphql-playground', (req, res, next) => {
    const endpoint = `${req.baseUrl}/graphql`;
    return expressPlayground({ endpoint })(req, res, next);
  });

  const entry = path.resolve(process.cwd(), 'src/client/index.tsx');
  // const entry = '@refract-cms/server/src/client/index.tsx';

  const bundler = new Bundler(entry, {
    target: 'browser',
    outDir: './client', // The out directory to put the build files in, defaults to dist
    outFile: 'client.js',
    hmr: true,
    watch: true,
    bundleNodeModules: true,
  });

  router.use(bundler.middleware());

  router.get('/*', (req, res) => {
    res.send(
      `<head>
        <title>Admin</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
        <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
       </head>
       <body>
        <script>window.serverUrl = "${req.baseUrl}/";</script><div id='root'></div><script src="${req.baseUrl}/client.js"></script>
       </body>`
    );
  });

  return router;
};
