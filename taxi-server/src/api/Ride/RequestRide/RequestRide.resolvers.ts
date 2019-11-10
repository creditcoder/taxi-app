import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import {
  RequestRideMutationArgs,
  RequestRideResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import checkAuthResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Mutation: {
    RequestRide: checkAuthResolver(
      async (
        _,
        args: RequestRideMutationArgs,
        { req, pubSub }
      ): Promise<RequestRideResponse> => {
        const user: User = req.user;
        try {
          const ride = await Ride.create({ ...args, passenger: user }).save();
          pubSub.publish("rideRequest", { NearbyRideSubscription: ride });
          return {
            ok: true,
            error: null,
            ride
          };
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            ride: null
          };
        }
      }
    )
  }
};

export default resolvers;
