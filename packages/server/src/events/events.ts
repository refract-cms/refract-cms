import type { GraphQLSchema } from 'graphql';

export interface Events {
  onSave?: () => void;
  onSchemaBuilt?: (schema: GraphQLSchema) => void;
  onMongoConnected?: () => void;
}
