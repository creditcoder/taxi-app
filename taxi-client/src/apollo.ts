import ApolloClient, { Operation } from "apollo-boost";
import { async } from "q";

const client = new ApolloClient({
  request: async (operation: Operation) => {
    operation.setContext({
      headers: {
        "X-JWT": localStorage.getItem("jwt") || ""
      }
    });
  },
  uri: "http://localhost:4000/graphql"
});

export default client;
