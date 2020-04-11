import { createStandardAction, action } from 'typesafe-actions';
import { Routes } from '../routes';
import { EntitySchema } from '@refract-cms/core';

export const SET_BASE_ROUTE = '@@CMS/SET_BASE_ROUTE';

export const setBaseRoute = (baseRoute: string) => {
  const buildPath = (relativePath: string) => `${baseRoute}${relativePath}`.replace('//', '/');
  const routes: Routes = {
    root: {
      path: buildPath('/'),
      createUrl: () => buildPath('/')
    },
    about: {
      path: buildPath('/about'),
      createUrl: () => buildPath('/about')
    },
    graphql: {
      path: buildPath('/graphql-browser'),
      createUrl: () => buildPath('/graphql-browser')
    },
    media: {
      path: buildPath('/media'),
      createUrl: () => buildPath('/media')
    },
    files: {
      path: buildPath('/files'),
      createUrl: () => buildPath('/files')
    },
    content: {
      path: buildPath(`/content/:alias?`),
      createUrl: schema => buildPath(`/content/${schema.options.alias}`)
    },
    entity: {
      list: {
        path: buildPath(`/content/:alias`),
        createUrl: schema => buildPath(`/content/${schema.options.alias}`)
      },
      edit: {
        path: buildPath(`/content/:alias/edit/:id`),
        createUrl: args => buildPath(`/content/${args.schema.options.alias}/edit/${args.id || ''}`)
      }
    }
  };
  return action(SET_BASE_ROUTE, routes);
};
