import type { PropertyType } from '@refract-cms/core';
import type { ResolverPlugin } from './resolver-plugin';

export function createResolverPlugin<T extends PropertyType = any>(plugin: ResolverPlugin<T>) {
  return plugin;
}
