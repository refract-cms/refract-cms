import { GraphQLScalarType } from 'graphql';

export const MongoIdType = new GraphQLScalarType({
  name: 'MongoId',
  serialize: id => `${id}`
});
