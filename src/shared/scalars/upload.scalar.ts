import { GraphQLScalarType, Kind } from 'graphql';

function parseJSONLiteral(ast) {
  console.log(ast);
  switch (ast.kind) {
    case Kind.STRING:
    case Kind.BOOLEAN:
      return ast.value;
    case Kind.INT:
    case Kind.FLOAT:
      return parseFloat(ast.value);
    case Kind.OBJECT: {
      const value = Object.create(null);
      ast.fields.forEach(field => {
        value[field.name.value] = parseJSONLiteral(field.value);
      });

      return value;
    }
    case Kind.LIST:
      return ast.values.map(parseJSONLiteral);
    default:
      return null;
  }
}

const UploadedFile = new GraphQLScalarType({
  name: 'UploadedFile',
  parseLiteral: parseJSONLiteral,
  serialize: value =>  value,
  parseValue: value => value,
});

export default UploadedFile;
