import { EntityStateItem } from './entity.state';
import { graphqlQueryHelper } from '@refract-cms/core';
import { PureQueryOptions } from 'apollo-client';

export function buildEntityListQueryOptions(state: EntityStateItem): PureQueryOptions {
  const query = graphqlQueryHelper.getAllQueryWithAllFields(state.schema);
  let transformedFilter = {};
  let transformedSort = {};
  if (state.filters) {
    transformedFilter = {
      AND: state.filters.map(f => {
        return {
          [f.propertyKey]: {
            [f.operater]: f.value
          }
        };
      })
    };
  }
  if (state.orderByDirection && state.orderByField) {
    transformedSort = {
      [state.orderByField]: state.orderByDirection
    };
  }
  return {
    query,
    variables: {
      filter: transformedFilter,
      sort: transformedSort,
      pagination: {
        skip: state.currentPage * 10,
        limit: 10
      }
    }
  };
}
