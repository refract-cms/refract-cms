import type { EntityListFilter } from '../models/entity-list-filter';
import type { EntitySchema } from '@refract-cms/core';

export interface EntityStateItem {
  schema: EntitySchema<any>;
  orderByField: string;
  orderByDirection: 'ASC' | 'DESC';
  filters: EntityListFilter[];
  currentPage: number;
}

export interface EntityState {
  [key: string]: EntityStateItem;
}
