import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

import schema from "../../../schema.json";
import getPossibleTypes from "@/services/apollo/possible-types";

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: "https://rickandmortyapi.com/graphql",
});

// Cache implementation
const cache = new InMemoryCache({ possibleTypes: getPossibleTypes(schema) });

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});
