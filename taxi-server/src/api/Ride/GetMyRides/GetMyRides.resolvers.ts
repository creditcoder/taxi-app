import { getRepository } from "typeorm";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { GetMyRidesResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import checkAuthResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Query: {
    GetMyRides: checkAuthResolver(
      async (_, __, { req }): Promise<GetMyRidesResponse> => {
        const {
          user: { id }
        } = req;
        try {
          const user = await User.findOne({ id }, { relations: ["places"] });
          const rides = await getRepository(Ride).find({
            where: [
              {
                driverId: id
              },
              {
                passengerId: id
              }
            ],
            relations: ["driver", "passenger"]
          });
          if (user) {
            const { ridesAsDriver, ridesAsPassenger } = rides.reduce(
              (acc, ride) => {
                if (ride.driverId === id) {
                  return {
                    ...acc,
                    ridesAsDriver: [...acc.ridesAsDriver, ride]
                  };
                }
                return {
                  ...acc,
                  ridesAsPassenger: [...acc.ridesAsPassenger, ride]
                };
              },
              { ridesAsDriver: [], ridesAsPassenger: [] }
            );
            return {
              ok: true,
              error: null,
              ridesAsDriver,
              ridesAsPassenger
            };
          } else {
            return {
              ok: false,
              error: "User was not found",
              ridesAsDriver: null,
              ridesAsPassenger: null
            };
          }
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            ridesAsDriver: null,
            ridesAsPassenger: null
          };
        }
      }
    )
  }
};

export default resolvers;
