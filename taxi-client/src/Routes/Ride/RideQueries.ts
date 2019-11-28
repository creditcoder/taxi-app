import { gql } from "apollo-boost";

export const GET_RIDE = gql`
  query getRide($rideId: Int!) {
    GetRide(rideId: $rideId) {
      ok
      error
      ride {
        id
        status
        pickUpAddress
        dropOffAddress
        price
        distance
        duration
        driver {
          id
          fullName
          profilePhoto
        }
        passenger {
          id
          fullName
          profilePhoto
        }
        chatId
      }
    }
  }
`;
