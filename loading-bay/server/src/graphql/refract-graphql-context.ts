import { ServerConfig } from '../config/server-config.model';
import express from 'express';

export interface RefractGraphQLContext {
  serverConfig: ServerConfig;
  req: express.Request;
}
