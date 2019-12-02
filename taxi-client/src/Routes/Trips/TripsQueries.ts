import { gql } from "apollo-boost";

export const GET_MY_RIDES = gql`
  query getMyRides {
    GetMyRides {
      ok
      error
      ridesAsDriver {
        id
        status
        pickUpAddress
        dropOffAddress
        price
        distance
        chatId
        updatedAt
        passenger {
          fullName
          profilePhoto
        }
      }
      ridesAsPassenger {
        id
        status
        pickUpAddress
        dropOffAddress
        price
        distance
        chatId
        updatedAt
        driver {
          fullName
          profilePhoto
        }
      }
    }
  }
`;
