import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://mini-blog.test/graphql",
  cache: new InMemoryCache(),
});

export default client;
