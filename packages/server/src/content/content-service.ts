import type { EntitySchema, Return } from '@refract-cms/core';
import type { ServerConfig } from '../config/server-config';
import { repositoryForSchema } from '../repository-for-schema';

export class ContentService<TEntitySchema extends EntitySchema> {
  constructor(private schema: TEntitySchema, private serverConfig: ServerConfig) {}

  async getById({ id, locale }: { id: string; locale?: string }): Promise<TEntitySchema['prototypes']> {
    const content = this.collection().findById({ id });
    return content;
  }

  collection() {
    return repositoryForSchema(this.schema);
  }
}
