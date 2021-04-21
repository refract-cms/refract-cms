import type { ServerConfig } from '../config/server-config';
import type { Request } from 'express';
import type { EntitySchema } from '@refract-cms/core';
import type { GraphQLObjectType } from 'graphql';
import type { collection } from '../collection';

export interface RefractGraphQLContext {
  serverConfig: ServerConfig;
  req: Request;
  baseUrl: string;
}
