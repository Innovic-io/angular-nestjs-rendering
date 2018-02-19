import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const parseValue = (value) => {

    return new Date(value);
};

const serialize = (value) => {

  return value.getTime();
};

const parseLiteral = (ast) => {

  if (ast.kind === Kind.INT) {
    return parseInt(ast.value, 10); // ast value is always in string format
  }
  return null;
};

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'An ISO-8601 encoded UTC date string.',
  serialize, parseValue, parseLiteral,
});

export { DateTime as default };
