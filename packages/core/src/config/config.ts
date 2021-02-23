import type { EntitySchema } from '../entities/entity-schema';
import type { Localization } from './localization';

export interface Config {
  schema: EntitySchema[];
  localization: Localization;
}
