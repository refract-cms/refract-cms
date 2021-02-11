import type { EntitySchema } from '../entities/entity-schema';

export interface Config {
  schema: EntitySchema[];
  languages: string[];
}
