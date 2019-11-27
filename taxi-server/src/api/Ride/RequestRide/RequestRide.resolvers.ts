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
        user.isRiding = false;
            user.save();
        if (!user.isDriving && !user.isRiding) {
          try {
            const ride = await Ride.create({ ...args, passenger: user }).save();
            pubSub.publish("rideRequest", { NearbyRideSubscription: ride });
            user.isRiding = true;
            user.save();
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
        } else {
          return {
            ok: false,
            error: "You can not request new ride before finish of current one",
            ride: null
          };
        }
      }
    )
  }
};

export default resolvers;
