import type { EntitySchema } from '../entities/entity-schema';
import type { Config } from './config';
import type { UserConfig } from './user-config';

export function buildConfig(config: UserConfig): Config {
  const schema: EntitySchema[] = [];
  schema.push(...config.schema);
  config.plugins.forEach((plugin) => {
    schema.push(...plugin.schema);
  });
  return {
    schema,
  };
}
