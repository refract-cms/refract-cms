import type { ServerConfig } from '../config/server-config';
import type { Request } from 'express';

export interface RefractGraphQLContext {
  serverConfig: ServerConfig;
  req: Request;
  baseUrl: string;
}
