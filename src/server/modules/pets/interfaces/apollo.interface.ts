import { GraphQLError } from 'graphql';

export interface IApolloError {
  graphQLErrors?: GraphQLError[];
  networkError?: Error | null;
  errorMessage?: string;
  extraInfo?: any;
}
