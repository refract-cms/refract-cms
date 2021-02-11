import type { EntitySchema } from '../entities/entity-schema';
import type { PluginConfig } from '../plugins/plugin-config';

export interface UserConfig {
  schema: EntitySchema[];
  plugins?: PluginConfig[];
  languages: string[];
  defaultLanguage: string;
}
