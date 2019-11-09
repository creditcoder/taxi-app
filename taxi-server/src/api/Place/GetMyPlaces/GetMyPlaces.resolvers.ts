import User from "../../../entities/User";
import { GetMyPlacesResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import checkAuthResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Query: {
    GetMyPlaces: checkAuthResolver(
      async (_, __, { req }): Promise<GetMyPlacesResponse> => {
        try {
          const user = await User.findOne(
            { id: req.user.id },
            { relations: ["places"] }
          );
          if (user) {
            return {
              ok: true,
              places: user.places,
              error: null
            };
          } else {
            return {
              ok: false,
              places: null,
              error: "User was not found"
            };
          }
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            places: null
          };
        }
      }
    )
  }
};

export default resolvers;
