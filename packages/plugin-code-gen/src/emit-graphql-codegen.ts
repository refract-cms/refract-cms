import fs from 'fs';
import path from 'path';
import { codegen } from '@graphql-codegen/core';
import { plugin as fragmentMatcherPlugin } from '@graphql-codegen/fragment-matcher';
import { plugin as typescriptPlugin } from '@graphql-codegen/typescript';
import { plugin as typescriptOperationsPlugin } from '@graphql-codegen/typescript-operations';
import { plugin as apolloPlugin } from '@graphql-codegen/typescript-react-apollo';
import { printSchema, parse, GraphQLSchema, print, printType, graphql, ASTNode } from 'graphql';
import { CodeGenServerPluginOptions } from './server';

export async function emitGraphqlCodeGen(schema: GraphQLSchema, options: CodeGenServerPluginOptions) {
  const { outputPath, queries } = options;
  await fs.mkdir(outputPath, { recursive: true }, err => {
    // if (err) console.log(err);
  });

  const schemaDocumentNode = parse(printSchema(schema));

  // Introspect
  const outputIntrospect = await codegen({
    filename: 'outputFile.json',
    schema: schemaDocumentNode,
    pluginMap: {
      'fragment-matcher': {
        plugin: fragmentMatcherPlugin
      }
    },
    documents: [],
    plugins: [
      {
        'fragment-matcher': {}
      }
    ],
    config: {}
  });

  const outputIntrospectPath = path.resolve(outputPath, 'introspect.generated.json');
  fs.writeFile(outputIntrospectPath, outputIntrospect, err => {
    console.log(err || 'Introspect Outputs generated!');
  });

  const queryASTNodes: ASTNode[] = queries || [];
  const queriesToEmit = queryASTNodes.map(q => ({ filePath: '', content: parse(print(q)) }));

  // React Apollo TS types
  const apolloTs = await codegen({
    filename: 'outputFile.ts',
    schema: schemaDocumentNode,
    schemaAst: schema,
    pluginMap: {
      typescript: {
        plugin: typescriptPlugin
      },
      'typescript-react-apollo': {
        plugin: apolloPlugin
      },
      'typescript-operations': {
        plugin: typescriptOperationsPlugin
      }
    },
    documents: [...queriesToEmit],
    plugins: [
      {
        'typescript-react-apollo': {
          withHooks: true
        }
      },
      {
        typescript: {
          scalars: {
            DateTime: 'Date',
            MongoId: 'string'
          }
        }
      },
      {
        'typescript-operations': {}
      }
    ],
    config: {}
  });

  const apolloTsPath = path.resolve(outputPath, 'index.tsx');
  fs.writeFile(apolloTsPath, apolloTs, err => {
    console.log(err || 'TS Outputs generated!');
  });

  console.log(`Outputs available at: ${outputPath}`);
}
