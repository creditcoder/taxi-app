import Chat from "../../../entities/Chat";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import {
  UpdateRideStatusMutationArgs,
  UpdateRideStatusResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import checkAuthResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Mutation: {
    UpdateRideStatus: checkAuthResolver(
      async (
        _,
        args: UpdateRideStatusMutationArgs,
        { req, pubSub }
      ): Promise<UpdateRideStatusResponse> => {
        const user: User = req.user;
        if (user.isDriving) {
          try {
            let ride: Ride | undefined;
            if (args.status === "ACCEPTED") {
              ride = await Ride.findOne(
                {
                  id: args.rideId,
                  status: "REQUESTING"
                },
                { relations: ["passenger", "driver"] }
              );
              if (ride) {
                ride.driver = user;
                user.isTaken = true;
                user.save();
                const chat = await Chat.create({
                  driver: user,
                  passenger: ride.passenger,
                  rideId: ride.id
                }).save();
                ride.chat = chat;
                ride.chatId = chat.id;
                ride.save();
                console.log(ride.chat);
              }
            } else {
              ride = await Ride.findOne(
                {
                  id: args.rideId,
                  driver: user
                },
                { relations: ["passenger", "driver"] }
              );
            }
            if (ride) {
              ride.status = args.status;
              ride.save();
              pubSub.publish("rideUpdate", { RideStatusSubscription: ride });
              return {
                ok: true,
                error: null,
                rideId: ride.id
              };
            } else {
              return {
                ok: false,
                error: "Can not update a ride",
                rideId: null
              };
            }
          } catch (e) {
            return {
              ok: false,
              error: e.message,
              rideId: null
            };
          }
        } else {
          return {
            ok: false,
            error: "You are not driving",
            rideId: null
          };
        }
      }
    )
  }
};

export default resolvers;
