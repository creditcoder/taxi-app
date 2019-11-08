import { Resolvers } from "../../../types/resolvers";
import checkAuthResolver from "../../../utils/authResolver";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: checkAuthResolver(async (_, __, context) => {
      const { user } = context.req;
      return {
        ok: true,
        error: null,
        user
      };
    })
  }
};

export default resolvers;
