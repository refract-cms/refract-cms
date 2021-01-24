import type { ServerConfig } from '../config/server-config';
import type express from 'express';

export interface RefractGraphQLContext {
  serverConfig: ServerConfig;
  req: express.Request;
}
