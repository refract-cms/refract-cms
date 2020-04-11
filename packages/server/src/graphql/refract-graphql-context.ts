import { ServerConfig } from '../config/server-config';
import express from 'express';

export interface RefractGraphQLContext {
  serverConfig: ServerConfig;
  req: express.Request;
}
