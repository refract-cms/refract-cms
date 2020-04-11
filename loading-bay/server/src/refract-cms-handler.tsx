import * as express from 'express';
import graphqlHTTP from 'express-graphql';
import { ServerConfig } from './config/server-config.model';
import { RequestHandlerParams } from 'express-serve-static-core';
import multer from 'multer';
import jimp from 'jimp';
import { authService } from './auth/auth.service';
import fs from 'fs';
import { MongooseSchemaBuilder } from './persistance/mongoose-schema-builder';
import mongoose from 'mongoose';
import { schemaBuilder } from './graphql/schema.builder';
import expressPlayground from 'graphql-playground-middleware-express';
import bodyParser from 'body-parser';
import { requireAuth } from './auth/require-auth.middleware';
import { RefractGraphQLContext } from './graphql/refract-graphql-context';
import { singleRefPlugin } from './plugins/single-ref-plugin';
import { multipleRefPlugin } from './plugins/multiple-ref-plugin';
import { buildServerOptions } from './config/create-server-options';

const refractCmsHandler = ({ serverConfig }: { serverConfig: ServerConfig }) => {
  const { config } = serverConfig;

  const router = express.Router();

  router.use(bodyParser.json());

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
    mongoose.connect(
      serverConfig.mongoConnectionString,
      { useNewUrlParser: true }
    );
  }

  const serverOptions = buildServerOptions(serverConfig);
  const mongooseSchemaBuilder = new MongooseSchemaBuilder();
  mongooseSchemaBuilder.buildSchema(serverOptions.schemas);

  schemaBuilder.init(serverOptions);
  const { publicGraphQLSchema, internalGraphQLSchema } = schemaBuilder.buildSchema(serverOptions.schemas);

  serverOptions.routers.forEach(routerDef => {
    router.use(`/plugins/${routerDef.alias.toLowerCase()}`, routerDef.router);
  });

  router.use(
    '/graphql',
    graphqlHTTP((req, res) => {
      const context: RefractGraphQLContext = {
        req,
        serverConfig
      };
      return {
        schema: publicGraphQLSchema,
        graphiql: true,
        context
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
          : null
      };
      return {
        schema: internalGraphQLSchema,
        graphiql: true,
        context: {
          userId: 'ad'
        }
      };
    })
  );

  router.get('/graphql-playground', expressPlayground({ endpoint: `${serverConfig.rootPath}/graphql` }));

  // const filesRepository = new MongoRepository<FileModel>('files', db!);

  // const fileRepository = mongoose.connection.models['file'];

  // router.get('/files/:id', async (req, res) => {
  //   const { id } = req.params;
  //   const crop = req.query;
  //   const entity: FileModel = await fileRepository.findById(id);

  //   if (entity.fileRef) {
  //     const img = await jimp.read(entity.fileRef.path);

  //     if (crop.x && crop.y && crop.width && crop.height) {
  //       img.crop(parseInt(crop.x), parseInt(crop.y), parseInt(crop.width), parseInt(crop.height));
  //     }

  //     const imgBuffer = await img.getBufferAsync(entity.fileRef.mimetype);
  //     res.writeHead(200, { 'Content-Type': entity.fileRef.mimetype });
  //     res.end(imgBuffer, 'binary');
  //   } else {
  //     res.sendStatus(500);
  //   }
  // });

  // router.post('/files', upload.single('file'), (req, res) => {
  //   const { mimetype, path, filename, size } = req.file;
  //   res.send(req.file);
  // });

  return [serverConfig.rootPath || '', router] as RequestHandlerParams[];
};

export default refractCmsHandler;
