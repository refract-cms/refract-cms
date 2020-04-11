import { PropertyType } from '@refract-cms/core';
import { ResolverPlugin } from './resolver-plugin.model';

export function createResolverPlugin<T extends PropertyType = any>(plugin: ResolverPlugin<T>) {
  return plugin;
}
