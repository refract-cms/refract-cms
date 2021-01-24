import type { EntitySchema } from '@refract-cms/core';

export interface Routes {
  root: {
    path: string;
    createUrl: () => string;
  };
  about: {
    path: string;
    createUrl: () => string;
  };
  graphql: {
    path: string;
    createUrl: () => string;
  };
  content: {
    path: string;
    createUrl: (schema: EntitySchema) => string;
  };
  media: {
    path: string;
    createUrl: () => string;
  };
  files: {
    path: string;
    createUrl: () => string;
  };
  entity: {
    list: {
      path: string;
      createUrl: (schema: EntitySchema) => string;
    };
    edit: {
      path: string;
      createUrl: (args: { id: string | 'new'; schema: EntitySchema }) => string;
    };
  };
}
