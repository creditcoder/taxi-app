import { gql } from "apollo-boost";

export const FACEBOOK_CONNECT = gql`
  mutation facebookConnect(
    $firstname: String!
    $lastName: String!
    $email: String
    $fbId: String!
  ) {
    FacebookConnect(
      firstName: $firstname
      lastname: $lastname
      email: $email
      fbId: $fbId
    ) {
      ok
      error
      token
    }
  }
`;
