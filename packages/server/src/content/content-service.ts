import type { Entity, EntitySchema, Return } from '@refract-cms/core';
import type { ServerConfig } from '../config/server-config';
import { ModelType, repositoryForSchema } from '../repository-for-schema';
import type { Document } from 'mongoose';

export class ContentService<T> {
  constructor(private schema: EntitySchema<T>, private serverConfig: ServerConfig) {}

  async getById({ id, locale }: { id: string; locale?: string }): Promise<Return<T>> {
    const content = await this.collection().findById(id);
    console.log({ content });
    return this.mapContent(content);
    return content;
  }

  private mapContent(content: Document<string> & Entity): Return<T> {
    const { _id, createdAt, updatedAt } = content;
    const fieldContent: any = {};

    return {
      _id,
      createdAt,
      updatedAt,
    } as Return<T>;
  }

  collection() {
    return repositoryForSchema(this.schema);
  }
}
