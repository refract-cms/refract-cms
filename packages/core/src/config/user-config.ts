import type { EntitySchema } from '../entities/entity-schema';
import type { PluginConfig } from '../plugins/plugin-config';
import type { Localization } from './localization';

export interface UserConfig {
  schema: EntitySchema[];
  plugins?: PluginConfig[];
  localization: Localization;
}
