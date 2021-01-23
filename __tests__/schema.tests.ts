import { expect } from 'chai';
import { composeSchema, Config } from '@refract-cms/core';
import { SchemaBuilder, ServerConfig, buildServerOptions } from '@refract-cms/server';
import { printSchema } from 'graphql';

describe('schema tests', () => {
  it('Produces a valid public schema', () => {
    const TestSchema = composeSchema({
      options: {
        alias: 'test',
      },
      properties: {},
    });

    const config: Config = {
      schema: [TestSchema],
    };

    const serverConfig: ServerConfig = {
      rootPath: '/',
      mongoConnectionString: '',
      auth: {
        adminCredentials: { username: '', password: '' },
        jwt: { secret: '234' },
      },
      config,
      plugins: [],
      resolvers: {},
    };

    var schemaBuilder = new SchemaBuilder();
    schemaBuilder.init(buildServerOptions(serverConfig));

    const { publicGraphQLSchema } = schemaBuilder.buildSchema(config.schema);

    const expected = `
    scalar MongoId

"""Filter type for MongoId scalar"""
input MongoIdFilter {
  """$eq"""
  EQ: MongoId

  """$gt"""
  GT: MongoId

  """$gte"""
  GTE: MongoId

  """$in"""
  IN: [MongoId]

  """$all"""
  ALL: [MongoId]

  """$lt"""
  LT: MongoId

  """$lte"""
  LTE: MongoId

  """$ne"""
  NE: MongoId

  """$nin"""
  NIN: [MongoId]

  """$not"""
  NOT: MongoIdNotFilter

  """DEPRECATED: Switched to the more intuitive operator fields"""
  opr: Opr

  """DEPRECATED: Switched to the more intuitive operator fields"""
  value: MongoId

  """DEPRECATED: Switched to the more intuitive operator fields"""
  values: [MongoId]

  """DEPRECATED: use NE"""
  NEQ: MongoId
}

"""Filter type for $not of MongoId scalar"""
input MongoIdNotFilter {
  """$eq"""
  EQ: MongoId

  """$gt"""
  GT: MongoId

  """$gte"""
  GTE: MongoId

  """$in"""
  IN: [MongoId]

  """$all"""
  ALL: [MongoId]

  """$lt"""
  LT: MongoId

  """$lte"""
  LTE: MongoId

  """$ne"""
  NE: MongoId

  """$nin"""
  NIN: [MongoId]
}

enum Opr {
  EQL
  GT
  GTE
  IN
  ALL
  LT
  LTE
  NE
  NIN
}

input PaginationType {
  limit: Int
  skip: Int
}

type Query {
  testCount(filter: testEntityFilterType): Int
  testList(filter: testEntityFilterType, sort: testEntitySortType, pagination: PaginationType): [test]
  testPreview(record: testInput): test
  testFindById(id: String): test
  testFindOne(filter: testEntityFilterType, sort: testEntitySortType, pagination: PaginationType): test
}

enum SortType {
  ASC
  DESC
}

type test {
  _id: MongoId
}

input testEntityFilterType {
  _id: MongoIdFilter
  OR: [testEntityFilterType]
  AND: [testEntityFilterType]
  NOR: [testEntityFilterType]
}

input testEntitySortType {
  _id: SortType
}

input testInput {
  _id: MongoId
}
    `.trim();
    expect(expected).to.equal(printSchema(publicGraphQLSchema).trim());
  });
  it('Produces a valid internal schema', () => {
    const TestSchema = composeSchema({
      options: {
        alias: 'test',
      },
      properties: {},
    });

    const config: Config = {
      schema: [TestSchema],
    };

    const serverConfig: ServerConfig = {
      rootPath: '/',
      mongoConnectionString: '',
      auth: {
        adminCredentials: { username: '', password: '' },
        jwt: { secret: '234' },
      },
      config,
      plugins: [],
      resolvers: {},
    };

    var schemaBuilder = new SchemaBuilder();
    schemaBuilder.init(buildServerOptions(serverConfig));

    const { internalGraphQLSchema } = schemaBuilder.buildSchema(config.schema);

    const expected = `
    scalar MongoId

"""Filter type for MongoId scalar"""
input MongoIdFilter {
  """$eq"""
  EQ: MongoId

  """$gt"""
  GT: MongoId

  """$gte"""
  GTE: MongoId

  """$in"""
  IN: [MongoId]

  """$all"""
  ALL: [MongoId]

  """$lt"""
  LT: MongoId

  """$lte"""
  LTE: MongoId

  """$ne"""
  NE: MongoId

  """$nin"""
  NIN: [MongoId]

  """$not"""
  NOT: MongoIdNotFilter

  """DEPRECATED: Switched to the more intuitive operator fields"""
  opr: Opr

  """DEPRECATED: Switched to the more intuitive operator fields"""
  value: MongoId

  """DEPRECATED: Switched to the more intuitive operator fields"""
  values: [MongoId]

  """DEPRECATED: use NE"""
  NEQ: MongoId
}

"""Filter type for $not of MongoId scalar"""
input MongoIdNotFilter {
  """$eq"""
  EQ: MongoId

  """$gt"""
  GT: MongoId

  """$gte"""
  GTE: MongoId

  """$in"""
  IN: [MongoId]

  """$all"""
  ALL: [MongoId]

  """$lt"""
  LT: MongoId

  """$lte"""
  LTE: MongoId

  """$ne"""
  NE: MongoId

  """$nin"""
  NIN: [MongoId]
}

type Mutation {
  testCreate(record: testInput): testEntity
  testUpdate(record: testInput): testEntity
  testRemoveById(id: String): Boolean
}

enum Opr {
  EQL
  GT
  GTE
  IN
  ALL
  LT
  LTE
  NE
  NIN
}

input PaginationType {
  limit: Int
  skip: Int
}

type Query {
  testEntityList(filter: testEntityFilterType, sort: testEntitySortType, pagination: PaginationType): [testEntity]
  testCount(filter: testEntityFilterType): Int
  testEntityFindById(id: String): testEntity
}

enum SortType {
  ASC
  DESC
}

type testEntity {
  _id: MongoId
}

input testEntityFilterType {
  _id: MongoIdFilter
  OR: [testEntityFilterType]
  AND: [testEntityFilterType]
  NOR: [testEntityFilterType]
}

input testEntitySortType {
  _id: SortType
}

input testInput {
  _id: MongoId
}
    `.trim();
    expect(expected).to.equal(printSchema(internalGraphQLSchema).trim());
  });
});
