import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Query: {
    GetMyProfile: async (_, __, context) => {
      const { user } = context.req;
      return {
        ok: true,
        error: null,
        user
      };
    }
  }
};

export default resolvers;
