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
        passenger {
          fullName
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
        driver {
          fullName
        }
      }
    }
  }
`;
