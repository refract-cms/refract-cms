import { createServerPlugin } from '@refract-cms/server';
import type { ASTNode } from 'graphql';
import { emitGraphqlCodeGen } from './emit-graphql-codegen';
import { codeGenPlugin } from './';

export interface CodeGenServerPluginOptions {
  outputPath: string;
  queries?: ASTNode[];
}

export const codeGenServerPlugin = (options: CodeGenServerPluginOptions) =>
  createServerPlugin(codeGenPlugin, {
    events: {
      onSchemaBuilt: (schema) => {
        emitGraphqlCodeGen(schema, options);
      },
    },
  });
