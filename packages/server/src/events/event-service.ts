import type { GraphQLSchema } from 'graphql';
import type { ServerConfig } from '../config/server-config';
import type { ServerUserConfig } from '../config/server-user-config';
import type { Events } from './events';

export class EventService implements Events {
  constructor(private serverConfig: ServerConfig) {}

  onSave() {
    this.serverConfig.events.forEach((events) => events.onSave());
  }

  onSchemaBuilt(schema: GraphQLSchema) {
    this.serverConfig.events.forEach((events) => events.onSchemaBuilt(schema));
  }
}
