import { GraphQLScalarType, Kind } from 'graphql';

const parseValue = (value) => {

    return new Date(value);
};

const serialize = (value) => {

  return value.toISOString();
};

const parseLiteral = (ast) => {

  switch (ast.kind) {

    case Kind.INT:
      return parseInt(ast.value, 10); // ast value is always in string format

    case Kind.STRING:
      return Date.parse(ast.value);

    default:
      return null;
  }
};

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  serialize, parseValue, parseLiteral,
});

export default DateTime;
