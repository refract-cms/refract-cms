import { GraphQLFieldConfigArgumentMap } from 'graphql';
import { ActualType, Return, PropertyType } from '@refract-cms/core';
import { RefractGraphQLContext } from './graphql/refract-graphql-context';

type Resolver<T, V> = (source: Return<T>, context: RefractGraphQLContext) => V | Promise<V>;

export interface ResolvedPropertyOptions<T, TPropertyType extends PropertyType | any> {
  type: TPropertyType;
  args?: GraphQLFieldConfigArgumentMap;
  resolve?: Resolver<T, ActualType<TPropertyType>>;
}
