import User from "../../../entities/User";
import {
  UpdateRideStatusMutationArgs,
  UpdateRideStatusResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import checkAuthResolver from "../../../utils/authResolver";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Mutation: {
    UpdateRideStatus: checkAuthResolver(
      async (
        _,
        args: UpdateRideStatusMutationArgs,
        { req }
      ): Promise<UpdateRideStatusResponse> => {
        const user: User = req.user;
        if (user.isDriving) {
          try {
            const ride = await Ride.findOne({
              id: args.rideId,
              status: "REQUESTING"
            });
            if (ride) {
              ride.status = args.status;
              ride.save();
            } else {
              return {
                ok: false,
                error: "Can not update a ride"
              };
            }
          } catch (e) {
            return {
              ok: false,
              error: e.message
            };
          }
        }
      }
    )
  }
};

export default resolvers;
