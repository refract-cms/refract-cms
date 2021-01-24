import type { AppAction } from '../../state/app-action';
import type { EntityState, EntityStateItem } from './entity-state';
import {
  SET_ORDERBY,
  SET_ORDERBY_DIRECTION,
  ADD_FILTER,
  UPDATE_FILTER,
  SET_PAGE,
  REMOVE_FILTER,
  RESET_FILTERS,
} from './entity-actions';
import { CONFIGURE } from '../../config/state/config-actions';
import { convertDateToSimpleDate, graphqlQueryHelper } from '@refract-cms/core';

const defaultState: EntityState = {};

export function entityReducer(state = defaultState, action: AppAction): EntityState {
  switch (action.type) {
    case SET_ORDERBY: {
      return {
        ...state,
        [action.payload.alias]: {
          ...state[action.payload.alias],
          orderByDirection: state[action.payload.alias] ? state[action.payload.alias].orderByDirection || 'ASC' : 'ASC',
          orderByField: action.payload.orderByField,
          currentPage: 0,
        },
      };
    }
    case ADD_FILTER: {
      return {
        ...state,
        [action.payload.alias]: {
          ...state[action.payload.alias],
          orderByDirection: state[action.payload.alias] ? state[action.payload.alias].orderByDirection || 'ASC' : 'ASC',
          filters: [...state[action.payload.alias].filters, action.payload.filter],
          currentPage: 0,
        },
      };
    }
    case UPDATE_FILTER: {
      const { schema } = action.payload;
      const newFilters = [...state[action.payload.alias].filters];
      if (action.payload.filter.propertyKey === state[action.payload.alias].filters[action.payload.index].propertyKey) {
        newFilters[action.payload.index] = action.payload.filter;
      } else {
        const type = schema.properties[action.payload.filter.propertyKey].type;
        newFilters[action.payload.index] = {
          ...action.payload.filter,
          value: type === Date ? convertDateToSimpleDate(new Date()) : type(),
        };
      }
      return {
        ...state,
        [action.payload.alias]: {
          ...state[action.payload.alias],
          filters: newFilters,
          currentPage: 0,
        },
      };
    }
    case REMOVE_FILTER: {
      const { alias, index } = action.payload;
      const newFilters = [...state[action.payload.alias].filters.filter((f, i) => i !== index)];
      return {
        ...state,
        [alias]: {
          ...state[alias],
          filters: newFilters,
          currentPage: 0,
        },
      };
    }
    case RESET_FILTERS: {
      const { alias } = action.payload;
      return {
        ...state,
        [alias]: {
          ...state[alias],
          filters: [],
          currentPage: 0,
        },
      };
    }
    case SET_ORDERBY_DIRECTION: {
      return {
        ...state,
        [action.payload.alias]: {
          ...state[action.payload.alias],
          orderByDirection: action.payload.direction,
          currentPage: 0,
        },
      };
    }
    case SET_PAGE: {
      return {
        ...state,
        [action.payload.alias]: {
          ...state[action.payload.alias],
          currentPage: action.payload.page,
        },
      };
    }
    case CONFIGURE: {
      return action.payload.schema.reduce((acc, schema) => {
        acc[schema.options.alias] = {
          orderByDirection: schema.options.defaultSort ? schema.options.defaultSort.orderByDirection || 'ASC' : 'ASC',
          orderByField: schema.options.defaultSort ? schema.options.defaultSort.orderByField : undefined,
          filters: [],
          currentPage: 0,
          schema,
          query: graphqlQueryHelper.getAllQueryWithAllFields(schema),
        } as EntityStateItem;
        return acc;
      }, {});
    }

    default: {
      return state;
    }
  }
}
