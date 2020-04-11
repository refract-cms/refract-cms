import { action } from "typesafe-actions";
import { EntityListFilter } from "../models/entity-list-filter";
import { EntitySchema } from "@refract-cms/core";

export const SET_ORDERBY = "@@CMS/ENTITIES/SET_ORDERBY";
export const SET_ORDERBY_DIRECTION = "@@CMS/ENTITIES/SET_ORDERBY_DIRECTION";
export const ADD_FILTER = "@@CMS/ENTITIES/ADD_FILTER";
export const UPDATE_FILTER = "@@CMS/ENTITIES/UPDATE_FILTER";
export const SET_PAGE = "@@CMS/ENTITIES/SET_PAGE";
export const RESET_FILTERS = "@@CMS/ENTITIES/RESET_FILTERS";
export const REMOVE_FILTER = "@@CMS/ENTITIES/REMOVE_FILTER";

export const setOrderByField = (args: {
  alias: string;
  orderByField: string;
}) => {
  return action(SET_ORDERBY, args);
};

export const setOrderByDirection = (args: {
  alias: string;
  direction: "ASC" | "DESC";
}) => {
  return action(SET_ORDERBY_DIRECTION, args);
};

export const addFilter = ({ schema }: { schema: EntitySchema<any> }) => {
  const propertyKey = Object.keys(schema.properties)[0];
  return action(ADD_FILTER, {
    alias: schema.options.alias,
    schema,
    filter: {
      propertyKey,
      operater: "EQ",
      value: schema.properties[propertyKey].type(),
    } as EntityListFilter,
  });
};

export const resetFilters = (args: { alias: string }) => {
  return action(RESET_FILTERS, args);
};

export const removeFilter = (args: { alias: string; index: number }) => {
  return action(REMOVE_FILTER, args);
};

export const updateFilter = (args: {
  alias: string;
  filter: EntityListFilter;
  index: number;
  schema: EntitySchema<any>;
}) => {
  return action(UPDATE_FILTER, args);
};

export const setPage = (args: { alias: string; page: number }) => {
  return action(SET_PAGE, args);
};
