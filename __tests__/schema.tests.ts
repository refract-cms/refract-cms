import { expect } from 'chai';
import { composeSchema, Config } from '@refract-cms/core';
import { SchemaBuilder, ServerConfig, buildServerConfig, UserServerConfig } from '@refract-cms/server';
import { printType } from 'graphql';

describe('GraphQL schema has correct properties', () => {
  it('TestSchema 1', () => {
    const TestSchema = composeSchema({
      options: {
        alias: 'test',
      },
      properties: {
        title: {
          type: String,
        },
        date: {
          type: Date,
        },
        active: {
          type: Boolean,
        },
      },
    });

    const config: Config = {
      schema: [TestSchema],
    };

    const serverConfig: UserServerConfig = {
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
    schemaBuilder.init(buildServerConfig(serverConfig));

    const { publicGraphQLSchema } = schemaBuilder.buildSchema(config.schema);

    const TestGraphQLType = schemaBuilder.getTypeFromSchema(TestSchema);

    expect(printType(TestGraphQLType)).to.equal(
      `
type test {
  _id: MongoId
  title: String
  date: DateTime
  active: Boolean
}
    `.trim()
    );
  });
});
