import { Between } from "typeorm";
import User from "../../../entities/User";
import { GetNearbyDriversResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import checkAuthResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Query: {
    GetNearbyDrivers: checkAuthResolver(
      async (_, __, { req }): Promise<GetNearbyDriversResponse> => {
        const user: User = req.user;
        const { lastLat, lastLng } = user;
        const drivers = await User.find({
          isDriving: true,
          // lat between
          // lng between
        })
      }
    )
  }
};

export default resolvers;
