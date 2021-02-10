import type { GraphQLSchema } from 'graphql';
import type { ServerConfig } from '../config/server-config';
import type { UserServerConfig } from '../config/user-server-config';
import type { Events } from './events';

export class EventService implements Events {
  constructor(private serverConfig: ServerConfig) {}

  onSave() {
    this.serverConfig.events.filter((events) => events.onSave).forEach((events) => events.onSave());
  }

  onSchemaBuilt(schema: GraphQLSchema) {
    this.serverConfig.events.filter((events) => events.onSchemaBuilt).forEach((events) => events.onSchemaBuilt(schema));
  }
}
