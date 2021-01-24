import type { EntitySchema } from '@refract-cms/core';

export interface ConfigState {
  serverUrl: string;
  schema: EntitySchema[];
}
